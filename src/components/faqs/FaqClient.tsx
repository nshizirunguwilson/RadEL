"use client";

import { useMemo, useState } from "react";

import { FAQS, type FaqItem } from "@/data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

type Topic = FaqItem["topic"] | "all";

const TOPIC_ORDER: Topic[] = [
  "all",
  "orders",
  "shipping",
  "returns",
  "materials",
  "sizing",
  "care",
];

const TOPIC_LABELS: Record<Topic, string> = {
  all: "All",
  orders: "Orders",
  shipping: "Shipping",
  returns: "Returns",
  materials: "Materials",
  sizing: "Sizing",
  care: "Care",
};

export function FaqClient() {
  const [topic, setTopic] = useState<Topic>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      if (topic !== "all" && f.topic !== topic) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
      );
    });
  }, [topic, query]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {TOPIC_ORDER.map((tk) => (
          <button
            key={tk}
            type="button"
            onClick={() => setTopic(tk)}
            className={cn(
              "inline-flex items-center rounded-sm border px-3 py-1.5 text-xs",
              topic === tk
                ? "border-ink-strong bg-ink-strong text-bg"
                : "border-divider text-ink hover:border-ink-strong",
            )}
          >
            {TOPIC_LABELS[tk]}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the FAQ…"
        className="w-full h-11 bg-bg border border-divider px-4 text-sm text-ink-strong rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-meta">
          No answers match — try a broader word.
        </p>
      ) : (
        <Accordion type="single" collapsible className="mt-8 divide-y divide-divider border-y border-divider">
          {filtered.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="font-display text-lg text-ink-strong">
                {f.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm leading-relaxed text-ink">{f.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  );
}
