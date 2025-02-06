import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function FinanceCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [months, setMonths] = useState<string>("");
  const [hasInterest, setHasInterest] = useState(false);
  const [interestRate, setInterestRate] = useState<string>("");

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
        <CardTitle>Finance Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Total Amount</Label>
          <Input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="months">Number of Months</Label>
          <Input
            id="months"
            type="number"
            min="1"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Enter months"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="interest"
            checked={hasInterest}
            onCheckedChange={setHasInterest}
          />
          <Label htmlFor="interest">Include Interest</Label>
        </div>

        {hasInterest && (
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
            <Input
              id="interest-rate"
              type="number"
              min="0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>
        )}

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Monthly Payment:</span>
            <span>{monthlyPayment.toFixed(2)}€</span>
          </div>
          {hasInterest && (
            <div className="flex justify-between">
              <span>Total Interest:</span>
              <span>{totalInterest.toFixed(2)}€</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total to Pay:</span>
            <span>{(totalAmount + totalInterest).toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
