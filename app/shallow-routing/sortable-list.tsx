'use client'

import { useSearchParams } from 'next/navigation'
import { sortProducts, type Product, type SortOrder } from '@/lib/products'
import { SortProducts } from './sort-products'

export function SortableList({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const sort = (searchParams.get('sort') as SortOrder) ?? 'asc'
  const sorted = sortProducts(products, sort)

  return (
    <div>
      <SortProducts />
      <ul className="pattern-list">
        {sorted.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span> <span className="muted">${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
