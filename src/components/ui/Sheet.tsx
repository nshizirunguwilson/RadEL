"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetPortal = DialogPrimitive.Portal;

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-ink-strong/55",
        "data-[state=open]:animate-[fade-in_250ms_ease-out]",
        "data-[state=closed]:animate-[fade-in_200ms_ease-out_reverse]",
        className,
      )}
      {...props}
    />
  );
}

const sheetVariants = cva(
  "fixed z-50 bg-bg border-divider shadow-[0_40px_80px_-20px_oklch(15%_0.02_215_/_0.25)] flex flex-col",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 w-full sm:max-w-md border-l data-[state=open]:animate-[slide-in-right_300ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[slide-out-right_250ms_cubic-bezier(0.83,0,0.17,1)]",
        left:
          "inset-y-0 left-0 w-full sm:max-w-md border-r data-[state=open]:animate-[slide-in-left_300ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[slide-out-left_250ms_cubic-bezier(0.83,0,0.17,1)]",
        top:
          "inset-x-0 top-0 border-b data-[state=open]:animate-[fade-in_250ms_ease-out]",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=open]:animate-[fade-in_250ms_ease-out]",
      },
    },
    defaultVariants: { side: "right" },
  },
);

interface SheetContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  hideClose?: boolean;
}

export function SheetContent({
  side,
  className,
  children,
  hideClose,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 h-9 w-9 inline-flex items-center justify-center rounded-sm text-ink hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FiX aria-hidden />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

export function SheetHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 pt-6 pb-4 border-b border-divider", className)}
      {...props}
    />
  );
}

export function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-xl font-display text-ink-strong tracking-[-0.01em]", className)}
      {...props}
    />
  );
}

export function SheetBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)} {...props} />;
}

export function SheetFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-5 border-t border-divider bg-surface/50", className)}
      {...props}
    />
  );
}
