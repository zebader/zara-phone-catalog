import { PhoneProduct } from "@/shared/types/api";
import { ProductCard } from "../product-card/ProductCard";
import styles from './ProductCarousel.module.css';

export const ProductCarousel = ({ products, title }: { products: Array<PhoneProduct>, title?: string }) => {
  return (
    <div className={styles.container}>
      {title && <h2 className="title-2">{title}</h2>}
      <div className={styles.carouselContent}>
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className={styles.cardContainer}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}