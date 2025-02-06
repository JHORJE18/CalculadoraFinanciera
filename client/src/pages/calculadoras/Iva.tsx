import { VatCalculator } from "@/components/calculators/VatCalculator";
import { BottomNav } from "@/components/BottomNav";

export default function IvaPage() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Calculadora de IVA</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <VatCalculator />
      </main>

      <BottomNav />
    </div>
  );
}
