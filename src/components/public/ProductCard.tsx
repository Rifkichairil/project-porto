"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0];
  const { t } = useI18n();

  return (
    <Card hover className="h-full flex flex-col group">
      <Link href={`/product/${product.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage.url}
              alt={firstImage.alt || product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/10 transition-colors duration-300" />
          
          {/* Status badge */}
          {product.status === "coming_soon" && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 bg-zinc-900/80 text-white text-xs font-medium rounded-full">
                {t("products.card.comingSoon")}
              </span>
            </div>
          )}
          
          {/* Arrow icon on hover */}
          <div className="absolute top-3 left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-elevated">
            <ArrowUpRight className="w-4 h-4 text-zinc-900" />
          </div>
        </div>
      </Link>

      <CardContent className="flex-1 flex flex-col p-5">
        {/* Category */}
        {product.category && (
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
            {product.category.name}
          </span>
        )}

        {/* Title */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-sm text-zinc-500 line-clamp-2 flex-1 leading-relaxed">
          {product.short_description}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-lg font-semibold text-zinc-900">
            {product.price ? formatPrice(product.price) : (
              <span className="text-sm font-medium text-zinc-500">{t("products.card.priceCustom")}</span>
            )}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors flex items-center gap-1 group/link"
          >
            {t("products.card.detail")}
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
