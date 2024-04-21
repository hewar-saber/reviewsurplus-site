import { Slot } from '@/types'
import { Connection } from 'mysql2/promise'

export async function getFutureSlotsByEmail(
    connection: Connection,
    email: string
): Promise<Slot[]> {
    const sql = `SELECT * FROM slots WHERE email = ? AND start > ?`
    const values = [email, new Date()]
    const [rows] = (await connection.execute(sql, values)) as [Slot[], unknown]
    return rows
}

export async function getSlot(
    id: number,
    connection: Connection
): Promise<Slot> {
    const sql = `SELECT * FROM slots WHERE id = ?`
    const values = [id]
    const [rows] = (await connection.execute(sql, values)) as [Slot[], unknown]
    return rows[0]
}
