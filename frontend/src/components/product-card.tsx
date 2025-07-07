import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import ImageWithFallback from "./image-with-fallback";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

type ProductCardProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export function ProductCard({
  _id,
  name,
  description,
  price,
  imageUrl,
  category,
}: ProductCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger>
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
              width={200}
              height={200}
            />
            <CardAction></CardAction>
          </CardContent>
          <CardFooter className="justify-between">
            <p>$ {price.toFixed(2)}</p>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <ShoppingCart />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      </HoverCardTrigger>

      <HoverCardContent className="text-center">
        <Button variant={"outline"} asChild>
          <Link href={`/products/${_id}`}>View {name}</Link>
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
