import { NextResponse } from 'next/server'
import { getCachedUser } from '@/lib/user'

export async function GET() {
  const user = await getCachedUser()
  return NextResponse.json(user)
}
