import ProductItem from "@/components/product-item";
import { computeProductsTotalPrice } from "@/helpers/products";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          product={computeProductsTotalPrice(product)}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default ProductList;
