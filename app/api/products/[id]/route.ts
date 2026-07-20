import { NextResponse } from 'next/server'
import { getProduct } from '@/lib/products'

export async function GET(
  _request: Request,
  { params }: RouteContext<'/api/products/[id]'>,
) {
  const { id } = await params
  const product = await getProduct(Number(id))
  return NextResponse.json(product)
}
