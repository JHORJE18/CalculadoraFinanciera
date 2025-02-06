import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DiscountCalculator() {
  const [price, setPrice] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");

  const originalPrice = Number(price) || 0;
  const discountPercent = Number(discount) || 0;
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Original Price</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Discount Percentage</Label>
          <Input
            id="discount"
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter discount %"
          />
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Original Price:</span>
            <span>{originalPrice.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between">
            <span>You Save:</span>
            <span className="text-green-600 dark:text-green-400">
              {discountAmount.toFixed(2)}€
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Final Price:</span>
            <span>{finalPrice.toFixed(2)}€</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
