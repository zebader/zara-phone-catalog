import { CatalogDetail } from "@/features/catalog/pages";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  return (
    <div>
      <CatalogDetail params={params} />
    </div>
  );
}