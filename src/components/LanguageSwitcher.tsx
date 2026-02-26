"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "default" | "minimal";
}

export function LanguageSwitcher({ variant = "default" }: LanguageSwitcherProps) {
  const { lang, setLang } = useI18n();

  if (variant === "minimal") {
    return (
      <div className="flex items-center bg-zinc-100 rounded-lg p-1">
        <button
          onClick={() => setLang("id")}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md transition-all",
            lang === "id"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          ID
        </button>
        <button
          onClick={() => setLang("en")}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md transition-all",
            lang === "en"
              ? "bg-white text-zinc-900 shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          )}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 bg-zinc-100 rounded-full p-1">
      <button
        onClick={() => setLang("id")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-all",
          lang === "id"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        Indonesia
      </button>
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-all",
          lang === "en"
            ? "bg-white text-zinc-900 shadow-sm"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        English
      </button>
    </div>
  );
}
