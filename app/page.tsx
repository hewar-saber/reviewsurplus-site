'use client'

import Calendar from '@/components/Calender/Calendar'
import styles from './page.module.css'
import { useNotification } from '@/hooks/notification/useNotification'

export default function Page() {
    const { notificationContextHolder, fireNotification } = useNotification()
    return (
        <main className={styles.page}>
            <section className={styles.details}>
                <div className={styles.text}>
                    <h1>Increase Revenue With More 5-Star Reviews.</h1>
                    <p>
                        Increase your revenue easily by collecting more 5-star
                        reviews with our reputation management software. Book a
                        call if you can handle more business.
                    </p>
                </div>
                <img
                    src='/images/landing.png'
                    alt='Illustration of more Google reviews'
                />
            </section>
            <Calendar
                fireNotification={fireNotification}
                description='Fill out the form below to get started. Our team will get back'
            />
            {notificationContextHolder}
        </main>
    )
}
