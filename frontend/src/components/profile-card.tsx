"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect, useState } from "react";
import { ProfileForm } from "./profile-form";

export function ProfileCard() {
  const { getUser, isAuthenticated, clear, deleteUser, updateProfile } =
    useAuthStore();

  const [isStoreHydrated, setIsStoreHydrated] = useState(false);
  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) setIsStoreHydrated(true);
  }, []);

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Profile details</CardTitle>
      </CardHeader>
      <CardContent>
        <ProfileForm />
      </CardContent>
    </Card>
  );
}
