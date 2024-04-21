import 'server-only'
import { Entry, Logging } from '@google-cloud/logging'
import { LogType } from '@/types'
import { CloudTasksClient } from '@google-cloud/tasks'

type Queue = {
    location: string
    projectId: string
}

export const queues = {
    test: {
        location: 'us-central1',
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
    } as Queue,
    websitebooking: {
        location: 'us-central1',
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
    } as Queue
} as const

export type queueNames = keyof typeof queues

function getTaskAdminCredentials() {
    return JSON.parse(process.env.CLOUD_TASK_ADMIN)
}

function getLoggingAdminCredentials() {
    return JSON.parse(process.env.LOGGING_ADMIN)
}

function formatErrorForLogging(error: any) {
    if (error instanceof Error) {
        return {
            message: error.message,
            stack: error.stack
        }
    } else if (typeof error === 'object' && error !== null) {
        return JSON.stringify(error)
    } else {
        return String(error)
    }
}

export async function log(error: any, type: LogType = 'error'): Promise<void> {
    console.error(error)
    if (process.env.NODE_ENV === 'development') return
    const loggingAdmin = getLoggingAdminCredentials()
    const logging = new Logging({
        credentials: loggingAdmin,
        projectId: loggingAdmin.project_id
    })

    const log = logging.log('reviewsurplus-website')

    const metadata = {
        resource: { type: 'global' }
    }
    const entry: Entry = log.entry(metadata, {
        message: formatErrorForLogging(error),
        type
    })

    await log.write(entry)
}

export default async function createGoogleCloudTask(
    executeTime: Date,
    data: { [key: string]: any } = {},
    url: string,
    method: 'POST' | 'GET' | 'HEAD' | 'DELETE' | 'PUT',
    queue: queueNames,
    taskId?: string
): Promise<string> {
    process.env.NODE_ENV === 'development' && (queue = 'test')
    const client = new CloudTasksClient({
        credentials: getTaskAdminCredentials()
    })

    const { location, projectId } = queues[queue]

    const parent = client.queuePath(projectId, location, queue)

    const date = new Date()
    date.setUTCSeconds(date.getUTCSeconds() + 20)

    const task = {
        name: taskId && client.taskPath(projectId, location, queue, taskId),
        httpRequest: {
            httpMethod: method,
            url,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.GOOGLE_CLOUD_TASK_API_KEY}`
            },
            body: Buffer.from(JSON.stringify(data)).toString('base64')
        },
        scheduleTime: {
            seconds:
                executeTime < new Date()
                    ? Math.floor(date.getTime() / 1000)
                    : Math.floor(executeTime.getTime() / 1000)
        }
    } as any

    const [response] = await client.createTask(
        { parent, task },
        {
            maxRetries: 1
        }
    )

    return response.name!
}

export async function validateRecaptchaToken(token: string): Promise<boolean> {
    const url = 'https://www.google.com/recaptcha/api/siteverify'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: token
            })
        })

        if (!response.ok) {
            return false
        }

        const data = await response.json()
        return data.success
    } catch (error) {
        return false
    }
}
