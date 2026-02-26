"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockProducts } from "@/lib/mock-data";
import ProductList from "@/components/admin/ProductList";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useI18n } from "@/lib/i18n";

export default function ProductsPage() {
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
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">{t("admin.sidebar.products")}</h1>
              <p className="text-sm text-zinc-500 mt-1">Kelola semua produk Anda</p>
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t("admin.dashboard.add")}
              </Button>
            </Link>
          </div>

          {/* Products List */}
          <ProductList products={mockProducts} />
        </div>
      </main>
    </div>
  );
}
