// src/components/shared/ingredients/purchase-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";

const purchaseSchema = z.object({
  supplier: z.string().min(1, "Wymagane"),
  batch_number: z.string().optional(),
  purchase_date: z.string().min(1, "Wymagane"),
  quantity: z.coerce.number().min(0.01, "Minimum 0.01"),
  purchase_price_net: z.coerce.number().min(0, "Minimum 0"),
  purchase_price_gross: z.coerce.number().min(0, "Minimum 0"),
});

type PurchaseValues = z.infer<typeof purchaseSchema>;

interface PurchaseFormProps {
  ingredientId: string;
  ingredientName: string;
  onSubmit: (ingredientId: string, data: PurchaseValues) => void;
}

export function PurchaseForm({ ingredientId, ingredientName, onSubmit }: PurchaseFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<PurchaseValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      supplier: "",
      batch_number: "",
      purchase_date: new Date().toISOString().split("T")[0],
      quantity: 0,
      purchase_price_net: 0,
      purchase_price_gross: 0,
    },
  });

  const handleSubmit = (data: PurchaseValues) => {
    onSubmit(ingredientId, data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" /> Dodaj dostawę
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj dostawę: {ingredientName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dostawca</FormLabel>
                  <FormControl>
                    <Input placeholder="Nazwa dostawcy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="batch_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numer partii</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcjonalnie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purchase_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data dostawy</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ilość</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purchase_price_net"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena netto (zł)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purchase_price_gross"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena brutto (zł)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Zapisz dostawę
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}