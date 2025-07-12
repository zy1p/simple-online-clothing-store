"use client";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function Cart() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { getItemsCount } = useCartStore();

  if (isClient && useCartStore.persist.hasHydrated())
    return (
      <Button asChild variant={"outline"} size={"icon"} className="relative">
        <Link href="/cart">
          <ShoppingCart />
          {getItemsCount() > 0 && (
            <Badge
              className="absolute top-0 right-0 h-5 min-w-5 translate-x-1/2 -translate-y-1 rounded-full px-1 font-mono tabular-nums"
              variant="default"
            >
              {getItemsCount() > 9 ? "9+" : getItemsCount()}
            </Badge>
          )}
        </Link>
      </Button>
    );

  return <Skeleton className="size-9" />;
}
