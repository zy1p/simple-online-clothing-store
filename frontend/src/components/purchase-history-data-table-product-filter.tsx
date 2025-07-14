import type { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function PurchaseHistoryDataTableProductFilter<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="product" className="px-1">
          Product
        </Label>

        <Input
          id="product"
          className="w-48"
          type="text"
          value={
            (table.getColumn("products")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) => {
            table.getColumn("products")?.setFilterValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
