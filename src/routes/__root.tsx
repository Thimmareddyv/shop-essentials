import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { CartSheet } from "@/components/CartSheet";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Minimal.store — Modern E-Commerce" },
      {
        name: "description",
        content:
          "Browse a curated selection of products. Clean, minimal e-commerce demo built with TanStack Start.",
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Minimal.store — Modern E-Commerce" },
      {
        property: "og:description",
        content: "Clean, minimal e-commerce demo with cart and product detail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Minimal.store — Modern E-Commerce" },
      { name: "description", content: "Shop Essentials is a frontend e-commerce application that displays products and allows users to add them to a cart." },
      { property: "og:description", content: "Shop Essentials is a frontend e-commerce application that displays products and allows users to add them to a cart." },
      { name: "twitter:description", content: "Shop Essentials is a frontend e-commerce application that displays products and allows users to add them to a cart." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dda6407-bf1f-4a52-b8de-ded2b1ae8c03/id-preview-cce058bb--6c90a87f-e24f-4f25-b5ae-b2498682f074.lovable.app-1777570968497.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5dda6407-bf1f-4a52-b8de-ded2b1ae8c03/id-preview-cce058bb--6c90a87f-e24f-4f25-b5ae-b2498682f074.lovable.app-1777570968497.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <CartProvider>
      <Outlet />
      <CartSheet />
      <Toaster />
    </CartProvider>
  );
}
