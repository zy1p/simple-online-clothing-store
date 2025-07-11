"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";
import { useEffect, useState } from "react";

export function CartCard() {
  const { clearCart, getItemsCount } = useCartStore();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cart</CardTitle>
        <CardDescription>Items in your cart</CardDescription>
      </CardHeader>
      <CardContent>
        {isClient && getItemsCount() > 0 ? (
          <p>You have {getItemsCount()} items in your cart.</p>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </CardContent>
      <CardFooter>
        <CardAction className="justify-end">
          <Button onClick={clearCart}>Clear Cart</Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
