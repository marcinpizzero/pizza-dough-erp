// src/app/(dashboard)/ingredients/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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
import { PurchaseForm } from "@/components/shared/ingredients/purchase-form";
import { createClient } from "@/lib/supabase/client";
import { calculateWAC } from "@/lib/utils/calculations";

interface IngredientWithCost {
  id: string;
  name: string;
  category: string;
  unit: string;
  current_stock: number;
  minimum_stock: number;
  current_wac: number;
  stock_value: number;
}

const categoryLabels: Record<string, string> = {
  mąka: "Mąka",
  woda: "Woda",
  sól: "Sól",
  drożdże: "Drożdże",
  oliwa: "Oliwa",
  cukier: "Cukier",
  dodatki: "Dodatki",
};

export default function IngredientsPage() {
  const [category, setCategory] = useState<string>("all");
  const [ingredients, setIngredients] = useState<IngredientWithCost[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadIngredients = useCallback(async () => {
    setLoading(true);
    const { data: ingData } = await supabase.from("ingredients").select("*").order("name");
    const enriched = await Promise.all(
      (ingData || []).map(async (ing: Record<string, unknown>) => {
        const { data: purchases } = await supabase
          .from("ingredient_purchases")
          .select("*")
          .eq("ingredient_id", ing.id);
        const wac = calculateWAC((purchases || []) as { quantity: number; purchase_price_net: number }[]);
        return {
          ...ing,
          current_wac: wac,
          stock_value: ((ing.current_stock as number) || 0) * wac,
        } as IngredientWithCost;
      })
    );
    setIngredients(enriched);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadIngredients();
  }, [loadIngredients]);

  const filtered = category === "all" ? ingredients : ingredients.filter((i) => i.category === category);
  const totalStockValue = ingredients.reduce((sum, i) => sum + i.stock_value, 0);

  const handlePurchase = async (ingredientId: string, data: Record<string, unknown>) => {
    await supabase.from("ingredient_purchases").insert({
      tenant_id: "00000000-0000-0000-0000-000000000001",
      ingredient_id: ingredientId,
      supplier: data.supplier as string,
      batch_number: (data.batch_number as string) || null,
      purchase_date: data.purchase_date as string,
      quantity: data.quantity as number,
      purchase_price_net: data.purchase_price_net as number,
      purchase_price_gross: data.purchase_price_gross as number,
    });

    const ingredient = ingredients.find((i) => i.id === ingredientId);
    if (ingredient) {
      await supabase
        .from("ingredients")
        .update({ current_stock: ingredient.current_stock + (data.quantity as number) })
        .eq("id", ingredientId);
    }

    loadIngredients();
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Ładowanie składników...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Składniki i Magazyn</h1>
          <p className="text-muted-foreground mt-1">
            Wartość magazynu: <strong>{totalStockValue.toFixed(2)} zł</strong>
          </p>
        </div>
        <Select value={category} onValueChange={(val) => setCategory(val || "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kategoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="mąka">Mąka</SelectItem>
            <SelectItem value="woda">Woda</SelectItem>
            <SelectItem value="sól">Sól</SelectItem>
            <SelectItem value="drożdże">Drożdże</SelectItem>
            <SelectItem value="oliwa">Oliwa</SelectItem>
            <SelectItem value="cukier">Cukier</SelectItem>
            <SelectItem value="dodatki">Dodatki</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stan magazynowy</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Kategoria</TableHead>
                <TableHead>Stan</TableHead>
                <TableHead>Min. stan</TableHead>
                <TableHead>Śr. koszt</TableHead>
                <TableHead>Wartość</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{categoryLabels[ingredient.category]}</Badge>
                  </TableCell>
                  <TableCell>{ingredient.current_stock} {ingredient.unit}</TableCell>
                  <TableCell>{ingredient.minimum_stock} {ingredient.unit}</TableCell>
                  <TableCell>{ingredient.current_wac.toFixed(2)} zł</TableCell>
                  <TableCell>{ingredient.stock_value.toFixed(2)} zł</TableCell>
                  <TableCell>
                    <PurchaseForm
                      ingredientId={ingredient.id}
                      ingredientName={ingredient.name}
                      onSubmit={handlePurchase}
                    />
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