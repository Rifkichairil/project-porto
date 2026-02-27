"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { getSettings, generateWhatsAppLink } from "@/lib/settings";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/6281234567890");
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Get WhatsApp number from settings
    const settings = getSettings();
    setWhatsappLink(generateWhatsAppLink(undefined, settings));
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/#products" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 shadow-subtle"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-semibold text-zinc-900 tracking-tight">
              DevFolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 font-medium transition-colors rounded-lg hover:bg-zinc-100/50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Language */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">
                {t("nav.cta")}
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-zinc-200/50 transition-all duration-200",
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-zinc-100">
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 pt-2"
            >
              <Button className="w-full">{t("nav.cta")}</Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
