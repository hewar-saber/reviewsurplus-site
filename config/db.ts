import 'server-only'
import mysql from 'mysql2/promise'

export default async function connect(): Promise<mysql.Connection> {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 3306,
            ssl: {
                rejectUnauthorized:
                    (process.env.NODE_ENV === 'production' || 1) &&
                    process.env.DB_HOST !== 'Localhost'
            },
            timezone: 'Z'
        })
        return connection
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const DUPLICATE_ENTRY_CODE = 1062
