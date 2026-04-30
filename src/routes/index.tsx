import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { fetchProducts } from "@/lib/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shop all products — Minimal.store" },
      {
        name: "description",
        content:
          "Browse our full catalog of products. Search, filter, and add items to your cart.",
      },
      { property: "og:title", content: "Shop all products — Minimal.store" },
      {
        property: "og:description",
        content: "Browse our full catalog of products.",
      },
    ],
  }),
  loader: () => fetchProducts(),
  staleTime: 60_000,
  pendingComponent: () => (
    <>
      <Header showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ProductGrid products={[]} loading />
      </main>
    </>
  ),
  errorComponent: ({ error }) => (
    <>
      <Header showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          Couldn't load products
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </main>
    </>
  ),
  component: Index,
});

function Index() {
  const products = Route.useLoaderData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q),
    );
  }, [search, products]);

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            All products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>
        </div>
        <ProductGrid products={filtered} />
      </main>
    </>
  );
}
