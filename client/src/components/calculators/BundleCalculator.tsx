import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BundleCalculator() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculadora de Ofertas</CardTitle>
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
            onChange={(e) => setPrice(e.target.value)}
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