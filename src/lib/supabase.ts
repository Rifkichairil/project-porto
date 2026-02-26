import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import { Product, Category } from "@/types";
import { mockProducts, mockCategories } from "./mock-data";

// Check if Supabase is properly configured with valid credentials
const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Check if URL and key exist and are not placeholder values
  if (!url || !key) return false;
  if (url.includes("your_") || key.includes("your_")) return false;
  if (url === "https://example.supabase.co") return false;
  
  return true;
};

// Browser client for client-side operations
export const createClientBrowser = () => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured. Using mock data.");
    return {} as any;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// Server client for server-side operations
export const createClientServer = () => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured. Using mock data.");
    return {} as any;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );
};

// Admin client with service role for admin operations
export const createClientAdmin = () => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured. Using mock data.");
    return {} as any;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );
};

// Database Functions with fallback to mock data
export async function getProducts(
  categorySlug?: string,
  featured?: boolean
): Promise<Product[]> {
  // Always use mock data if Supabase is not properly configured
  if (!isSupabaseConfigured()) {
    console.log("Using mock products data");
    let products = [...mockProducts];
    if (categorySlug) {
      products = products.filter((p) => p.category?.slug === categorySlug);
    }
    if (featured) {
      products = products.filter((p) => p.is_featured);
    }
    return products.filter((p) => p.status === "active");
  }

  try {
    const supabase = createClientServer();

    let query = supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (categorySlug) {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug)
        .single();

      if (category) {
        query = query.eq("category_id", category.id);
      }
    }

    if (featured) {
      query = query.eq("is_featured", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      // Fallback to mock data on error
      return mockProducts;
    }

    // If no data returned, use mock data
    if (!data || data.length === 0) {
      console.log("No products from Supabase, using mock data");
      return mockProducts;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getProducts:", error);
    // Fallback to mock data on any error
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return mockProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const supabase = createClientServer();

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      // Fallback to mock data
      return mockProducts.find((p) => p.slug === slug) || null;
    }

    return data;
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    return mockProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) {
    return mockCategories;
  }

  try {
    const supabase = createClientServer();

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) {
      console.log("Using mock categories data");
      return mockCategories;
    }

    return data || [];
  } catch (error) {
    console.error("Error in getCategories:", error);
    return mockCategories;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts(undefined, true);
}
