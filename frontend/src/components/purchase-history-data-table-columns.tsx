"use client";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import type { Sale } from "@/../../backend/libs/db/src/model/sale.model";
import { format } from "date-fns";
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
  }),
  columnHelper.accessor("totalPrice", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
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
  }),
] as ColumnDef<Sale>[];
