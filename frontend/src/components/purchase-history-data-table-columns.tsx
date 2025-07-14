"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import type { Sale } from "@/../../backend/libs/db/src/model/sale.model";
import { format, isAfter, isBefore } from "date-fns";
import { DataTableColumnHeader } from "./data-table-column-header";

const columnHelper = createColumnHelper<Sale>();

export const columns = [
  columnHelper.accessor("saleDate", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Date" />
    ),
    cell: (props) => (
      <span className="tabular-nums">
        {format(props.getValue(), "PP HH:mm aaaa")}
      </span>
    ),
    filterFn: (
      row,
      columnId,
      filterValue: [Date | undefined, Date | undefined],
    ) => {
      const value = row.getValue<string>(columnId);
      const from = filterValue[0];
      const to = filterValue[1];

      if (from && to) return isBefore(value, to) && isAfter(value, from);
      if (from && !to) return isAfter(value, from);
      if (!from && to) return isBefore(value, to);

      return true;
    },
  }),
  columnHelper.accessor("totalPrice", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    filterFn: (
      row,
      columnId,
      filterValue: [string, "ge" | "lt" | "gte" | "lte" | "eq" | undefined],
    ) => {
      const [value, op] = filterValue;
      const rowValue = row.getValue<number>(columnId);

      if (value === "") return true;

      switch (op) {
        case "ge":
          return rowValue >= parseFloat(value);
        case "lt":
          return rowValue < parseFloat(value);
        case "gte":
          return rowValue >= parseFloat(value);
        case "lte":
          return rowValue <= parseFloat(value);
        case "eq":
          return rowValue === parseFloat(value);
        default:
          return rowValue.toString().includes(value);
      }
    },
  }),
  columnHelper.accessor("products", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Products" />
    ),
    enableSorting: false,
    cell: (props) => (
      <ul>
        {props.getValue().map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price} x {product.quantity}
          </li>
        ))}
      </ul>
    ),

    filterFn: (row, columnId, filterValue: string) => {
      const value = row.getValue<Sale["products"]>(columnId);
      filterValue = filterValue.toLowerCase();

      if (filterValue.trim() === "") return true;

      for (const product of value) {
        if (product.name.toLowerCase().includes(filterValue)) return true;
      }

      return false;
    },
  }),
] as ColumnDef<Sale>[];
