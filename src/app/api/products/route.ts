import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createClientAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const supabase = createClientAdmin();

    // Generate slug if not provided
    const slug = body.slug || slugify(body.name);

    // Check if slug already exists
    const { data: existing } = await supabase
      .from("products")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists" },
        { status: 400 }
      );
    }

    // Create product
    const { data: product, error: productError } = await supabase
      .from("products")
      .insert({
        name: body.name,
        slug,
        description: body.description,
        short_description: body.short_description,
        price: body.price,
        category_id: body.category_id,
        features: body.features || [],
        tech_stack: body.tech_stack || [],
        demo_url: body.demo_url,
        is_featured: body.is_featured,
        status: body.status,
      })
      .select()
      .single();

    if (productError) {
      throw productError;
    }

    // Insert images if any
    if (body.images && body.images.length > 0) {
      const { error: imagesError } = await supabase
        .from("product_images")
        .insert(
          body.images.map((img: any, index: number) => ({
            product_id: product.id,
            url: img.url,
            alt: img.alt || body.name,
            order: index,
          }))
        );

      if (imagesError) {
        console.error("Error inserting images:", imagesError);
      }
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const supabase = createClientAdmin();

    let query = supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `);

    if (category) {
      const { data: catData } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", category)
        .single();
      
      if (catData) {
        query = query.eq("category_id", catData.id);
      }
    }

    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    query = query.eq("status", "active");
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
