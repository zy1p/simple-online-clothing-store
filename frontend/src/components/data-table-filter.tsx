import type { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";

interface DataTableFilterProps<TData extends Record<string, unknown>> {
  table: Table<TData>;
  columnId: Extract<keyof TData, string>;
  placeholder?: string;
}

export function DataTableFilter<TData extends Record<string, unknown>>({
  table,
  columnId,
  placeholder,
}: DataTableFilterProps<TData>) {
  const [input, setInput] = useState(
    (table.getColumn(columnId)?.getFilterValue() as string) ?? "",
  );
  const [filterValue] = useDebounce(input, 300);
  useEffect(() => {
    table.getColumn(columnId)?.setFilterValue(filterValue);
  }, [columnId, filterValue, table]);

  return (
    <Input
      placeholder={placeholder ?? `Filter ${columnId}...`}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="max-w-sm"
    />
  );
}
