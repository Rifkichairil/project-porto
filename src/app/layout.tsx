import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFolio - Professional Software Solutions",
  description:
    "Custom-built applications for POS, Education Management, Community Systems, and more. Ready to deploy solutions tailored for businesses.",
  keywords: [
    "software",
    "POS",
    "education management",
    "community system",
    "RT RW",
    "bimbel",
    "custom software",
    "web development",
    "Laravel",
  ],
  authors: [{ name: "DevFolio" }],
  openGraph: {
    title: "DevFolio - Professional Software Solutions",
    description:
      "Custom-built applications for POS, Education Management, Community Systems, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <I18nProvider>
            <ToastProvider>{children}</ToastProvider>
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
