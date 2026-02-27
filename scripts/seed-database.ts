import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Check your .env.local file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const categories = [
  {
    name: "Kasir (POS)",
    slug: "pos",
    description: "Sistem kasir dan manajemen penjualan untuk berbagai jenis bisnis",
    icon: "ShoppingCart",
  },
  {
    name: "Pendidikan",
    slug: "education",
    description: "Sistem manajemen untuk lembaga pendidikan dan bimbel",
    icon: "GraduationCap",
  },
  {
    name: "Komunitas",
    slug: "community",
    description: "Sistem manajemen untuk RT/RW dan organisasi komunitas",
    icon: "Users",
  },
  {
    name: "Bisnis",
    slug: "business",
    description: "Sistem ERP dan manajemen bisnis terintegrasi",
    icon: "Building",
  },
  {
    name: "Kustom",
    slug: "custom",
    description: "Solusi software kustom sesuai kebutuhan spesifik",
    icon: "Code",
  },
];

const products = [
  {
    name: "Sistem Manajemen Bimbel",
    slug: "sistem-manajemen-bimbel",
    short_description:
      "Solusi lengkap untuk mengelola bimbel dengan pendaftaran siswa, jadwal, absensi, dan pembayaran.",
    description:
      "Sistem manajemen komprehensif yang dirancang khusus untuk bimbel dan lembaga pendidikan di Indonesia. Fitur meliputi pendaftaran siswa, penjadwalan kelas, pencatatan absensi, manajemen pembayaran, laporan kemajuan, dan notifikasi orang tua. Dibangun dengan Laravel untuk keandalan dan kemudahan perawatan.",
    price: 8000000,
    category_slug: "education",
    image_url: "https://placehold.co/800x600/fafafa/171717?text=Bimbel",
    image_alt: "Dashboard Bimbel",
    features: [
      "Pendaftaran dan profil siswa",
      "Penjadwalan kelas dan alokasi ruangan",
      "Pencatatan absensi",
      "Manajemen pembayaran dengan laporan",
      "Laporan kemajuan dan penilaian",
      "Portal orang tua untuk monitoring",
      "Manajemen pengajar",
      "Laporan keuangan bulanan",
    ],
    tech_stack: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    demo_url: "#",
    is_featured: true,
    status: "active",
  },
  {
    name: "Sistem Manajemen RT/RW",
    slug: "sistem-manajemen-rt-rw",
    short_description:
      "Solusi digital untuk pengelolaan warga, iuran, dan pembuatan surat menyurat.",
    description:
      "Sistem manajemen RT/RW modern yang mendigitalisasi administrasi lingkungan. Kelola data warga dengan mudah, pantau iuran bulanan, buat surat-surat resmi, dan fasilitasi komunikasi antar warga. Sesuai dengan kebutuhan administrasi Indonesia.",
    price: 6000000,
    category_slug: "community",
    image_url: "https://placehold.co/800x600/f4f4f5/171717?text=RT-RW",
    image_alt: "Dashboard RT/RW",
    features: [
      "Database warga dengan silsilah keluarga",
      "Pencatatan iuran bulanan",
      "Generate kwitansi otomatis",
      "Template surat resmi (SK, domisili, dll)",
      "Manajemen acara dan rapat",
      "Data kontak darurat",
      "Laporan keuangan transparan",
      "Tampilan responsif mobile-friendly",
    ],
    tech_stack: ["Laravel", "MySQL", "Livewire", "Tailwind CSS"],
    demo_url: "#",
    is_featured: true,
    status: "active",
  },
  {
    name: "Sistem Kasir Retail",
    slug: "sistem-kasir-retail",
    short_description:
      "Sistem POS dengan manajemen stok, laporan penjualan, dan multi-cabang.",
    description:
      "Solusi POS lengkap untuk bisnis retail. Kelola penjualan, stok, supplier, dan pelanggan dari satu dashboard. Mendukung multi-cabang, manajemen karyawan, dan laporan komprehensif.",
    price: 7000000,
    category_slug: "pos",
    image_url: "https://placehold.co/800x600/e4e4e7/171717?text=POS",
    image_alt: "Dashboard POS",
    features: [
      "Pencarian produk dan checkout cepat",
      "Manajemen stok dengan alert stok rendah",
      "Manajemen multi-cabang",
      "Role dan hak akses karyawan",
      "Laporan penjualan harian dan bulanan",
      "Database pelanggan",
      "Cetak struk dan faktur",
      "Backup dan restore data",
    ],
    tech_stack: ["Laravel", "MySQL", "Vue.js", "Bootstrap"],
    demo_url: "#",
    is_featured: true,
    status: "active",
  },
  {
    name: "Sistem Manajemen Percetakan",
    slug: "sistem-manajemen-percetakan",
    short_description:
      "Kelola pesanan cetak, pantau status produksi, dan atur antrian dengan efisien.",
    description:
      "Sistem manajemen khusus untuk bisnis percetakan. Lacak pesanan dari masuk hingga selesai, kelola antrian produksi, atur variasi harga, dan simpan riwayat pelanggan. Mendukung berbagai jenis cetak: digital, offset, dan large format.",
    price: 5500000,
    category_slug: "business",
    image_url: "https://placehold.co/800x600/d4d4d8/171717?text=Printing",
    image_alt: "Dashboard Percetakan",
    features: [
      "Input pesanan dengan upload file",
      "Manajemen antrian produksi",
      "Kalkulator harga untuk jenis cetak berbeda",
      "Riwayat pesanan pelanggan",
      "Tracking pengiriman",
      "Inventori bahan baku",
      "Laporan produksi harian",
      "Generate invoice",
    ],
    tech_stack: ["Laravel", "MySQL", "jQuery", "Bootstrap"],
    demo_url: "#",
    is_featured: false,
    status: "active",
  },
  {
    name: "Sistem Manajemen Stok",
    slug: "sistem-manajemen-stok",
    short_description:
      "Pantau level stok, kelola supplier, dan dapatkan notifikasi stok menipis.",
    description:
      "Sistem manajemen stok yang simpel tapi powerful. Pantau level stok real-time, kelola informasi supplier, terima notifikasi stok menipis, dan generate laporan inventori komprehensif. Cocok untuk bisnis kecil hingga menengah.",
    price: 5000000,
    category_slug: "business",
    image_url: "https://placehold.co/800x600/a1a1aa/ffffff?text=Inventory",
    image_alt: "Dashboard Stok",
    features: [
      "Manajemen produk dan kategori",
      "Pencatatan stok masuk/keluar",
      "Notifikasi stok menipis",
      "Manajemen supplier",
      "Pembuatan purchase order",
      "Riwayat penyesuaian stok",
      "Laporan valuasi inventori",
      "Siap integrasi barcode",
    ],
    tech_stack: ["Laravel", "MySQL", "Alpine.js", "Tailwind CSS"],
    demo_url: null,
    is_featured: true,
    status: "coming_soon",
  },
];

