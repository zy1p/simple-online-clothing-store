"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signupFormSchema, useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod/v4";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { login, signup } = useAuthStore();

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
      toast.success("Logged in successfully, redirecting...", { id: "login" });

      setTimeout(() => {
        redirect("/catalogue");
      }, 300);
    },
  });

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onMutate: () => {
      toast.loading("Signing up...", { id: "signup" });
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message,
        { id: "signup" },
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Signed up successfully, logging in...", { id: "signup" });
      loginMutation.mutate(variables);
    },
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    signupMutation.mutate(values);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Signup to your account</CardTitle>
          <CardDescription>
            Enter your email below to signup for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginMutation.isPending ? (
                <Button disabled>
                  <Loader2Icon className="w-full animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
