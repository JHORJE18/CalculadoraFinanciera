import { HipotecaCalculator } from "@/components/calculators/HipotecaCalculator";
import { BottomNav } from "@/components/BottomNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Landmark } from "lucide-react";

export default function HipotecaPage() {
  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-20 glass-surface border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Landmark className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Calculadora de Hipoteca</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <HipotecaCalculator />
      </main>

      <BottomNav />
    </div>
  );
}
