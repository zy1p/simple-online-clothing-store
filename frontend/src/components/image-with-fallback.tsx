"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  ...rest
}: Parameters<typeof Image>[0] & { fallbackSrc?: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  let isSvg = false;
  if (!fallbackSrc) {
    const url = new URL(`https://placehold.co`);

    url.pathname = `/${width}x${height}`;
    url.searchParams.set("font", "raleway");
    url.searchParams.set("text", alt);

    fallbackSrc = url.toString();
    isSvg = true;
  }

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      width={width}
      height={height}
      src={imgSrc}
      unoptimized={isSvg}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
