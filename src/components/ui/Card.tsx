"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  elevated?: boolean;
}

export function Card({ children, className, hover = false, elevated = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-zinc-100 overflow-hidden",
        hover && "hover-lift cursor-pointer",
        elevated && "shadow-elevated",
        !elevated && !hover && "shadow-subtle",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("px-6 py-5 border-b border-zinc-100", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-zinc-100 bg-zinc-50/50",
        className
      )}
    >
      {children}
    </div>
  );
}
