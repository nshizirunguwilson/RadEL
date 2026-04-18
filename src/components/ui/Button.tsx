import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-strong text-bg hover:bg-ink border border-ink-strong",
        accent:
          "bg-accent text-accent-ink hover:bg-[oklch(72%_0.16_65)] border border-accent",
        outline:
          "border border-ink-strong text-ink-strong hover:bg-ink-strong hover:text-bg",
        ghost:
          "text-ink-strong hover:bg-surface",
        link:
          "text-ink-strong underline-offset-4 hover:underline decoration-accent",
        subtle:
          "bg-surface text-ink-strong hover:bg-[oklch(90%_0.02_82)] border border-divider",
        destructive:
          "bg-sale text-bg hover:opacity-90 border border-sale",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-sm",
        md: "h-11 px-6 text-sm rounded-sm",
        lg: "h-13 px-8 text-base rounded-sm",
        icon: "h-10 w-10 rounded-sm",
        iconSm: "h-9 w-9 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
