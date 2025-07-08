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
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import ImageWithFallback from "./image-with-fallback";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useCartStore } from "@/hooks/use-cart-store";

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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="space-y-2">
          <p className="text-muted-foreground/70">{category}</p>
          <Separator />
          <p className="h-16">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageWithFallback
          className="mx-auto"
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="justify-between">
        <p>$ {price.toFixed(2)}</p>

        <CardAction>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => {
                  addItem({ _id, name, price });
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
