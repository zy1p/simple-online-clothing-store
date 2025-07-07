import React from "react";
import products from "@/../public/products.json";
import { ProductCard } from "@/components/product-card";

export default function CataloguePage() {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
