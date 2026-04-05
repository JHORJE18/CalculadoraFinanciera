import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { BottomNav } from "@/components/BottomNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Percent } from "lucide-react";

export default function DescuentosPage() {
  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 z-20 glass-surface border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Percent className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Calculadora de Descuentos</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <DiscountCalculator />
      </main>

      <BottomNav />
    </div>
  );
}