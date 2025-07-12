"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartCardItem } from "./cart-card-item";
import { Skeleton } from "./ui/skeleton";

export function CartCard() {
  const { clearCart, getItemsCount } = useCartStore();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>Cart</CardTitle>
        <CardDescription>
          {isClient && useCartStore.persist.hasHydrated() ? (
            getItemsCount() > 0 ? (
              <p>You have {getItemsCount()} items in your cart.</p>
            ) : (
              <p>Your cart is empty.</p>
            )
          ) : (
            <Skeleton className="h-5 max-w-[200px]" />
          )}
        </CardDescription>

        <CardAction className="justify-end space-x-4">
          <Button
            variant={"outline"}
            size={"sm"}
            className="w-24"
            onClick={clearCart}
          >
            Clear Cart
          </Button>

          <Button size={"sm"} className="w-24">
            Check Out
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {isClient && useCartStore.persist.hasHydrated() ? (
            getItemsCount() > 0 ? (
              Object.entries(useCartStore.getState().items).map(
                ([id, quantity]) => (
                  <CartCardItem key={id} _id={id} quantity={quantity} />
                ),
              )
            ) : (
              <p>
                Explore our{" "}
                <Link
                  href="/catalogue"
                  className="text-foreground/90 hover:text-foreground underline"
                >
                  catalogue
                </Link>{" "}
                for more products.
              </p>
            )
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="mx-auto h-60 w-full max-w-2xl" />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
