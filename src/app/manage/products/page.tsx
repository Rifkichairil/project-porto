"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product, Category } from "@/types";
import ProductList from "@/components/admin/ProductList";
import Button from "@/components/ui/Button";
import { Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useI18n();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter & Pagination states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/manage");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("/api/products?admin=true"),
          fetch("/api/categories"),
        ]);
        
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  // Filter products by category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category_id === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filter changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar user={session.user} />
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">{t("admin.sidebar.products")}</h1>
              <p className="text-sm text-zinc-500 mt-1">
                {t("admin.filter.productsFound").replace("{count}", String(filteredProducts.length))}
              </p>
            </div>
            <Link href="/manage/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t("admin.dashboard.add")}
              </Button>
            </Link>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Filter className="w-4 h-4" />
              <span>{t("products.filter.all")}:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => handleCategoryChange("all")}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                  selectedCategory === "all"
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                )}
              >
                {t("admin.filter.allCategories")}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors",
                    selectedCategory === category.id
                      ? "bg-zinc-900 text-white"
                      : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products List */}
          <ProductList products={paginatedProducts} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
              <p className="text-sm text-zinc-500">
                {t("admin.pagination.showing")
                  .replace("{start}", String(startIndex + 1))
                  .replace("{end}", String(Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)))
                  .replace("{total}", String(filteredProducts.length))}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "p-2 rounded-lg border transition-colors",
                    currentPage === 1
                      ? "border-zinc-100 text-zinc-300 cursor-not-allowed"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 text-sm font-medium rounded-lg transition-colors",
                        currentPage === page
                          ? "bg-zinc-900 text-white"
                          : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "p-2 rounded-lg border transition-colors",
                    currentPage === totalPages
                      ? "border-zinc-100 text-zinc-300 cursor-not-allowed"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
