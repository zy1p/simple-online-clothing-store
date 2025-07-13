import type { Table } from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function PurchaseHistoryDataTableTotalPriceFilter<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const getFilterValue = () => {
    const filterValue: [string, string] = table
      .getColumn("totalPrice")
      ?.getFilterValue() as [string, string];

    return filterValue;
  };

  return (
    <div className="flex flex-row items-center space-x-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="operator" className="px-1">
          Operator
        </Label>
        <Select
          value={getFilterValue()[1]}
          onValueChange={(value) => {
            table
              .getColumn("totalPrice")
              ?.setFilterValue([getFilterValue()[0], value]);
          }}
        >
          <SelectTrigger id="operator" className="w-48">
            <SelectValue placeholder="Select a operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Operators</SelectLabel>
              <SelectItem value="ge">Greater than or equal to</SelectItem>
              <SelectItem value="lt">Less than</SelectItem>
              <SelectItem value="gte">Greater than</SelectItem>
              <SelectItem value="lte">Less than or equal to</SelectItem>
              <SelectItem value="eq">Equal to</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="price" className="px-1">
          Price
        </Label>
        <Input
          className="w-48"
          type="number"
          value={getFilterValue()[0]}
          onChange={(e) => {
            table
              .getColumn("totalPrice")
              ?.setFilterValue([e.target.value, getFilterValue()[1]]);
          }}
        />
      </div>
    </div>
  );
}
