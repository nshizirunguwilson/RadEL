import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  eyebrow,
  title,
  body,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main
      id="main"
      className="container-editorial py-16 md:py-24 min-h-[70dvh] flex items-center"
    >
      <div className="mx-auto w-full max-w-md">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-ink-strong">
          {title}
        </h1>
        {body ? (
          <p className="mt-3 text-sm text-meta leading-relaxed">{body}</p>
        ) : null}
        <div className="mt-8">{children}</div>
        {footer ? (
          <div className="mt-8 text-sm text-meta text-center">{footer}</div>
        ) : null}
        <p className="mt-12 text-center text-[11px] text-meta max-w-sm mx-auto leading-relaxed">
          <Link href="/about" className="underline underline-offset-4 hover:text-ink-strong">
            Demo storefront
          </Link>{" "}
          — authentication is simulated. No credentials stored or transmitted.
        </p>
      </div>
    </main>
  );
}
