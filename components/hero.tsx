import Link from "next/link";

const { SITE_NAME } = process.env;

export function Hero() {
  const siteName = SITE_NAME || "Store";

  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-neutral-100 to-neutral-50 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="text-center">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Welcome to{" "}
            <span className="text-teal-600 dark:text-teal-400">{siteName}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400 sm:mt-6">
            Discover quality products for every need. Fast shipping, easy
            returns, and great prices.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            >
              Shop now
            </Link>
            <Link
              href="/search?sort=latest-desc"
              className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              New arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
