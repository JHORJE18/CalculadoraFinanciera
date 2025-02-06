import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";

export function BundleCalculator() {
  const { shareData } = useShare();
  const [price, setPrice] = useState<string>(() => {
    return localStorage.getItem('bundle-calculator-price') || '';
  });
  const [quantity, setQuantity] = useState<string>(() => {
    return localStorage.getItem('bundle-calculator-quantity') || '3';
  });
  const [payFor, setPayFor] = useState<string>(() => {
    return localStorage.getItem('bundle-calculator-payfor') || '2';
  });

  useEffect(() => {
    localStorage.setItem('bundle-calculator-price', price);
    localStorage.setItem('bundle-calculator-quantity', quantity);
    localStorage.setItem('bundle-calculator-payfor', payFor);
  }, [price, quantity, payFor]);

  const originalPrice = Number(price) || 0;
  const totalItems = Number(quantity) || 0;
  const paidItems = Number(payFor) || 1;
  const pricePerUnit = totalItems > 0 ? (originalPrice * paidItems) / totalItems : 0;

  const handleShare = () => {
    const shareText = `💰 Cálculo de Oferta\n\nPrecio Original: ${originalPrice.toFixed(2)}€\nLlevas: ${totalItems} unidades\nPagas: ${paidItems} unidades\nPrecio por unidad: ${pricePerUnit.toFixed(2)}€\nAhorro: ${(originalPrice - pricePerUnit).toFixed(2)}€ por unidad\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;
    
    shareData({
      title: "Cálculo de Oferta",
      text: shareText
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Calculadora de Ofertas</CardTitle>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Llevas</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payFor">Pagas</Label>
            <Input
              id="payFor"
              type="number"
              min="1"
              value={payFor}
              onChange={(e) => setPayFor(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between font-bold">
            <span>Precio por unidad:</span>
            <span>{pricePerUnit.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Ahorro total:</span>
            <span>{(originalPrice - pricePerUnit).toFixed(2)}€ por unidad</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}