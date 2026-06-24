import styles from './CartListItem.module.css';
import Image from 'next/image';
import { useCart, CartItem } from '@/shared/contexts';

type CartListItemProps = CartItem

export const CartListItem = ({ id, name, price, image, storage, color }: CartListItemProps) => {

  const { removeCartItem  } = useCart();

  const handleRemoveFromCart = () => {
    removeCartItem(
      id
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer} aria-label={`Product image for ${name}`}>
        <Image className={styles.image} src={image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="eager" aria-hidden="true" />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={styles.contentTitleText}>
            <p className="title-3">{name}</p>
            <p className="title-3">{`${storage} | ${color}`}</p>
          </div>
          <p className="title-3">{`${price} EUR`}</p>
        </div>
        <button
          type="button"
          className={styles.contentRemoveButton}
          onClick={handleRemoveFromCart}
          aria-label={`Remove ${name}`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};