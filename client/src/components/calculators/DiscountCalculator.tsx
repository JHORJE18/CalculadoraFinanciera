import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import { analytics } from "@/lib/analytics";

export function DiscountCalculator() {
  const { shareData } = useShare();
  const [price, setPrice] = useState<string>(() => {
    return localStorage.getItem('discount-calculator-price') || '';
  });
  const [discount, setDiscount] = useState<string>(() => {
    return localStorage.getItem('discount-calculator-discount') || '';
  });

  useEffect(() => {
    localStorage.setItem('discount-calculator-price', price);
    localStorage.setItem('discount-calculator-discount', discount);
  }, [price, discount]);

  const originalPrice = Number(price) || 0;
  const discountPercent = Number(discount) || 0;
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  const handleShare = () => {
    const shareText = `💰 Cálculo de Descuento\n\nPrecio Original: ${originalPrice.toFixed(2)}€\nDescuento: ${discountPercent}%\nAhorras: ${discountAmount.toFixed(2)}€\nPrecio Final: ${finalPrice.toFixed(2)}€\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;
    
    shareData({
      title: "Cálculo de Descuento",
      text: shareText
    });

    analytics.trackShare('share', 'discount_calculation');
    analytics.trackCalculation('discount', {
      original_price: originalPrice,
      discount_percent: discountPercent,
      discount_amount: discountAmount,
      final_price: finalPrice
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Descuentos</CardTitle>
        <Button variant="outline" size="icon" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio Original</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              const normalizedValue = value.replace(/,/g, '.');
              if (!isNaN(parseFloat(normalizedValue)) || normalizedValue === '') {
                setPrice(normalizedValue);
              }
            }}
            placeholder="Introduce el precio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Porcentaje de Descuento</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Introduce el descuento %"
          />
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Precio Original:</span>
            <span>{originalPrice.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span>Ahorras:</span>
            <span className="text-green-600 dark:text-green-400">
              {discountAmount.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Precio Final:</span>
            <span>{finalPrice.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}