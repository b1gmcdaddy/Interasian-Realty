"use client";

import {motion} from "framer-motion";
import {Bath, Bed, Calendar, Home, MapPin, Ruler} from "lucide-react";
import {Property, PropertyType} from "@/lib/types";
import {TYPE_ICONS} from "@/lib/constants";
import {formatPrice, cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {fadeIn} from "@/lib/motion";

interface PropertyInfoProps {
  property: Property;
}

const calculatePricePerArea = (price: number, area?: string) => {
  if (!area) return price;
  const numericArea = parseFloat(area);
  return numericArea > 0 ? price / numericArea : price;
};

export default function PropertyInfo({property}: PropertyInfoProps) {
  const Icon = Home;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="uppercase">
              {property?.propertyType.replace("-", " ")}
            </Badge>
            <Badge variant="secondary">ID: {property.listingId}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{property?.title}</h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property?.location}</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 text-right">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(property.price)}
          </p>
          <p className="text-muted-foreground text-sm">
            {calculatePricePerArea(
              property.price,
              property.landArea
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            /sq ft
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {property.bedRooms! > 0 && (
          <motion.div
            className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center"
            {...fadeIn("up", 0.1)}>
            <Bed className="h-6 w-6 mb-2 text-primary" />
            <span className="text-lg font-semibold">{property.bedRooms}</span>
            <span className="text-sm text-muted-foreground">
              {property.bedRooms === 1 ? "Bedroom" : "Bedrooms"}
            </span>
          </motion.div>
        )}

        {property.bathRooms! > 0 && (
          <motion.div
            className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center"
            {...fadeIn("up", 0.2)}>
            <Bath className="h-6 w-6 mb-2 text-primary" />
            <span className="text-lg font-semibold">{property.bathRooms}</span>
            <span className="text-sm text-muted-foreground">
              {property.bathRooms === 1 ? "Bathroom" : "Bathrooms"}
            </span>
          </motion.div>
        )}

        <motion.div
          className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center"
          {...fadeIn("up", 0.3)}>
          <Ruler className="h-6 w-6 mb-2 text-primary" />
          <span className="text-lg font-semibold">
            {property.landArea!.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">Square Feet</span>
        </motion.div>

        <motion.div
          className="bg-muted rounded-lg p-4 flex flex-col items-center justify-center text-center"
          {...fadeIn("up", 0.4)}>
          <Calendar className="h-6 w-6 mb-2 text-primary" />
          <span className="text-lg font-semibold">Listed</span>
          <span className="text-sm text-muted-foreground">
            {/* {formatDate(property.createdAt)} */}
          </span>
        </motion.div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="text-muted-foreground space-y-4">
          <p>{property?.description}</p>
        </div>
      </div>
    </div>
  );
}
