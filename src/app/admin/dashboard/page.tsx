"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockProducts } from "@/lib/mock-data";
import ProductList from "@/components/admin/ProductList";
import Button from "@/components/ui/Button";
import { Plus, Package, Eye, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useI18n } from "@/lib/i18n";

export default function AdminDashboardPage() {
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

  // Mock stats
  const stats = {
    total: mockProducts.length,
    active: mockProducts.filter((p) => p.status === "active").length,
    featured: mockProducts.filter((p) => p.is_featured).length,
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar user={session.user} />
      <main className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900">{t("admin.dashboard.title")}</h1>
              <p className="text-sm text-zinc-500 mt-1">{t("admin.dashboard.subtitle")}</p>
            </div>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t("admin.dashboard.add")}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card elevated>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-900">{stats.total}</p>
                  <p className="text-sm text-zinc-500">{t("admin.dashboard.stats.total")}</p>
                </div>
              </CardContent>
            </Card>

            <Card elevated>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-900">{stats.active}</p>
                  <p className="text-sm text-zinc-500">{t("admin.dashboard.stats.active")}</p>
                </div>
              </CardContent>
            </Card>

            <Card elevated>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-zinc-600" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-900">{stats.featured}</p>
                  <p className="text-sm text-zinc-500">{t("admin.dashboard.stats.featured")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">{t("admin.dashboard.recent")}</h2>
            </div>
            <ProductList products={mockProducts} />
          </div>
        </div>
      </main>
    </div>
  );
}
