import { Slot, TimeSlot } from '@/types'
import { Connection, ResultSetHeader } from 'mysql2/promise'

const WORKING_HOURS_START = 7
const WORKING_HOURS_END = 15
export const SLOT_LENGTH = 30
export const DAYS_AHEAD = 14

/**
 * Fetches all slots from the database that occur within the specified date range.
 *
 * @param {Connection} connection - The database connection.
 * @param {Date} start - The start date of the range.
 * @param {Date} end - The end date of the range.
 * @returns {Promise<TimeSlot[]>} - A promise that resolves to an array of slots.
 */
async function getSlotsWithinDateRange(
    connection: Connection,
    start: Date,
    end: Date
): Promise<TimeSlot[]> {
    const sql = `SELECT start, end FROM slots WHERE start >= ? AND end <= ?`
    const [rows] = (await connection.execute(sql, [start, end])) as [
        TimeSlot[],
        any
    ]

    return rows
}

/**
 *
 * @param {Connection} connection The datebase connection
 * @returns {Promise<string[]>} A promise that resolves to an array of timeslots in ISOString
 */
export async function getDaysWithAvailableSlots(
    connection: Connection
): Promise<string[]> {
    const startOfMonth: Date = new Date()
    startOfMonth.setUTCDate(startOfMonth.getUTCDate() + 1)
    startOfMonth.setUTCHours(WORKING_HOURS_START, 0, 0, 0)

    const endOfMonth = new Date(startOfMonth)
    endOfMonth.setUTCDate(endOfMonth.getUTCDate() + DAYS_AHEAD - 1)

    const events = await getSlotsWithinDateRange(
        connection,
        startOfMonth,
        endOfMonth
    )
    let startOfSlot: Date = new Date(startOfMonth)
    let endOfSlot: Date = new Date(startOfMonth)

    const days = new Set<string>()

    while (endOfSlot <= endOfMonth) {
        endOfSlot.setUTCMinutes(endOfSlot.getUTCMinutes() + SLOT_LENGTH)

        const slotInThePast = endOfSlot < new Date() || startOfSlot < new Date()

        if (slotInThePast) {
            startOfSlot = new Date(endOfSlot)
            continue
        }

        const end = endOfEvent(startOfSlot, endOfSlot, events)
        if (end) {
            startOfSlot = new Date(end)
            endOfSlot = new Date(startOfSlot)
            continue
        }
        const isOutSideWorkingHour = outsideWorkingHour(endOfSlot)
        if (isOutSideWorkingHour) {
            startOfSlot.setUTCDate(startOfSlot.getUTCDate() + 1)
            startOfSlot.setUTCHours(WORKING_HOURS_START, 0, 0, 0)
            endOfSlot = new Date(startOfSlot)
            continue
        }

        days.add(startOfSlot.toISOString())
        startOfSlot.setUTCDate(startOfSlot.getUTCDate() + 1)
        startOfSlot.setUTCHours(WORKING_HOURS_START)
        endOfSlot = new Date(startOfSlot)
    }
    return Array.from(days)
}

/**
 *
 * @param {Connection} connection The datebase connection
 * @param {Date} date The start date
 * @returns {Promise<TimeSlot[]>} A promise that resolves to an array of timeslots
 */
