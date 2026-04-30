## E-Commerce Frontend (DummyJSON)

Port the provided vanilla HTML/CSS/JS demo into this TanStack Start + React + Tailwind project, keeping the same behavior but with a cleaner, modern UI and proper routing.

### Pages & routes

- `/` — Product listing
  - Sticky header: store name, search input, cart button with item count badge
  - Responsive product grid (1 col mobile → 2 → 3 → 4 cols desktop)
  - Each card: thumbnail, title, category, price, "Add to cart" button
  - Loading skeletons while fetching, empty state when search has no matches
  - Client-side search filters by title (and category) as the user types
- `/product/$id` — Product detail
  - Larger image gallery (thumbnails from DummyJSON `images`)
  - Title, brand, category, rating, stock, description, price
  - Quantity selector + Add to cart
  - Back link to listing

### Cart

- Slide-in side sheet from the right (shadcn `Sheet`), opens from header cart button
- Lists items with thumbnail, title, unit price, quantity stepper (− / +), remove button
- Running subtotal and item count
- "Clear cart" and "Checkout" buttons (Checkout shows a toast — no backend)
- Cart state lives in a small React context provider, persisted to `localStorage` so it survives reloads

### Data

- Fetch from `https://dummyjson.com/products?limit=100` for the grid
- Fetch `https://dummyjson.com/products/:id` for the detail page (via route loader so it SSRs)
- No backend, no auth, no database

### Design

- Light minimal theme using existing design tokens (background, foreground, muted, border, primary)
- Generous spacing, rounded cards, subtle borders, hover lift on cards
- Toast notifications (sonner) on add/remove instead of `alert()`
- Fully responsive; header collapses search below title on small screens

### Technical notes

- File-based routes: `src/routes/index.tsx` (replace placeholder), `src/routes/product.$id.tsx`
- Components: `src/components/ProductCard.tsx`, `src/components/ProductGrid.tsx`, `src/components/Header.tsx`, `src/components/CartSheet.tsx`
- Cart context: `src/context/CartContext.tsx` wrapped in `__root.tsx` `RootComponent`
- Reuse shadcn `Button`, `Input`, `Sheet`, `Badge`, `Skeleton`, `Sonner`
- Each route sets its own `head()` metadata (title, description, og tags); detail route derives og:image from product thumbnail
- Both routes implement `errorComponent` and `notFoundComponent`; router already has a default error component
