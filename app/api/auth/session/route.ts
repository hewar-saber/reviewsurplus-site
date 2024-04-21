import { Session } from '@/types'
import { sessionOptions } from '@/util/server'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
    const session = await getIronSession<Session>(cookies(), sessionOptions)

    if ('CSRFToken' in session) {
        return NextResponse.json(session, { status: 200 })
    }

    ;(session as any).CSRFToken = crypto.randomUUID()
    await (session as any).save()

    return NextResponse.json(session, { status: 200 })
}
