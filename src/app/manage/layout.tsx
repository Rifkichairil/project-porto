import { ReactNode } from "react";

// Layout sederhana untuk admin area
// Auth check dilakukan di masing-masing page
export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
