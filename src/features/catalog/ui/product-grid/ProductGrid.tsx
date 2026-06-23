import { PhoneProduct } from "@/shared/types/api";
import { ProductCard } from "../product-card/ProductCard";
import styles from './ProductGrid.module.css';
export const ProductGrid = ({ products }: { products: Array<PhoneProduct> }) => {
  return (
    <div className={styles.container}>
      {products.map((product, index) => (
        <ProductCard key={product.id + index} product={product}/>
      ))}
    </div>
  );
}