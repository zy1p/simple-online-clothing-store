"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cart-store";
import { Skeleton } from "./ui/skeleton";

import products from "@/../public/products.json";
import { Delete } from "lucide-react";
import ImageWithFallback from "./image-with-fallback";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type CartItemProps = {
  _id: string;
  quantity: number;
};

export function CartCardItem({ _id, quantity }: CartItemProps) {
  const product = products.find((item) => item._id === _id);

  if (product)
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            height={200}
            width={200}
            className="size-50 justify-self-start"
          />

          <div className="flex w-full max-w-128 flex-col space-y-2">
            <CardTitle>{product.name}</CardTitle>
            <CardDescription className="h-16 flex-1">
              {product.description}
            </CardDescription>

            <div className="flex justify-between">
              <div className="text-lg font-semibold">${product.price}</div>
              <div className="text-muted-foreground text-sm">
                Quantity: {quantity}
              </div>
            </div>

            <CardAction className="ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => {
                      const { removeItem } = useCartStore.getState();
                      removeItem(_id);
                    }}
                  >
                    <Delete />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove from cart</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </div>
        </CardContent>
      </Card>
    );

  return <Skeleton className="h-60 max-w-full" />;
}
