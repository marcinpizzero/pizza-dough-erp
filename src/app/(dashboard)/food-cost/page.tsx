// src/app/(dashboard)/food-cost/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateFoodCostPercent, getFoodCostColorClass } from "@/lib/utils/calculations";
import { PieChart } from "lucide-react";

export default function FoodCostPage() {
  const [ingredientCost, setIngredientCost] = useState(5.20);
  const [sellingPrice, setSellingPrice] = useState(32);
  const [fcPercent, setFcPercent] = useState<number | null>(null);

  const calculate = () => {
    setFcPercent(calculateFoodCostPercent(ingredientCost, sellingPrice));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Food Cost</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" /> Kalkulator Food Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Koszt składników (zł)</Label>
              <Input
                type="number"
                step="0.01"
                value={ingredientCost}
                onChange={(e) => setIngredientCost(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Cena sprzedaży (zł)</Label>
              <Input
                type="number"
                step="0.01"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
              />
            </div>
            <Button onClick={calculate} className="w-full">
              Oblicz Food Cost
            </Button>

            {fcPercent !== null && (
              <div className={`rounded-lg p-6 text-center ${getFoodCostColorClass(fcPercent)}`}>
                <p className="text-sm uppercase tracking-wider">Food Cost</p>
                <p className="text-4xl font-bold mt-1">{fcPercent.toFixed(2)}%</p>
                <p className="text-sm mt-2">
                  Koszt: {ingredientCost.toFixed(2)} zł / Cena: {sellingPrice.toFixed(2)} zł
                </p>
                <p className="text-sm mt-1">
                  Marża: {(sellingPrice - ingredientCost).toFixed(2)} zł
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wskazania</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 text-green-800">
              <p className="font-bold">&lt; 20% — Świetnie!</p>
              <p className="text-sm">Food cost pod kontrolą, wysoka rentowność.</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 text-yellow-800">
              <p className="font-bold">20–30% — Umiarkowanie</p>
              <p className="text-sm">Standard w gastronomii. Szukaj optymalizacji.</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50 text-red-800">
              <p className="font-bold">&gt; 30% — Uwaga!</p>
              <p className="text-sm">Zbyt wysoki koszt składników. Przeanalizuj recepturę i ceny zakupu.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}