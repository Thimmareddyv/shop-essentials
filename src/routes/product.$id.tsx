import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProduct } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => fetchProduct(params.id),
  staleTime: 60_000,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Minimal.store` },
          {
            name: "description",
            content: loaderData.description ?? `Buy ${loaderData.title}`,
          },
          { property: "og:title", content: loaderData.title },
          {
            property: "og:description",
            content: loaderData.description ?? `Buy ${loaderData.title}`,
          },
          { property: "og:image", content: loaderData.thumbnail },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:image", content: loaderData.thumbnail },
        ]
      : [{ title: "Product — Minimal.store" }],
  }),
  pendingComponent: ProductPending,
  errorComponent: ({ error }) => {
    const router = useRouter();
    return (
      <>
        <Header showSearch={false} />
        <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-xl font-semibold text-foreground">
            Product unavailable
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => router.invalidate()}>
              Try again
            </Button>
            <Button asChild>
              <Link to="/">Back to shop</Link>
            </Button>
          </div>
        </main>
      </>
    );
  },
  notFoundComponent: () => (
    <>
      <Header showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-xl font-semibold text-foreground">Product not found</h1>
        <Button asChild className="mt-6">
          <Link to="/">Back to shop</Link>
        </Button>
      </main>
    </>
  ),
  component: ProductDetail,
});

function ProductPending() {
  return (
    <>
      <Header showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </main>
    </>
  );
}

function ProductDetail() {
  const product = Route.useLoaderData();
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const images = product.images?.length ? product.images : [product.thumbnail];
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <>
      <Header showSearch={false} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <img
                src={activeImg}
                alt={product.title}
                className="h-full w-full object-contain p-6"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((src: string) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(src)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted p-1 transition-all ${
                      activeImg === src
                        ? "border-foreground"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {product.category && (
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {product.category}
                {product.brand ? ` · ${product.brand}` : ""}
              </p>
            )}
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {product.title}
            </h1>

            {typeof product.rating === "number" && (
              <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-foreground text-foreground" />
                <span>{product.rating.toFixed(1)}</span>
                {typeof product.stock === "number" && (
                  <span className="ml-3">{product.stock} in stock</span>
                )}
              </div>
            )}

            <p className="mt-4 text-3xl font-semibold text-foreground">
              ${product.price.toFixed(2)}
            </p>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="p-2 text-foreground hover:bg-accent"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-medium">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="p-2 text-foreground hover:bg-accent"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                size="lg"
                onClick={() => {
                  addItem(product, qty);
                  toast.success("Added to cart", {
                    description: `${qty} × ${product.title}`,
                    action: {
                      label: "View",
                      onClick: () => openCart(),
                    },
                  });
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
