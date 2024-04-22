import {
    HTTP_RESPONSES,
    enrollContactInSequence,
    getCRMContact
} from '@/util/server'
import { Connection } from 'mysql2/promise'
import connect from '@/config/db'

import { log } from '@/util/googleCloud'
import validator from 'validator'
import { getFutureSlotsByEmail } from '@/util/query'

export async function POST(
    request: Request,
    { params: { id } }: { params: { id: string } }
) {
    if (!validator.isInt(id)) {
        return HTTP_RESPONSES.NOT_FOUND
    }

    const authorization = request.headers.get('authorization')

    if (!authorization) {
        return HTTP_RESPONSES.UNAUTHORIZED
    }
    const prefix = 'Bearer '
    const hasBearerToken = authorization.startsWith(prefix)
    if (!hasBearerToken) {
        return HTTP_RESPONSES.UNAUTHORIZED
    }
    const token = authorization.slice(prefix.length)

    if (token !== process.env.GOOGLE_CLOUD_TASK_API_KEY) {
        return HTTP_RESPONSES.UNAUTHORIZED
    }

    let connection: Connection | undefined
    try {
        const contact = await getCRMContact(Number(id))

        if (!contact) {
            return HTTP_RESPONSES.NOT_FOUND
        }

        connection = await connect()

        const slots = await getFutureSlotsByEmail(connection, contact.email)
        const hasBooked = slots.length > 0

        if (hasBooked) {
            return HTTP_RESPONSES.NO_CONTENT
        }

        const enrollResponse = await enrollContactInSequence(
            contact,
            Number(process.env.BOOKING_REMARKETING_SEQUENCE_ID)
        )
        if (!enrollResponse.ok) {
            const responseText = await enrollResponse.text()
            await Promise.all([
                log('Error enrolling contact in sequence: ' + responseText),
                log(responseText)
            ])
        }

        return HTTP_RESPONSES.NO_CONTENT
    } catch (error: any) {
        await log(error)
        return HTTP_RESPONSES.SERVER_ERROR
    } finally {
        await connection?.end()
    }
}
