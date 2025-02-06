import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";

export function FinanceCalculator() {
  const { shareData } = useShare();
  const [amount, setAmount] = useState<string>(() => {
    return localStorage.getItem('finance-calculator-amount') || '';
  });
  const [months, setMonths] = useState<string>(() => {
    return localStorage.getItem('finance-calculator-months') || '';
  });
  const [hasInterest, setHasInterest] = useState(() => {
    return localStorage.getItem('finance-calculator-has-interest') === 'true';
  });
  const [interestRate, setInterestRate] = useState<string>(() => {
    return localStorage.getItem('finance-calculator-interest-rate') || '';
  });

  useEffect(() => {
    localStorage.setItem('finance-calculator-amount', amount);
    localStorage.setItem('finance-calculator-months', months);
    localStorage.setItem('finance-calculator-has-interest', hasInterest.toString());
    localStorage.setItem('finance-calculator-interest-rate', interestRate);
  }, [amount, months, hasInterest, interestRate]);

  const totalAmount = Number(amount) || 0;
  const totalMonths = Number(months) || 1;
  const annualRate = Number(interestRate) || 0;

  let monthlyPayment = totalAmount / totalMonths;
  let totalInterest = 0;

  if (hasInterest && annualRate > 0) {
    const monthlyRate = annualRate / 100 / 12;
    monthlyPayment =
      (totalAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    totalInterest = monthlyPayment * totalMonths - totalAmount;
  }

  const handleShare = () => {
    const shareText = `💰 Cálculo de Financiación\n\nImporte Total: ${totalAmount.toFixed(2)}€\nNúmero de Meses: ${totalMonths}\nCuota Mensual: ${monthlyPayment.toFixed(2)}€${hasInterest ? `\nTasa de Interés: ${annualRate}%\nIntereses Totales: ${totalInterest.toFixed(2)}€` : ''}\nTotal a Pagar: ${(totalAmount + totalInterest).toFixed(2)}€\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;
    
    shareData({
      title: "Cálculo de Financiación",
      text: shareText
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Financiación</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Importe Total</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              const normalizedValue = value.replace(/,/g, '.');
              if (!isNaN(parseFloat(normalizedValue)) || normalizedValue === '') {
                setAmount(normalizedValue);
              }
            }}
            placeholder="Introduce el importe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="months">Número de Meses</Label>
          <Input
            id="months"
            type="number"
            min="1"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Introduce los meses"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col items-start justify-center h-full">
            <Label htmlFor="interest" className="mb-2">Incluir Intereses</Label>
            <Switch
              id="interest"
              checked={hasInterest}
              onCheckedChange={setHasInterest}
              className="data-[state=checked]:bg-[rgb(52,199,89)] data-[state=checked]:dark:bg-[rgb(48,209,88)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Tasa de Interés Anual (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              min="0"
              step="0.1"
              value={interestRate}
              onChange={(e) => {
                const value = e.target.value;
                const normalizedValue = value.replace(/,/g, '.');
                if (!isNaN(parseFloat(normalizedValue)) || normalizedValue === '') {
                  setInterestRate(normalizedValue);
                }
              }}
              placeholder="Introduce la tasa de interés"
              disabled={!hasInterest}
            />
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Cuota Mensual:</span>
            <span>{monthlyPayment.toFixed(2)}€</span>
          </div>
          {hasInterest && (
            <div className="flex justify-between">
              <span>Intereses Totales:</span>
              <span className="text-red-600 dark:text-red-400">{totalInterest.toFixed(2)}€</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total a Pagar:</span>
            <span>{(totalAmount + totalInterest).toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}