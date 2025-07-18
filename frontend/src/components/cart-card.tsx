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
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import autoAnimate from "@formkit/auto-animate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CartCardItem } from "./cart-card-item";
import { Skeleton } from "./ui/skeleton";

export function CartCard() {
  const { clearCart, getItemsCount, checkOut, calculateTotalPrice } =
    useCartStore();
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isStoreHydrated, setIsStoreHydrated] = useState(false);
  useEffect(() => {
    if (
      isClient &&
      useCartStore.persist.hasHydrated() &&
      useAuthStore.persist.hasHydrated()
    )
      setIsStoreHydrated(true);
  }, [isClient]);

  const parent = useRef(null);
  useEffect(() => {
    if (isStoreHydrated && parent.current) autoAnimate(parent.current);
  }, [isStoreHydrated, parent]);

  const checkOutMutation = useMutation({
    mutationFn: checkOut,
    onMutate: () => {
      toast.loading("Processing your order...", { id: "checkout" });
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message,
        { id: "checkout" },
      );
    },
    onSuccess: async () => {
      clearCart();
      toast.success("Checked out successfully", {
        id: "checkout",
        action: {
          label: "Check Purchase History",
          onClick: () => {
            toast.dismiss("checkout");
            redirect("/purchase-history");
          },
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["purchase-history"] });
    },
  });

  return (
    <Card className="mx-auto max-w-4xl">
      <CardHeader>
        <CardTitle>Cart</CardTitle>
        <CardDescription>
          {isStoreHydrated ? (
            getItemsCount() > 0 ? (
              <p>
                You have {getItemsCount()} items in your cart.
                {!isAuthenticated() && (
                  <span className="inline-block">
                    Please{" "}
                    <Link
                      href="/login"
                      className="text-muted-foreground/80 hover:text-muted-foreground underline"
                    >
                      log in
                    </Link>{" "}
                    to proceed to checkout.
                  </span>
                )}
              </p>
            ) : (
              <p>Your cart is empty.</p>
            )
          ) : (
            <Skeleton className="h-5 max-w-[200px]" />
          )}
        </CardDescription>

        <CardAction className="justify-end">
          <div className="flex space-x-4">
            {isStoreHydrated ? (
              <Button
                variant={"outline"}
                size={"sm"}
                className="w-24"
                onClick={clearCart}
                disabled={getItemsCount() === 0}
              >
                Clear Cart
              </Button>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
            {isStoreHydrated ? (
              <Button
                size={"sm"}
                className="w-24"
                disabled={
                  isStoreHydrated &&
                  (!isAuthenticated() ||
                    getItemsCount() === 0 ||
                    checkOutMutation.isPending)
                }
                onClick={() => checkOutMutation.mutate()}
              >
                {checkOutMutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Check Out"
                )}
              </Button>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-right tabular-nums">
          Total Price:
          <span className="inline-block min-w-20">
            $ {isStoreHydrated ? calculateTotalPrice() : 0}
          </span>
        </div>

        <div ref={parent} className="flex flex-col gap-4">
          {isStoreHydrated ? (
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
              <Skeleton
                key={index}
                className="mx-auto h-108.5 w-full max-w-2xl md:h-62.5"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
