'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './Calendar.module.css'
import React from 'react'
import { Slot, TimeSlot } from '@/types'
import Input from '../Input/Input'
import Button from '../button/Button'
import { NotificationOptions } from '@/hooks/notification/useNotification'
import useInputScroll from '@/hooks/inputScroll/useInputScroll'
import { delay, getCsrfToken } from '@/util/util'
import ReCAPTCHA from 'react-google-recaptcha'
import dayjs from 'dayjs'
import { API_URLS } from '@/util/constants'

const daysOfTheWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

type TimeSlotResponse = {
    start: string
    end: string
}

type Values = {
    company: string
    firstName: string
    email: string
    phone: string
}

type Messages = Partial<Values> & {
    slot?: string
}

type RequestBody = Omit<Slot, 'start' | 'end'> & {
    start: string
    end: string
    captcha: string
}

async function fetchDaysWithSlots(): Promise<number[]> {
    const response = await fetch(`/api/booking/days`, {
        cache: 'no-store'
    })
    if (!response.ok) throw new Error('Unable to get available dates')
    return (await response.json()) as number[]
}

enum Steps {
    EnterDetails,
    ChooseDay,
    ChooseTime,
    Confirmation
}
async function fetchSlots(date: Date) {
    const response = await fetch(`/api/booking/${date.toISOString()}/slots`, {
        cache: 'no-store'
    })
    if (!response.ok) throw new Error('Unable to get available dates')
    return (await response.json()) as TimeSlotResponse[]
}

const formatTime = (date: Date | null) =>
    date ? dayjs(date).format('HH:mm') : ''

