import React from "react";
import products from "@/../public/products.json";
import ProductDetail from "@/components/product-detail";

export async function generateStaticParams() {
  return products.map((product) => ({
    _id: product._id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;

  const product = products.find((product) => product._id === _id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ProductDetail {...product} />
    </div>
  );
}