export async function getAvailableTimeSlots(
    connection: Connection,
    date: Date
): Promise<TimeSlot[]> {
    const startOfDay: Date = isToday(date) ? new Date() : date
    startOfDay.setUTCHours(WORKING_HOURS_START, 0, 0, 0)

    const endOfDay = new Date(startOfDay)
    endOfDay.setUTCHours(WORKING_HOURS_END, 0, 0, 0)

    const events = await getSlotsWithinDateRange(
        connection,
        startOfDay,
        endOfDay
    )

    let startOfSlot = new Date(startOfDay)

    let endOfSlot = new Date(startOfDay)

    const slots: TimeSlot[] = []
    const now = new Date()
    while (endOfSlot.getTime() <= endOfDay.getTime()) {
        endOfSlot.setUTCMinutes(endOfSlot.getUTCMinutes() + SLOT_LENGTH)

        if (outsideWorkingHour(endOfSlot)) {
            break
        }
        const slotStartsInThePast = startOfSlot.getTime() < now.getTime()
        if (slotStartsInThePast) {
            startOfSlot.setUTCMinutes(startOfSlot.getUTCMinutes() + SLOT_LENGTH)
            continue
        }

        const end = endOfEvent(startOfSlot, endOfSlot, events)
        if (end) {
            startOfSlot = new Date(end)
            endOfSlot = new Date(end)
            continue
        }
        startOfSlot.setUTCHours(
            startOfSlot.getUTCHours(),
            startOfSlot.getUTCMinutes(),
            0,
            0
        )

        endOfSlot.setUTCHours(
            endOfSlot.getUTCHours(),
            endOfSlot.getUTCMinutes(),
            0,
            0
        )
        if (!dateInThePast(startOfSlot) && !dateInThePast(endOfSlot)) {
            slots.push({
                start: new Date(startOfSlot),
                end: new Date(endOfSlot)
            })
        }
        startOfSlot.setUTCMinutes(startOfSlot.getUTCMinutes() + SLOT_LENGTH)
    }
    return slots
}

/**
 * Stores a slot in the database.
 *
 * @param {Connection} connection - The database connection.
 * @param {Slot} slot - The slot to store.
 * @returns {Promise<void>} - A promise that resolves once the slot has been stored.
 */
export async function storeSlot(
    connection: Connection,
    { start, end, email, firstName, phone, timezone, company }: Slot
): Promise<number> {
    const sql = `
        INSERT INTO slots (start, end, company, firstName, email, phone, timezone)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const [result] = (await connection.execute(sql, [
        start,
        end,
        company,
        firstName,
        email,
        phone,
        timezone
    ])) as ResultSetHeader[]
    return result.insertId
}

function endOfEvent(
    startOfSlot: Date,
    endOfSlot: Date,
    events: TimeSlot[]
): Date | undefined {
    for (const { start, end } of events) {
        const slotStart = startOfSlot.getTime()
        const slotEnd = endOfSlot.getTime()
        const eventStart = start.getTime()
        const eventEnd = end.getTime()

        const overlaps = slotStart < eventEnd && slotEnd > eventStart

        if (overlaps) {
            const date = new Date(
                Date.UTC(
                    end.getUTCFullYear(),
                    end.getUTCMonth(),
                    end.getUTCDate(),
                    end.getUTCHours(),
                    end.getUTCMinutes()
                )
            )

            return date
        }
    }
    return undefined
}

function outsideWorkingHour(date: Date): boolean {
    const endOfDay = new Date(date)
    endOfDay.setUTCHours(WORKING_HOURS_END, 0)
    return date.getTime() > endOfDay.getTime()
}
function dateInThePast(slot: Date): boolean {
    const date = new Date()
    return date.getTime() > slot.getTime()
}

function isToday(date: Date) {
    const today = new Date()
    return (
        today.getUTCDate() === date.getUTCDate() &&
        today.getUTCMonth() === date.getUTCMonth() &&
        today.getUTCFullYear() === date.getUTCFullYear()
    )
}

/**
 * Checks if a slot is available in the database.
 *
 * @param {Connection} connection - The database connection.
 * @param {Date} start - The start date and time of the slot.
 * @param {Date} end - The end date and time of the slot.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the slot is available.
 */
export async function slotAvailable(
    connection: Connection,
    start: Date,
    end: Date
): Promise<boolean> {
    const sql = `
        SELECT *
        FROM slots
        WHERE (start < ? AND end > ?)
           OR (start < ? AND end > ?)
           OR (start >= ? AND end <= ?)
    `

    const [rows] = (await connection.execute(sql, [
        end,
        start,
        start,
        end,
        start,
        end
    ])) as [any[], any]

    return rows.length === 0
}

type Meeting = {
    url: string
    id: number
}

export async function createMeeting(
    connection: Connection,
    slot: Slot
): Promise<number> {
    const id = await storeSlot(connection, slot)

    return id
}
