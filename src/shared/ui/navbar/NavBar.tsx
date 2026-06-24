import Image from "next/image";
import styles from './NavBar.module.css';
import logo from '../../assets/mbst-logo.svg';
import { NavBarCart } from './navbar-cart/NavBarCart';
import Link from 'next/link';
export const NavBar = () => {

  return (
    <nav className={styles.wrapper} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href="/" className={styles.imageWrapper} aria-label="Go to the home page">
          <Image src={logo} alt="" width={74} height={24} aria-hidden="true" />
        </Link>
        <NavBarCart />
      </div>
    </nav>
  );
}