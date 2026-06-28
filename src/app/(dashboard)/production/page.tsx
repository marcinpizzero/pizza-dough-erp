// src/app/(dashboard)/production/page.tsx
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateDoughFromBalls, calculateIngredientsForDough } from "@/lib/utils/calculations";
import { Plus, Play, CheckCircle, XCircle } from "lucide-react";

const mockBatches = [
  { id: "1", recipe_name: "Neapolitana 24h", operator: "Jan Kowalski", mixer: "Spiralny 40", planned_balls: 250, ball_weight_g: 270, planned_dough_kg: 67.5, actual_balls: 248, actual_dough_kg: 66.96, status: "completed" },
  { id: "2", recipe_name: "Rzymska", operator: "Anna Nowak", mixer: "Spiralny 40", planned_balls: 200, ball_weight_g: 250, planned_dough_kg: 50, actual_balls: null, actual_dough_kg: null, status: "in_progress" },
  { id: "3", recipe_name: "Neapolitana 48h", operator: "Jan Kowalski", mixer: "Spiralny 80", planned_balls: 300, ball_weight_g: 270, planned_dough_kg: 81, actual_balls: null, actual_dough_kg: null, status: "planned" },
];

const mockRecipes = [
  { id: "1", name: "Neapolitana 24h", hydration_pct: 65, salt_pct: 2.5, yeast_pct: 0.1, oil_pct: 1.5 },
  { id: "2", name: "Neapolitana 48h", hydration_pct: 68, salt_pct: 2.5, yeast_pct: 0.05, oil_pct: 1.5 },
  { id: "3", name: "Rzymska", hydration_pct: 58, salt_pct: 2.0, yeast_pct: 0.2, oil_pct: 2.5 },
];

const statusLabels: Record<string, string> = {
  planned: "Zaplanowana",
  in_progress: "W trakcie",
  completed: "Zakończona",
  cancelled: "Anulowana",
};

const statusColors: Record<string, string> = {
  planned: "bg-blue-100 text-blue-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function ProductionPage() {
  const [selectedRecipe, setSelectedRecipe] = useState(mockRecipes[0]);
  const [ballCount, setBallCount] = useState(250);
  const [ballWeight, setBallWeight] = useState(270);
  const [result, setResult] = useState<{
    doughKg: number;
    flourKg: number;
    waterL: number;
    saltKg: number;
    yeastKg: number;
    oilL: number;
  } | null>(null);

  const calculate = () => {
    const doughKg = calculateDoughFromBalls(ballCount, ballWeight);
    const ingredients = calculateIngredientsForDough(
      doughKg,
      selectedRecipe.hydration_pct,
      selectedRecipe.salt_pct,
      selectedRecipe.yeast_pct,
      selectedRecipe.oil_pct
    );
    setResult({ doughKg, ...ingredients });
  };

  const handleCreateBatch = () => {
    if (!result) return;
    alert(`Partia utworzona!\nReceptura: ${selectedRecipe.name}\nKulki: ${ballCount} x ${ballWeight}g\nCiasto: ${result.doughKg.toFixed(2)} kg`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Produkcja</h1>

      {/* Kalkulator nowej partii */}
      <Card>
        <CardHeader>
          <CardTitle>Nowa partia produkcyjna</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Receptura</Label>
              <Select
                value={selectedRecipe.id}
                onValueChange={(v) => {
                  const recipe = mockRecipes.find((r) => r.id === v);
                  if (recipe) setSelectedRecipe(recipe);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockRecipes.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Liczba kulek</Label>
              <Input
                type="number"
                value={ballCount}
                onChange={(e) => setBallCount(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Masa kulki (g)</Label>
              <Input
                type="number"
                value={ballWeight}
                onChange={(e) => setBallWeight(Number(e.target.value))}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button onClick={calculate} className="flex-1">
                Oblicz
              </Button>
            </div>
          </div>

          {result && (
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Ciasto:</span>
                  <p className="font-bold">{result.doughKg.toFixed(2)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mąka:</span>
                  <p className="font-bold">{result.flourKg.toFixed(2)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Woda:</span>
                  <p className="font-bold">{result.waterL.toFixed(2)} l</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sól:</span>
                  <p className="font-bold">{result.saltKg.toFixed(3)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Drożdże:</span>
                  <p className="font-bold">{result.yeastKg.toFixed(3)} kg</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Oliwa:</span>
                  <p className="font-bold">{result.oilL.toFixed(3)} l</p>
                </div>
              </div>
              <Button onClick={handleCreateBatch} className="mt-4">
                <Plus className="h-4 w-4 mr-1" /> Utwórz partię
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista partii */}
      <Card>
        <CardHeader>
          <CardTitle>Partie produkcyjne</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receptura</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Mikser</TableHead>
                <TableHead>Plan (kulki)</TableHead>
                <TableHead>Wykonano</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.recipe_name}</TableCell>
                  <TableCell>{batch.operator}</TableCell>
                  <TableCell>{batch.mixer}</TableCell>
                  <TableCell>
                    {batch.planned_balls} × {batch.ball_weight_g}g = {batch.planned_dough_kg} kg
                  </TableCell>
                  <TableCell>
                    {batch.actual_balls !== null
                      ? `${batch.actual_balls} kul (${batch.actual_dough_kg} kg)`
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[batch.status]}>
                      {statusLabels[batch.status]}
                    </Badge>
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