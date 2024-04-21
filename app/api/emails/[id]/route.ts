import { getSlot } from '@/util/query'
import { sendHTMLEmail } from '@/util/server'
import { Connection } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'
import {
    generateCalendarFile,
    reminderFirstEmailHTML,
    reminder1HourEmailHTML,
    reminder24HourEmailHTML
} from '@/util/emailHtml'
import connect from '@/config/db'
import createGoogleCloudTask, { log } from '@/util/googleCloud'
import { missingCredentials } from '@/util/util'
import dayjs from 'dayjs'
import validator from 'validator'

const emails = {
    'reminder-first-email': {
        function: reminderFirstEmail
    },
    'reminder-24-hours': {
        function: reminder24HourEmail
    },
    'reminder-1-hour': {
        function: reminder1HourEmail
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

        if (token !== process.env.API_BEARER_AUTH)
            return NextResponse.json(
                {},
                { status: 401, statusText: 'Unauthorized' }
            )

        if (!Object.keys(emails).includes(id)) {
            return NextResponse.json(
                { id: 'Email not found.' },
                { status: 404 }
            )
        }

        connection = await connect()

        return await emails[id as keyof typeof emails].function(
            request,
            connection
        )
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

async function reminderFirstEmail(
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

    if (!validator.isInt(id)) {
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

    const { email, firstName, start, end, timezone: timeZone } = slot

    const html = reminderFirstEmailHTML(firstName, start as Date, timeZone)

    const calendarFileContent = generateCalendarFile(
        'Discovery Call',
        'Discovery call to discuss your marketing needs.',
        start as Date,
        end as Date
    )

    const formattedDate = dayjs(start).format('MMMM D, YYYY')

    await sendHTMLEmail({
        from: {
            name: 'Review Surplus',
            email: process.env.SALES_EMAIL,
            password: process.env.SALES_EMAIL_PASSWORD
        },
        bcc: process.env.SALES_EMAIL,
        subject: `Your Requested Strategy Session: Confirmed for ${formattedDate}`,
        to: email,
        html,
        attachments: [
            {
                filename: 'appointment.ics',
                content: calendarFileContent
            }
        ]
    })

    const now = new Date()

    const diff = dayjs(start).diff(now, 'hours')

    if (diff < 24) {
        const anHourBeforeStart = dayjs(start).subtract(1, 'hour').toDate()

        const url = `${process.env.API_URL}/api/emails/reminder-1-hour`

        await createGoogleCloudTask(
            anHourBeforeStart,
            { id },
            url,
            'POST',
            'websitebooking'
        )

        return NextResponse.json({ message: 'Email Sent successfully.' })
    }

    const aDayBeforeStart = dayjs(start).subtract(1, 'day').toDate()

    const url = `${process.env.API_URL}/api/emails/reminder-24-hours`

    await createGoogleCloudTask(
        aDayBeforeStart,
        { id },
        url,
        'POST',
        'websitebooking'
    )

    return NextResponse.json({ message: 'Email Sent successfully.' })
}

async function reminder24HourEmail(
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

    if (!validator.isInt(id)) {
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
    const { email, firstName, start, timezone, end } = slot

    const html = reminder24HourEmailHTML(firstName, start as Date, timezone)

    await sendHTMLEmail({
        from: {
            name: 'Review Surplus',
            email: process.env.SALES_EMAIL,
            password: process.env.SALES_EMAIL_PASSWORD
        },
        bcc: process.env.SALES_EMAIL,
        subject: `Reminder: ${firstName}, Requested Strategy Session Is Tomorrow`,
        to: email,
        html,
        attachments: [
            {
                content: generateCalendarFile(
                    'Discovery Call',
                    'Discovery call to discuss your reviews.',
                    start as Date,
                    end as Date
                ),
                filename: 'appointment.ics'
            }
        ]
    })

    const anHourBeforeStart = dayjs(start).subtract(1, 'hour').toDate()

    const url = `${process.env.API_URL}/api/emails/reminder-1-hour`

    await createGoogleCloudTask(
        anHourBeforeStart,
        { id },
        url,
        'POST',
        'websitebooking'
    )

    return NextResponse.json({ message: 'Email Sent successfully.' })
}

async function reminder1HourEmail(
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

    if (!validator.isInt(id)) {
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
    const { email, firstName } = slot

    const html = reminder1HourEmailHTML(firstName)
    await sendHTMLEmail({
        from: {
            name: 'Review Surplus',
            email: process.env.SALES_EMAIL,
            password: process.env.SALES_EMAIL_PASSWORD
        },
        bcc: process.env.SALES_EMAIL,
        subject: `Upcoming Your Strategy Call Begins in One Hour`,
        to: email,
        html
    })

    return NextResponse.json({ message: 'Email Sent successfully.' })
}
