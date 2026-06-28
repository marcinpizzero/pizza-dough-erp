// src/components/shared/layout/header.tsx
"use client";

import { useAppStore } from "@/lib/stores/app-store";
import { ThemeToggle } from "./theme-toggle";
import { signOut } from "@/app/auth/actions";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const currentUser = useAppStore((s) => s.currentUser);
  const currentTenant = useAppStore((s) => s.currentTenant);
  const currentRole = useAppStore((s) => s.currentRole);
  const unreadAlertsCount = useAppStore((s) => s.unreadAlertsCount);

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6">
      <div>
        <h1 className="text-sm font-medium text-muted-foreground">
          {currentTenant?.name ?? "PIZZA DOUGH ERP"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadAlertsCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
            >
              {unreadAlertsCount}
            </Badge>
          )}
        </Button>

        <ThemeToggle />

        <Button variant="ghost" size="icon" onClick={() => signOut()} title="Wyloguj">
          <LogOut className="h-5 w-5" />
        </Button>

        {currentUser && (
          <div className="text-right">
            <p className="text-sm font-medium">{currentUser.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{currentRole?.toLowerCase()}</p>
          </div>
        )}
      </div>
    </header>
  );
}