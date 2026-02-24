/**
 * Fake Store API – sumber data produk terbuka (tanpa akun).
 * Dipakai saat Shopify tidak dikonfigurasi.
 * @see https://fakestoreapi.com/docs
 */

import type { Collection, Product } from "lib/shopify/types";

const BASE = "https://fakestoreapi.com";

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

function slugFromCategory(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/['']/g, "");
}

function categoryFromSlug(slug: string): string {
  const map: Record<string, string> = {
    electronics: "electronics",
    gaming: "gaming", // virtual category
    jewelery: "jewelery",
    "mens-clothing": "men's clothing",
    "women-clothing": "women's clothing",
  };
  return map[slug] ?? slug;
}

/** Kata kunci untuk kategori virtual "Gaming" (elektronik + perangkat gaming). */
const GAMING_KEYWORDS = [
  "gaming",
  "monitor",
  "mouse",
  "keyboard",
  "laptop",
  "led",
  "ssd",
  "portable",
  "headphones",
  "in-ear",
];

function isGamingProduct(title: string): boolean {
  const lower = title.toLowerCase();
  return GAMING_KEYWORDS.some((k) => lower.includes(k));
}

function mapToProduct(p: FakeStoreProduct): Product {
  const handle = String(p.id);
  const amount = p.price.toFixed(2);
  const money = { amount, currencyCode: "USD" as const };
  const image = {
    url: p.image,
    altText: p.title,
    width: 0,
    height: 0,
  };
  return {
    id: handle,
    handle,
    availableForSale: true,
    title: p.title,
    description: p.description,
    descriptionHtml: `<p>${p.description}</p>`,
    options: [],
    priceRange: {
      minVariantPrice: money,
      maxVariantPrice: money,
    },
    variants: [
      {
        id: handle,
        title: "Default",
        availableForSale: true,
        selectedOptions: [],
        price: money,
      },
    ],
    featuredImage: image,
    images: [image],
    seo: { title: p.title, description: p.description },
    tags: [p.category],
    updatedAt: new Date().toISOString(),
  };
}

async function fetchProducts(): Promise<FakeStoreProduct[]> {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error(`Fake Store API error: ${res.status}`);
  return res.json();
}

async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) return [];
  return res.json();
}

export async function getFakeStoreProducts(opts?: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const raw = await fetchProducts();
  let list = raw.map(mapToProduct).filter((p) => p.tags.includes("electronics"));

  if (opts?.query) {
    const q = opts.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (opts?.sortKey === "PRICE") {
    list.sort((a, b) => {
      const aVal = parseFloat(a.priceRange.minVariantPrice.amount);
      const bVal = parseFloat(b.priceRange.minVariantPrice.amount);
      return opts.reverse ? bVal - aVal : aVal - bVal;
    });
  }
  if (opts?.sortKey === "CREATED_AT") {
    list.sort((a, b) => {
      const aVal = new Date(a.updatedAt).getTime();
      const bVal = new Date(b.updatedAt).getTime();
      return opts.reverse ? bVal - aVal : aVal - bVal;
    });
  }

  return list;
}

export async function getFakeStoreProduct(
  handle: string
): Promise<Product | undefined> {
  const id = parseInt(handle, 10);
  if (Number.isNaN(id)) return undefined;
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) return undefined;
  const raw: FakeStoreProduct = await res.json();
  if (raw.category !== "electronics") return undefined;
  return mapToProduct(raw);
}

export async function getFakeStoreCollections(): Promise<Collection[]> {
  const all: Collection = {
    handle: "",
    title: "All",
    description: "Electronics & gaming products",
    seo: { title: "All", description: "Electronics & gaming" },
    path: "/search",
    updatedAt: new Date().toISOString(),
  };
  const electronics: Collection = {
    handle: "electronics",
    title: "Electronics",
    description: "Laptops, monitors, storage & more",
    seo: { title: "Electronics", description: "Electronics products" },
    path: "/search/electronics",
    updatedAt: new Date().toISOString(),
  };
  const gaming: Collection = {
    handle: "gaming",
    title: "Gaming & Tech",
    description: "Gaming monitors, peripherals & devices",
    seo: { title: "Gaming & Tech", description: "Gaming and tech products" },
    path: "/search/gaming",
    updatedAt: new Date().toISOString(),
  };
  return [all, electronics, gaming].filter((c) => !c.handle.startsWith("hidden"));
}

export async function getFakeStoreCollection(
  handle: string
): Promise<Collection | undefined> {
  const collections = await getFakeStoreCollections();
  return collections.find((c) => c.handle === handle);
}

function onlyElectronics(products: Product[]): Product[] {
  return products.filter((p) => p.tags.includes("electronics"));
}

export async function getFakeStoreCollectionProducts(opts: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  const all = await getFakeStoreProducts({ sortKey: opts.sortKey, reverse: opts.reverse });
  const electronicsOnly = onlyElectronics(all);

  if (opts.collection === "hidden-homepage-carousel") {
    return electronicsOnly.slice(0, 5);
  }
  if (opts.collection === "hidden-homepage-featured-items") {
    return electronicsOnly.slice(0, 3);
  }

  const slug = opts.collection;
  if (slug === "electronics") {
    return electronicsOnly;
  }
  if (slug === "gaming") {
    return electronicsOnly.filter((p) => isGamingProduct(p.title));
  }

  const category = categoryFromSlug(slug);
  return all.filter((p) => p.tags.includes(category));
}

/** Rekomendasi sederhana: produk lain dari kategori yang sama. */
export async function getFakeStoreProductRecommendations(
  productId: string
): Promise<Product[]> {
  const all = await getFakeStoreProducts();
  const product = all.find((p) => p.id === productId);
  if (!product) return [];
  const tag = product.tags[0];
  return all.filter((p) => p.id !== productId && p.tags.includes(tag)).slice(0, 4);
}
