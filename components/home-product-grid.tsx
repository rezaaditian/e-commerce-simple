import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";

const ROWS = 4;
const COLS_LG = 1;
const PRODUCT_COUNT = ROWS * COLS_LG; // 16

export async function HomeProductGrid() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
    sortKey: "BEST_SELLING",
  });
  const items = (products ?? []).slice(0, PRODUCT_COUNT);

  if (!items.length) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
        Featured Products
      </h2>
      <Grid className="grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              className="relative block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              />
            </Link>
          </Grid.Item>
        ))}
      </Grid>
    </section>
  );
}
