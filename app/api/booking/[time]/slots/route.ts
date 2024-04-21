import { NextResponse } from 'next/server'
import { DAYS_AHEAD, getAvailableTimeSlots } from '../../calendar'
import { Connection } from 'mysql2/promise'
import connect from '@/config/db'
import validator from 'validator'

export async function GET(
    request: Request,
    {
        params: { time }
    }: {
        params: {
            time: string
        }
    }
) {
    let connection: Connection | undefined = undefined
    try {
        if (!dateValidAndInRange(time)) {
            return NextResponse.json(
                {},
                {
                    status: 400
                }
            )
        }
        const date = new Date(time)
        connection = await connect()
        const days = await getAvailableTimeSlots(connection, date)
        return NextResponse.json(days)
    } catch {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        )
    } finally {
        await connection?.end()
    }
}

/**
 * Checks if a date string is valid and falls within a specific range from today.
 * The range is from today to 14 days ahead.
 *
 * @param {string} dateString - The date string to validate.
 * @returns {boolean} - Returns true if the date is valid and in range, otherwise returns false.
 */
function dateValidAndInRange(dateString: string): boolean {
    if (!validator.isISO8601(dateString)) {
        return false
    }

    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    const twoWeeksFromNow = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + DAYS_AHEAD
    )

    return (
        date.getTime() >= currentDate.getTime() &&
        date.getTime() <= twoWeeksFromNow.getTime()
    )
}
