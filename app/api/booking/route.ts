import { NextResponse } from 'next/server'

import { HTTP_RESPONSES, validateDate } from '@/util/server'
import {
    missingCredentials,
    validateTimeZone,
    trimObjectValues,
    isJSONError
} from '@/util/util'
import { SLOT_LENGTH, createMeeting, slotAvailable } from './calendar'
import { Connection } from 'mysql2/promise'
import connect from '@/config/db'

import createTask, { log, validateRecaptchaToken } from '@/util/googleCloud'
import { Slot } from '@/types'
import createGoogleCloudTask from '@/util/googleCloud'
import { companyErrors, nameErrors, emailErrors, phoneErrors } from './util'

export async function POST(request: Request) {
    let connection: Connection | undefined
    try {
        const data = await request.json()
        const credentials = [
            'company',
            'firstName',
            'phone',
            'email',
            'start',
            'end',
            'timezone',
            'captcha'
        ]

        if (missingCredentials(data, credentials)) {
            return NextResponse.json(
                { message: 'Missing Credential' },
                { status: 400, statusText: 'Missing Credential' }
            )
        }

        const {
            company,
            firstName,
            phone,
            email,
            start: startString,
            end: endString,
            timezone,
            captcha
        } = trimObjectValues<
            Slot & {
                captcha: string
            }
        >(data)

        connection = await connect()

        console.log(data)

        const errors = [
            ['company', companyErrors(company)],
            ['firstName', nameErrors(firstName)],
            ['email', await emailErrors(email)],
            [
                'slot',
                await slotErrors(
                    connection,
                    startString as unknown as string,
                    endString as unknown as string
                )
            ],
            ['timezone', timeZoneErrors(timezone)],
            ['phone', phoneErrors(phone), ['captcha', captchaErrors(captcha)]]
        ].filter(([, value]) => value !== false)

        if (errors.length) {
            return NextResponse.json(Object.fromEntries(errors), {
                status: 400,
                statusText: 'Invalid User Data'
            })
        }
        const start = new Date(startString)
        const end = new Date(endString)
        await connection.beginTransaction()

        const id = await createMeeting(connection, {
            company,
            firstName,
            email,
            start,
            end,
            timezone,
            phone
        })

        const executeTime = new Date()

        await createGoogleCloudTask(
            executeTime,
            {
                id
            },
            `${process.env.API_URL}/emails/reminder-first-email`,
            'POST',
            'websitebooking'
        )
        await createTask(
            executeTime,
            {
                id
            },
            `${process.env.API_URL}/sms/reminder-first-sms`,
            'POST',
            'websitebooking'
        )

        await connection.commit()
        return NextResponse.json({
            success: 'Slot booked successfully.'
        })
    } catch (error: any) {
        await log(error, 'error')
        if (isJSONError(error)) {
            return HTTP_RESPONSES.JSON_ERROR
        }
        return HTTP_RESPONSES.SERVER_ERROR
    } finally {
        await connection?.end()
    }
}

async function slotErrors(
    connection: Connection,
    startString: string,
    endString: string
): Promise<string | false> {
    if (!validateDate(startString) || !validateDate(endString)) {
        return 'Date is not valid.'
    }
    const start = new Date(startString)
    const end = new Date(endString)

    const timeDifference = end.getTime() - start.getTime()
    const desiredTimeDifference = SLOT_LENGTH * 60 * 1000

    if (timeDifference !== desiredTimeDifference) {
        return 'Invalid slot length.'
    }
    const isSlotAvailable = await slotAvailable(connection, start, end)
    if (!isSlotAvailable) {
        return 'The chosen slot is not available!'
    }
    return false
}

function timeZoneErrors(timeZone: string): string | false {
    return validateTimeZone(timeZone) ? false : 'Invalid TimeZone'
}

async function captchaErrors(captcha: string): Promise<string | false> {
    if (process.env.NODE_ENV === 'development') return false
    const isValid = await validateRecaptchaToken(captcha)
    return isValid ? false : 'Invalid Captcha'
}
