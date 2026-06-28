// src/app/(dashboard)/yield/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { calculateYieldScore, getYieldColorClass, getYieldLabel } from "@/lib/utils/calculations";
import { TrendingUp, Users } from "lucide-react";

const mockYieldData = {
  flour_purchased_kg: 500,
  theoretical_balls: 1851,
  actual_balls: 1790,
  planned_dough_kg: 490,
  actual_dough_kg: 474,
};

const mockOperators = [
  { name: "Jan Kowalski", avg_loss_pct: 1.2, avg_yield_pct: 98.8, batch_count: 45, total_loss_cost: 320 },
  { name: "Anna Nowak", avg_loss_pct: 2.8, avg_yield_pct: 97.2, batch_count: 38, total_loss_cost: 480 },
  { name: "Piotr Wiśniewski", avg_loss_pct: 1.8, avg_yield_pct: 98.2, batch_count: 52, total_loss_cost: 390 },
];

export default function YieldPage() {
  const flourYield = calculateYieldScore(mockYieldData.actual_dough_kg, mockYieldData.planned_dough_kg);
  const ballYield = calculateYieldScore(mockYieldData.actual_balls, mockYieldData.theoretical_balls);
  const overallYield = (flourYield + ballYield) / 2;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Yield Management</h1>

      {/* Główny Yield Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={getYieldColorClass(overallYield)}>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider">Yield Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{overallYield.toFixed(1)}%</p>
            <p className="text-sm mt-1">{getYieldLabel(overallYield)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider">Wydajność mąki</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{flourYield.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">
              Plan: {mockYieldData.planned_dough_kg} kg / Wyk.: {mockYieldData.actual_dough_kg} kg
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-wider">Wydajność kulek</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{ballYield.toFixed(1)}%</p>
            <p className="text-sm text-muted-foreground">
              Plan: {mockYieldData.theoretical_balls} szt. / Wyk.: {mockYieldData.actual_balls} szt.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ranking operatorów */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" /> Ranking operatorów
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operator</TableHead>
                <TableHead>Śr. strata %</TableHead>
                <TableHead>Śr. wydajność %</TableHead>
                <TableHead>Partie</TableHead>
                <TableHead>Koszt strat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOperators.map((op) => (
                <TableRow key={op.name}>
                  <TableCell className="font-medium">{op.name}</TableCell>
                  <TableCell>
                    <Badge variant={op.avg_loss_pct < 2 ? "default" : "destructive"}>
                      {op.avg_loss_pct}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={getYieldColorClass(op.avg_yield_pct)}>
                      {op.avg_yield_pct}%
                    </span>
                  </TableCell>
                  <TableCell>{op.batch_count}</TableCell>
                  <TableCell className="text-destructive font-bold">
                    {op.total_loss_cost.toFixed(2)} zł
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}