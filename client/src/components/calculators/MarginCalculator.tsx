import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import useCalculationHistory from "@/hooks/use-calculation-history";
import { analytics } from "@/lib/analytics";

export function MarginCalculator() {
  const { shareData } = useShare();
  const { addCalculation } = useCalculationHistory();

  // mode: false = dado coste + venta → calcula margen
  //       true  = dado coste + margen% → calcula precio venta
  const [inverseMode, setInverseMode] = useState<boolean>(() =>
    localStorage.getItem('margin-inverse') === 'true'
  );
  const [cost, setCost] = useState<string>(() => localStorage.getItem('margin-cost') || '');
  const [salePrice, setSalePrice] = useState<string>(() => localStorage.getItem('margin-sale') || '');
  const [targetMargin, setTargetMargin] = useState<string>(() => localStorage.getItem('margin-target') || '');

  useEffect(() => {
    localStorage.setItem('margin-inverse', inverseMode.toString());
    localStorage.setItem('margin-cost', cost);
    localStorage.setItem('margin-sale', salePrice);
    localStorage.setItem('margin-target', targetMargin);
  }, [inverseMode, cost, salePrice, targetMargin]);

  const costNum = Number(cost) || 0;

  let salePriceNum: number;
  let grossMargin: number;
  let marginPercent: number;
  let markupPercent: number;

  if (inverseMode) {
    // Dado coste + margen% objetivo → calcular precio venta
    const target = Number(targetMargin) || 0;
    salePriceNum = target < 100 && costNum > 0 ? costNum / (1 - target / 100) : 0;
    grossMargin = salePriceNum - costNum;
    marginPercent = target;
    markupPercent = costNum > 0 ? (grossMargin / costNum) * 100 : 0;
  } else {
    // Dado coste + precio venta → calcular margen
    salePriceNum = Number(salePrice) || 0;
    grossMargin = salePriceNum - costNum;
    marginPercent = salePriceNum > 0 ? (grossMargin / salePriceNum) * 100 : 0;
    markupPercent = costNum > 0 ? (grossMargin / costNum) * 100 : 0;
  }

  const handleShare = () => {
    const shareText = `📊 Cálculo de Margen\n\nCoste: ${costNum.toFixed(2)}€\nPrecio de venta: ${salePriceNum.toFixed(2)}€\nMargen bruto: ${grossMargin.toFixed(2)}€\nMargen (%): ${marginPercent.toFixed(2)}%\nMarkup (%): ${markupPercent.toFixed(2)}%\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;

    shareData({ title: "Cálculo de Margen", text: shareText });
    addCalculation('margin', { cost, salePrice, targetMargin, inverseMode }, { grossMargin, marginPercent, markupPercent, salePriceNum });
    analytics.trackShare('share', 'margin_calculation');
    analytics.trackCalculation('margin', {
      cost: costNum,
      sale_price: salePriceNum,
      gross_margin: grossMargin,
      margin_percent: marginPercent,
      markup_percent: markupPercent,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Margen</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <Label className="mb-2">{inverseMode ? "Calcular precio venta" : "Calcular margen"}</Label>
            <Switch
              checked={inverseMode}
              onCheckedChange={setInverseMode}
              className="data-[state=checked]:bg-[rgb(52,199,89)] data-[state=checked]:dark:bg-[rgb(48,209,88)]"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {inverseMode
              ? "Introduce el coste y el margen % deseado"
              : "Introduce el coste y el precio de venta"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mg-cost">Precio de coste (€)</Label>
          <Input
            id="mg-cost"
            type="number"
            min="0"
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value.replace(/,/g, '.'))}
            placeholder="Introduce el coste"
          />
        </div>

        {inverseMode ? (
          <div className="space-y-2">
            <Label htmlFor="mg-target">Margen deseado (%)</Label>
            <Input
              id="mg-target"
              type="number"
              min="0"
              max="99.99"
              step="0.1"
              value={targetMargin}
              onChange={(e) => setTargetMargin(e.target.value)}
              placeholder="Introduce el margen % objetivo"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="mg-sale">Precio de venta (€)</Label>
            <Input
              id="mg-sale"
              type="number"
              min="0"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value.replace(/,/g, '.'))}
              placeholder="Introduce el precio de venta"
            />
          </div>
        )}

        <div className="pt-4 space-y-2 border-t">
          {inverseMode && (
            <div className="flex justify-between font-bold">
              <span>Precio de venta:</span>
              <span>{salePriceNum.toFixed(2)}€</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Margen bruto:</span>
            <span className={grossMargin >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {grossMargin.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Margen (%):</span>
            <span>{marginPercent.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Markup (%):</span>
            <span>{markupPercent.toFixed(2)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
