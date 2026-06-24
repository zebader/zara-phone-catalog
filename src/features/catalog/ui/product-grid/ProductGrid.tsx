import { PhoneProduct } from "@/shared/types/api";
import { ProductCard } from "../product-card/ProductCard";
import styles from './ProductGrid.module.css';
export const ProductGrid = ({ products }: { products: Array<PhoneProduct> }) => {
  return (
    <ul className={styles.container} aria-label="Products">
      {products.map((product, index) => (
        <li key={product.id + index}>
          <ProductCard product={product}/>
        </li>
      ))}
    </ul>
  );
}