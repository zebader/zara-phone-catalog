import { getPhoneProductById } from "@/shared/services/api";
import {  PhoneProductDetail } from "@/shared/types/api";
import styles from "./CatalogDetails.module.css";
import { ProductSpecsList } from "../../ui/product-specs-list/ProductSpecsList";
import { ProductMedia } from "../../ui/product-media/ProductMedia";
import { ProductCarousel } from "../../ui/product-carousel/ProductCarousel";
import { BackButton } from "@/shared/ui";

export const CatalogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let product: PhoneProductDetail  | null = null;
  try {
    product = await getPhoneProductById(id);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }

  if (!product) {
    return <div>The product was not found</div>;
  }

  const { specs, colorOptions, name, basePrice, description, brand, storageOptions, similarProducts } = product;

  const fullProductSpecs = {
    "brand": brand,
    "name": name,
    "description": description,
    ...specs
  }

  return (
    <>
      <div className={styles.backButtonWrapper}>
        <div className={styles.backButtonContainer}>
          <BackButton />
        </div>
      </div>
      <div className={styles.container}>
        <ProductMedia colorOptions={colorOptions} name={name} basePrice={basePrice} storageOptions={storageOptions} id={id} />
        <ProductSpecsList specs={fullProductSpecs} />
        <ProductCarousel products={similarProducts} title="Similar items" />
      </div>
    </>
  );
}