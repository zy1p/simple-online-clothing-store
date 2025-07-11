"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function ProfileCard() {
  const { getUser, isAuthenticated, clear } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  const { data, isPending, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: isAuthenticated(),
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile details</CardTitle>
        <CardDescription>{data?.username}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
      <CardFooter>
        <CardAction className="">
          <Button variant={"ghost"} size={"sm"}>
            Update profile
          </Button>

          <Button variant={"secondary"} size={"sm"} onClick={clear}>
            Log out
          </Button>

          <Button variant={"destructive"} size={"sm"}>
            Delete account
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
