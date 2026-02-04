"use client";

import { useEffect, useState } from 'react';
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart } from 'lucide-react';

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Update browsing history for AI recommendations
    const history = JSON.parse(sessionStorage.getItem('browsingHistory') || '[]');
    const newHistory = [product.id, ...history.filter((id: string) => id !== product.id)].slice(0, 10);
    sessionStorage.setItem('browsingHistory', JSON.stringify(newHistory));
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
      <div>
        <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
        <span className={product.stock > 0 ? "ml-4 text-sm font-medium text-green-600" : "ml-4 text-sm font-medium text-destructive"}>
          {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
        </span>
      </div>
      <p className="text-base text-muted-foreground">{product.description}</p>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="quantity" className="sr-only">Quantity</Label>
          <Input 
            id="quantity"
            type="number" 
            min="1" 
            max={product.stock}
            value={quantity} 
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="h-10 w-20"
          />
        </div>
        <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

// We need a Label component for the quantity input
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
