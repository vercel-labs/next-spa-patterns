"use client";

import { Suspense, useState } from "react";
import useSWR from "swr";
import type { Product } from "@/lib/products";

async function fetcher(url: string): Promise<Product[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
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
  const {
    data = [],
    error,
    isLoading,
  } = useSWR<Product[]>(
    query ? `/api/products?query=${encodeURIComponent(query)}` : null,
    fetcher,
  );

  return (
    <SearchPanel label="useSWR" query={query} setQuery={setQuery}>
      {error ? (
        <p className="mt-3 text-sm text-red-600">Failed to load products.</p>
      ) : isLoading ? (
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
    <SearchPanel label="useSWR with Suspense" query={query} setQuery={setQuery}>
      {query ? (
        <Suspense
          fallback={<p className="mt-3 text-sm text-zinc-500">Loading...</p>}
        >
          <SuspenseProductResults query={query} />
        </Suspense>
      ) : null}
    </SearchPanel>
  );
}

function SuspenseProductResults({ query }: { query: string }) {
  const { data } = useSWR(
    `/api/products?query=${encodeURIComponent(query)}`,
    fetcher,
    { suspense: true },
  );

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
