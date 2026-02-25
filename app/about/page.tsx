import type { Metadata } from "next";
import Footer from "components/layout/footer";

const { SITE_NAME } = process.env;
const siteName = SITE_NAME || "Store";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteName} – our story, values, and commitment to quality.`,
};

export default function AboutPage() {
  return (
    <>
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
        About Us
      </h1>

      <div className="space-y-6 text-neutral-600 dark:text-neutral-400">
        <p className="text-lg leading-relaxed">
          Welcome to {siteName}. We are a team passionate about bringing you
          quality electronics and gaming gear at fair prices.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-neutral-900 dark:text-white">
          Our Story
        </h2>
        <p className="leading-relaxed">
          We started with one clear mission: build a place where quality tech is easy to find and safe to buy. No confusing specs, no overpriced gear, no empty promises. Just carefully selected products that meet real performance standards and deliver real value.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-neutral-900 dark:text-white">
          What We Offer
        </h2>
        <p className="leading-relaxed">
          We provide curated electronics and gaming gear designed for productivity and performance. From high-performance laptops and crisp monitors to precision peripherals and essential accessories, every product is chosen to support serious work, competitive play, and creative output.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-neutral-900 dark:text-white">
          Get in Touch
        </h2>
        <p className="leading-relaxed">
          Have questions or feedback? Visit our{" "}
          <a
            href="/contact"
            className="font-medium text-neutral-900 underline underline-offset-4 hover:no-underline dark:text-white"
          >
            Contact
          </a>{" "}
          page – we’d love to hear from you.
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
