"use client";

import { createContext, useContext, ReactNode } from "react";

interface I18nContextType {
  t: (key: string) => string;
}

const translations = {
  // Navbar
  "nav.home": "Beranda",
  "nav.products": "Produk",
  "nav.about": "Tentang",
  "nav.contact": "Kontak",
  "nav.cta": "Hubungi Saya",

  // Hero
  "hero.badge": "Tersedia untuk project",
  "hero.title1": "Developer &",
  "hero.title2": "Solusi Digital",
  "hero.subtitle": "Membangun berbagai solusi digital — dari dashboard manajemen, sistem informasi, hingga landing page. Siap membantu mewujudkan kebutuhan teknologi bisnis Anda.",
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
  "products.subtitle": "Jelajahi berbagai solusi digital yang siap membantu perkembangan bisnis Anda",
  "products.filter.all": "Semua",
  "products.filter.featured": "Unggulan",
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
  "about.title1": "Developer",
  "about.title2": "membangun solusi digital",
  "about.p1": "Saya fokus membangun berbagai solusi digital yang membantu bisnis berkembang. Dari dashboard manajemen, sistem informasi, hingga landing page — setiap project dikerjakan dengan memperhatikan kebutuhan spesifik klien.",
  "about.p2": "Setiap produk di sini dibangun dengan mempertimbangkan kebutuhan bisnis — mulai dari dashboard internal, sistem manajemen, hingga website promosi. Saya fokus menciptakan solusi yang handal, mudah digunakan, dan sesuai kebutuhan Anda.",
  "about.techStack": "Layanan",

  // Skills
  "skill.backend": "Sistem & Dashboard",
  "skill.backend.desc": "Manajemen & Informasi",
  "skill.database": "Database",
  "skill.database.desc": "Desain & Optimasi",
  "skill.frontend": "Website & UI",
  "skill.frontend.desc": "Tampilan & Interaksi",
  "skill.fullstack": "Solusi Lengkap",
  "skill.fullstack.desc": "Dari konsep hingga deployment",

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
  "footer.tagline": "Membangun solusi digital yang membantu bisnis berkembang dan mencapai tujuan mereka.",
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

  "admin.filter.allCategories": "Semua Kategori",
  "admin.filter.productsFound": "{count} produk ditemukan",
  "admin.pagination.showing": "Menampilkan {start}-{end} dari {total} produk",
  "admin.pagination.prev": "Sebelumnya",
  "admin.pagination.next": "Selanjutnya",

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

  "settings.display.title": "Tampilan",
  "settings.display.subtitle": "Atur tampilan konten di situs",
  "settings.display.demoButton": "Tampilkan Tombol Demo",
  "settings.display.demoButtonHint": "Menampilkan tombol demo di halaman produk (jika URL demo tersedia)",
  "settings.display.priceMode": "Tampilan Harga",
  "settings.display.priceShow": "Tampilkan nominal harga",
  "settings.display.priceHide": "Sembunyikan harga (teks custom)",
  "settings.display.priceCustomText": "Teks pengganti harga",
  "settings.display.priceCustomTextPlaceholder": "Contoh: Hubungi untuk harga / Request Quote",

  "settings.errors.whatsappInvalid": "Nomor WhatsApp tidak valid. Minimal 10 digit.",

  // Language Switcher
  "lang.id": "ID",
  "lang.en": "EN",
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    const value = translations[key as keyof typeof translations];
    return value || key;
  };

  return (
    <I18nContext.Provider value={{ t }}>
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
