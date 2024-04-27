'use client'

import Calendar from '@/components/Calender/Calendar'
import styles from './NichePage.module.css'
import { useNotification } from '@/hooks/notification/useNotification'
import { ReactNode } from 'react'

export default function NichePage({
    title,
    text,
    children
}: {
    title: string
    text: string
    children: ReactNode
}) {
    const { notificationContextHolder, fireNotification } = useNotification()
    return (
        <main className={styles.page}>
            <section className={styles.details}>
                <div className={styles.text}>
                    <h1>{title}</h1>
                    <p>{text}</p>
                </div>
                {children}
            </section>
            <Calendar
                fireNotification={fireNotification}
                description='Fill out the form to book a call with our team. We will disucss whether this software is a good fit for your business.'
            />
            {notificationContextHolder}
        </main>
    )
}
