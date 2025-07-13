"use client";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProfileFormSchema, useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2Icon } from "lucide-react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod/v4";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
export function ProfileForm() {
  const { getUser, isAuthenticated, clear, deleteUser, updateProfile } =
    useAuthStore();

  const [isStoreHydrated, setIsStoreHydrated] = useState(false);
  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) setIsStoreHydrated(true);
  }, []);

  const queryClient = useQueryClient();

  const { data, isPending, isFetched, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isAuthenticated(),
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onMutate: () => {
      toast.loading("Deleting your account...", { id: "delete-user" });
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message,
        { id: "delete-user" },
      );
    },
    onSuccess: async () => {
      clear();
      toast.success("Account deleted successfully, redirecting...", {
        id: "delete-user",
      });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setTimeout(() => redirect("/"), 300);
    },
  });

  const updateProfileMutation = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: updateProfile,
    onMutate: () => {
      toast.loading("Updating your profile...", { id: "update-profile" });
    },
    onError: (error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message,
        { id: "update-profile" },
      );
    },
    onSuccess: async () => {
      toast.success("Profile updated successfully", { id: "update-profile" });
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    },
    values: data,
    disabled: !isSuccess,
  });
  function onSubmit(values: z.infer<typeof updateProfileFormSchema>) {
    for (const [key, value] of Object.entries(values)) {
      if (value === "") delete values[key as keyof typeof values];
    }
    updateProfileMutation.mutate(values);
  }
  return (
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
              <div className="flex items-center">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          {isStoreHydrated ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={
                    (isStoreHydrated && !isAuthenticated()) ||
                    deleteUserMutation.isPending
                  }
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteUserMutation.mutate()}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Skeleton className="h-8 w-32" />
          )}

          {isStoreHydrated ? (
            <Button
              type="submit"
              size="sm"
              className=""
              disabled={!isAuthenticated() || updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          ) : (
            <Skeleton className="h-8 w-14" />
          )}
        </div>
      </form>
    </Form>
  );
}
