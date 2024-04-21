import { Contact, ContactBeforeCreation, EmailOptions, Session } from '@/types'
import dns from 'dns'
import { IronSession } from 'iron-session'
import { NextRequest, NextResponse } from 'next/server'
import util from 'util'
import validator from 'validator'
import nodemailer from 'nodemailer'
import twilio, { Twilio } from 'twilio'

export async function validateEmail(email: string): Promise<boolean> {
    const resolveMx = util.promisify(dns.resolveMx)
    if (email?.constructor !== String) return false
    if (!validator.isEmail(email)) return false

    const domain = email.split('@')[1]

    try {
        const addresses = await resolveMx(domain)
        return addresses && addresses.length > 0
    } catch (error) {
        return false
    }
}

export function validateDate(dateString: string): boolean {
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date.valueOf())
}

export function validateFirstname(name: string): boolean {
    return /^[a-z]{2,50}$/i.test(name)
}

export function validatePhoneNumber(phoneNumber: string): boolean {
    const hasCountryCode = /^\+\d+/.test(phoneNumber)
    if (!hasCountryCode) return false

    return validator.isMobilePhone(phoneNumber, 'any')
}

export const HTTP_RESPONSES = {
    MISSING_CREDENTIALS: NextResponse.json(
        { message: 'Missing credentials' },
        { status: 400 }
    ),
    PERMISSION_DENIED: NextResponse.json(
        { message: "You don't have permission to perform this action" },
        { status: 403 }
    ),
    UNAUTHORIZED: NextResponse.json(
        { message: 'You need to login to perform this action' },
        { status: 401 }
    ),
    JSON_ERROR: NextResponse.json({ message: 'Invalid JSON' }, { status: 400 }),
    SERVER_ERROR: NextResponse.json(
        { message: 'Server error' },
        { status: 500 }
    ),
    NOT_FOUND: NextResponse.json({ message: 'Not found' }, { status: 404 }),
    NO_CONTENT: new NextResponse(null, { status: 204 }),
    EMAIL_NOT_VERIFIED: NextResponse.json(
        { message: 'Email not verified' },
        { status: 403 }
    )
}

export const BEARER_PREFIX = 'Bearer '

export function hasBearerToken(request: NextRequest) {
    const authorization = request.headers.get('Authorization')
    if (!authorization) return false
    if (!authorization.startsWith(BEARER_PREFIX)) return false

    const token = authorization.slice(BEARER_PREFIX.length)
    return token.length > 0
}

export function checkCSRFToken(
    request: NextRequest,
    session: IronSession<Session>
) {
    if (!hasBearerToken(request)) return false

    const authorization = request.headers.get('Authorization')
    const token = authorization!.slice(BEARER_PREFIX.length)

    return token === session.CSRFToken
}

export const sessionOptions = {
    cookieName:
        process.env.NODE_ENV === 'production'
            ? 'sessionid'
            : 'reviewsurplus-site',
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
}

export async function getCRMContactByEmail(email: string): Promise<Response> {
    const url = new URL(`${process.env.CRM_API_URL}/contacts/getbyemail`)
    url.searchParams.append('email', email)

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        }
    })
    return response
}

export async function addContactToCRM(
    contact: ContactBeforeCreation & { list: string }
) {
    const url = `${process.env.CRM_API_URL}/contacts`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        },
        body: JSON.stringify(contact)
    })

    return response
}

export async function addContactToList(
    contactId: number,
    listId: number
): Promise<boolean> {
    const url = `${process.env.CRM_API_URL}/lists/${listId}`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        },
        body: JSON.stringify({
            contactId: contactId
        })
    })

    return response.ok
}

export async function getCRMContact(id: number): Promise<Contact | null> {
    const url = `${process.env.CRM_API_URL}/contacts/${id}`

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        }
    })

    if (!response.ok) {
        return null
    }
    return await response.json()
}

export async function enrollContactInSequence(
    contact: Contact,
    sequenceId: number
): Promise<Response> {
    const url = `${process.env.CRM_API_URL}/contacts/${contact.id}/enroll`

    const body = {
        sequenceId,
        fromEmail: process.env.SALES_EMAIL
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        },
        body: JSON.stringify(body)
    })
    return response
}

export async function tryWithoutException(
    callback: () => unknown | Promise<unknown>
) {
    try {
        await callback()
    } catch (error) {
        console.error(error)
    }
}

export async function updateCRMContact(
    contact: Partial<Contact>,
    id: number
): Promise<Response> {
    const url = `${process.env.CRM_API_URL}/contacts/${id}`

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${process.env.CRM_API_KEY}`
        },
        body: JSON.stringify(contact)
    })

    return response
}

export async function sendHTMLEmail(options: EmailOptions): Promise<boolean> {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP_SERVER,
            port: 465,
            secure: true,
            auth: {
                user: options.from.email,
                pass: options.from.password
            }
        })

        await transporter.sendMail({
            from: `"${options.from.name}" <${options.from.email}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            bcc: options.bcc,
            cc: options.cc,
            attachments: options.attachments
        })
        return true
    } catch (error) {
        return false
    }
}

function twilioClient(): Twilio {
    return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
}

export async function sendSMS(number: string, message: string) {
    await twilioClient().messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: number
    })
}
