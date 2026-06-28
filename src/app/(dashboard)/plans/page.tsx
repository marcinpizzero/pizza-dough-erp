// src/app/(dashboard)/plans/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const mockPlans = [
  { date: "2026-06-24", day: "Środa", planned_sales: 180, planned_balls: 270, planned_batches: 3 },
  { date: "2026-06-25", day: "Czwartek", planned_sales: 150, planned_balls: 220, planned_batches: 2 },
  { date: "2026-06-26", day: "Piątek", planned_sales: 250, planned_balls: 380, planned_batches: 4 },
  { date: "2026-06-27", day: "Sobota", planned_sales: 320, planned_balls: 480, planned_batches: 5 },
  { date: "2026-06-28", day: "Niedziela", planned_sales: 280, planned_balls: 420, planned_batches: 4 },
];

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Plany Produkcji</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPlans.map((plan) => (
          <Card key={plan.date}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" /> {plan.day}
              </CardTitle>
              <Badge variant="outline">{plan.date}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planowana sprzedaż:</span>
                <span className="font-bold">{plan.planned_sales} pizz</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kulki:</span>
                <span className="font-bold">{plan.planned_balls} szt.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Partie:</span>
                <span className="font-bold">{plan.planned_batches}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}