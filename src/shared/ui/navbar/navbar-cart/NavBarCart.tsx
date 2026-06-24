'use client';
import Image from "next/image";
import styles from './NavBarCart.module.css';
import cartActive from '../../../assets/cart-active.svg';
import cartInactive from '../../../assets/cart-inactive.svg';
import Link from "next/link";
import { useCart } from "@/shared/contexts";

export const NavBarCart = () => {
  const { cartCount } = useCart();

  const isCartActive = cartCount > 0;

  return (

    <Link href="/cart" className={styles.container} aria-label={`Go to cart, ${cartCount} items in the cart`}>
      {isCartActive ? (
        <Image src={cartActive} alt="Cart with items" width={24} height={24} />
      ) : (
        <Image src={cartInactive} alt="Empty cart" width={24} height={24} />
      )}
      <span className={styles.cartItemsAmount} aria-live="polite">{cartCount}</span>
    </Link>

  );
}