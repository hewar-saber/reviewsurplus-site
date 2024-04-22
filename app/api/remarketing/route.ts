import { NextRequest, NextResponse } from 'next/server'

import {
    HTTP_RESPONSES,
    addContactToCRM,
    addContactToList,
    checkCSRFToken,
    getCRMContactByEmail,
    sessionOptions,
    tryWithoutException,
    updateCRMContact
} from '@/util/server'
import { missingCredentials, trimObjectValues, isJSONError } from '@/util/util'

import createGoogleCloudTask, { log } from '@/util/googleCloud'
import { Contact, Session } from '@/types'
import {
    companyErrors,
    nameErrors,
    emailErrors,
    phoneErrors
} from '../booking/util'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest): Promise<NextResponse> {
    const session = await getIronSession<Session>(cookies(), sessionOptions)

    if (!checkCSRFToken(request, session)) {
        return HTTP_RESPONSES.UNAUTHORIZED
    }
    try {
        const data = await request.json()
        const credentials = ['company', 'firstName', 'phone', 'email']

        if (missingCredentials(data, credentials)) {
            return NextResponse.json(
                { message: 'Missing Credential' },
                { status: 400, statusText: 'Missing Credential' }
            )
        }

        const { company, firstName, phone, email } =
            trimObjectValues<Contact>(data)

        const errors = [
            ['company', companyErrors(company)],
            ['firstName', nameErrors(firstName)],
            ['email', await emailErrors(email)],
            ['phone', phoneErrors(phone)]
        ].filter(([, value]) => value !== false)

        if (errors.length) {
            return NextResponse.json(Object.fromEntries(errors), {
                status: 400,
                statusText: 'Invalid User Data'
            })
        }

        const handleCRMOperations = async () => {
            const crmContactResponse = await getCRMContactByEmail(email)
            const crmContactExists = crmContactResponse.ok

            let crmContact = null

            if (crmContactExists) {
                crmContact = await crmContactResponse.json()
                const upadtedContactResponse = await updateCRMContact(
                    {
                        company,
                        firstName,
                        phone,
                        email
                    },
                    Number(crmContact.id)
                )

                const data = await upadtedContactResponse.json()
                if (upadtedContactResponse.ok) {
                    crmContact = {
                        ...crmContact,
                        ...data
                    }
                } else {
                    await log("Couldn't update contact in CRM")
                    await log(JSON.stringify(data))
                    return HTTP_RESPONSES.NO_CONTENT
                }
            } else {
                const response = await addContactToCRM({
                    company,
                    firstName,
                    lastName: '',
                    phone,
                    email,
                    rating: 0,
                    reviewAmount: 0,
                    address: '',
                    city: '',
                    facebookPage: '',
                    instagramPage: '',
                    websiteUrl: '',
                    list: ''
                })
                if (!response.ok) {
                    await log("Couldn't add contact to CRM", 'error')
                    await log(await response.text(), 'error')
                    return HTTP_RESPONSES.NO_CONTENT
                }

                crmContact = await response.json()
            }

            await addContactToList(
                crmContact.id,
                Number(process.env.BOOKING_REMARKETING_LIST_ID)
            )

            const executeTime = new Date()
            executeTime.setUTCMinutes(executeTime.getUTCMinutes() + 20)

            await createGoogleCloudTask(
                executeTime,
                {},
                `${process.env.API_URL}/remarketing/enroll/${crmContact.id}`,
                'POST',
                'websitebooking'
            )
        }

        await tryWithoutException(handleCRMOperations)

        return HTTP_RESPONSES.NO_CONTENT
    } catch (error: any) {
        await log(error, 'error')
        if (isJSONError(error)) {
            return HTTP_RESPONSES.JSON_ERROR
        }
        return HTTP_RESPONSES.SERVER_ERROR
    }
}
