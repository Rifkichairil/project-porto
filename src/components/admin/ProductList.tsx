"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, ExternalLink, Star } from "lucide-react";
import { Product } from "@/types";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showToast("Produk berhasil dihapus", "success");
        window.location.reload();
      } else {
        throw new Error("Gagal menghapus produk");
      }
    } catch {
      showToast("Gagal menghapus produk", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">Aktif</span>;
      case "inactive":
        return <span className="px-2 py-0.5 bg-zinc-50 text-zinc-500 text-xs font-medium rounded-full">Nonaktif</span>;
      case "coming_soon":
        return <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">Segera</span>;
      default:
        return <span className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">{status}</span>;
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p className="text-zinc-500 mb-4">Belum ada produk</p>
        <Link href="/manage/products/new">
          <Button>Tambah Produk Pertama</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {products.map((product) => (
        <Card key={product.id} className="group">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="relative w-20 h-20 flex-shrink-0 bg-zinc-100 rounded-xl overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-zinc-900 truncate">
                        {product.name}
                      </h3>
                      {product.is_featured && (
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {product.category?.name}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(product.status)}
                  </div>
                </div>

                <p className="text-sm text-zinc-600 mt-2 line-clamp-1">
                  {product.short_description}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-100">
                  <p className="font-semibold text-zinc-900">
                    {product.price ? formatPrice(product.price) : "Custom"}
                  </p>

                  <div className="flex items-center gap-1">
                    <Link href={`/product/${product.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/manage/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      isLoading={deletingId === product.id}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
