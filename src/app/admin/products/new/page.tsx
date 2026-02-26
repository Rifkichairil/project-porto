"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { mockCategories } from "@/lib/mock-data";
import ProductForm from "@/components/admin/ProductForm";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useI18n } from "@/lib/i18n";

export default function NewProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useI18n();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  if (status === "loading") {
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
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">{t("admin.product.new")}</h1>
            <p className="text-zinc-600 mt-1">
              {t("admin.product.new.subtitle")}
            </p>
          </div>
          <ProductForm categories={mockCategories} />
        </div>
      </main>
    </div>
  );
}
