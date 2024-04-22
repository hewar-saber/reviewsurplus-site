export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            PORT: string
            CLOUD_TASK_ADMIN: string
            LOGGING_ADMIN: string
            GOOGLE_CLOUD_PROJECT_ID: string
            RECAPTCHA_SITE_KEY: string
            RECAPTCHA_SECRET_KEY: string
            SESSION_PASSWORD: string
            CRM_API_URL: string
            CRM_API_KEY: string
            BOOKING_REMARKETING_LIST_ID: string
            BOOKING_REMARKETING_SEQUENCE_ID: string
            SALES_EMAIL: string
            SALES_EMAIL_PASSWORD: string
            TWILIO_PHONE_NUMBER: string
            TWILIO_ACCOUNT_SID: string
            TWILIO_AUTH_TOKEN: string
            API_URL: string
            GOOGLE_CLOUD_TASK_API_KEY
            EMAIL_SMTP_SERVER: string
        }
    }
}
