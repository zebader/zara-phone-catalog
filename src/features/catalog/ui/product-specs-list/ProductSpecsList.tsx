import styles from "./ProductSpecsList.module.css";
import { FullProductSpecs } from "@/shared/types/api";

export const ProductSpecsList = ({ specs }: { specs: FullProductSpecs }) => {
  return (
    <div className={styles.specsContainer}>
      <h2 className="title-2">Specifications</h2>
      <div >
        {Object.entries(specs).map(([key, value]) => (
          <div className={styles.specItem} key={key}>
            <p className={`${styles.specItemLeft} title-3`}>{key}</p>
            <p className={`${styles.specItemRight} text-1`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}