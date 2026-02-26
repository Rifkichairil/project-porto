import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createClientAdmin } from "@/lib/supabase";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const supabase = createClientAdmin();

    // Update product
    const { error: productError } = await supabase
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
      .eq("id", id);

    if (productError) {
      throw productError;
    }

    // Delete existing images
    await supabase.from("product_images").delete().eq("product_id", id);

    // Insert new images
    if (body.images && body.images.length > 0) {
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
        console.error("Error inserting images:", imagesError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createClientAdmin();

    // Delete product (cascades to images)
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
