import { ShoppingBag } from "lucide-react";
import { Badge } from "./ui/badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductsTotalPrice } from "@/helpers/products";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShoppingBag size={16} />
        Carrinho
      </Badge>
      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={computeProductsTotalPrice(product as any) as any}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
