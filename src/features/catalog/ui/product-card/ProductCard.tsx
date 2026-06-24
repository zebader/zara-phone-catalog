import { PhoneProduct } from "@/shared/types/api";
import Link from "next/link";
import Image from "next/image";
import styles from './ProductCard.module.css';
export const ProductCard = ({ product }: { product: PhoneProduct }) => {
  return (
    <div className={styles.container}>
      <Link href={`/catalog/${product.id}`} className={styles.cardContent} aria-label={`View details for ${product.name ?? 'product'}`}>
        {product.imageUrl && <div className={styles.imageContainer}>
          <Image className={styles.image} src={product.imageUrl} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="eager" aria-hidden="true"/>
        </div>}
        <div className={styles.content}>
          <div className={styles.contentBrandContainer}>
            {product.brand && <p className={`${styles.brand} text-2`}>{product.brand}</p>}
            {product.name && <p className={`${styles.title} title-3`}>{product.name}</p>}
          </div>
          <div className={styles.contentPriceContainer}>
            {product.basePrice && <p className={`${styles.price} title-3`}>{`${product.basePrice} EUR`}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}