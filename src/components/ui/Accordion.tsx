"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-divider", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 py-5 text-left",
          "font-display text-xl text-ink-strong tracking-[-0.01em]",
          "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "[&[data-state=open]_.plus]:hidden [&[data-state=closed]_.minus]:hidden",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="shrink-0 h-8 w-8 inline-flex items-center justify-center text-ink"
        >
          <FiPlus className="plus" />
          <FiMinus className="minus" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-ink data-[state=closed]:animate-[collapse-up_250ms_cubic-bezier(0.83,0,0.17,1)] data-[state=open]:animate-[collapse-down_250ms_cubic-bezier(0.83,0,0.17,1)]"
      {...props}
    >
      <div className={cn("pb-6 pr-10 text-[15px] leading-relaxed text-ink", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
