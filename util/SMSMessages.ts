import { formatDateIntl } from './util'

export function confirmationSMSMessage(
    name: string,
    date: Date,
    timeZone: string
): string {
    const time = formatDateIntl(date, timeZone)
    return `${name}, your strategy session is confirmed for ${time}. We're excited to help you grow your business!\nPro tip: Check your email and add the event to your calendar so you don't forget!`
}

export function reminder24HSMSMessage(): string {
    return `Reminder: Your strategy session is in 24 hours. Looking forward to discussing your business's growth!`
}

export function reminder1HSMSMessage(): string {
    return `Your strategy session starts in 1 hour. Please be ready for our call. Can't wait to connect!`
}
