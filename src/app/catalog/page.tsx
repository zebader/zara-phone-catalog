import { Catalog } from "@/features/catalog/pages";

export default async function Page({ searchParams }: { searchParams: Promise<{ search: string }> }) {
  return (
    <Catalog searchParams={searchParams} />
  );
}
