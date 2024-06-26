"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "../../../_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "imageUrl" | "name">;
}
export const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="rounded-lg object-cover shadow-md"
      />

      <Button
        className="absolute left-4 top-2 rounded-full bg-white text-foreground hover:text-white"
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};
