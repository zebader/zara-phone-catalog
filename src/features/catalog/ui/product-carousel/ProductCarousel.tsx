import { PhoneProduct } from "@/shared/types/api";
import { ProductCard } from "../product-card/ProductCard";
import styles from './ProductCarousel.module.css';

export const ProductCarousel = ({ products, title }: { products: Array<PhoneProduct>, title?: string }) => {
  const titleId = title ? 'carousel-title' : undefined;

  return (
    <section className={styles.container} aria-labelledby={titleId}>
      {title && <h2 id={titleId} className="title-2">{title}</h2>}
      <ul className={styles.carouselContent} aria-label={title ?? 'Products'}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`} className={styles.cardContainer}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}