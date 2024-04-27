'use client'
import Calendar from '@/components/Calender/Calendar'
import { useNotification } from '@/hooks/notification/useNotification'
import styles from './Booking.module.css'

export default function Booking() {
    const { fireNotification, notificationContextHolder } = useNotification()
    return (
        <main className={styles.booking}>
            <h1>Book a Call</h1>
            <Calendar
                fireNotification={fireNotification}
                description='Book a call to increase your revenue with more 5-star reviews.'
            ></Calendar>
            {notificationContextHolder}
        </main>
    )
}
