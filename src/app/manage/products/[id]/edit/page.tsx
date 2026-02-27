"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { useI18n } from "@/lib/i18n";
import { Category, Product } from "@/types";

export default function EditProductPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { t } = useI18n();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/manage");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch("/api/categories"),
        ]);

        if (productRes.ok) {
          const productData = await productRes.json();
          setProduct(productData);
        } else {
          setError("Product not found");
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated" && id) {
      fetchData();
    }
  }, [status, id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">{t("admin.product.edit")}</h1>
        <p className="text-zinc-600 mt-1">
          {t("admin.product.edit.subtitle")}
        </p>
      </div>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
