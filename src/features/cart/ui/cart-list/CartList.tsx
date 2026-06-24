import { CartItem } from '@/shared/contexts';
import { CartListItem } from '../cart-list-item/CartListItem';
import styles from './CartList.module.css';

export const CartList = ({ cart }: { cart: Array<CartItem> }) => {
  return (
    <div className={styles.container}>
      {cart.map((item) => (
        <CartListItem key={item.id} {...item} />
      ))}
    </div>
  );
};