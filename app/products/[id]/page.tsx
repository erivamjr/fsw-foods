import Image from "next/image";
import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "../../_components/ui/button";
import { ArrowDownIcon, ChevronLeftIcon } from "lucide-react";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "../../_helpers/price";
import { ProductImage } from "./_components/product-image";
import { DiscountBadge } from "../../_components/discount-badge";
import { ProductDetails } from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: product?.restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductPage;
