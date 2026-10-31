import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
export function Card({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      data-slot="card"
      className={cn(
        "rounded-3xl border border-border bg-card p-7 shadow-card",
        className,
      )}
      {...props}
    />
  );
}
