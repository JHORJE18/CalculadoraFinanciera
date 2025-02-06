import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/useShare";
import { Switch } from "../ui/switch";

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

  const [isUnitPrice, setIsUnitPrice] = useState<boolean>(() => {
    return localStorage.getItem('bundle-calculator-is-unit-price') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('bundle-calculator-price', price);
    localStorage.setItem('bundle-calculator-quantity', quantity);
    localStorage.setItem('bundle-calculator-payfor', payFor);
    localStorage.setItem('bundle-calculator-is-unit-price', isUnitPrice.toString());
  }, [price, quantity, payFor, isUnitPrice]);

  const originalPrice = Number(price) || 0;
  const totalItems = Number(quantity) || 0;
  const paidItems = Number(payFor) || 1;
  const pricePerUnit = isUnitPrice ? originalPrice : (totalItems > 0 ? originalPrice / totalItems : 0);
  const totalPrice = isUnitPrice ? (originalPrice * totalItems) : originalPrice;
  const finalPricePerUnit = totalItems > 0 ? (totalPrice * paidItems) / (totalItems * totalItems) : 0;
  const savings = pricePerUnit - finalPricePerUnit;

  const handleShare = () => {
    const shareText = `💰 Cálculo de Oferta\n\nPrecio ${isUnitPrice ? 'por unidad' : 'total'}: ${originalPrice.toFixed(2)}€\nLlevas: ${totalItems} unidades\nPagas: ${paidItems} unidades\nPrecio por unidad: ${finalPricePerUnit.toFixed(2)}€\nAhorro: ${savings.toFixed(2)}€ por unidad\n\n📱 Calculado con Calculadora Financiera | ${window.location.href}`;
    
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
          <div className="flex gap-4 items-center">
          <div className="flex-1">
          <Label htmlFor="price-type" className="mb-2">{isUnitPrice ? "Precio por unidad" : "Precio total"}</Label>
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
              placeholder={`Introduce el ${isUnitPrice ? 'precio por unidad' : 'precio total'}`}
            />
            </div>
            <div className="flex flex-col items-start justify-center">
              <Label htmlFor="price-type" className="mb-2">{isUnitPrice ? "Cambiar a total" : "Cambiar a unidad"}</Label>
              <Switch
                id="price-type"
                checked={isUnitPrice}
                onCheckedChange={setIsUnitPrice}
                className="data-[state=checked]:bg-[rgb(52,199,89)] data-[state=checked]:dark:bg-[rgb(48,209,88)]"
              />
            </div>
            </div>
            

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
          <div className="flex justify-between">
            <span className={!isUnitPrice ? "font-bold" : ""}>Precio total:</span>
            <span className={!isUnitPrice ? "font-bold" : ""}>{totalPrice.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span className={isUnitPrice ? "font-bold" : ""}>Precio por unidad:</span>
            <span className={isUnitPrice ? "font-bold" : ""}>{pricePerUnit.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Ahorro por unidad:</span>
            <span className="text-green-600 dark:text-green-400">{savings.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}