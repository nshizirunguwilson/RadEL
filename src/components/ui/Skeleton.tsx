import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden
      className={cn(
        "bg-surface/80 rounded-sm relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-[linear-gradient(90deg,transparent,oklch(92%_0.01_80),transparent)] motion-reduce:before:hidden",
        className,
      )}
      {...props}
    />
  );
}
