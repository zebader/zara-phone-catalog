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

    <Link href="/cart" className={styles.container}>
      {isCartActive ? <Image src={cartActive} alt="Icono de carrito activo" width={24} height={24} /> : <Image src={cartInactive} alt="Icono de carrito inactivo" width={24} height={24} />}
      <span className={styles.cartItemsAmount}>{cartCount}</span>
    </Link>

  );
}