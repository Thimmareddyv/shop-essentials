import type { Product } from "@/context/CartContext";

const API_URL = "https://dummyjson.com/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}?limit=100`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = (await res.json()) as { products: Product[] };
  return data.products;
}

export async function fetchProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${API_URL}/${id}`);
  if (res.status === 404) throw new Error("Product not found");
  if (!res.ok) throw new Error("Failed to fetch product");
  return (await res.json()) as Product;
}
