import React from "react";
import products from "@/../public/products.json";
import { ProductCard } from "@/components/product-card";

export default function ProductPage() {
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
