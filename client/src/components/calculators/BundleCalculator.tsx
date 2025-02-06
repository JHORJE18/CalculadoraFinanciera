import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BundleCalculator() {
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("3");
  const [payFor, setPayFor] = useState<string>("1");

  const originalPrice = Number(price) || 0;
  const totalItems = Number(quantity) || 0;
  const paidItems = Number(payFor) || 1;
  const pricePerUnit = totalItems > 0 ? (originalPrice * paidItems) / totalItems : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bundle Price Calculator</CardTitle>
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Get</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payFor">Pay for</Label>
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
            <span>Price per unit:</span>
            <span>{pricePerUnit.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Total saving:</span>
            <span>{(originalPrice - pricePerUnit).toFixed(2)}€ per unit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
