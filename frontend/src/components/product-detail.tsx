"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import ImageWithFallback from "./image-with-fallback";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCartStore } from "@/stores/cart-store";
import { Input } from "./ui/input";
import { useState } from "react";

type ProductDetail = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function ProductDetail({
  _id,
  name,
  description,
  price,
  imageUrl,
  category,
}: ProductDetail) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="h-full">
      <CardContent className="grid grid-cols-2 gap-4">
        <ImageWithFallback
          className="mx-auto"
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
        />

        <div className="flex h-full flex-col">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="flex flex-1 flex-col space-y-2">
            <p className="text-muted-foreground/70">{category}</p>
            <Separator />
            <div className="h-16 flex-auto">{description}</div>
            <p className="place-self-end">$ {price.toFixed(2)}</p>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <CardAction className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <CircleMinus />
            </Button>

            <Input
              value={quantity}
              min={1}
              className="field-sizing-content tabular-nums"
              disabled
            />

            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setQuantity((q) => q + 1)}
            >
              <CirclePlus />
            </Button>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => {
                  addItem({ _id, name, price }, quantity);
                  toast.success(`${name} added to cart`, {
                    duration: 2000,
                  });
                }}
              >
                <ShoppingCart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to cart</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
