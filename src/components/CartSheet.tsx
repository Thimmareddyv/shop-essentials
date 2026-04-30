import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    openCart,
    updateQuantity,
    removeItem,
    clear,
    subtotal,
    itemCount,
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? openCart() : closeCart())}>
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Your cart is empty."
              : `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Add some products to get started.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 py-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-foreground hover:bg-accent"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-foreground hover:bg-accent"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border">
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    clear();
                    toast("Cart cleared");
                  }}
                >
                  Clear
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    toast.success("Order placed!", {
                      description: "This is a demo — no payment was processed.",
                    });
                    clear();
                    closeCart();
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
