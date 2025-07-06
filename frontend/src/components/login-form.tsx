"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login } = useAuthStore();
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onMutate: () => {
      toast.loading("Logging in...", { id: "login" });
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message,
        { id: "login" },
      );
    },
    onSuccess: () => {
      toast.success("Logged in successfully", { id: "login" });
      redirect("/catalogue");
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate(new FormData(e.currentTarget));
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="zy1p"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input name="password" id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                {loginMutation.isPending ? (
                  <Button disabled>
                    <Loader2Icon className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
