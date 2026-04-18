import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      data-invalid={invalid || undefined}
      className={cn(
        "block w-full h-11 px-3.5 text-sm bg-bg text-ink-strong placeholder:text-meta",
        "border border-divider rounded-sm",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-ink-strong",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "data-[invalid=true]:border-sale data-[invalid=true]:focus-visible:ring-sale",
        className,
      )}
      {...props}
    />
  );
}
