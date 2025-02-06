import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function VatCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [vatRate, setVatRate] = useState<string>("21");

  const baseAmount = Number(amount) || 0;
  const vat = (baseAmount * Number(vatRate)) / 100;
  const total = baseAmount + vat;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de IVA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Importe (sin IVA)</Label>
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
          <Label>Tipo de IVA</Label>
          <Select value={vatRate} onValueChange={setVatRate}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo de IVA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="21">21%</SelectItem>
              <SelectItem value="10">10%</SelectItem>
              <SelectItem value="4">4%</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Base Imponible:</span>
            <span>{baseAmount.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span>IVA ({vatRate}%):</span>
            <span>{vat.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}