enum LoadingSections {
    Days,
    Remarketing,
    Booking,
    Slots,
    All
}
export default function Calendar({
    fireNotification,
    description
}: {
    fireNotification: (options: NotificationOptions) => void
    description: string
}): React.JSX.Element {
    const [step, setStep] = useState<Steps>(Steps.EnterDetails)
    const [chosenDate, setChosenDate] = useState<Date>(new Date())

    const csrfToken = useRef<string | undefined>(undefined)

    const [chosenTimeSlot, setChosenTimeSlot] = useState<{
        start: Date | null
        end: Date | null
    }>({
        start: null,
        end: null
    })

    const captchaRef = useRef<ReCAPTCHA>(null)

    const [loading, setLoading] = useState<LoadingSections | null>(null)

    const [dates, setDates] = useState<Date[]>(getDaysInMonth(chosenDate))
    const [slots, setSlots] = useState<TimeSlot[]>([])

    const slotErrorRef = useRef<HTMLDivElement>(null)

    const [values, setValues] = useState<Values>({
        company: '',
        firstName: '',
        email: '',
        phone: ''
    })

    const { scrollElement } = useInputScroll()
    const [messages, setMessages] = useState<Messages>({})

    const [daysWithSlots, setDaysWithSlots] = useState<number[]>([])

    const getCsrf = async () => {
        const token = await getCsrfToken()
        csrfToken.current = token
    }

    const updateDaysWithSlots = async () => {
        if (loading === LoadingSections.Days) return
        setLoading(LoadingSections.Days)
        try {
            const slots = await fetchDaysWithSlots()
            setDaysWithSlots(slots)
        } catch {
            fireNotification({
                message: 'Something went wrong!',
                description:
                    "Couldn't fetch time slots due to a server error. Please try again.",
                error: true
            })
        } finally {
            setLoading(null)
        }
    }

    const reset = () => {
        const date = new Date()
        setChosenDate(date)
        setDates(getDaysInMonth(date))
        setSlots([])
        setStep(Steps.ChooseDay)
    }

    const bookCall = async () => {
        if (loading === LoadingSections.Booking) return
        setLoading(() => LoadingSections.Booking)
        setMessages({})
        if (!captchaRef.current?.getValue()) {
            fireNotification({
                message: 'Please complete the captcha.',
                description: 'Please complete the captcha to proceed.',
                error: true
            })
            return
        }

        await delay()
        const body: RequestBody = {
            ...values,
            start: chosenTimeSlot.start?.toISOString() ?? '',
            end: chosenTimeSlot.end?.toISOString() ?? '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            captcha: captchaRef.current?.getValue() ?? ''
        }
        try {
            const response = await fetch(`${API_URLS.BOOKING}`, {
                method: 'POST',
                body: JSON.stringify(body)
            })
            if (response.ok) {
                fireNotification({
                    message: 'Call booked successfully.',
                    description:
                        'The call has successfully been booked. Check your email for the date and link of the call.',
                    error: false
                })
                setValues({
                    company: '',
                    firstName: '',
                    email: '',
                    phone: ''
                })
                reset()
                return
            }
            const json = await response.json()
            setMessages(json)
            if (json?.slot) {
                setStep(Steps.ChooseTime)
                return
            }

            if (json.message) {
                fireNotification({
                    message: json.message,
                    description: "Couldn't book the call. Please try again.",
                    error: true
                })
                return
            }

            scrollElement(slotErrorRef.current!)
            setStep(Steps.EnterDetails)
            if (response.status >= 500) throw new Error()
        } catch {
            fireNotification({
                message: 'Something went wrong!',
                description:
                    'The call could not be booked because of a server error. Please try again or use the contact form.',
                error: true
            })
        } finally {
            setLoading(null)
        }
    }

    const submitDay = async (date: Date) => {
        if (loading === LoadingSections.Slots) return
        setLoading(() => LoadingSections.Slots)

        try {
            const slots = await fetchSlots(date)
            setStep(Steps.ChooseTime)
            setChosenDate(date)

            setSlots(() => {
                return slots.map(({ start, end }) => ({
                    start: new Date(start),
                    end: new Date(end)
                }))
            })
        } catch {
            fireNotification({
                message: 'Something went wrong!',
                description:
                    "Couldn't fetch time slots due to a server error. Please try again.",
                error: true
            })
        } finally {
            setLoading(() => null)
        }
    }

    const sendDataToRemarketing = async () => {
        if (loading === LoadingSections.Remarketing) return
        setLoading(() => LoadingSections.Remarketing)

        try {
            const response = await fetch(API_URLS.REMARKETING, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${csrfToken.current}`
                }
            })
            if (!response.ok) {
                const data = await response.json()
                setMessages(data)
                fireNotification({
                    message: data.message ?? 'Something went wrong!',
                    description:
                        'Something went wrong. Please try again later.',
                    error: true
                })
                return
            }

            setMessages({})
            setStep(Steps.ChooseDay)
        } catch (error) {
            fireNotification({
                message: 'Something went wrong!',
                description: 'Something went wrong. Please try again later.',
                error: true
            })
        } finally {
            setLoading(() => null)
        }
    }

    useEffect(() => {
        getCsrf()
        updateDaysWithSlots()
    }, [])

    const title = {
        [Steps.EnterDetails]: 'Enter your details',
        [Steps.ChooseDay]: 'Choose a day',
        [Steps.ChooseTime]: 'Choose a time',
        [Steps.Confirmation]: 'Confirm your details'
    }[step]

    const formattedDate =
        step === Steps.ChooseDay
            ? dayjs(chosenDate).format('MMMM, YYYY')
            : dayjs(chosenDate).format('MMMM D, YYYY')

    const handleSubmit = {
        [Steps.EnterDetails]: sendDataToRemarketing,
        [Steps.ChooseDay]: () => {},
        [Steps.ChooseTime]: () => {
            setStep(Steps.Confirmation)
        },
        [Steps.Confirmation]: bookCall
    }[step]

    const isFullscreenLoading =
        loading === LoadingSections.All ||
        (loading === LoadingSections.Days && step !== Steps.EnterDetails) ||
        loading === LoadingSections.Slots

    return (
        <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                if (step === Steps.ChooseTime || step === Steps.ChooseDay) {
                    return
                }
                handleSubmit()
            }}
            className={`${styles.calendarContainer} ${
                isFullscreenLoading ? styles.loading : ''
            }`}
        >
            <div className={styles.header}>
                <b>{title}</b>
                <p>{description}</p>
            </div>
            {step !== Steps.EnterDetails && (
                <div className={styles.details}>
                    {Object.entries(values).map(([key, value]) => {
                        return (
                            <div key={key} className={styles.row}>
                                <b>{key}</b>
                                <span>{value}</span>
                            </div>
                        )
                    })}
                    <div className={styles.row}>
                        <b>Date</b>
                        <span>{formattedDate}</span>
                    </div>
                    {Boolean(chosenTimeSlot.start) &&
                        Boolean(chosenTimeSlot.end) && (
                            <div className={styles.row}>
                                <b>Time</b>
                                <span>
                                    {step > Steps.ChooseDay &&
                                        `From ${formatTime(
                                            chosenTimeSlot.start
                                        )} to ${formatTime(
                                            chosenTimeSlot.end
                                        )}`}
                                </span>
                            </div>
                        )}
                </div>
            )}
            {step === Steps.EnterDetails && (
                <div className={styles.inputs}>
                    <div className={styles.flex}>
                        <Input
                            values={values}
                            setValues={setValues}
                            messages={messages}
                            setMessages={setMessages}
                            id='firstName'
                            placeholder='First Name'
                        />
                        <Input
                            values={values}
                            setValues={setValues}
                            messages={messages}
                            setMessages={setMessages}
                            id='company'
                            placeholder='Company'
                        />
                    </div>

                    <Input
                        values={values}
                        setValues={setValues}
                        messages={messages}
                        setMessages={setMessages}
                        id='email'
                        placeholder='Email'
                    />

                    <Input
                        values={values}
                        setValues={setValues}
                        messages={messages}
                        setMessages={setMessages}
                        id='phone'
                        placeholder='Phone (Include country code)'
                    />
                </div>
            )}
            {step === Steps.ChooseDay && (
                <>
                    <div className={`${styles.calendar}`}>
                        {daysOfTheWeek.map(value => {
                            return (
                                <div className={styles.days} key={value}>
                                    {value}
                                </div>
                            )
                        })}
                        {Array.from({
                            length: ((dates?.[0]?.getDay() ?? 1) + 6) % 7
                        }).map((value, index) => {
                            return (
                                <div
                                    className={`${styles.day} ${styles.emptyCell}`}
                                    key={`empty-${index}-${chosenDate.getMonth()}`}
                                ></div>
                            )
                        })}
                        {dates?.map(date => {
                            const isAvailable = daysWithSlots.some(time => {
                                const availableDate = new Date(time)
                                return datesEqual(availableDate, date)
                            })
                            return (
                                <button
                                    className={`${styles.day} ${
                                        isAvailable ? styles.available : ''
                                    }`}
                                    key={`${date.toISOString()}`}
                                    type={isAvailable ? 'submit' : 'button'}
                                    value={date.toISOString()}
                                    disabled={!isAvailable}
                                    onClick={e => {
                                        e.preventDefault()
                                        submitDay(date)
                                    }}
                                >
                                    {date.getDate()}
                                </button>
                            )
                        })}
                        {!dates?.length &&
                            Array.from({ length: 30 }).map((value, index) => {
                                return (
                                    <button
                                        className={`${styles.day} ${styles.emptyCell}`}
                                        key={`empty-${index}`}
                                        type='button'
                                    ></button>
                                )
                            })}
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className={`${styles.back} ${styles.button}`}
                            onClick={() => {
                                setChosenDate(prevDate => {
                                    const now = new Date()
                                    const date = new Date(prevDate)
                                    date.setMonth(date.getMonth() - 1)

                                    if (
                                        isFirstDateGreaterThanSecond(now, date)
                                    ) {
                                        console.log(
                                            "This one right here ain't it"
                                        )
                                        return prevDate
                                    }
                                    setDates(() => {
                                        const days = getDaysInMonth(date)
                                        return days
                                    })

                                    return date
                                })
                            }}
                            aria-label='Back'
                            type='button'
                        />
                        <button
                            className={`${styles.forward} ${styles.button}`}
                            onClick={() => {
                                setChosenDate(prevDate => {
                                    const date = new Date(prevDate)
                                    date.setDate(1)
                                    date.setMonth(prevDate.getMonth() + 1)
                                    setDates(() => {
                                        const days = getDaysInMonth(date)
                                        return days
                                    })
                                    return date
                                })
                            }}
                            aria-label='Next'
                            type='button'
                        />
                    </div>
                </>
            )}
            {step === Steps.ChooseTime && (
                <div className={styles.datePicker}>
                    {slots.map(({ start, end }) => {
                        const startHours = String(start.getHours()).padStart(
                            2,
                            '0'
                        )
                        const startMinutes = String(
                            start.getMinutes()
                        ).padStart(2, '0')

                        const endHours = String(end.getHours()).padStart(2, '0')
                        const endMinutes = String(end.getMinutes()).padStart(
                            2,
                            '0'
                        )

                        return (
                            <button
                                className={styles.date}
                                key={start.toISOString()}
                                onClick={e => {
                                    e.preventDefault()
                                    setStep(Steps.Confirmation)
                                    setMessages(messages => ({
                                        ...messages,
                                        slot: ''
                                    }))
                                    setChosenTimeSlot(() => ({
                                        start,
                                        end
                                    }))
                                }}
                            >
                                {startHours}:{startMinutes} - {endHours}:
                                {endMinutes}
                            </button>
                        )
                    })}
                    {messages.slot && (
                        <div
                            className='error'
                            style={{
                                gridColumn: '1/-1'
                            }}
                            ref={slotErrorRef}
                        >
                            {messages.slot ?? ''}
                        </div>
                    )}
                </div>
            )}
            {step === Steps.Confirmation && (
                <div className={styles.confirmation}>
                    <ReCAPTCHA
                        sitekey={process.env.RECAPTCHA_SITE_KEY}
                        ref={captchaRef}
                    />
                </div>
            )}
            <div className={styles.footer}>
                <Button
                    type='SECONDARY'
                    onClick={() => {
                        if (step > 0) {
                            setStep(step => step - 1)
                        }
                    }}
                    aria-label='Back'
                    disabled={step === Steps.EnterDetails}
                >
                    Back
                </Button>
                <Button
                    type='PRIMARY'
                    aria-label='Submit'
                    onClick={e => {
                        if (
                            step === Steps.ChooseDay ||
                            step === Steps.ChooseTime
                        ) {
                            e.preventDefault()
                        }
                    }}
                    loading={
                        loading === LoadingSections.Booking ||
                        loading === LoadingSections.Remarketing
                    }
                >
                    {step === Steps.Confirmation ? 'Submit' : 'Next'}
                </Button>
            </div>
        </form>
    )
}
/**
 * Gets the days in a given month
 * @param {Date} chosenDate A date object
 * @returns {Array<Date>} An array of days in a given month
 */
function getDaysInMonth(chosenDate: Date): Date[] {
    const month = chosenDate.getMonth()
    const date = new Date(chosenDate.getFullYear(), month, 1)
    const days: Date[] = []
    const nextMonth = (month + 1) % 12
    while (date.getMonth() !== nextMonth) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return days
}

/**
 * Checks if the first Date object is greater than the second based on their year, month, and day.
 *
 * @param {Date} dateOne - The first Date object.
 * @param {Date} dateTwo - The second Date object.
 * @returns {boolean} - Returns true if dateOne is greater than dateTwo, otherwise returns false.
 */
function isFirstDateGreaterThanSecond(dateOne: Date, dateTwo: Date): boolean {
    const yearOne = dateOne.getFullYear()
    const monthOne = dateOne.getMonth()

    const yearTwo = dateTwo.getFullYear()
    const monthTwo = dateTwo.getMonth()

    if (yearOne > yearTwo) return true
    if (yearOne < yearTwo) return false

    if (monthOne > monthTwo) return true
    if (monthOne < monthTwo) return false

    return false
}

/**
 * Compares the UTC year, month, and day of two dates to check if they are equal.
 *
 * @param dateOne - The first date to compare.
 * @param dateTwo - The second date to compare.
 * @returns True if the UTC year, month, and day are equal, false otherwise.
 */
function datesEqual(dateOne: Date, dateTwo: Date): boolean {
    const utcYearOne = dateOne.getFullYear()
    const utcMonthOne = dateOne.getMonth()
    const utcDateOne = dateOne.getDate()

    const utcYearTwo = dateTwo.getFullYear()
    const utcMonthTwo = dateTwo.getMonth()
    const utcDateTwo = dateTwo.getDate()
    return (
        utcYearOne === utcYearTwo &&
        utcMonthOne === utcMonthTwo &&
        utcDateOne === utcDateTwo
    )
}
