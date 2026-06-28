// src/app/(dashboard)/losses/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const mockLosses = [
  { id: "1", loss_type: "fermentation", quantity: 2.5, unit: "kg", cost_value: 45, reason: "Przefermentowane ciasto", created_at: "2026-06-23" },
  { id: "2", loss_type: "production", quantity: 8, unit: "szt", cost_value: 34, reason: "Kulki nieprzydatne", created_at: "2026-06-23" },
  { id: "3", loss_type: "inventory", quantity: 10, unit: "kg", cost_value: 28, reason: "Mąka zawilgocona", created_at: "2026-06-22" },
  { id: "4", loss_type: "ingredient", quantity: 0.5, unit: "kg", cost_value: 9, reason: "Drożdże nieaktywne", created_at: "2026-06-21" },
  { id: "5", loss_type: "financial", quantity: 3, unit: "kg", cost_value: 96, reason: "Oliwa rozlana", created_at: "2026-06-20" },
];

const typeLabels: Record<string, string> = {
  inventory: "Magazynowa",
  production: "Produkcyjna",
  fermentation: "Fermentacyjna",
  ingredient: "Składnikowa",
  financial: "Finansowa",
};

const typeColors: Record<string, string> = {
  inventory: "bg-purple-100 text-purple-800",
  production: "bg-blue-100 text-blue-800",
  fermentation: "bg-orange-100 text-orange-800",
  ingredient: "bg-yellow-100 text-yellow-800",
  financial: "bg-red-100 text-red-800",
};

export default function LossesPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = typeFilter === "all"
    ? mockLosses
    : mockLosses.filter((l) => l.loss_type === typeFilter);

  const totalCost = filtered.reduce((sum, l) => sum + l.cost_value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Straty</h1>
          <p className="text-muted-foreground mt-1">
            Koszt strat: <strong className="text-destructive">{totalCost.toFixed(2)} zł</strong>
          </p>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Typ straty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="inventory">Magazynowa</SelectItem>
            <SelectItem value="production">Produkcyjna</SelectItem>
            <SelectItem value="fermentation">Fermentacyjna</SelectItem>
            <SelectItem value="ingredient">Składnikowa</SelectItem>
            <SelectItem value="financial">Finansowa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Zarejestrowane straty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Ilość</TableHead>
                <TableHead>Koszt</TableHead>
                <TableHead>Przyczyna</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((loss) => (
                <TableRow key={loss.id}>
                  <TableCell>{loss.created_at}</TableCell>
                  <TableCell>
                    <Badge className={typeColors[loss.loss_type]}>
                      {typeLabels[loss.loss_type]}
                    </Badge>
                  </TableCell>
                  <TableCell>{loss.quantity} {loss.unit}</TableCell>
                  <TableCell className="text-destructive font-bold">
                    {loss.cost_value.toFixed(2)} zł
                  </TableCell>
                  <TableCell>{loss.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}