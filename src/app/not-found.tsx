"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl font-bold text-zinc-900">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-zinc-900">
            {t("404.title")}
          </h2>
          <p className="mt-4 text-zinc-500 max-w-md mx-auto">
            {t("404.subtitle")}
          </p>
          <Link href="/" className="mt-8 inline-block">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("404.back")}
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
