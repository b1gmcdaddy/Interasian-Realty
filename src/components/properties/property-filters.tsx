"use client";

import {BEDROOM_OPTIONS, BATHROOM_OPTIONS, PRICE_RANGE} from "@/lib/constants";
import {PROPERTY_TYPES, PropertyFilter} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {formatPrice} from "@/lib/utils";

interface PropertyFiltersProps {
  filters: PropertyFilter;
  setFilters: (filters: PropertyFilter) => void;
}

export default function PropertyFilters({
  filters,
  setFilters,
}: PropertyFiltersProps) {
  const handleTypeChange = (value: string) => {
    setFilters({...filters, type: value as any});
  };

  const handlePriceChange = (values: number[]) => {
    setFilters({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1] === PRICE_RANGE.max ? undefined : values[1],
    });
  };

  const handleBedroomsChange = (value: string) => {
    const minBedrooms = value === "6+" ? 6 : parseInt(value);
    setFilters({...filters, minBedrooms});
  };

  const handleBathroomsChange = (value: string) => {
    const minBathrooms = value === "5+" ? 5 : parseFloat(value);
    setFilters({...filters, minBathrooms});
  };

  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? PRICE_RANGE.max;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your property search</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <Label className="mb-2 block">Property Type</Label>
          <Select
            value={filters.type ?? "all"}
            onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Label>Price Range</Label>
            <span className="text-sm text-muted-foreground">
              {formatPrice(minPrice)} -{" "}
              {maxPrice === PRICE_RANGE.max ? "$5M+" : formatPrice(maxPrice)}
            </span>
          </div>
          <Slider
            min={0}
            max={PRICE_RANGE.max}
            step={PRICE_RANGE.step}
            defaultValue={[minPrice, maxPrice]}
            onValueChange={handlePriceChange}
            className="my-6"
          />
        </div>

        <div>
          <Label className="mb-2 block">Bedrooms</Label>
          <Select
            value={filters.minBedrooms?.toString() ?? "any"}
            onValueChange={handleBedroomsChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {BEDROOM_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option === "6+"
                    ? "6+ Bedrooms"
                    : `${option} ${option === 1 ? "Bedroom" : "Bedrooms"}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Bathrooms</Label>
          <Select
            value={(filters.minBathrooms as any)?.toString() ?? "any"}
            onValueChange={handleBathroomsChange}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {BATHROOM_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option === "5+"
                    ? "5+ Bathrooms"
                    : `${option} ${option === 1 ? "Bathroom" : "Bathrooms"}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
