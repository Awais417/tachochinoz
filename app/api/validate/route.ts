// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    // Verify the webhook secret
    const secret = request.nextUrl.searchParams.get('secret')
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the entire site (or specific paths)
    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, now: Date.now() })
}

//