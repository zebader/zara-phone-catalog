import Image from "next/image";
import styles from './NavBar.module.css';
import logo from '../../assets/mbst-logo.svg';
import { NavBarCart } from './NavBarCart/NavBarCart';

export const NavBar = () => {

  return (
    <nav className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image src={logo} alt="Logo para volver a la pagina principal" width={74} height={24} />
      </div>
      <NavBarCart />
    </nav>
  );
}