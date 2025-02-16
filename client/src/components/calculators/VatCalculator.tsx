import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import { analytics } from "@/lib/analytics";

export function VatCalculator() {
  const { shareData } = useShare();
  const [amount, setAmount] = useState<string>(() => {
    return localStorage.getItem('vat-calculator-amount') || '';
  });
  const [vatRate, setVatRate] = useState<string>(() => {
    return localStorage.getItem('vat-calculator-rate') || '21';
  });
  const [addVat, setAddVat] = useState(() => {
    return localStorage.getItem('vat-calculator-add-vat') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('vat-calculator-amount', amount);
    localStorage.setItem('vat-calculator-rate', vatRate);
    localStorage.setItem('vat-calculator-add-vat', addVat.toString());
  }, [amount, vatRate, addVat]);

  const inputAmount = Number(amount) || 0;
  const vatRateNumber = Number(vatRate);
  let baseAmount, vat, total;

  if (addVat) {
    baseAmount = inputAmount;
    vat = (baseAmount * vatRateNumber) / 100;
    total = baseAmount + vat;
  } else {
    total = inputAmount;
    baseAmount = (total * 100) / (100 + vatRateNumber);
    vat = total - baseAmount;
  }

  const handleShare = () => {
    const shareText = `💰 Cálculo de IVA\n\nBase Imponible: ${baseAmount.toFixed(2)}€\nIVA (${vatRateNumber}%): ${vat.toFixed(2)}€\nTotal: ${total.toFixed(2)}€\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;
    
    shareData({
      title: "Cálculo de IVA",
      text: shareText
    });

    analytics.trackShare('share', 'iva_calculation');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de IVA</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">{addVat ? "Importe (sin IVA)" : "Importe (con IVA)"}</Label>
          <div className="flex gap-4 items-center">
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
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col items-start justify-center">
              <Label htmlFor="add-vat" className="mb-2">{addVat ? "Añadir IVA" : "Descontar IVA"}</Label>
              <Switch
                id="add-vat"
                checked={addVat}
                onCheckedChange={setAddVat}
                className="data-[state=checked]:bg-[rgb(52,199,89)] data-[state=checked]:dark:bg-[rgb(48,209,88)]"
              />
            </div>
            <div className="flex-1">
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
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Base Imponible:</span>
            <span>{baseAmount.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span>IVA ({vatRateNumber}%):</span>
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