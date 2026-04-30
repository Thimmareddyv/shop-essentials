import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type Product } from "@/context/CartContext";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        to="/product/$id"
        params={{ id: String(product.id) }}
        className="block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          {product.category && (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>
          )}
          <Link
            to="/product/$id"
            params={{ id: String(product.id) }}
            className="mt-1 line-clamp-2 text-sm font-medium text-foreground hover:underline"
          >
            {product.title}
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              toast.success("Added to cart", { description: product.title });
            }}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
