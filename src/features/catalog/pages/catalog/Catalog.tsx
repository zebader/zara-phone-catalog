import { getPhoneProducts } from "@/shared/services/api";
import { PhoneProduct } from "@/shared/types/api";
import Image from "next/image";
import Link from "next/link";
import { SearchBarWrapper } from "../../ui/search-bar/search-bar-wrapper/SearchBarWrapper";
import styles from './Catalog.module.css';
export const Catalog = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const { search } = await searchParams;

  let phones: Array< PhoneProduct > = [];

  try {
    phones = await getPhoneProducts({ search: search ?? undefined });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }

  const totalResults = phones.length;

  return (
    <div>
      <SearchBarWrapper itemsQuantity={totalResults}/>

      <div className={styles.container}>
        {totalResults === 0 ? (
          <p className="text-primary">No products found</p>
        ) : (
          phones.map((phone,index) => (
            <div key={phone.id + index}>
              <Link href={`/catalog/${phone.id}`}>
                <Image src={phone.imageUrl} alt={phone.name} width={100} height={100} loading="eager"/>
                <h2>{phone.name}</h2>
                <p>{phone.brand}</p>
                <p>{phone.basePrice}</p>
              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}