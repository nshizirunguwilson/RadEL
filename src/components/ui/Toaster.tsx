"use client";

import { FiCheck, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useToastStore, type ToastPayload } from "@/stores/toast";
import { cn } from "@/lib/utils";

function iconFor(tone: ToastPayload["tone"]) {
  switch (tone) {
    case "success":
      return <FiCheck aria-hidden className="h-4 w-4 text-success" />;
    case "error":
      return <FiAlertCircle aria-hidden className="h-4 w-4 text-sale" />;
    default:
      return <FiInfo aria-hidden className="h-4 w-4 text-accent" />;
  }
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2 max-w-[92vw]"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "pointer-events-auto flex min-w-[16rem] max-w-sm items-start gap-3",
              "rounded-md border border-divider bg-bg px-4 py-3.5 shadow-[0_20px_40px_-12px_oklch(15%_0.02_215_/_0.18)]",
            )}
            role="status"
          >
            <div className="mt-0.5 shrink-0">{iconFor(t.tone)}</div>
            <div className="flex-1 text-sm">
              <p className="font-medium text-ink-strong leading-tight">{t.title}</p>
              {t.description ? (
                <p className="text-meta mt-1 leading-snug">{t.description}</p>
              ) : null}
              {t.action ? (
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick();
                    dismiss(t.id);
                  }}
                  className="mt-2 text-xs font-medium text-ink-strong underline underline-offset-4 decoration-accent"
                >
                  {t.action.label}
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-meta hover:text-ink-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <FiX aria-hidden className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
