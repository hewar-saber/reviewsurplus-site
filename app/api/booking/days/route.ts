import { NextResponse } from 'next/server'
import { getDaysWithAvailableSlots } from '../calendar'
import { Connection } from 'mysql2/promise'
import connect from '@/config/db'
import { log } from '@/util/googleCloud'

export const revalidate = 0

export async function GET() {
    let connection: Connection | undefined = undefined
    try {
        connection = await connect()
        const days = await getDaysWithAvailableSlots(connection)
        return new NextResponse(JSON.stringify(days), {
            headers: {
                'Cache-Control': 's-maxage=0, stale-while-revalidate=0'
            }
        })
    } catch (error) {
        await log(error)
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500, statusText: 'Internal Server Error' }
        )
    } finally {
        await connection?.end()
    }
}