async function seedCategories() {
  console.log("Seeding categories...");
  
  const { data: existing } = await supabase
    .from("categories")
    .select("slug");
  
  const existingSlugs = new Set(existing?.map((c) => c.slug) || []);
  
  const newCategories = categories.filter((c) => !existingSlugs.has(c.slug));
  
  if (newCategories.length === 0) {
    console.log("Categories already exist, skipping...");
    return;
  }
  
  const { data, error } = await supabase
    .from("categories")
    .insert(newCategories)
    .select();
  
  if (error) {
    console.error("Error seeding categories:", error);
    throw error;
  }
  
  console.log(`✓ Inserted ${data.length} categories`);
  return data;
}

async function seedProducts() {
  console.log("Seeding products...");
  
  // Get all categories
  const { data: categoriesData, error: catError } = await supabase
    .from("categories")
    .select("id, slug");
  
  if (catError) {
    console.error("Error fetching categories:", catError);
    throw catError;
  }
  
  const categoryMap = new Map(
    categoriesData?.map((c) => [c.slug, c.id]) || []
  );
  
  // Check existing products
  const { data: existing } = await supabase
    .from("products")
    .select("slug");
  
  const existingSlugs = new Set(existing?.map((p) => p.slug) || []);
  
  const productsToInsert: any[] = [];
  const imagesToInsert: any[] = [];
  
  for (const product of products) {
    if (existingSlugs.has(product.slug)) {
      console.log(`Product "${product.name}" already exists, skipping...`);
      continue;
    }
    
    const categoryId = categoryMap.get(product.category_slug);
    if (!categoryId) {
      console.error(`Category not found for ${product.category_slug}`);
      continue;
    }
    
    productsToInsert.push({
      name: product.name,
      slug: product.slug,
      short_description: product.short_description,
      description: product.description,
      price: product.price,
      category_id: categoryId,
      features: product.features,
      tech_stack: product.tech_stack,
      demo_url: product.demo_url,
      is_featured: product.is_featured,
      status: product.status,
    });
    
    imagesToInsert.push({
      url: product.image_url,
      alt: product.image_alt,
      order: 0,
    });
  }
  
  if (productsToInsert.length === 0) {
    console.log("No new products to insert");
    return;
  }
  
  // Insert products
  const { data: insertedProducts, error: prodError } = await supabase
    .from("products")
    .insert(productsToInsert)
    .select();
  
  if (prodError) {
    console.error("Error inserting products:", prodError);
    throw prodError;
  }
  
  console.log(`✓ Inserted ${insertedProducts.length} products`);
  
  // Insert images
  const productImages = insertedProducts.map((product, index) => ({
    product_id: product.id,
    url: imagesToInsert[index].url,
    alt: imagesToInsert[index].alt,
    order: imagesToInsert[index].order,
  }));
  
  const { error: imgError } = await supabase
    .from("product_images")
    .insert(productImages);
  
  if (imgError) {
    console.error("Error inserting images:", imgError);
    throw imgError;
  }
  
  console.log(`✓ Inserted ${productImages.length} product images`);
}

async function main() {
  console.log("🌱 Seeding database...\n");
  
  try {
    await seedCategories();
    await seedProducts();
    console.log("\n✅ Database seeded successfully!");
  } catch (error) {
    console.error("\n❌ Failed to seed database:", error);
    process.exit(1);
  }
}

main();
