import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { VatCalculator } from "@/components/calculators/VatCalculator";
import { BundleCalculator } from "@/components/calculators/BundleCalculator";
import { DiscountCalculator } from "@/components/calculators/DiscountCalculator";
import { FinanceCalculator } from "@/components/calculators/FinanceCalculator";
import { Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            <h1 className="text-xl font-bold">Financial Calculator</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <VatCalculator />
          <BundleCalculator />
          <DiscountCalculator />
          <FinanceCalculator />
        </div>
      </main>

      <footer className="border-t mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Financial Calculator PWA - All calculations are performed locally
        </div>
      </footer>
    </div>
  );
}
