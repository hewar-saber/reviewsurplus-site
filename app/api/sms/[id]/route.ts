import { getSlot } from '@/util/query'
import { Connection } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import connect from '@/config/db'
import createGoogleCloudTask, { log } from '@/util/googleCloud'
import {
    confirmationSMSMessage,
    reminder1HSMSMessage,
    reminder24HSMSMessage
} from '@/util/SMSMessages'
import { missingCredentials } from '@/util/util'
import validator from 'validator'
import { sendSMS } from '@/util/server'
import dayjs from 'dayjs'

const sms = {
    'reminder-first-sms': {
        function: reminderFirstSMS
    },
    'reminder-24-hours': {
        function: reminder24HourSMS
    },
    'reminder-1-hour': {
        function: reminder1HourSMS
    }
}

export async function POST(
    request: NextRequest,
    { params: { id } }: { params: { id: string } }
) {
    let connection: Connection | undefined
    try {
        const authorization = request.headers.get('authorization')

        if (!authorization)
            return NextResponse.json(
                {},
                { status: 401, statusText: 'Unauthorized' }
            )

        const prefix = 'Bearer '
        const hasBearerToken = authorization.startsWith(prefix)
        if (!hasBearerToken)
            return NextResponse.json(
                {},
                { status: 401, statusText: 'Unauthorized' }
            )

        const token = authorization.slice(prefix.length)

        if (token !== process.env.GOOGLE_CLOUD_TASK_API_KEY)
            return NextResponse.json(
                {},
                { status: 401, statusText: 'Unauthorized' }
            )

        if (!Object.keys(sms).includes(id)) {
            return NextResponse.json({ id: 'SMS not found.' }, { status: 404 })
        }

        connection = await connect()

        return await sms[id as keyof typeof sms].function(request, connection)
    } catch (error: any) {
        await log(error, 'error')
        await connection?.rollback()
        return NextResponse.json(
            { message: 'Internal Server Error.' },
            { status: 500 }
        )
    } finally {
        await connection?.end()
    }
}

async function reminderFirstSMS(
    request: NextRequest,
    connection: Connection
): Promise<NextResponse> {
    const data = await request.json()
    const credentials = ['id']

    if (missingCredentials(data, credentials)) {
        return NextResponse.json(
            { message: 'Missing Credential' },
            { status: 400, statusText: 'Missing Credential' }
        )
    }

    const { id } = data

    if (!validator.isInt(`${id}`)) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }

    const slot = await getSlot(Number(id), connection)
    if (!slot) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }

    const { firstName, start, timezone, phone } = slot
    const sms = confirmationSMSMessage(firstName, start as Date, timezone)

    await sendSMS(phone, sms)

    const now = new Date()

    const diff = dayjs(start).diff(now, 'hours')

    if (diff < 24) {
        const anHourBeforeStart = dayjs(start).subtract(1, 'hour').toDate()

        const url = `${process.env.API_URL}/sms/reminder-1-hour`

        await createGoogleCloudTask(
            anHourBeforeStart,
            { id },
            url,
            'POST',
            'websitebooking'
        )

        return NextResponse.json({ message: 'SMS Sent successfully.' })
    }

    const aDayBeforeStart = dayjs(start).subtract(1, 'day').toDate()

    const url = `${process.env.API_URL}/sms/reminder-24-hours`

    await createGoogleCloudTask(
        aDayBeforeStart,
        { id },
        url,
        'POST',
        'websitebooking'
    )

    return NextResponse.json({ message: 'SMS Sent successfully.' })
}

async function reminder24HourSMS(
    request: NextRequest,
    connection: Connection
): Promise<NextResponse> {
    const data = await request.json()
    const credentials = ['id']

    if (missingCredentials(data, credentials)) {
        return NextResponse.json(
            { message: 'Missing Credential' },
            { status: 400, statusText: 'Missing Credential' }
        )
    }

    const { id } = data

    if (!validator.isInt(`${id}`)) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }

    const slot = await getSlot(Number(id), connection)
    if (!slot) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }
    const { phone, start } = slot

    const sms = reminder24HSMSMessage()
    await sendSMS(phone, sms)

    const anHourBeforeStart = dayjs(start).subtract(1, 'hour').toDate()

    const url = `${process.env.API_URL}/sms/reminder-1-hour`

    await createGoogleCloudTask(
        anHourBeforeStart,
        { id },
        url,
        'POST',
        'websitebooking'
    )

    return NextResponse.json({ message: 'SMS Sent successfully.' })
}

async function reminder1HourSMS(
    request: NextRequest,
    connection: Connection
): Promise<NextResponse> {
    const data = await request.json()
    const credentials = ['id']

    if (missingCredentials(data, credentials)) {
        return NextResponse.json(
            { message: 'Missing Credential' },
            { status: 400, statusText: 'Missing Credential' }
        )
    }

    const { id } = data

    if (!validator.isInt(`${id}`)) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }

    const slot = await getSlot(Number(id), connection)
    if (!slot) {
        return NextResponse.json(
            { id: 'Time slot not found.' },
            { status: 400 }
        )
    }
    const { phone } = slot

    const sms = reminder1HSMSMessage()
    await sendSMS(phone, sms)

    return NextResponse.json({ message: 'SMS Sent successfully.' })
}
