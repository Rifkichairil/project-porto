"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

interface AdminSidebarProps {
  user: any;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  const navigation = [
    { name: t("admin.sidebar.dashboard"), href: "/admin/dashboard", icon: LayoutDashboard },
    { name: t("admin.sidebar.products"), href: "/admin/products", icon: Package },
    { name: t("admin.sidebar.settings"), href: "/admin/settings", icon: Settings },
  ];

  // Helper function to check if menu is active
  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      // Only active if exactly /admin/dashboard
      return pathname === "/admin/dashboard";
    }
    if (href === "/admin/products") {
      // Active for /admin/products and sub-routes like /admin/products/new
      return pathname === "/admin/products" || pathname.startsWith("/admin/products/");
    }
    return pathname === href;
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin" });
  };

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/50">
        <div className="flex items-center justify-between px-4 h-14">
          <span className="font-semibold text-zinc-900">Admin</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-zinc-950/20 backdrop-blur-sm">
          <div className="absolute top-14 left-0 right-0 bg-white border-b border-zinc-200">
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-zinc-100">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {t("admin.sidebar.logout")}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:bg-white lg:border-r lg:border-zinc-200">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 h-16 px-6 border-b border-zinc-100">
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-zinc-900">Admin</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-zinc-100">
            <div className="mb-3 px-3">
              <p className="text-sm font-medium text-zinc-900">{user?.name || "Admin"}</p>
              <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t("admin.sidebar.logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className="hidden lg:block lg:w-64" />
    </>
  );
}
