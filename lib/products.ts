export type Product = { id: number; name: string; price: number }

const PRODUCTS: Product[] = [
  { id: 1, name: 'Keyboard', price: 80 },
  { id: 2, name: 'Monitor', price: 320 },
  { id: 3, name: 'Mouse', price: 40 },
  { id: 4, name: 'Webcam', price: 120 },
]

export type SortOrder = 'asc' | 'desc'

export async function getProducts(sort: SortOrder = 'asc'): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return sortProducts(PRODUCTS, sort)
}

export async function getProduct(id: number): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return PRODUCTS.find((product) => product.id === id)
}

export function sortProducts(products: Product[], sort: SortOrder): Product[] {
  return [...products].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price,
  )
}
