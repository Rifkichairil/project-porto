"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function LoginForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("admin.login.error"));
      } else {
        router.push("/manage/dashboard");
        router.refresh();
      }
    } catch {
      setError(t("admin.login.error.general"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold">D</span>
        </div>
        <h1 className="text-xl font-semibold text-zinc-900">{t("admin.login.title")}</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {t("admin.login.subtitle")}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              {t("admin.login.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              {t("admin.login.password")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t("admin.login.button")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
