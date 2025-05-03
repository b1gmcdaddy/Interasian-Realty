"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Property} from "@/lib/types";
import {fadeIn, staggerContainer} from "@/lib/motion";
import PropertyCard from "./property-card";

interface RelatedPropertiesProps {
  properties: Property[];
}

export default function RelatedProperties({
  properties,
}: RelatedPropertiesProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <div>
      <motion.div className="mb-8" {...fadeIn()} viewport={{once: true}}>
        <h2 className="text-2xl font-semibold">Similar Properties</h2>
        <p className="text-muted-foreground">
          You might also be interested in these properties
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        {...staggerContainer()}
        viewport={{once: true}}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </motion.div>
    </div>
  );
}
