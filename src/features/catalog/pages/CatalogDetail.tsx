import { getPhoneProductById } from "@/services/api";
import {  PhoneProductDetail } from "@/types/api";
import Image from "next/image";

export const CatalogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let phone: PhoneProductDetail  | null = null;
  try {
    phone = await getPhoneProductById(id);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  }

  if (!phone) {
    return <div>Producto no encontrado</div>;
  }

    return (
      <div>
        <h1 className="text-primary">Catalog Detail</h1>
        <Image src={phone.colorOptions[0]?.imageUrl ?? ""} alt={phone.name} width={100} height={100} loading="eager"/>
        <h2>{phone.name}</h2>
        <p>{phone.description}</p>
        <p>{phone.basePrice}</p>
        <p>{phone.rating}</p>
        <p>{phone.specs.screen}</p>
        <p>{phone.specs.resolution}</p>
        <p>{phone.specs.processor}</p>
        <p>{phone.specs.mainCamera}</p>
        <p>{phone.specs.selfieCamera}</p>
        <p>{phone.specs.battery}</p>
      </div>
    );
  }