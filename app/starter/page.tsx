'use client'
import { useNotification } from '@/hooks/notification/useNotification'
import styles from './Starter.module.css'
import Calendar from '@/components/Calender/Calendar'
import CTA from '@/components/CTA/CTA'

export default function Page() {
    const { notificationContextHolder, fireNotification } = useNotification()

    return (
        <main className={styles.page}>
            <section className={styles.details}>
                <div className={styles.text}>
                    <h1>More Clients?</h1>
                    <ul>
                        <li>No upfront or monthly fees; pay per new client.</li>
                        <li>Includes a lead-optimized website.</li>
                        <li>
                            Gain 30+ five-star Google reviews. from your
                            clients.
                        </li>
                    </ul>
                    <img
                        src='/images/smallbusiness.webp'
                        alt='Small Business'
                    />
                </div>
                <CTA />
            </section>
            <Calendar
                fireNotification={fireNotification}
                description='Fill out the form to book a call with our team. We will disucss whether this software is a good fit for your business.'
            />
            {notificationContextHolder}
        </main>
    )
}
