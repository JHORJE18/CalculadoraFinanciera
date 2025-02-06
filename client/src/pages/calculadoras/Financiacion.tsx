import { FinanceCalculator } from "@/components/calculators/FinanceCalculator";
import { BottomNav } from "@/components/BottomNav";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wallet } from "lucide-react";

export default function FinanciacionPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <h1 className="text-xl font-bold">Calculadora de Financiación</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FinanceCalculator />
      </main>

      <BottomNav />
    </div>
  );
}