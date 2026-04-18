import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[11px] font-medium tracking-[0.12em] uppercase",
  {
    variants: {
      tone: {
        accent: "bg-accent text-accent-ink",
        ink: "bg-ink-strong text-bg",
        outline: "border border-ink-strong text-ink-strong bg-transparent",
        surface: "bg-surface text-ink-strong",
        sale: "bg-sale text-bg",
        success: "bg-success text-bg",
      },
    },
    defaultVariants: { tone: "accent" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, className }))} {...props} />;
}
