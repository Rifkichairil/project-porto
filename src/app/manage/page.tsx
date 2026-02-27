"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/manage/dashboard");
    }
  }, [session, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    );
  }

  // If authenticated, will redirect in useEffect
  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
