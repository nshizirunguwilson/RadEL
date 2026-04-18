import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-bg text-ink flex flex-col items-center justify-center p-6 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4">Page not found</h1>
        <p className="mt-6 max-w-md">
          The page you are looking for no longer exists or has been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-11 items-center rounded-sm bg-ink-strong px-6 text-sm font-medium text-bg"
        >
          Return home
        </Link>
      </body>
    </html>
  );
}
