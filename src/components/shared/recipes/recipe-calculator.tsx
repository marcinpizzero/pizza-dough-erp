// src/components/shared/recipes/recipe-calculator.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateDoughFromBalls, calculateIngredientsForDough } from "@/lib/utils/calculations";

interface RecipeCalculatorProps {
  hydrationPct: number;
  saltPct: number;
  yeastPct: number;
  oilPct: number;
}

export function RecipeCalculator({ hydrationPct, saltPct, yeastPct, oilPct }: RecipeCalculatorProps) {
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
    const ingredients = calculateIngredientsForDough(doughKg, hydrationPct, saltPct, yeastPct, oilPct);
    setResult({ doughKg, ...ingredients });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kalkulator składników</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <Button onClick={calculate} className="w-full">
          Oblicz
        </Button>

        {result && (
          <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
            <p>Całkowita masa ciasta: <strong>{result.doughKg.toFixed(2)} kg</strong></p>
            <p>Mąka: <strong>{result.flourKg.toFixed(2)} kg</strong></p>
            <p>Woda: <strong>{result.waterL.toFixed(2)} l</strong></p>
            <p>Sól: <strong>{result.saltKg.toFixed(3)} kg</strong></p>
            <p>Drożdże: <strong>{result.yeastKg.toFixed(3)} kg</strong></p>
            <p>Oliwa: <strong>{result.oilL.toFixed(3)} l</strong></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}