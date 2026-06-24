import styles from "./ProductSpecsList.module.css";
import { FullProductSpecs } from "@/shared/types/api";

export const ProductSpecsList = ({ specs }: { specs: FullProductSpecs }) => {
  return (
    <section className={styles.specsContainer} aria-labelledby="specs-title">
      <h2 id="specs-title" className="title-2">Specifications</h2>
      <dl>
        {Object.entries(specs).map(([key, value]) => (
          <div className={styles.specItem} key={key}>
            <dt className={`${styles.specItemLeft} title-3`}>{key}</dt>
            <dd className={`${styles.specItemRight} text-1`}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}