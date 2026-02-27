"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product, Category } from "@/types";
import ProductCard from "./ProductCard";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useI18n();

  // Get featured products (max 6) from various categories for default view
  const getFeaturedProducts = () => {
    const featured = products.filter((p) => p.is_featured && p.status === "active");
    
    // If 6 or less, return all
    if (featured.length <= 6) return featured;
    
    // Try to get products from different categories
    const result: Product[] = [];
    const categoryIds = [...new Set(featured.map((p) => p.category_id))];
    
    // Distribute evenly across categories
    let index = 0;
    while (result.length < 6 && featured.length > 0) {
      const categoryId = categoryIds[index % categoryIds.length];
      const product = featured.find((p) => p.category_id === categoryId && !result.includes(p));
      
      if (product) {
        result.push(product);
      }
      
      index++;
      
      // Break if no more products can be added
      if (index > featured.length * 2) break;
    }
    
    return result.slice(0, 6);
  };

  const filteredProducts = selectedCategory === null
    ? getFeaturedProducts()
    : selectedCategory === "all"
      ? products // Show all products
      : products.filter((p) => p.category?.slug === selectedCategory);

  return (
    <section id="products" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
              {t("products.section")}
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
              {t("products.title")}
            </h2>
            <p className="mt-3 text-zinc-500">
              {t("products.subtitle")}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === null
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              )}
            >
              {t("products.filter.featured")}
            </button>
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                selectedCategory === "all"
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              )}
            >
              {t("products.filter.all")}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  selectedCategory === category.slug
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Count & View All */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {selectedCategory === null 
              ? `Menampilkan ${filteredProducts.length} produk unggulan`
              : `Menampilkan ${filteredProducts.length} produk`
            }
          </p>
          {(selectedCategory === null) && products.filter(p => p.is_featured).length > 6 && (
            <button
              onClick={() => setSelectedCategory("all")}
              className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
            >
              Lihat Semua Produk →
            </button>
          )}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "featured"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-zinc-400">{t("products.empty")}</p>
          </div>
        )}
      </div>
    </section>
  );
}
