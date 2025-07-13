import type { Table } from "@tanstack/react-table";
import { addDays } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function PurchaseHistoryDataTableDateRangeFilter<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="from" className="px-1">
          From
        </Label>
        <Popover open={openFrom} onOpenChange={setOpenFrom}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="from"
              className="w-48 justify-between font-normal"
            >
              {(
                table.getColumn("saleDate")?.getFilterValue() as [
                  Date | undefined,
                  Date | undefined,
                ]
              )[0]
                ? (
                    table.getColumn("saleDate")?.getFilterValue() as [
                      Date | undefined,
                      Date | undefined,
                    ]
                  )[0]?.toLocaleDateString()
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={
                (
                  table.getColumn("saleDate")?.getFilterValue() as [
                    Date | undefined,
                    Date | undefined,
                  ]
                )[0]
              }
              captionLayout="dropdown"
              onSelect={(date) => {
                table
                  .getColumn("saleDate")
                  ?.setFilterValue([
                    date,
                    (
                      table.getColumn("saleDate")?.getFilterValue() as [
                        Date | undefined,
                        Date | undefined,
                      ]
                    )[1],
                  ]);
                setOpenFrom(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="to" className="px-1">
          To
        </Label>
        <Popover open={openTo} onOpenChange={setOpenTo}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="to"
              className="w-48 justify-between font-normal"
              suppressHydrationWarning
            >
              {(
                table.getColumn("saleDate")?.getFilterValue() as [
                  Date | undefined,
                  Date | undefined,
                ]
              )[1]
                ? (
                    table.getColumn("saleDate")?.getFilterValue() as [
                      Date | undefined,
                      Date | undefined,
                    ]
                  )[1]?.toLocaleDateString()
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={
                (
                  table.getColumn("saleDate")?.getFilterValue() as [
                    Date | undefined,
                    Date | undefined,
                  ]
                )[1]
              }
              captionLayout="dropdown"
              disabled={(date) =>
                date > addDays(new Date(), 1) || date < new Date("1900-01-01")
              }
              onSelect={(date) => {
                table
                  .getColumn("saleDate")
                  ?.setFilterValue([
                    (
                      table.getColumn("saleDate")?.getFilterValue() as [
                        Date | undefined,
                        Date | undefined,
                      ]
                    )[0],
                    date,
                  ]);
                setOpenTo(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
