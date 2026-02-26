"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock-data";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { formatPrice } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { getSettings, generateWhatsAppLink } from "@/lib/settings";
import {
  Check,
  ExternalLink,
  MessageCircle,
  Calendar,
  Tag,
  ChevronRight,
} from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const { t, lang } = useI18n();
  const slug = params.slug as string;
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/6281234567890");

  const product = mockProducts.find((p) => p.slug === slug);

  useEffect(() => {
    const settings = getSettings();
    if (product) {
      setWhatsappLink(generateWhatsAppLink(product.name, settings));
    }
  }, [product]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              {t("product.breadcrumb.home")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/#products" className="hover:text-zinc-900 transition-colors">
              {t("product.breadcrumb.products")}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-zinc-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images */}
            <div className="space-y-4">
              {product.images[0] ? (
                <>
                  <div className="aspect-[4/3] bg-zinc-100 rounded-2xl overflow-hidden">
                    <img
                      src={product.images[0].url}
                      alt={product.images[0].alt || product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {product.images.slice(1, 5).map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-zinc-100 rounded-xl overflow-hidden"
                        >
                          <img
                            src={image.url}
                            alt={image.alt || product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/3] bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                  <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-2 mb-4">
                {product.category && (
                  <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                    {product.category.name}
                  </span>
                )}
                {product.status === "coming_soon" && (
                  <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full">
                    {t("products.card.comingSoon")}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
                {product.name}
              </h1>

              {/* Meta */}
              <div className="mt-4 flex items-center gap-6 text-sm text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(product.created_at).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                {product.tech_stack && product.tech_stack.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {product.tech_stack.length} {lang === "id" ? "Teknologi" : "Technologies"}
                  </span>
                )}
              </div>

              <p className="mt-6 text-zinc-600 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-4">
                    {t("product.features")}
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-zinc-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {product.tech_stack && product.tech_stack.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-3">
                    {t("product.techStack")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-zinc-100 rounded-lg text-sm font-medium text-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Section */}
              <Card className="mt-10 bg-zinc-950 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-zinc-400">{t("product.priceLabel")}</p>
                      <p className="text-3xl font-semibold text-white mt-1">
                        {product.price
                          ? formatPrice(product.price)
                          : "Custom"}
                      </p>
                    </div>
                    {product.demo_url && (
                      <a
                        href={product.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="secondary" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {t("product.cta.demo")}
                        </Button>
                      </a>
                    )}
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="w-full bg-white text-zinc-900 hover:bg-zinc-100"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t("product.cta.whatsapp")}
                    </Button>
                  </a>
                  <p className="mt-3 text-xs text-center text-zinc-500">
                    {t("product.response")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
