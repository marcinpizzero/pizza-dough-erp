// src/components/shared/recipes/recipe-form.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus } from "lucide-react";

const recipeSchema = z.object({
  name: z.string().min(1, "Wymagane"),
  description: z.string().optional(),
  hydration_pct: z.coerce.number().min(50).max(80),
  salt_pct: z.coerce.number().min(0).max(5),
  yeast_pct: z.coerce.number().min(0).max(2),
  oil_pct: z.coerce.number().min(0).max(10),
  dough_temp: z.coerce.number().min(15).max(30).optional(),
  room_temp: z.coerce.number().min(15).max(35).optional(),
  fermentation_time_hours: z.coerce.number().min(0).max(72).optional(),
});

type RecipeValues = z.infer<typeof recipeSchema>;

interface RecipeFormProps {
  onSubmit: (data: RecipeValues) => void;
}

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<RecipeValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      hydration_pct: 65,
      salt_pct: 2.5,
      yeast_pct: 0.1,
      oil_pct: 1.5,
      dough_temp: 22,
      room_temp: 20,
      fermentation_time_hours: 24,
    },
  });

  const handleSubmit = (data: RecipeValues) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> Nowa receptura
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nowa receptura</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa</FormLabel>
                  <FormControl>
                    <Input placeholder="np. Neapolitana 24h" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Opcjonalny opis..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hydration_pct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hydratacja (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salt_pct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sól (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yeast_pct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drożdże (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="oil_pct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oliwa (%)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dough_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temp. ciasta (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="room_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Temp. pomieszczenia (°C)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fermentation_time_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Czas fermentacji (h)</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Zapisz recepturę
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}