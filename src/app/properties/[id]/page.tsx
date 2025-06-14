"use client";

import {notFound, useParams} from "next/navigation";
import PropertyDetailClient from "@/components/properties/property-detail-client";
import useGetListing from "@/hooks/listings/useGetListing";
import useGetAllListings from "@/hooks/listings/useGetAllListings";
import {Property} from "@/lib/types";

export default function PropertyDetailPage() {
  const params = useParams();
  const listingId = params.id as string;

  const {
    data: listing,
    isLoading: isListingLoading,
    error: listingError,
  } = useGetListing(listingId, {enabled: !!listingId});

  const {data: allListings, isLoading: isAllListingsLoading} =
    useGetAllListings();

  if (isListingLoading) {
    return (
      <div className="container mx-auto p-8">Loading property details...</div>
    );
  }

  if (listingError) {
    return (
      <div className="container mx-auto p-8">
        Error loading property details
      </div>
    );
  }

  if (!listing && !isListingLoading) {
    notFound();
  }

  const relatedProperties =
    allListings
      ?.filter(
        (p: Property) =>
          p.id !== listingId && p.propertyType === listing?.propertyType
      )
      .slice(0, 3) || [];

  return (
    <PropertyDetailClient
      initialProperty={listing as Property}
      relatedProperties={relatedProperties}
    />
  );
}
