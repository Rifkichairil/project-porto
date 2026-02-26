"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.products": "Produk",
    "nav.about": "Tentang",
    "nav.contact": "Kontak",
    "nav.cta": "Hubungi Saya",

    // Hero
    "hero.badge": "Tersedia untuk project",
    "hero.title1": "Laravel Developer",
    "hero.title2": "& Solusi Digital",
    "hero.subtitle": "Membangun aplikasi web dengan Laravel. Dari sistem kasir hingga manajemen bimbel — solusi praktis untuk bisnis di Indonesia.",
    "hero.cta.primary": "Lihat Produk",
    "hero.cta.secondary": "Hubungi Saya",
    "hero.scroll": "Gulir",

    // Stats
    "stats.products": "Produk",
    "stats.projects": "Project",
    "stats.years": "Tahun",

    // Products
    "products.section": "Portfolio",
    "products.title": "Produk Unggulan",
    "products.subtitle": "Jelajahi solusi siap pakai yang dibangun untuk bisnis Indonesia",
    "products.filter.all": "Semua",
    "products.empty": "Tidak ada produk di kategori ini.",
    "products.card.priceCustom": "Harga Custom",
    "products.card.detail": "Detail",
    "products.card.comingSoon": "Segera Hadir",
    "products.count": "Menampilkan {count} produk",

    // Product Detail
    "product.back": "Kembali ke Produk",
    "product.breadcrumb.home": "Beranda",
    "product.breadcrumb.products": "Produk",
    "product.features": "Fitur Utama",
    "product.techStack": "Dibangun Dengan",
    "product.priceLabel": "Harga mulai dari",
    "product.cta.demo": "Demo",
    "product.cta.whatsapp": "Tanya via WhatsApp",
    "product.response": "Balasan dalam 24 jam",

    // About
    "about.section": "Tentang Saya",
    "about.title1": "Laravel Developer",
    "about.title2": "membangun solusi web",
    "about.p1": "Saya fokus membangun aplikasi web menggunakan Laravel. Meskipun keahlian utama saya di backend dengan PHP, saya juga sedang mempelajari Next.js untuk membuat tampilan yang lebih baik.",
    "about.p2": "Setiap produk di sini dibangun dengan mempertimbangkan kebutuhan bisnis — mulai dari sistem kasir untuk toko kecil hingga alat manajemen untuk komunitas. Saya fokus menciptakan solusi yang handal dan mudah digunakan.",
    "about.techStack": "Teknologi",

    // Skills
    "skill.backend": "Backend",
    "skill.backend.desc": "Laravel & PHP",
    "skill.database": "Database",
    "skill.database.desc": "MySQL & PostgreSQL",
    "skill.frontend": "Frontend",
    "skill.frontend.desc": "Next.js & React",
    "skill.fullstack": "Full Stack",
    "skill.fullstack.desc": "Solusi lengkap",

    // Contact
    "contact.section": "Kontak",
    "contact.title": "Mari bekerja sama",
    "contact.subtitle": "Punya ide project? Mari diskusikan bagaimana saya bisa membantu mewujudkannya.",
    "contact.whatsapp.desc": "Respons tercepat",
    "contact.email.desc": "Diskusi detail",
    "contact.location.desc": "Bisa remote",
    "contact.cta.title": "Langsung chat aja?",
    "contact.cta.button": "Mulai Chat WhatsApp",
    "contact.cta.note": "Biasanya balas dalam 24 jam",

    // Footer
    "footer.tagline": "Membangun solusi digital untuk membantu bisnis di Indonesia berkembang.",
    "footer.nav": "Navigasi",
    "footer.social": "Media Sosial",
    "footer.admin": "Login Admin",
    "footer.copyright": "Hak cipta dilindungi.",

    // 404
    "404.title": "Halaman Tidak Ditemukan",
    "404.subtitle": "Halaman yang Anda cari tidak ada atau telah dipindahkan.",
    "404.back": "Kembali ke Beranda",

    // Admin
    "admin.title": "Admin",
    "admin.login.title": "Selamat Datang",
    "admin.login.subtitle": "Masuk untuk kelola portfolio",
    "admin.login.email": "Email",
    "admin.login.password": "Password",
    "admin.login.button": "Masuk",
    "admin.login.error": "Email atau password salah",
    "admin.login.error.general": "Terjadi kesalahan. Silakan coba lagi.",

    "admin.dashboard.title": "Dashboard",
    "admin.dashboard.subtitle": "Kelola produk Anda",
    "admin.dashboard.stats.total": "Total Produk",
    "admin.dashboard.stats.active": "Aktif",
    "admin.dashboard.stats.featured": "Unggulan",
    "admin.dashboard.recent": "Produk Terbaru",
    "admin.dashboard.viewAll": "Lihat semua",
    "admin.dashboard.add": "Tambah Produk",

    "admin.product.new": "Produk Baru",
    "admin.product.new.subtitle": "Tambah produk baru ke portfolio Anda",
    "admin.product.edit": "Edit Produk",
    "admin.product.edit.subtitle": "Perbarui detail produk",
    "admin.product.empty": "Belum ada produk",
    "admin.product.empty.cta": "Tambah Produk Pertama",
    "admin.product.deleteConfirm": "Yakin ingin menghapus produk ini?",
    "admin.product.deleted": "Produk berhasil dihapus",
    "admin.product.deleteError": "Gagal menghapus produk",
    "admin.product.saved": "Produk berhasil disimpan",
    "admin.product.saveError": "Gagal menyimpan produk",

    "admin.form.name": "Nama Produk",
    "admin.form.slug": "Slug",
    "admin.form.shortDesc": "Deskripsi Singkat",
    "admin.form.desc": "Deskripsi Lengkap",
    "admin.form.price": "Harga (Rp)",
    "admin.form.pricePlaceholder": "Kosongkan untuk harga custom",
    "admin.form.category": "Kategori",
    "admin.form.selectCategory": "Pilih kategori",
    "admin.form.demoUrl": "URL Demo",
    "admin.form.status": "Status",
    "admin.form.status.active": "Aktif",
    "admin.form.status.inactive": "Nonaktif",
    "admin.form.status.comingSoon": "Segera Hadir",
    "admin.form.featured": "Produk Unggulan",
    "admin.form.features": "Fitur (satu per baris)",
    "admin.form.featuresPlaceholder": "Fitur 1\nFitur 2\nFitur 3",
    "admin.form.techStack": "Teknologi (satu per baris)",
    "admin.form.techStackPlaceholder": "Laravel\nMySQL\nVue.js",
    "admin.form.images": "Gambar Produk",
    "admin.form.imagesHelp": "Klik untuk upload gambar",
    "admin.form.submit.new": "Buat Produk",
    "admin.form.submit.edit": "Perbarui Produk",
    "admin.form.cancel": "Batal",

    "admin.sidebar.dashboard": "Dashboard",
    "admin.sidebar.products": "Produk",
    "admin.sidebar.add": "Tambah Produk",
    "admin.sidebar.settings": "Pengaturan",
    "admin.sidebar.logout": "Keluar",

    // Settings
    "settings.title": "Pengaturan",
    "settings.subtitle": "Kelola konfigurasi situs Anda",
    "settings.save": "Simpan Perubahan",
    "settings.saved": "Pengaturan berhasil disimpan",
    "settings.error": "Gagal menyimpan pengaturan",
    "settings.preview": "Pratinjau",
    "settings.testLink": "Tes Link WhatsApp",

    "settings.whatsapp.title": "WhatsApp",
    "settings.whatsapp.subtitle": "Konfigurasi nomor dan pesan WhatsApp",
    "settings.whatsapp.number": "Nomor WhatsApp",
    "settings.whatsapp.numberHint": "Format: 628xxxxxxxxxx (tanpa + atau spasi)",
    "settings.whatsapp.message": "Pesan Default",
    "settings.whatsapp.messagePlaceholder": "Halo, saya tertarik dengan produk Anda...",
    "settings.whatsapp.messageHint": "Pesan ini akan muncul saat pengguna klik tombol WhatsApp",

    "settings.contact.title": "Kontak",
    "settings.contact.subtitle": "Informasi kontak yang ditampilkan di situs",
    "settings.contact.email": "Email",

    "settings.site.title": "Situs",
    "settings.site.subtitle": "Informasi dasar tentang situs Anda",
    "settings.site.name": "Nama Situs",
    "settings.site.description": "Deskripsi Situs",

    "settings.errors.whatsappInvalid": "Nomor WhatsApp tidak valid. Minimal 10 digit.",

    // Language Switcher
    "lang.id": "ID",
    "lang.en": "EN",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "Get in Touch",

    // Hero
    "hero.badge": "Available for projects",
    "hero.title1": "Laravel Developer",
    "hero.title2": "& Digital Solutions",
    "hero.subtitle": "Building web applications with Laravel. From POS systems to tutoring management — practical solutions for Indonesian businesses.",
    "hero.cta.primary": "View Products",
    "hero.cta.secondary": "Get in Touch",
    "hero.scroll": "Scroll",

    // Stats
    "stats.products": "Products",
    "stats.projects": "Projects",
    "stats.years": "Years",

    // Products
    "products.section": "Portfolio",
    "products.title": "Featured Products",
    "products.subtitle": "Explore ready-to-deploy solutions built for Indonesian businesses",
    "products.filter.all": "All",
    "products.empty": "No products found in this category.",
    "products.card.priceCustom": "Custom Price",
    "products.card.detail": "Details",
    "products.card.comingSoon": "Coming Soon",
    "products.count": "Showing {count} products",

    // Product Detail
    "product.back": "Back to Products",
    "product.breadcrumb.home": "Home",
    "product.breadcrumb.products": "Products",
    "product.features": "Key Features",
    "product.techStack": "Built With",
    "product.priceLabel": "Starting from",
    "product.cta.demo": "Demo",
    "product.cta.whatsapp": "Inquire via WhatsApp",
    "product.response": "Response within 24 hours",

    // About
    "about.section": "About Me",
    "about.title1": "Laravel Developer",
    "about.title2": "building web solutions",
    "about.p1": "I focus on building web applications using Laravel. While my main expertise is in backend with PHP, I'm also learning Next.js to create better user interfaces.",
    "about.p2": "Every product here is built with business needs in mind — from POS systems for small shops to management tools for communities. I focus on creating reliable and easy-to-use solutions.",
    "about.techStack": "Tech Stack",

    // Skills
    "skill.backend": "Backend",
    "skill.backend.desc": "Laravel & PHP",
    "skill.database": "Database",
    "skill.database.desc": "MySQL & PostgreSQL",
    "skill.frontend": "Frontend",
    "skill.frontend.desc": "Next.js & React",
    "skill.fullstack": "Full Stack",
    "skill.fullstack.desc": "End-to-end solutions",

    // Contact
    "contact.section": "Contact",
    "contact.title": "Let's work together",
    "contact.subtitle": "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
    "contact.whatsapp.desc": "Fastest response",
    "contact.email.desc": "Detailed discussion",
    "contact.location.desc": "Remote available",
    "contact.cta.title": "Prefer to chat directly?",
    "contact.cta.button": "Start WhatsApp Chat",
    "contact.cta.note": "Usually respond within 24 hours",

    // Footer
    "footer.tagline": "Building digital solutions to help businesses in Indonesia grow.",
    "footer.nav": "Navigation",
    "footer.social": "Social Media",
    "footer.admin": "Admin Login",
    "footer.copyright": "All rights reserved.",

    // 404
    "404.title": "Page Not Found",
    "404.subtitle": "The page you're looking for doesn't exist or has been moved.",
    "404.back": "Back to Home",

    // Admin
    "admin.title": "Admin",
    "admin.login.title": "Welcome",
    "admin.login.subtitle": "Sign in to manage your portfolio",
    "admin.login.email": "Email",
    "admin.login.password": "Password",
    "admin.login.button": "Sign In",
    "admin.login.error": "Invalid email or password",
    "admin.login.error.general": "An error occurred. Please try again.",

    "admin.dashboard.title": "Dashboard",
    "admin.dashboard.subtitle": "Manage your products",
    "admin.dashboard.stats.total": "Total Products",
    "admin.dashboard.stats.active": "Active",
    "admin.dashboard.stats.featured": "Featured",
    "admin.dashboard.recent": "Recent Products",
    "admin.dashboard.viewAll": "View all",
    "admin.dashboard.add": "Add Product",

    "admin.product.new": "New Product",
    "admin.product.new.subtitle": "Create a new product for your portfolio",
    "admin.product.edit": "Edit Product",
    "admin.product.edit.subtitle": "Update product details",
    "admin.product.empty": "No products yet",
    "admin.product.empty.cta": "Add Your First Product",
    "admin.product.deleteConfirm": "Are you sure you want to delete this product?",
    "admin.product.deleted": "Product deleted successfully",
    "admin.product.deleteError": "Failed to delete product",
    "admin.product.saved": "Product saved successfully",
    "admin.product.saveError": "Failed to save product",

    "admin.form.name": "Product Name",
    "admin.form.slug": "Slug",
    "admin.form.shortDesc": "Short Description",
    "admin.form.desc": "Full Description",
    "admin.form.price": "Price (IDR)",
    "admin.form.pricePlaceholder": "Leave empty for custom pricing",
    "admin.form.category": "Category",
    "admin.form.selectCategory": "Select category",
    "admin.form.demoUrl": "Demo URL",
    "admin.form.status": "Status",
    "admin.form.status.active": "Active",
    "admin.form.status.inactive": "Inactive",
    "admin.form.status.comingSoon": "Coming Soon",
    "admin.form.featured": "Featured Product",
    "admin.form.features": "Features (one per line)",
    "admin.form.featuresPlaceholder": "Feature 1\nFeature 2\nFeature 3",
    "admin.form.techStack": "Tech Stack (one per line)",
    "admin.form.techStackPlaceholder": "Laravel\nMySQL\nVue.js",
    "admin.form.images": "Product Images",
    "admin.form.imagesHelp": "Click to upload images",
    "admin.form.submit.new": "Create Product",
    "admin.form.submit.edit": "Update Product",
    "admin.form.cancel": "Cancel",

    "admin.sidebar.dashboard": "Dashboard",
    "admin.sidebar.products": "Products",
    "admin.sidebar.add": "Add Product",
    "admin.sidebar.settings": "Settings",
    "admin.sidebar.logout": "Sign Out",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Manage your site configuration",
    "settings.save": "Save Changes",
    "settings.saved": "Settings saved successfully",
    "settings.error": "Failed to save settings",
    "settings.preview": "Preview",
    "settings.testLink": "Test WhatsApp Link",

    "settings.whatsapp.title": "WhatsApp",
    "settings.whatsapp.subtitle": "Configure WhatsApp number and message",
    "settings.whatsapp.number": "WhatsApp Number",
    "settings.whatsapp.numberHint": "Format: 628xxxxxxxxxx (without + or spaces)",
    "settings.whatsapp.message": "Default Message",
    "settings.whatsapp.messagePlaceholder": "Hello, I'm interested in your product...",
    "settings.whatsapp.messageHint": "This message will appear when users click the WhatsApp button",

    "settings.contact.title": "Contact",
    "settings.contact.subtitle": "Contact information displayed on the site",
    "settings.contact.email": "Email",

    "settings.site.title": "Site",
    "settings.site.subtitle": "Basic information about your site",
    "settings.site.name": "Site Name",
    "settings.site.description": "Site Description",

    "settings.errors.whatsappInvalid": "Invalid WhatsApp number. Minimum 10 digits.",

    // Language Switcher
    "lang.id": "ID",
    "lang.en": "EN",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Initialize with "id" but will update immediately after mount
  const [lang, setLangState] = useState<Language>("id");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load language from localStorage on mount
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "id" || saved === "en")) {
      setLangState(saved);
    }
    setIsReady(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("language", newLang);
    // Force reload to ensure all components re-render with new language
    window.location.reload();
  };

  const t = (key: string): string => {
    const value = translations[lang][key as keyof typeof translations["id"]];
    return value || key;
  };

  // Show nothing until language is loaded to prevent hydration mismatch
  if (!isReady) {
    return (
      <div className="min-h-screen bg-zinc-50" />
    );
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
