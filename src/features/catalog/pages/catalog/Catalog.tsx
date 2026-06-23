import { getPhoneProducts } from "@/shared/services/api";
import { PhoneProduct } from "@/shared/types/api";
import { SearchBarWrapper } from "../../ui/search-bar/search-bar-wrapper/SearchBarWrapper";
import styles from './Catalog.module.css';
import { ProductGrid } from "../../ui/product-grid/ProductGrid";
export const Catalog = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const { search } = await searchParams;

  let products: Array< PhoneProduct > = [];

  try {
    products = await getPhoneProducts({ search: search ?? undefined });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }

  const totalResults = products.length;

  return (
    <div>
      <SearchBarWrapper itemsQuantity={totalResults}/>

      <div className={styles.container}>
        {totalResults === 0 ? (
          <p className="text-primary">No products found</p>
        ) : (
          <ProductGrid products={products}/>
        )}
      </div>

    </div>
  );
}