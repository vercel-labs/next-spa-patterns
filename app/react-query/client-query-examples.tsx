"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import type { Product } from "@/lib/products";

function searchProducts(query: string): Promise<Product[]> {
  return fetch(`/api/products?query=${encodeURIComponent(query)}`).then((res) =>
    res.json(),
  );
}

function ProductResults({ products }: { products: Product[] }) {
  return (
    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
      {products.map((product) => product.name).join(", ") || "No products"}
    </p>
  );
}

export function ClientQueryExamples() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <InlineProductSearch />
      <SuspenseProductSearch />
    </div>
  );
}

function InlineProductSearch() {
  const [query, setQuery] = useState("");
  const { data = [], error, isPending } = useQuery({
    enabled: query.length > 0,
    queryFn: () => searchProducts(query),
    queryKey: ["product-search", query],
  });

  return (
    <SearchPanel label="useQuery" query={query} setQuery={setQuery}>
      {error ? (
        <p className="mt-3 text-sm text-red-600">Failed to load products.</p>
      ) : isPending && query ? (
        <p className="mt-3 text-sm text-zinc-500">Loading...</p>
      ) : query ? (
        <ProductResults products={data} />
      ) : null}
    </SearchPanel>
  );
}

function SuspenseProductSearch() {
  const [query, setQuery] = useState("");

  return (
    <SearchPanel label="useSuspenseQuery" query={query} setQuery={setQuery}>
      {query ? (
        <Suspense fallback={<p className="mt-3 text-sm text-zinc-500">Loading...</p>}>
          <SuspenseProductResults query={query} />
        </Suspense>
      ) : null}
    </SearchPanel>
  );
}

function SuspenseProductResults({ query }: { query: string }) {
  const { data } = useSuspenseQuery({
    queryFn: () => searchProducts(query),
    queryKey: ["product-search", query],
  });

  return <ProductResults products={data} />;
}

function SearchPanel({
  children,
  label,
  query,
  setQuery,
}: {
  children: React.ReactNode;
  label: string;
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <label className="text-sm font-medium">
        {label}
        <input
          className="mt-2 block w-full rounded border border-zinc-300 bg-transparent px-3 py-2 font-normal dark:border-zinc-700"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          value={query}
        />
      </label>
      {children}
    </div>
  );
}
