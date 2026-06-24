'use client';
import { useCart } from "@/shared/contexts";
import { CartList } from "../ui/cart-list/CartList";
import styles from './Cart.module.css';
import { CartFooter } from "../ui/cart-footer/CartFooter";

export const Cart = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles.container}>
      <h1 className="title-1">{`Cart (${cart.length})`}</h1>
      {cart.length > 0 ? (
        <div className={styles.cartListContainer}>
          <CartList cart={cart} />
        </div>
      ): (
        <div className={styles.emptyContainer}>Cart is empty</div>
      )}
      <CartFooter totalPrice={totalPrice} hasCartItems={cart.length > 0} />
    </div>
  );
};