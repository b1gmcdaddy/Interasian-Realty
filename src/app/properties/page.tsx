"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {ArrowUpDown} from "lucide-react";
import {PropertyFilter, PropertySort, Property} from "@/lib/types";
import {fadeIn, staggerContainer} from "@/lib/motion";
import PropertyCard from "@/components/properties/property-card";
import PropertyFilters from "@/components/properties/property-filters";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllListings from "@/hooks/listings/useGetAllListings";

export default function PropertiesPage() {
  const {
    data: listings,
    isLoading: isLoadingListings,
    error: errorListings,
  } = useGetAllListings();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [sort, setSort] = useState<PropertySort>({
    field: "price",
    direction: "asc",
  });

  // Filter and sort properties
  const filteredListings = listings
    ?.filter((listing: Property) => {
      // Search term filter
      if (
        searchTerm &&
        !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (
        filters.type &&
        filters.type !== "all" &&
        listing.propertyType !== filters.type
      ) {
        return false;
      }

      // Price filter
      if (filters.minPrice && listing.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && listing.price > filters.maxPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.minBedrooms && listing.bedRooms! < filters.minBedrooms) {
        return false;
      }

      // Bathroom filter
      if (filters.minBathrooms && listing.bathRooms! < filters.minBathrooms) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort.field === "price") {
        return sort.direction === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sort.field === "bedRooms") {
        return sort.direction === "asc"
          ? a.bedRooms! - b.bedRooms!
          : b.bedRooms! - a.bedRooms!;
      }
      if (sort.field === "bathRooms") {
        return sort.direction === "asc"
          ? a.bathRooms! - b.bathRooms!
          : b.bathRooms! - a.bathRooms!;
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div {...fadeIn()}>
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Property</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow">
            <Input
              placeholder="Search properties by name, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={sort.field}
              onValueChange={(value) =>
                setSort({...sort, field: value as any})
              }>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="bedrooms">Bedrooms</SelectItem>
                <SelectItem value="bathrooms">Bathrooms</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSort({
                  ...sort,
                  direction: sort.direction === "asc" ? "desc" : "asc",
                })
              }
              aria-label={
                sort.direction === "asc" ? "Sort ascending" : "Sort descending"
              }>
              <ArrowUpDown
                className={`h-4 w-4 ${
                  sort.direction === "desc" ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </aside>

          <div className="lg:col-span-3">
            {filteredListings?.length! > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                {...staggerContainer()}>
                {filteredListings?.map((listing: Property) => (
                  <PropertyCard key={listing.listingId} property={listing} />
                ))}
              </motion.div>
            ) : (
              <div className="bg-muted rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
