import { NextResponse } from 'next/server'
import { getUser } from '@/lib/user'

// Client fetcher target. SWR and React Query use this to revalidate on the
// client after hydration, and it's what a mismatched key falls back to fetching.
export async function GET() {
  const user = await getUser()
  return NextResponse.json(user)
}
