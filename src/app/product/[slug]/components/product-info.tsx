"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductWithTotalPrice } from "@/helpers/products";
import { ArrowDownIcon, ArrowLeft, ArrowRight, TruckIcon } from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductWithTotalPrice,
    "name" | "basePrice" | "description" | "discountPercentage" | "totalPrice"
  >;
}

const ProductInfo = ({
  product: { name, basePrice, description, discountPercentage, totalPrice },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex flex-col px-5">
        <h2 className="text-lg">{name}</h2>
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
          {discountPercentage > 0 && (
            <Badge className="px-2 py-[2px]">
              <ArrowDownIcon size={14} />
              {discountPercentage} %
            </Badge>
          )}
        </div>

        {discountPercentage > 0 && (
          <p className="text-sm line-through opacity-75">
            R$ {Number(basePrice).toFixed(2)}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecreaseQuantityClick}
            disabled={quantity === 1}
          >
            <ArrowLeft size={16} />
          </Button>

          <span>{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncreaseQuantityClick}
          >
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <h3 className="font-bold ">Descrição</h3>
          <p className="text-justify text-sm opacity-60">{description}</p>
        </div>

        <Button className="mt-8 font-bold uppercase">
          Adicionar ao carrinho
        </Button>

        <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
          <div className="flex items-center gap-2 ">
            <TruckIcon />
            <div className="flex flex-col">
              <p className="text-xs">
                Entrega via <span className="font-bold">FSPacket</span>
              </p>
              <p className="text-xs text-[#8162ff]">
                Envio para <span className="font-bold">todo Brasil</span>
              </p>
            </div>
          </div>
          <p className="text-xs font-bold">Frete grátis</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;