import { getCollectionProducts } from "lib/shopify";
import { BannerCarousel, type BannerSlide } from "components/banner-carousel";

// Dummy promo slides (gambar promo – ganti URL dengan aset nyata nanti)
const PROMO_SLIDES: BannerSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop",
    alt: "Summer sale",
    href: "/search",
    title: "Summer Sale",
    subtitle: "Up to 30% off on selected items",
  },
  {
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    alt: "New arrivals",
    href: "/search?sort=latest-desc",
    title: "New Arrivals",
    subtitle: "Discover the latest products",
  },
];

export async function Banner() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  const productSlides: BannerSlide[] = (products || []).slice(0, 3).map((p) => ({
    src: p.featuredImage?.url ?? "",
    alt: p.title,
    href: `/product/${p.handle}`,
    title: p.title,
    subtitle: p.priceRange?.maxVariantPrice
      ? `$${p.priceRange.maxVariantPrice.amount}`
      : undefined,
  }));

  // Gabung promo di depan, lalu product slides (filter yang punya src)
  const slides: BannerSlide[] = [
    ...PROMO_SLIDES,
    ...productSlides.filter((s) => s.src),
  ].filter((s) => s.src);

  if (!slides.length) {
    // Fallback: hanya promo slides (kalau pakai placeholder yang diizinkan)
    const fallback = PROMO_SLIDES;
    return <BannerCarousel slides={fallback} />;
  }

  return <BannerCarousel slides={slides} />;
}
