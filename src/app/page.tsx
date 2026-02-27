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
  const activeProducts = products.filter(p => p.status === "active").length;
  const totalProducts = products.length;
  
  // Calculate years from first product creation date, or default to 1
  const years = products.length > 0 
    ? Math.max(1, Math.floor((Date.now() - new Date(products[0].created_at).getTime()) / (365 * 24 * 60 * 60 * 1000)))
    : 1;
  
  const stats = {
    products: totalProducts,
    projects: activeProducts, // Active products count as completed projects
    years: years,
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
