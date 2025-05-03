"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {ArrowUpDown} from "lucide-react";
import {MOCK_PROPERTIES} from "@/lib/constants";
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

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [sort, setSort] = useState<PropertySort>({
    field: "price",
    direction: "asc",
  });

  // In a real app, this would be a server-side or API call
  const properties = MOCK_PROPERTIES;

  // Filter and sort properties
  const filteredProperties = properties
    .filter((property) => {
      // Search term filter
      if (
        searchTerm &&
        !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        !property.address.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !property.city.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Type filter
      if (
        filters.type &&
        filters.type !== "all" &&
        property.type !== filters.type
      ) {
        return false;
      }

      // Price filter
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }

      // Bedroom filter
      if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
        return false;
      }

      // Bathroom filter
      if (filters.minBathrooms && property.bathrooms < filters.minBathrooms) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort.field === "price") {
        return sort.direction === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sort.field === "bedrooms") {
        return sort.direction === "asc"
          ? a.bedrooms - b.bedrooms
          : b.bedrooms - a.bedrooms;
      }
      if (sort.field === "bathrooms") {
        return sort.direction === "asc"
          ? a.bathrooms - b.bathrooms
          : b.bathrooms - a.bathrooms;
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
            {filteredProperties.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                {...staggerContainer()}>
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
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
