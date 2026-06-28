// src/app/(dashboard)/layout.tsx
import { SidebarNav } from "@/components/shared/layout/sidebar-nav";
import { Header } from "@/components/shared/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="lg:pl-64 transition-all duration-300">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}