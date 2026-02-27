import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createClientAdmin } from "@/lib/supabase";
import { mockProducts } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createClientAdmin();

    // Check if supabase is properly configured
    if (!supabase || Object.keys(supabase).length === 0) {
      console.log("Supabase not configured, returning mock product");
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      // Sort images by order before returning
      const sortedProduct = {
        ...product,
        images: [...product.images].sort((a, b) => a.order - b.order)
      };
      return NextResponse.json(sortedProduct);
    }

    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        images:product_images(*)
      `)
      .eq("id", id)
      .order("order", { foreignTable: "product_images", ascending: true })
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      // Fallback to mock data
      const product = mockProducts.find((p) => p.id === id);
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
      // Sort images by order before returning
      const sortedProduct = {
        ...product,
        images: [...product.images].sort((a, b) => a.order - b.order)
      };
      return NextResponse.json(sortedProduct);
    }

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      console.log("Invalid UUID format, using mock mode");
      // Demo mode - return success without database
      return NextResponse.json({ 
        id, 
        ...body,
        updated_at: new Date().toISOString() 
      });
    }
    
    const supabase = createClientAdmin();

    // Update product
    const { data: product, error: productError } = await supabase
      .from("products")
      .update({
        name: body.name,
        slug: body.slug,
        description: body.description,
        short_description: body.short_description,
        price: body.price,
        category_id: body.category_id,
        features: body.features || [],
        tech_stack: body.tech_stack || [],
        demo_url: body.demo_url,
        is_featured: body.is_featured,
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (productError) {
      throw productError;
    }

    // Handle images - delete existing and insert new
    if (body.images) {
      // Delete existing images
      await supabase.from("product_images").delete().eq("product_id", id);

      // Insert new images
      if (body.images.length > 0) {
        const { error: imagesError } = await supabase
          .from("product_images")
          .insert(
            body.images.map((img: any, index: number) => ({
              product_id: id,
              url: img.url,
              alt: img.alt || body.name,
              order: index,
            }))
          );

        if (imagesError) {
          console.error("Error updating images:", imagesError);
        }
      }
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createClientAdmin();

    // Delete product images first (foreign key constraint)
    await supabase.from("product_images").delete().eq("product_id", id);

    // Delete product
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
