import { ShoppingBag } from "lucide-react";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductsTotalPrice } from "@/helpers/products";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotal, totalDiscount, total } = useContext(CartContext);
  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShoppingBag size={16} />
        Carrinho
      </Badge>
      <div className="h-full max-h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductsTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold opacity-80">
                Carrinho vazio
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subTotal.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          <p>R$ {totalDiscount.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
      </div>

      <Button className="mt-7 font-bold uppercase">Finalizar compra</Button>
    </div>
  );
};

export default Cart;
