// src/components/shared/layout/sidebar-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/stores/app-store";
import {
  LayoutDashboard,
  Wheat,
  BookOpen,
  Factory,
  Gauge,
  Calendar,
  AlertTriangle,
  PieChart,
  TrendingUp,
  FileText,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Składniki i Magazyn", href: "/ingredients", icon: Wheat },
  { name: "Receptury", href: "/recipes", icon: BookOpen },
  { name: "Produkcja", href: "/production", icon: Factory },
  { name: "Miksery", href: "/mixers", icon: Gauge },
  { name: "Plany Produkcji", href: "/plans", icon: Calendar },
  { name: "Straty", href: "/losses", icon: AlertTriangle },
  { name: "Food Cost", href: "/food-cost", icon: PieChart },
  { name: "Yield", href: "/yield", icon: TrendingUp },
  { name: "Raporty", href: "/reports", icon: FileText },
  { name: "Ustawienia", href: "/settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {sidebarOpen && (
          <span className="font-bold text-lg text-primary">🍕 PD ERP</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-md hover:bg-accent"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              !sidebarOpen && "rotate-180"
            )}
          />
        </button>
      </div>

      {/* Nawigacja */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}