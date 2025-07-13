"use client";
import type { Sale } from "@/../../backend/libs/db/src/model/sale.model";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DataTable } from "./purchase-history-data-table";
import { columns } from "./purchase-history-data-table-columns";

export default function PurchaseHistoryCard() {
  const { isAuthenticated, sub } = useAuthStore();

  async function getPurchaseHistory() {
    const { data } = await api.get<Sale[]>(`/sales/${sub}`);
    return data;
  }

  const { data, isFetching } = useQuery({
    queryKey: ["purchase-history"],
    queryFn: getPurchaseHistory,
    enabled: isAuthenticated() && !!sub,
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
}
