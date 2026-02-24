import Link from "next/link";

import LogoSquare from "components/logo-square";

const { SITE_NAME } = process.env;
const currentYear = new Date().getFullYear();

const footerLinks = {
  shop: [
    { label: "All Products", href: "/search" },
    { label: "New Arrivals", href: "/search?sort=latest-desc" },
    { label: "Best Sellers", href: "/search?sort=trending-desc" },
    { label: "Sale", href: "/search" },
  ],
  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQ", href: "/faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Twitter", href: "#", icon: "twitter" },
];

export default function Footer() {
  const siteName = SITE_NAME || "Store";

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-900 dark:text-white"
            >
              <LogoSquare size="sm" />
              <span className="text-lg font-semibold uppercase tracking-wide">
                {siteName}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
              Quality products, fast delivery. Your one-stop shop for everyday
              essentials and more.
            </p>
            {/* Newsletter placeholder */}
            <div className="mt-6">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Subscribe for updates
              </p>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Get 10% off your first order. (Dummy – form not active.)
              </p>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Help
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.help.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social + divider */}
        {/* <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <div className="flex gap-6">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-neutral-400 transition hover:text-neutral-600 dark:hover:text-neutral-300"
                aria-label={item.label}
              >
                <span className="text-sm">{item.label}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            We accept Visa, Mastercard, PayPal. (Dummy.)
          </p>
        </div> */}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 py-6 dark:border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 sm:flex-row dark:text-neutral-400">
            <p>
              &copy; {currentYear} {siteName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
              <Link
                href="/privacy"
                className="transition hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="transition hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="transition hover:text-neutral-700 dark:hover:text-neutral-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
