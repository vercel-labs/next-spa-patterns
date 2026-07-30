import { NextResponse } from 'next/server'
import { getUser } from '@/lib/user'

export async function GET() {
  // Uncached so client revalidation is observable: each request re-runs the
  // read, and `isValidating` stays true while it resolves.
  const user = await getUser()
  return NextResponse.json(user)
}
