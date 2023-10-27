"use client";
import { ProductWithTotalPrice } from "@/helpers/products";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  total: number;
  subTotal: number;
  totalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  total: 0,
  subTotal: 0,
  totalDiscount: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(
    JSON.parse(localStorage?.getItem("@fsw-store/cart-products") || "[]"),
  );

  useEffect(() => {
    localStorage?.setItem("@fsw-store/cart-products", JSON.stringify(products));
  }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.basePrice) * product.quantity,
      0,
    );
  }, [products]);

  const total = useMemo(() => {
    return products.reduce(
      (acc, product) => acc + Number(product.totalPrice) * product.quantity,
      0,
    );
  }, [products]);

  const totalDiscount = total - subTotal;

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }
          return cartProduct;
        }),
      );
      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
          return product;
        })
        .filter((product) => product.quantity > 0),
    );
  };
  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      }),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        total,
        totalDiscount,
        subTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
