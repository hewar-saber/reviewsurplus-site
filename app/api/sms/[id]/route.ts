import { getSlot } from '@/util/query'
import { Connection } from 'mysql2/promise'
import { NextRequest, NextResponse } from 'next/server'

import connect from '@/config/db'
import { log } from '@/util/googleCloud'
import {
    confirmationSMSMessage,
    reminder1HSMSMessage,
    reminder24HSMSMessage
} from '@/util/SMSMessages'
import { missingCredentials } from '@/util/util'
import validator from 'validator'
import { sendSMS } from '@/util/server'

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

        if (token !== process.env.API_BEARER_AUTH)
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

    const { firstName, start, timezone, phone } = slot
    const sms = confirmationSMSMessage(firstName, start as Date, timezone)

    await sendSMS(phone, sms)

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
    const { phone } = slot

    const sms = reminder1HSMSMessage()
    await sendSMS(phone, sms)

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
    const { phone } = slot

    const sms = reminder24HSMSMessage()
    await sendSMS(phone, sms)

    return NextResponse.json({ message: 'SMS Sent successfully.' })
}
