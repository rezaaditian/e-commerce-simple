import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account.",
};

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500";
const labelClass =
  "mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
        Register
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        Create an account to get started.
      </p>

      <form className="space-y-5">
        <div>
          <label htmlFor="register-name" className={labelClass}>
            Name
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-email" className={labelClass}>
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-password" className={labelClass}>
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="register-confirm" className={labelClass}>
            Confirm password
          </label>
          <input
            id="register-confirm"
            type="password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>

        <button
          type="button"
          className="w-full rounded-md bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
        >
          Create account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-neutral-900 underline underline-offset-2 hover:no-underline dark:text-white"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
