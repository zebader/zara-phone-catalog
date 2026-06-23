import { getPhoneProducts } from "@/shared/services/api";
import { PhoneProduct } from "@/shared/types/api";
import Image from "next/image";
import Link from "next/link";

export const Catalog = async () => {
  let phones: Array< PhoneProduct > = [];
  try {
    phones = await getPhoneProducts();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }

  const totalResults = phones.length;

  if (totalResults === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div>
        {phones.map((phone,index) => (
          <div key={phone.id + index}>
            <Link href={`/catalog/${phone.id}`}>
              <Image src={phone.imageUrl} alt={phone.name} width={100} height={100} loading="eager"/>
              <h2>{phone.name}</h2>
              <p>{phone.brand}</p>
              <p>{phone.basePrice}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}