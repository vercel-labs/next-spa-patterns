import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query")?.toLowerCase();
  const products = await getProducts();

  return NextResponse.json(
    query
      ? products.filter((product) => product.name.toLowerCase().includes(query))
      : products,
  );
}
