// src/app/(dashboard)/reports/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Wheat,
  Factory,
  PieChart,
  AlertTriangle,
  TrendingUp,
  Users,
  Download,
} from "lucide-react";

const reports = [
  { title: "Raport produkcji", description: "Partie, kulki, wydajność", icon: Factory, color: "bg-blue-50 text-blue-700" },
  { title: "Raport magazynowy", description: "Stany, dostawy, WAC", icon: Wheat, color: "bg-amber-50 text-amber-700" },
  { title: "Raport Food Cost", description: "Koszty, marże, rentowność", icon: PieChart, color: "bg-green-50 text-green-700" },
  { title: "Raport strat", description: "Straty wg typu i okresu", icon: AlertTriangle, color: "bg-red-50 text-red-700" },
  { title: "Raport wydajności", description: "Yield Score, trendy", icon: TrendingUp, color: "bg-purple-50 text-purple-700" },
  { title: "Raport operatorów", description: "Ranking, porównanie", icon: Users, color: "bg-teal-50 text-teal-700" },
];

export default function ReportsPage() {
  const handleExport = (format: string, reportName: string) => {
    alert(`Eksport raportu "${reportName}" do ${format} – gotowe!`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Raporty</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.title}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className={`p-2 rounded-lg ${report.color}`}>
                <report.icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("PDF", report.title)}
                >
                  <Download className="h-3 w-3 mr-1" /> PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("Excel", report.title)}
                >
                  <Download className="h-3 w-3 mr-1" /> Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport("CSV", report.title)}
                >
                  <Download className="h-3 w-3 mr-1" /> CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}