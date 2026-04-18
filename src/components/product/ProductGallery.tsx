"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import type { ProductImage } from "@/types/product";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const current = images[active];
  if (!current) return null;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ x, y });
  }

  return (
    <div className="grid gap-4 md:grid-cols-[88px_1fr]">
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "relative aspect-square w-20 md:w-full overflow-hidden rounded-sm bg-surface transition-opacity",
              i === active
                ? "ring-2 ring-ink-strong ring-offset-2 ring-offset-bg"
                : "opacity-70 hover:opacity-100",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="88px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div
        className="relative aspect-square overflow-hidden rounded-sm bg-surface order-1 md:order-2 cursor-zoom-in"
        onMouseMove={onMove}
        onMouseLeave={() => setZoom(null)}
      >
        <Image
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width:768px) 50vw, 100vw"
          className="object-cover"
          priority
        />
        {zoom ? (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{
              backgroundImage: `url(${current.src})`,
              backgroundSize: "200%",
              backgroundPosition: `${zoom.x}% ${zoom.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
