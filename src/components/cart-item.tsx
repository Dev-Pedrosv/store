"use client";
import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Trash } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantity = () =>
    decreaseProductQuantity(product.id);

  const handleIncreaseProductQuantity = () =>
    increaseProductQuantity(product.id);

  const handleDeleteProductFromCart = () => removeProductFromCart(product.id);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent ">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <p className="text-xs">{product.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold">
            R$ {product.totalPrice.toFixed(2)}
          </p>
          {product.discountPercentage > 0 && (
            <p className="text-xs line-through opacity-75">
              R$ {Number(product.basePrice).toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            className="h-8 w-8"
            variant="outline"
            size="icon"
            onClick={handleDecreaseProductQuantity}
          >
            <ArrowLeft size={16} />
          </Button>

          <span className="text-xs">{product.quantity}</span>
          <Button
            className="h-8 w-8"
            variant="outline"
            size="icon"
            onClick={handleIncreaseProductQuantity}
          >
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleDeleteProductFromCart}
      >
        <Trash size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
