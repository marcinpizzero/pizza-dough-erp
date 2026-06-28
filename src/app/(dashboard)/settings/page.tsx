// src/app/(dashboard)/settings/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Users, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Ustawienia</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lokalizacja */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" /> Lokalizacja
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nazwa firmy</Label>
              <Input defaultValue="Moja Pizzeria" />
            </div>
            <div>
              <Label>Adres</Label>
              <Input defaultValue="ul. Przykładowa 1, Warszawa" />
            </div>
            <Button>Zapisz</Button>
          </CardContent>
        </Card>

        {/* Użytkownicy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Użytkownicy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">marcin.pizzero</p>
                <p className="text-xs text-muted-foreground">OWNER</p>
              </div>
              <Button variant="outline" size="sm">Edytuj</Button>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">manager@pizza.pl</p>
                <p className="text-xs text-muted-foreground">MANAGER</p>
              </div>
              <Button variant="outline" size="sm">Edytuj</Button>
            </div>
            <Button variant="outline" className="w-full">
              + Dodaj użytkownika
            </Button>
          </CardContent>
        </Card>

        {/* Alerty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" /> Progi alertów
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Min. stan mąki (kg)</Label>
              <Input className="w-24" defaultValue="50" />
            </div>
            <div className="flex justify-between items-center">
              <Label>Min. stan drożdży (kg)</Label>
              <Input className="w-24" defaultValue="0.5" />
            </div>
            <div className="flex justify-between items-center">
              <Label>Próg Yield Score (%)</Label>
              <Input className="w-24" defaultValue="95" />
            </div>
            <div className="flex justify-between items-center">
              <Label>Maks. strata mąki (%)</Label>
              <Input className="w-24" defaultValue="3" />
            </div>
            <Button>Zapisz progi</Button>
          </CardContent>
        </Card>

        {/* Bezpieczeństwo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Bezpieczeństwo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>✅ Row Level Security — włączone</p>
            <p>✅ Izolacja tenantów — aktywna</p>
            <p>✅ Szyfrowanie SSL/TLS</p>
            <p>✅ Backup automatyczny (Supabase)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}