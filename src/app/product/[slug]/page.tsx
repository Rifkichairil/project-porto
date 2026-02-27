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
import { getSettings, generateWhatsAppLink, PriceDisplayMode } from "@/lib/settings";
import {
  Check,
  ExternalLink,
  MessageCircle,
  Calendar,
  Tag,
  ChevronRight,
} from "lucide-react";
import ImageGallery from "@/components/public/ImageGallery";
import { Product } from "@/types";

export default function ProductPage() {
  const params = useParams();
  const { t } = useI18n();
  const slug = params.slug as string;
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/6281234567890");
  const [product, setProduct] = useState<Product | null>(null);
  const [showDemoButton, setShowDemoButton] = useState(false);
  const [priceDisplayMode, setPriceDisplayMode] = useState<PriceDisplayMode>("hide");
  const [priceCustomText, setPriceCustomText] = useState("Hubungi untuk harga");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/products?slug=${slug}`);
        if (response.ok) {
          const products = await response.json();
          const foundProduct = products.find((p: Product) => p.slug === slug);
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            // Fallback to mock data
            const mockProduct = mockProducts.find((p) => p.slug === slug);
            setProduct(mockProduct || null);
          }
        } else {
          // Fallback to mock data
          const mockProduct = mockProducts.find((p) => p.slug === slug);
          setProduct(mockProduct || null);
        }
      } catch {
        // Fallback to mock data
        const mockProduct = mockProducts.find((p) => p.slug === slug);
        setProduct(mockProduct || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    const settings = getSettings();
    if (product) {
      setWhatsappLink(generateWhatsAppLink(product.name, settings));
      setShowDemoButton(settings.showDemoButton);
      setPriceDisplayMode(settings.priceDisplayMode);
      setPriceCustomText(settings.priceCustomText);
    }
  }, [product]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

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
            <ImageGallery images={product.images} productName={product.name} />

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
                  {new Date(product.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                {product.tech_stack && product.tech_stack.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {product.tech_stack.length} Teknologi
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
                        {priceDisplayMode === "show" 
                          ? (product.price ? formatPrice(product.price) : "Custom")
                          : priceCustomText}
                      </p>
                    </div>
                    {showDemoButton && product.demo_url && (
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
