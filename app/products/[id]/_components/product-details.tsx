"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "../../../_helpers/price";
import { DiscountBadge } from "../../../_components/discount-badge";
import { Button } from "../../../_components/ui/button";
import {
  ArrowDownIcon,
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TimerIcon,
} from "lucide-react";
import { Card } from "../../../_components/ui/card";
import { ProductList } from "../../../_components/product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

export const ProductDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className=" mb-2 mt-1 px-5 text-xl font-semibold"> {product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product} />
            )}
          </div>

          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant={"ghost"}
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantity}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button
            size="icon"
            className="border border-solid border-muted-foreground"
            onClick={handleIncreaseQuantity}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <Card className="mt-6 flex justify-around py-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-ss font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <TimerIcon size={14} />
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-ss font-semibold">
                {product.restaurant.deliveryTimeMinutes} min
              </p>
            ) : (
              <p className="text-sm font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>
    </div>
  );
};
