"use client";
import products from "@/../public/products.json";
import { ProductCard } from "@/components/product-card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import autoAnimate from "@formkit/auto-animate";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function CataloguePage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState("");
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setFilter(value);
    },
    // delay in ms
    300,
  );

  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();
    const filtered = [];

    // Time Complexity: O(n * m), where n is the number of products and m is the average length of the search string.
    // Space Complexity: O(k), where k is the number of products that match the search criteria.
    for (const product of products) {
      if (
        product.name.toLowerCase().includes(lowerCaseFilter) ||
        product.price.toString().includes(lowerCaseFilter)
      ) {
        filtered.push(product);
      }
    }
    setFilteredProducts(filtered);
  }, [filter]);

  const parent = useRef(null);
  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);

  return (
    <div
      ref={parent}
      className="container mx-auto grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div className="col-span-full space-y-4">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="filter products"
          onChange={(e) => {
            debounced(e.target.value);
          }}
        />
      </div>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))
      ) : (
        <Alert className="col-span-full">
          <AlertCircleIcon />
          <AlertTitle>No products found</AlertTitle>
        </Alert>
      )}
    </div>
  );
}
