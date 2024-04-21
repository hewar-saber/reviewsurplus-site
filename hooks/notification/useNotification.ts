'use client'
import { notification } from 'antd'
import './notification.css'

export type NotificationOptions = {
    message: string
    description: string
    error: boolean
}

export const useNotification = () => {
    const [api, notificationContextHolder] = notification.useNotification()

    const fireNotification = ({
        message,
        description,
        error
    }: NotificationOptions) => {
        api.open({
            message,
            description,
            className: 'notification',
            placement: 'topRight',
            style: error
                ? {
                      background:
                          'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(255,255,255,0) 100%)',
                      borderColor: 'var(--error)'
                  }
                : {}
        })
    }

    return {
        notificationContextHolder,
        fireNotification
    } as const
}
