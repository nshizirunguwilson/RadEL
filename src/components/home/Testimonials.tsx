"use client";

import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiStar } from "react-icons/fi";
import { useTranslations } from "next-intl";

import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const t = useTranslations("home.testimonials");
  const [idx, setIdx] = useState(0);
  const current = TESTIMONIALS[idx] ?? TESTIMONIALS[0];

  function prev() {
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setIdx((i) => (i + 1) % TESTIMONIALS.length);
  }

  if (!current) return null;

  return (
    <section className="bg-surface/50 border-y border-divider">
      <div className="container-editorial py-20 text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="mt-3">{t("title")}</h2>

        <div className="mt-12 mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-1 text-accent">
            {Array.from({ length: current.rating }).map((_, i) => (
              <FiStar key={i} aria-hidden className="h-4 w-4 fill-accent" />
            ))}
          </div>
          <blockquote className="mt-6 font-display text-2xl md:text-3xl leading-snug text-ink-strong tracking-[-0.01em]">
            “{current.quote}”
          </blockquote>
          <p className="mt-6 text-sm text-ink">
            <span className="font-medium text-ink-strong">{current.author}</span>
            <span className="text-meta"> · {current.role}, {current.city}</span>
          </p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-divider text-ink-strong hover:bg-bg"
          >
            <FiArrowLeft aria-hidden className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((tm, i) => (
              <button
                key={tm.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === idx ? "bg-ink-strong w-6" : "bg-divider w-1.5",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-divider text-ink-strong hover:bg-bg"
          >
            <FiArrowRight aria-hidden className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
