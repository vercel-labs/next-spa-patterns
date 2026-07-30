import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/user'

export async function GET() {
  return NextResponse.json(await getCurrentUser())
}
