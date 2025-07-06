import ImageWithFallback from "./image-with-fallback";

type ProductCardProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export function ProductCard({
  _id,
  name,
  description,
  price,
  imageUrl,
  category,
}: ProductCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Price: ${price}</p>
      <ImageWithFallback src={imageUrl} alt={name} width={200} height={200} />
      <p>Category: {category}</p>
    </div>
  );
}
