// Static settings/configuration for the site
// This can be replaced with database storage later

export type PriceDisplayMode = "show" | "hide";

export interface SiteSettings {
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  siteName: string;
  siteDescription: string;
  showDemoButton: boolean;
  priceDisplayMode: PriceDisplayMode;
  priceCustomText: string;
}

// Default settings - Edit these values to change site configuration
export const defaultSettings: SiteSettings = {
  whatsappNumber: "6281234567890", // Format: 628xxxxxxxxxx (without +)
  whatsappMessage: "Halo, saya tertarik dengan produk yang Anda tawarkan. Bisa berikan informasi lebih detail?",
  email: "hello@devfolio.com",
  siteName: "RifkiLabs",
  siteDescription: "Developer & Solusi Digital",
  showDemoButton: false, // Default: hidden
  priceDisplayMode: "hide", // Default: hide price
  priceCustomText: "Hubungi untuk harga", // Default custom text
};

// Get settings (in the future, this can fetch from localStorage or database)
export function getSettings(): SiteSettings {
  // Try to get from localStorage first (client-side only)
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("siteSettings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
  }
  return defaultSettings;
}

// Save settings (client-side only)
export function saveSettings(settings: Partial<SiteSettings>): void {
  if (typeof window !== "undefined") {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem("siteSettings", JSON.stringify(updated));
  }
}

// Generate WhatsApp link with pre-filled message
export function generateWhatsAppLink(
  productName?: string,
  settings: SiteSettings = defaultSettings
): string {
  const number = settings.whatsappNumber.replace(/[^0-9]/g, "");
  let message = settings.whatsappMessage;
  
  if (productName) {
    message = `Halo, saya tertarik dengan produk "${productName}" yang Anda tawarkan. Bisa berikan informasi lebih detail?`;
  }
  
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Validate WhatsApp number format
export function validateWhatsAppNumber(number: string): boolean {
  // Should start with country code (e.g., 62 for Indonesia)
  // Minimum 10 digits, maximum 15 digits
  const cleanNumber = number.replace(/[^0-9]/g, "");
  return cleanNumber.length >= 10 && cleanNumber.length <= 15;
}
