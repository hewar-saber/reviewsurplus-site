import { API_URLS } from './constants'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export function delay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getCsrfToken() {
    try {
        const response = await fetch(API_URLS.SESSION)

        if (!response.ok) {
            return undefined
        }

        const { CSRFToken } = await response.json()
        return CSRFToken
    } catch (error) {
        return undefined
    }
}

export function missingCredentials(
    data: { [key: string]: any },
    credentials: string[]
): boolean {
    return credentials.some(key => !(key in data))
}

/**
 *
 * @param {string} timeZone The IANA timezone to validate.
 * @returns {boolean} true if the timezone is valid, false otherwise.
 */

export function validateTimeZone(timeZone: string): boolean {
    try {
        Intl.DateTimeFormat(undefined, { timeZone })
        return true
    } catch (error) {
        return false
    }
}

export function inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max
}

export function validateContactName(name: string): boolean {
    const CONTACT_NAME_MIN_LENGTH = 2
    const CONTACT_NAME_MAX_LENGTH = 255
    return inRange(
        name.length,
        CONTACT_NAME_MIN_LENGTH,
        CONTACT_NAME_MAX_LENGTH
    )
}

export function trimObjectValues<T extends Record<string, any>>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === 'string' ? value?.trim() : value
        ])
    ) as T
}

export function isJSONError(error: any): error is SyntaxError {
    return (
        error instanceof SyntaxError &&
        error.message.includes('Unexpected end of JSON input')
    )
}

/**
 *
 * @param {Date} date The Date object to be formatted
 * @param {string} timeZone The IANA timezone identifier
 * @returns {string} The formatted date
 */
export function formatDateIntl(date: Date, timeZone: string): string {
    const optionsDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: timeZone
    } as const
    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone
    } as const

    const formattedDate = date.toLocaleDateString('en-US', optionsDate)

    const formattedTime = date.toLocaleTimeString('en-US', optionsTime)

    return `${formattedDate} at ${formattedTime}, your local timezone`
}
