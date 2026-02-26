import { createClientServer, getProducts, getCategories } from "@/lib/supabase";
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import ProductGrid from "@/components/public/ProductGrid";
import About from "@/components/public/About";
import Contact from "@/components/public/Contact";
import Footer from "@/components/public/Footer";
import { mockProducts, mockCategories } from "@/lib/mock-data";

export default async function HomePage() {
  // Try to fetch from Supabase, fallback to mock data
  let products = [];
  let categories = [];

  try {
    products = await getProducts();
    categories = await getCategories();
    
    // If no products returned, use mock data
    if (products.length === 0) {
      console.log("No products from DB, using mock data");
      products = mockProducts;
      categories = mockCategories;
    }
  } catch (error) {
    console.log("Error fetching data, using mock data:", error);
    // Use mock data if Supabase is not configured or error
    products = mockProducts;
    categories = mockCategories;
  }

  // Calculate stats based on actual data
  const stats = {
    products: products.length,
    projects: products.length + 5, // Products + other projects
    years: 2,
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero stats={stats} />
        <ProductGrid products={products} categories={categories} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
