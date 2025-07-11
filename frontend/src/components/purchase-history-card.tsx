"use client";
import type { Sale } from "@/../../backend/libs/db/src/model/sale.model";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function PurchaseHistoryCard() {
  const { isAuthenticated, sub } = useAuthStore();

  async function getPurchaseHistory() {
    const { data } = await api.get<Sale[]>(`/sales/${sub}`);
    return data;
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      redirect("/login");
    }
  }, [isAuthenticated]);

  const { data, isFetching } = useQuery({
    queryKey: ["purchase-history"],
    queryFn: getPurchaseHistory,
    enabled: isAuthenticated() && !!sub,
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>;
}
