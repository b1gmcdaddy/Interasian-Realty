"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Separator} from "@/components/ui/separator";
import {Property} from "@/lib/types";
import {fadeIn} from "@/lib/motion";
import PropertyGallery from "@/components/properties/property-gallery";
import PropertyInfo from "@/components/properties/property-info";
import PropertyContact from "@/components/properties/property-contact";
import RelatedProperties from "@/components/properties/related-properties";

interface PropertyDetailClientProps {
  initialProperty: Property;
  relatedProperties: Property[];
}

export default function PropertyDetailClient({
  initialProperty,
  relatedProperties,
}: PropertyDetailClientProps) {
  const [property] = useState<Property>(initialProperty);

  const imageUrls = property.images?.map((image) => image.imageUrl || "");

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div {...fadeIn()} className="mb-16">
        <PropertyGallery images={imageUrls!} title={property.title} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
            <Separator className="my-8" />
            {/* <PropertyFeatures features={property.features} /> */}
          </div>

          <div className="lg:col-span-1">
            <PropertyContact
              owner={property.owner}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </motion.div>

      <RelatedProperties properties={relatedProperties} />
    </div>
  );
}
