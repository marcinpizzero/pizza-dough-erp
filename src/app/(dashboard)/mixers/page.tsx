// src/app/(dashboard)/mixers/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { calculateMixerBatches } from "@/lib/utils/calculations";
import { Gauge, Plus } from "lucide-react";

const mockMixers = [
  { id: "1", name: "Spiralny 40", manufacturer: "PizzaGroup", model: "SP40", bowl_capacity_kg: 40, safe_utilization_pct: 80 },
  { id: "2", name: "Spiralny 80", manufacturer: "DoughMaster", model: "DM80", bowl_capacity_kg: 80, safe_utilization_pct: 75 },
];

export default function MixersPage() {
  const [selectedMixer, setSelectedMixer] = useState(mockMixers[0]);
  const [totalDough, setTotalDough] = useState(100);
  const [utilization, setUtilization] = useState(selectedMixer.safe_utilization_pct);
  const [batchResult, setBatchResult] = useState<{
    batches: number;
    doughPerBatchKg: number;
  } | null>(null);

  const calculateBatches = () => {
    const result = calculateMixerBatches(totalDough, selectedMixer.bowl_capacity_kg, utilization);
    setBatchResult(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Miksery</h1>
        <Button>
          <Plus className="h-4 w-4 mr-1" /> Dodaj mikser
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista mikserów */}
        <div className="space-y-3">
          {mockMixers.map((mixer) => (
            <Card
              key={mixer.id}
              className={`cursor-pointer transition-colors hover:border-primary ${
                selectedMixer.id === mixer.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => {
                setSelectedMixer(mixer);
                setUtilization(mixer.safe_utilization_pct);
                setBatchResult(null);
              }}
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gauge className="h-5 w-5" /> {mixer.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm space-y-1">
                <p>{mixer.manufacturer} {mixer.model}</p>
                <p>Pojemność misy: <Badge variant="outline">{mixer.bowl_capacity_kg} kg</Badge></p>
                <p>Bezp. wykorzystanie: {mixer.safe_utilization_pct}%</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Kalkulator wsadów */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Kalkulator wsadów: {selectedMixer.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Całkowita masa ciasta (kg)</Label>
                  <Input
                    type="number"
                    value={totalDough}
                    onChange={(e) => setTotalDough(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Pojemność misy</Label>
                  <Input
                    type="number"
                    value={selectedMixer.bowl_capacity_kg}
                    disabled
                  />
                </div>
              </div>

              <div>
                <Label>Bezpieczne wykorzystanie: {utilization}%</Label>
                <Slider
                  value={[utilization]}
                  onValueChange={([val]) => setUtilization(val)}
                  min={50}
                  max={95}
                  step={5}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maksymalny wsad: {((selectedMixer.bowl_capacity_kg * utilization) / 100).toFixed(1)} kg
                </p>
              </div>

              <Button onClick={calculateBatches} className="w-full">
                Oblicz liczbę wsadów
              </Button>

              {batchResult && (
                <div className="bg-muted rounded-lg p-4 text-center">
                  <p className="text-lg">
                    Potrzebujesz{" "}
                    <strong className="text-2xl">{batchResult.batches}</strong>{" "}
                    {batchResult.batches === 1 ? "wsadu" : "wsadów"}
                  </p>
                  <p className="text-muted-foreground">
                    po <strong>{batchResult.doughPerBatchKg.toFixed(1)} kg</strong> każdy
                  </p>
                  {batchResult.batches > 1 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      (ostatni wsad może być mniejszy – dostosuj ręcznie)
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}