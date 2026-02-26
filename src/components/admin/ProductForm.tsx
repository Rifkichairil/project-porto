"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Category, Product } from "@/types";
import { slugify } from "@/lib/utils";
import { ImageUpload } from "./ImageUpload";
import { useToast } from "@/components/ui/Toast";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  short_description: z.string().min(1, "Deskripsi singkat wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  price: z.string().optional(),
  category_id: z.string().min(1, "Kategori wajib dipilih"),
  demo_url: z.string().optional(),
  status: z.enum(["active", "inactive", "coming_soon"]),
  is_featured: z.boolean(),
  features: z.string(),
  tech_stack: z.string(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ url: string; alt: string; order: number }[]>(
    product?.images.map((img) => ({
      url: img.url,
      alt: img.alt || "",
      order: img.order,
    })) || []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      short_description: product?.short_description || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      category_id: product?.category_id || "",
      demo_url: product?.demo_url || "",
      status: product?.status || "active",
      is_featured: product?.is_featured || false,
      features: product?.features?.join("\n") || "",
      tech_stack: product?.tech_stack?.join("\n") || "",
    },
  });

  const watchName = watch("name");

  const generateSlug = () => {
    if (watchName && !product) {
      setValue("slug", slugify(watchName));
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);

    try {
      const payload = {
        ...data,
        price: data.price ? parseFloat(data.price) : null,
        features: data.features.split("\n").filter((f) => f.trim()),
        tech_stack: data.tech_stack.split("\n").filter((t) => t.trim()),
        images,
      };

      const url = product ? `/api/products/${product.id}` : "/api/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast(
          product ? "Produk berhasil diperbarui" : "Produk berhasil dibuat",
          "success"
        );
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        throw new Error("Gagal menyimpan produk");
      }
    } catch {
      showToast("Gagal menyimpan produk", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const statusOptions = [
    { value: "active", label: "Aktif" },
    { value: "inactive", label: "Nonaktif" },
    { value: "coming_soon", label: "Segera Hadir" },
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-zinc-900">
          {product ? "Edit Produk" : "Produk Baru"}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Nama Produk
              </label>
              <input
                {...register("name")}
                onBlur={generateSlug}
                placeholder="Contoh: Sistem Kasir"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Slug
              </label>
              <input
                {...register("slug")}
                placeholder="sistem-kasir"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Deskripsi Singkat
            </label>
            <input
              {...register("short_description")}
              placeholder="Deskripsi singkat untuk tampilan kartu produk"
            />
            {errors.short_description && (
              <p className="mt-1 text-sm text-red-600">{errors.short_description.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Deskripsi Lengkap
            </label>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="Deskripsi detail produk"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Harga (Rp)
              </label>
              <input
                type="number"
                {...register("price")}
                placeholder="Kosongkan untuk harga custom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Kategori
              </label>
              <select {...register("category_id")}>
                <option value="">Pilih kategori</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
              )}
            </div>
          </div>

          {/* Demo URL */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              URL Demo
            </label>
            <input
              type="url"
              {...register("demo_url")}
              placeholder="https://demo.example.com"
            />
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Status
              </label>
              <select {...register("status")}>
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center h-full pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("is_featured")}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                />
                <span className="text-sm font-medium text-zinc-700">Produk Unggulan</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Fitur (satu per baris)
            </label>
            <textarea
              {...register("features")}
              rows={4}
              placeholder="Fitur 1\nFitur 2\nFitur 3"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Teknologi (satu per baris)
            </label>
            <textarea
              {...register("tech_stack")}
              rows={3}
              placeholder="Laravel\nMySQL\nVue.js"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Gambar Produk
            </label>
            <ImageUpload images={images} onImagesChange={setImages} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-zinc-100">
            <Button type="submit" isLoading={isLoading}>
              {product ? "Perbarui Produk" : "Buat Produk"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push("/admin/dashboard")}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
