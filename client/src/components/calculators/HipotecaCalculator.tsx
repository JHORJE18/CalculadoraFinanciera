import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import useCalculationHistory from "@/hooks/use-calculation-history";
import { analytics } from "@/lib/analytics";

export function HipotecaCalculator() {
  const { shareData } = useShare();
  const { addCalculation } = useCalculationHistory();

  const [price, setPrice] = useState<string>(() => localStorage.getItem('hipoteca-price') || '');
  const [downPaymentPct, setDownPaymentPct] = useState<string>(() => localStorage.getItem('hipoteca-down-pct') || '20');
  const [years, setYears] = useState<string>(() => localStorage.getItem('hipoteca-years') || '30');
  const [tin, setTin] = useState<string>(() => localStorage.getItem('hipoteca-tin') || '');

  useEffect(() => {
    localStorage.setItem('hipoteca-price', price);
    localStorage.setItem('hipoteca-down-pct', downPaymentPct);
    localStorage.setItem('hipoteca-years', years);
    localStorage.setItem('hipoteca-tin', tin);
  }, [price, downPaymentPct, years, tin]);

  const housePrice = Number(price) || 0;
  const downPct = Math.min(Math.max(Number(downPaymentPct) || 0, 0), 100);
  const downPayment = housePrice * (downPct / 100);
  const capital = housePrice - downPayment;
  const totalMonths = (Number(years) || 0) * 12;
  const annualRate = Number(tin) || 0;

  let monthlyPayment = 0;
  let totalInterest = 0;
  let totalCost = 0;

  if (capital > 0 && totalMonths > 0) {
    if (annualRate > 0) {
      const monthlyRate = annualRate / 100 / 12;
      monthlyPayment =
        (capital * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = capital / totalMonths;
    }
    totalInterest = monthlyPayment * totalMonths - capital;
    totalCost = capital + totalInterest;
  }

  const interestPct = housePrice > 0 ? (totalInterest / housePrice) * 100 : 0;

  const handleShare = () => {
    const shareText = `🏠 Cálculo de Hipoteca\n\nPrecio vivienda: ${housePrice.toFixed(2)}€\nEntrada (${downPct}%): ${downPayment.toFixed(2)}€\nCapital a financiar: ${capital.toFixed(2)}€\nPlazo: ${years} años | TIN: ${annualRate}%\nCuota mensual: ${monthlyPayment.toFixed(2)}€\nTotal intereses: ${totalInterest.toFixed(2)}€\nCoste total: ${totalCost.toFixed(2)}€\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;

    shareData({ title: "Cálculo de Hipoteca", text: shareText });
    addCalculation('mortgage', { price, downPaymentPct, years, tin }, { monthlyPayment, totalInterest, totalCost });
    analytics.trackShare('share', 'hipoteca_calculation');
    analytics.trackCalculation('hipoteca', {
      house_price: housePrice,
      down_payment_pct: downPct,
      years: Number(years),
      tin: annualRate,
      monthly_payment: monthlyPayment,
      total_interest: totalInterest,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Hipoteca</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hp-price">Precio de la vivienda (€)</Label>
          <Input
            id="hp-price"
            type="number"
            min="0"
            step="1000"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/,/g, '.'))}
            placeholder="Introduce el precio"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hp-down">Entrada (%)</Label>
            <Input
              id="hp-down"
              type="number"
              min="0"
              max="100"
              step="1"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(e.target.value)}
              placeholder="20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hp-years">Plazo (años)</Label>
            <Input
              id="hp-years"
              type="number"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hp-tin">TIN anual (%)</Label>
          <Input
            id="hp-tin"
            type="number"
            min="0"
            step="0.01"
            value={tin}
            onChange={(e) => setTin(e.target.value.replace(/,/g, '.'))}
            placeholder="Introduce el TIN (ej: 3.5)"
          />
        </div>

        <div className="pt-4 space-y-2 border-t">
          <div className="flex justify-between text-sm">
            <span>Entrada:</span>
            <span>{downPayment.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Capital a financiar:</span>
            <span>{capital.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Cuota mensual:</span>
            <span>{monthlyPayment.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total intereses:</span>
            <span className="text-red-600 dark:text-red-400">{totalInterest.toFixed(2)}€ ({interestPct.toFixed(1)}%)</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Coste total:</span>
            <span>{totalCost.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
