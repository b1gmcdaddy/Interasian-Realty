"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {ArrowUpDown} from "lucide-react";
import {
  PropertyFilter,
  PropertySort,
  Property,
  PropertyType,
} from "@/lib/types";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetAllListings from "@/hooks/listings/useGetAllListings";
import {useSearchParams} from "next/navigation";

export default function PropertiesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: listingsData,
    isLoading: isLoadingListings,
    error: errorListings,
  } = useGetAllListings({
    pageNumber: currentPage,
    pageSize: pageSize,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [sort, setSort] = useState<PropertySort>({
    field: "price",
    direction: "asc",
  });

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const city = searchParams.get("city");
  const price = searchParams.get("price");
  let minPrice: number | undefined, maxPrice: number | undefined;
  if (price) {
    const [min, max] = price.split("-").map(Number);
    minPrice = min;
    maxPrice = max;
  }

  // Sync filters with query params
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      type: (type as PropertyType) || "all",
      minPrice: minPrice,
      maxPrice: maxPrice,
      city: city || "any",
    }));
  }, [type, city, minPrice, maxPrice]);

  // Filter and sort properties
  const filteredListings = listingsData?.data
    ?.filter((listing: Property) => {
      if (!listing.status) return false;
      if (
        filters.type &&
        filters.type !== "all" &&
        listing.propertyType !== filters.type
      )
        return false;
      if (
        filters.city &&
        filters.city !== "any" &&
        listing.location !== filters.city
      )
        return false;
      if (filters.minPrice !== undefined && listing.price < filters.minPrice)
        return false;
      if (filters.maxPrice !== undefined && listing.price > filters.maxPrice)
        return false;
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
    .sort((a: Property, b: Property) => {
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

  const pagination = listingsData?.pagination;

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
            {filteredListings && filteredListings.length > 0 ? (
              <>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  {...staggerContainer()}>
                  {filteredListings.map((listing: Property) => (
                    <PropertyCard key={listing.id} property={listing} />
                  ))}
                </motion.div>

                {pagination && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pagination.hasPrevious) {
                              setCurrentPage(currentPage - 1);
                            }
                          }}
                          className={
                            !pagination.hasPrevious
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        {length: pagination.totalPages},
                        (_, i) => i + 1
                      ).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                            isActive={page === currentPage}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (pagination.hasNext) {
                              setCurrentPage(currentPage + 1);
                            }
                          }}
                          className={
                            !pagination.hasNext
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
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
