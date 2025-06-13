"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Bath, Bed, Heart, MapPin, Ruler} from "lucide-react";
import {Property} from "@/lib/types";
import {formatPrice} from "@/lib/utils";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {hoverScale} from "@/lib/motion";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({property}: PropertyCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      className="h-full"
      {...hoverScale}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <img
              src={
                property.images?.[0]?.fileName
                  ? property.images[0].fileName
                  : "/logo.png"
              }
              alt={property.title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </AspectRatio>
          {/* <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/40 backdrop-blur-sm hover:bg-background/60"
              aria-label="Save property">
              <Heart className="h-4 w-4" />
            </Button>
          </div> */}
          <Badge
            className="absolute top-2 left-2 uppercase"
            variant="secondary">
            {property?.propertyType?.replace("-", " ")}
          </Badge>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-bold text-xl">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        <CardContent className="pt-4 flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">
            <Link
              href={`/properties/${property.listingId}`}
              className="hover:underline">
              {property.title}
            </Link>
          </h3>

          <div className="flex items-start gap-1 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {property.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            {property.bedRooms! > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>
                  {property.bedRooms} {property.bedRooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
            )}

            {property.bathRooms! > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>
                  {property.bathRooms}{" "}
                  {property.bathRooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Ruler className="h-4 w-4 text-muted-foreground" />
              <span>{property.landArea} sq ft</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4">
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/properties/${property.listingId}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
