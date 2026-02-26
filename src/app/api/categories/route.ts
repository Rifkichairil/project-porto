import { NextResponse } from "next/server";
import { createClientServer } from "@/lib/supabase";
import { mockCategories } from "@/lib/mock-data";

export async function GET() {
  try {
    const supabase = createClientServer();

    // Check if supabase is properly configured
    if (!supabase || Object.keys(supabase).length === 0) {
      console.log("Supabase not configured, returning mock categories");
      return NextResponse.json(mockCategories);
    }

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json(mockCategories);
    }

    // If no data, return mock categories
    if (!data || data.length === 0) {
      console.log("No categories from Supabase, using mock data");
      return NextResponse.json(mockCategories);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in categories API:", error);
    return NextResponse.json(mockCategories);
  }
}
