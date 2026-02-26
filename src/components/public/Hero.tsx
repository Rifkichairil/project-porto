"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { getSettings, generateWhatsAppLink } from "@/lib/settings";

interface HeroProps {
  stats: {
    products: number;
    projects: number;
    years: number;
  };
}

export default function Hero({ stats }: HeroProps) {
  const { t } = useI18n();
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/6281234567890");

  useEffect(() => {
    const settings = getSettings();
    setWhatsappLink(generateWhatsAppLink(undefined, settings));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-60 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-zinc-50 rounded-full blur-3xl opacity-80" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(to right, #171717 1px, transparent 1px), linear-gradient(to bottom, #171717 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-zinc-200 shadow-subtle mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-zinc-600 font-medium">{t("hero.badge")}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-zinc-900 tracking-tight leading-[1.1] animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t("hero.title1")}
          <br />
          <span className="text-zinc-400">{t("hero.title2")}</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/#products">
            <Button size="lg" className="w-full sm:w-auto group">
              {t("hero.cta.primary")}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" className="w-full sm:w-auto group">
              {t("hero.cta.secondary")}
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </a>
        </div>

        {/* Stats - Dynamic */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { value: `${stats.products}+`, label: t("stats.products") },
            { value: `${stats.projects}+`, label: t("stats.projects") },
            { value: `${stats.years}+`, label: t("stats.years") },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-semibold text-zinc-900">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-400">
          <span className="text-xs font-medium uppercase tracking-wider">{t("hero.scroll")}</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
