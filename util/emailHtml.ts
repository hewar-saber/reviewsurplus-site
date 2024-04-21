import { formatDateIntl } from './util'

/**
 * @param {string} name Name of the recepient
 * @param {Date} start Start of the meeting
 * @param {string} timeZone The IANA timeZone for the meeting
 * @returns {string} An HTML confirmation email
 */
export function reminderFirstEmailHTML(
    name: string,
    start: Date,
    timeZone: string
): string {
    const time = formatDateIntl(start, timeZone)
    return `
        <table style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box; border-collapse: separate; border-spacing: 0 10px; max-width: 600px;"><tbody style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family:Roboto, Arial, Helvetica, sans-serif;margin:0;padding:0;box-sizing:border-box;color:#000000;font-size:16px" class="paragraph"><div style="font-size: 16px; font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Dear ${name},</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Our call on ${time} is confirmed. Together, we'll look at your online reputation and discuss potential solutions to get you more 5-star reviews.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Remember: This session is tailored for you. Your participation could set the stage for significant growth.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Looking forward to our session,</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Best,</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Hewar</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">P.S. Any questions before our call? Feel free to reply.</div></div></td></tr><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><img src="" width="1" height="1" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></td></tr></tbody></table>
	`
}

/**
 * @param {string} name Name of the recepient
 * @param {Date} start Start of the meeting
 * @param {string} timeZone The IANA timeZone for the meeting
 * @returns {string} An HTML confirmation email
 */
export function reminder24HourEmailHTML(
    name: string,
    start: Date,
    timeZone: string
): string {
    const time = formatDateIntl(start, timeZone)
    return `
        <table style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box; border-collapse: separate; border-spacing: 0 10px; max-width: 600px;"><tbody style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family:Roboto, Arial, Helvetica, sans-serif;margin:0;padding:0;box-sizing:border-box;color:#000000;font-size:16px" class="paragraph"><div style="font-size: 16px; font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">${name},</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Your strategy session is scheduled for tomorrow, ${time}.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Excited to explore actionable strategies to get you more leads with more 5-star reviews.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">P.S. Questions before we talk? I'm here to help. Just reply to this email.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Looking forward to connecting soon,</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Hewar</div></div></td></tr><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><img src="" width="1" height="1" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></td></tr></tbody></table>
	`
}

/**
 * @param {string} name Name of the recepient
 * @returns {string} An HTML confirmation email
 */
export function reminder1HourEmailHTML(name: string): string {
    return `
        <table style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box; border-collapse: separate; border-spacing: 0 10px; max-width: 600px;"><tbody style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family:Roboto, Arial, Helvetica, sans-serif;margin:0;padding:0;box-sizing:border-box;color:#000000;font-size:16px" class="paragraph"><div style="font-size: 16px; font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">${name},</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Your strategy session is in one hour. I'm excited to share insights and strategies to grow your business.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">I'll call you in one hour. Please be ready to dive into a productive conversation. Have any questions? Keep them handy.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">P.S. Any immediate questions? Feel free to reply to this email.</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><br style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Talk to you soon,</div><div style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;">Hewar</div></div></td></tr><tr class="" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><td style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"><img src="" width="1" height="1" style="font-family: Roboto, Arial, Helvetica, sans-serif; margin: 0px; padding: 0px; box-sizing: border-box;"></td></tr></tbody></table>
	`
}

/**
 * Generates a string containing the content of a calendar file for a specified event.
 *
 * @param {string} summary - The title or summary of the event.
 * @param {string} description - A description of the event.
 * @param {Date} startTime - The start time of the event.
 * @param {Date} endTime - The end time of the event.
 * @returns {string} The content of the calendar file for the specified event.
 */
export function generateCalendarFile(
    summary: string,
    description: string,
    startTime: Date,
    endTime: Date
): string {
    const formatDate = (date: Date) =>
        date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const calendarContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${summary}
DTSTART:${formatDate(startTime)}
DTEND:${formatDate(endTime)}
DESCRIPTION:${description}
SEQUENCE:0
STATUS:CONFIRMED
BEGIN:VALARM
TRIGGER:-PT30M
DESCRIPTION:Your appointment is coming up in 30 minutes. Please be ready. I will call you at the agreed in 30 minutes.
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`

    return calendarContent.trim()
}
