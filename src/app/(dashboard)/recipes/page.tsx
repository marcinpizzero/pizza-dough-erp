// src/app/(dashboard)/recipes/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecipeForm } from "@/components/shared/recipes/recipe-form";
import { RecipeCalculator } from "@/components/shared/recipes/recipe-calculator";

const mockRecipes = [
  { id: "1", name: "Neapolitana 24h", hydration_pct: 65, salt_pct: 2.5, yeast_pct: 0.1, oil_pct: 1.5, fermentation_time_hours: 24, dough_temp: 22, room_temp: 20 },
  { id: "2", name: "Neapolitana 48h", hydration_pct: 68, salt_pct: 2.5, yeast_pct: 0.05, oil_pct: 1.5, fermentation_time_hours: 48, dough_temp: 21, room_temp: 18 },
  { id: "3", name: "Rzymska", hydration_pct: 58, salt_pct: 2.0, yeast_pct: 0.2, oil_pct: 2.5, fermentation_time_hours: 8, dough_temp: 22, room_temp: 22 },
  { id: "4", name: "Biga", hydration_pct: 70, salt_pct: 2.5, yeast_pct: 0.08, oil_pct: 2.0, fermentation_time_hours: 36, dough_temp: 20, room_temp: 16 },
  { id: "5", name: "Poolish", hydration_pct: 65, salt_pct: 2.0, yeast_pct: 0.1, oil_pct: 2.0, fermentation_time_hours: 24, dough_temp: 22, room_temp: 20 },
];

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState(mockRecipes[0]);

  const handleCreateRecipe = (data: Record<string, unknown>) => {
    alert(`Receptura zapisana! Dane: ${JSON.stringify(data)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Receptury</h1>
        <RecipeForm onSubmit={handleCreateRecipe} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista receptur */}
        <div className="lg:col-span-1 space-y-3">
          {mockRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className={`cursor-pointer transition-colors hover:border-primary ${
                selectedRecipe.id === recipe.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{recipe.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-1 text-sm">
                <p>Hydratacja: <Badge variant="outline">{recipe.hydration_pct}%</Badge></p>
                <p>Sól: {recipe.salt_pct}% | Drożdże: {recipe.yeast_pct}%</p>
                <p>Oliwa: {recipe.oil_pct}%</p>
                <p>Fermentacja: {recipe.fermentation_time_hours}h</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Szczegóły i kalkulator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedRecipe.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Hydratacja:</span>
                  <p className="font-bold">{selectedRecipe.hydration_pct}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sól:</span>
                  <p className="font-bold">{selectedRecipe.salt_pct}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Drożdże:</span>
                  <p className="font-bold">{selectedRecipe.yeast_pct}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Oliwa:</span>
                  <p className="font-bold">{selectedRecipe.oil_pct}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Temp. ciasta:</span>
                  <p className="font-bold">{selectedRecipe.dough_temp}°C</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Fermentacja:</span>
                  <p className="font-bold">{selectedRecipe.fermentation_time_hours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <RecipeCalculator
            hydrationPct={selectedRecipe.hydration_pct}
            saltPct={selectedRecipe.salt_pct}
            yeastPct={selectedRecipe.yeast_pct}
            oilPct={selectedRecipe.oil_pct}
          />
        </div>
      </div>
    </div>
  );
}