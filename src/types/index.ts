export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number | null;
  category_id: string;
  category?: Category;
  images: ProductImage[];
  features: string[];
  tech_stack: string[];
  demo_url: string | null;
  is_featured: boolean;
  status: "active" | "inactive" | "coming_soon";
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string | null;
  order: number;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: "admin" | "user";
  created_at: string;
}

export type ProductFormData = Omit<
  Product,
  "id" | "created_at" | "updated_at" | "category" | "images"
> & {
  images: { url: string; alt: string; order: number }[];
};
