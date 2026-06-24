'use client';
import { useCart } from "@/shared/contexts";
import { CartList } from "../ui/cart-list/CartList";
import styles from './Cart.module.css';
import { CartFooter } from "../ui/cart-footer/CartFooter";

export const Cart = () => {
  const { cart } = useCart();
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={styles.container} aria-label="Shopping cart">
      <h1 className="title-1">{`Cart (${cart.length})`}</h1>
      {cart.length > 0 ? (
        <div className={styles.cartListContainer} aria-label="Products in the cart">
          <CartList cart={cart} />
        </div>
      ): (
        <p className={styles.emptyContainer} role="status">Cart is empty</p>
      )}
      <CartFooter totalPrice={totalPrice} hasCartItems={cart.length > 0} />
    </div>
  );
};