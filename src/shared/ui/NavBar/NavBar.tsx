import Image from "next/image";
import styles from './NavBar.module.css';
import logo from '../../assets/mbst-logo.svg';
import { NavBarCart } from './NavBarCart/NavBarCart';
import Link from 'next/link';
export const NavBar = () => {

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.imageWrapper}>
        <Image src={logo} alt="Logo para volver a la pagina principal" width={74} height={24} />
      </Link>
      <NavBarCart />
    </nav>
  );
}