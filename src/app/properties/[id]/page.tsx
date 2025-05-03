import {notFound} from "next/navigation";
import {MOCK_PROPERTIES} from "@/lib/constants";
import PropertyDetailClient from "@/components/properties/property-detail-client";

export async function generateStaticParams() {
  return MOCK_PROPERTIES.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyDetailPage({params}: {params: {id: string}}) {
  const property = MOCK_PROPERTIES.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  const relatedProperties = MOCK_PROPERTIES.filter(
    (p) => p.id !== property.id && p.type === property.type
  ).slice(0, 3);

  return (
    <PropertyDetailClient
      initialProperty={property}
      relatedProperties={relatedProperties}
    />
  );
}
