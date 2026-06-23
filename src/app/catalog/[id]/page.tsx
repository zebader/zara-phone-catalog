import { CatalogDetails } from "@/features/catalog/pages";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  return (
    <div>
      <CatalogDetails params={params} />
    </div>
  );
}