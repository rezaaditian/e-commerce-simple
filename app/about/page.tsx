import type { Metadata } from "next";

const { SITE_NAME } = process.env;
const siteName = SITE_NAME || "Store";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteName} – our story, values, and commitment to quality.`,
};

export default function AboutPage() {
  return (
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
          Founded with a simple idea: everyone deserves access to reliable tech
          and great gaming equipment. We source products we trust and stand
          behind what we sell.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-neutral-900 dark:text-white">
          What We Offer
        </h2>
        <p className="leading-relaxed">
          From laptops and monitors to peripherals and accessories, we focus on
          electronics and gaming so you can work, play, and create without
          compromise.
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
  );
}
