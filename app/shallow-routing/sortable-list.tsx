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
      <ul className="mt-4 grid gap-2">
        {sorted.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
          >
            <span>{product.name}</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
