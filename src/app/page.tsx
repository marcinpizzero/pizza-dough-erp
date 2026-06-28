// src/app/page.tsx
import { SidebarNav } from "@/components/shared/layout/sidebar-nav";
import { Header } from "@/components/shared/layout/header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <div className="lg:pl-64 transition-all duration-300">
        <Header />
        <main className="p-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Witaj w PIZZA DOUGH ERP LITE. Wybierz moduł z menu po lewej stronie.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Yield Score", "Koszt Strat", "Food Cost", "Produkcja"].map((title) => (
                <div
                  key={title}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                  <p className="text-2xl font-bold mt-2">--</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}