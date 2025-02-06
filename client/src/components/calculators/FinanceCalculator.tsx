import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FinanceCalculator() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Financiación</CardTitle>
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
            onChange={(e) => setAmount(e.target.value)}
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

        <div className="flex items-center space-x-2">
          <Switch
            id="interest"
            checked={hasInterest}
            onCheckedChange={setHasInterest}
            className="data-[state=checked]:bg-[rgb(52,199,89)] data-[state=checked]:dark:bg-[rgb(48,209,88)]"
          />
          <Label htmlFor="interest">Incluir Intereses</Label>
        </div>

        {hasInterest && (
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Tasa de Interés Anual (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              min="0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Introduce la tasa de interés"
            />
          </div>
        )}

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Cuota Mensual:</span>
            <span>{monthlyPayment.toFixed(2)}€</span>
          </div>
          {hasInterest && (
            <div className="flex justify-between">
              <span>Intereses Totales:</span>
              <span>{totalInterest.toFixed(2)}€</span>
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