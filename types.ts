export type Slot = {
    company: string
    firstName: string
    phone: string
    email: string
    start: Date | string
    end: Date | string
    timezone: string
}

export type TimeSlot = {
    start: Date
    end: Date
}

export type LogType = 'error' | 'info' | 'warning'

export type Session = {
    CSRFToken: string
}

export type Contact = {
    id: number
    userId: number
    email: string
    company: string
    firstName: string
    lastName: string
    websiteUrl: string
    phone: string
    city: string
    address: string
    facebookPage: string
    instagramPage: string
    createdAt: Date
    updateAt: Date
    unsubscribeId: string
    rating: number
    reviewAmount: number
    enrollmentId?: number | null
    sequenceName?: string | null
}

export type ContactBeforeCreation = Omit<
    Contact,
    'id' | 'createdAt' | 'updateAt' | 'userId' | 'unsubscribeId'
>

export type Email = {
    name: string
    email: string
    password: string
}

export type EmailOptions = {
    from: Email
    to: string
    subject: string
    html: string
    cc?: string
    bcc?: string
    attachments?: { filename: string; content: string | Buffer }[]
}
