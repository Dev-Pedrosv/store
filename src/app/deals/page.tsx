import ProductItem from "@/components/product-item";
import { Badge } from "@/components/ui/badge";
import { computeProductsTotalPrice } from "@/helpers/products";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <PercentIcon size={16} />
        Ofertas
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {deals.map((product) => (
          <ProductItem
            product={computeProductsTotalPrice(product)}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
