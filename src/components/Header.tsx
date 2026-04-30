import { Link } from "@tanstack/react-router";
import { ShoppingBag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

export function Header({ search, onSearchChange, showSearch = true }: HeaderProps) {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">
          Minimal<span className="text-muted-foreground">.store</span>
        </Link>

        {showSearch && (
          <div className="relative flex-1 sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search ?? ""}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
              aria-label="Search products"
            />
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={openCart}
          className="relative self-start sm:self-auto"
          aria-label={`Open cart, ${itemCount} items`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="ml-2">Cart</span>
          {itemCount > 0 && (
            <Badge
              className="ml-2 h-5 min-w-5 rounded-full px-1.5 text-xs"
              variant="default"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}
