"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline" | "muted";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  className,
  size = "sm",
}: BadgeProps) {
  const variants = {
    default: "bg-zinc-100 text-zinc-700",
    primary: "bg-zinc-900 text-white",
    secondary: "bg-zinc-200 text-zinc-800",
    outline: "bg-transparent border border-zinc-200 text-zinc-600",
    muted: "bg-zinc-50 text-zinc-500 border border-zinc-100",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
