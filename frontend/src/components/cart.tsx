"use client";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function Cart() {
  const { getItemsCount } = useCartStore();

  return (
    <Button
      asChild
      variant={getItemsCount() > 0 ? "outline" : "ghost"}
      size={"icon"}
      className="relative"
    >
      <Link href="/cart">
        <ShoppingCart />
        {getItemsCount() > 0 && (
          <Badge
            className="absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 -translate-y-1 rounded-full px-1 font-mono tabular-nums"
            variant="destructive"
          >
            {getItemsCount() > 9 ? "9+" : getItemsCount()}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
