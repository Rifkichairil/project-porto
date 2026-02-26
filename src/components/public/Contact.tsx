"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";
import { getSettings, generateWhatsAppLink } from "@/lib/settings";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { t } = useI18n();
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/6281234567890");
  const [whatsappNumber, setWhatsappNumber] = useState("+62 812-3456-7890");
  const [email, setEmail] = useState("hello@devfolio.com");

  useEffect(() => {
    const settings = getSettings();
    setWhatsappLink(generateWhatsAppLink(undefined, settings));
    // Format number for display
    const num = settings.whatsappNumber;
    if (num.startsWith("62")) {
      setWhatsappNumber(`+62 ${num.slice(2, 5)}-${num.slice(5, 9)}-${num.slice(9)}`);
    } else {
      setWhatsappNumber(num);
    }
    setEmail(settings.email);
  }, []);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: t("contact.whatsapp.desc"),
      value: whatsappNumber,
      href: whatsappLink,
      primary: true,
    },
    {
      icon: Mail,
      title: "Email",
      description: t("contact.email.desc"),
      value: email,
      href: `mailto:${email}`,
      primary: false,
    },
    {
      icon: MapPin,
      title: t("contact.location.desc"),
      description: t("contact.location.desc"),
      value: "Indonesia",
      href: "#",
      primary: false,
    },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
            {t("contact.section")}
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight">
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-zinc-500">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card
                hover
                className={cn(
                  "h-full transition-all duration-300",
                  method.primary && "ring-1 ring-zinc-900"
                )}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4",
                      method.primary
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600"
                    )}
                  >
                    <method.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-zinc-900">{method.title}</h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-zinc-900 mt-3">
                    {method.value}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center">
            <p className="text-zinc-500 mb-4">
              {t("contact.cta.title")}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="group">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("contact.cta.button")}
              </Button>
            </a>
            <p className="mt-3 text-xs text-zinc-400">
              {t("contact.cta.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
