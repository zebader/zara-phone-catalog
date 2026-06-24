import { SearchBar } from "../SearchBar";
import styles from './SearchBarWrapper.module.css';
export const SearchBarWrapper = ({ itemsQuantity }: { itemsQuantity: number }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SearchBar />
        <p className="title-3" aria-live="polite">{itemsQuantity} Results</p>
      </div>
    </div>
  );
}