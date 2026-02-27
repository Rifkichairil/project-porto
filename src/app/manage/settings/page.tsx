"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/components/ui/Toast";
import { 
  getSettings, 
  saveSettings, 
  validateWhatsAppNumber,
  SiteSettings 
} from "@/lib/settings";
import { MessageCircle, Mail, Globe, Check, Eye } from "lucide-react";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useI18n();
  const { showToast } = useToast();
  
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SiteSettings, string>>>({});

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/manage");
    }
  }, [status, router]);

  const handleChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate WhatsApp number
    const newErrors: Partial<Record<keyof SiteSettings, string>> = {};
    if (!validateWhatsAppNumber(settings.whatsappNumber)) {
      newErrors.whatsappNumber = t("settings.errors.whatsappInvalid");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      saveSettings(settings);
      showToast(t("settings.saved"), "success");
    } catch {
      showToast(t("settings.error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar user={session.user} />
      <main className="lg:ml-64 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-900">{t("settings.title")}</h1>
            <p className="text-sm text-zinc-500 mt-1">{t("settings.subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* WhatsApp Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">{t("settings.whatsapp.title")}</h2>
                    <p className="text-sm text-zinc-500">{t("settings.whatsapp.subtitle")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("settings.whatsapp.number")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                      +
                    </span>
                    <input
                      type="text"
                      value={settings.whatsappNumber}
                      onChange={(e) => handleChange("whatsappNumber", e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="6281234567890"
                      className="pl-8"
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.whatsappNumber}</p>
                  )}
                  <p className="mt-1 text-xs text-zinc-500">
                    {t("settings.whatsapp.numberHint")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("settings.whatsapp.message")}
                  </label>
                  <textarea
                    value={settings.whatsappMessage}
                    onChange={(e) => handleChange("whatsappMessage", e.target.value)}
                    rows={3}
                    placeholder={t("settings.whatsapp.messagePlaceholder")}
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    {t("settings.whatsapp.messageHint")}
                  </p>
                </div>

                {/* Preview */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <p className="text-sm font-medium text-zinc-900 mb-2">{t("settings.preview")}</p>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("settings.testLink")}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Contact Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">{t("settings.contact.title")}</h2>
                    <p className="text-sm text-zinc-500">{t("settings.contact.subtitle")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("settings.contact.email")}
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="hello@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Site Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">{t("settings.site.title")}</h2>
                    <p className="text-sm text-zinc-500">{t("settings.site.subtitle")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("settings.site.name")}
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    placeholder="DevFolio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    {t("settings.site.description")}
                  </label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) => handleChange("siteDescription", e.target.value)}
                    placeholder="Laravel Developer & Solusi Digital"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Display Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-900">{t("settings.display.title")}</h2>
                    <p className="text-sm text-zinc-500">{t("settings.display.subtitle")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Demo Button Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-zinc-900">
                      {t("settings.display.demoButton")}
                    </label>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      {t("settings.display.demoButtonHint")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange("showDemoButton", !settings.showDemoButton)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showDemoButton ? "bg-zinc-900" : "bg-zinc-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showDemoButton ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Price Display Mode */}
                <div className="space-y-3 pt-4 border-t border-zinc-100">
                  <label className="block text-sm font-medium text-zinc-900">
                    {t("settings.display.priceMode")}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceMode"
                        value="show"
                        checked={settings.priceDisplayMode === "show"}
                        onChange={(e) => handleChange("priceDisplayMode", e.target.value)}
                        className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                      />
                      <span className="text-sm text-zinc-700">{t("settings.display.priceShow")}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="priceMode"
                        value="hide"
                        checked={settings.priceDisplayMode === "hide"}
                        onChange={(e) => handleChange("priceDisplayMode", e.target.value)}
                        className="w-4 h-4 text-zinc-900 border-zinc-300 focus:ring-zinc-900"
                      />
                      <span className="text-sm text-zinc-700">{t("settings.display.priceHide")}</span>
                    </label>
                  </div>
                  
                  {/* Custom Text Input */}
                  {settings.priceDisplayMode === "hide" && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-zinc-700 mb-1">
                        {t("settings.display.priceCustomText")}
                      </label>
                      <input
                        type="text"
                        value={settings.priceCustomText}
                        onChange={(e) => handleChange("priceCustomText", e.target.value)}
                        placeholder={t("settings.display.priceCustomTextPlaceholder")}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" isLoading={isLoading}>
                <Check className="w-4 h-4 mr-2" />
                {t("settings.save")}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
