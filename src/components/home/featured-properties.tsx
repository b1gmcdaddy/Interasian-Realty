"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Property} from "@/lib/types";
import {staggerContainer} from "@/lib/motion";
import PropertyCard from "@/components/properties/property-card";
import {Button} from "@/components/ui/button";
import useGetAllListings from "@/hooks/listings/useGetAllListings";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties() {
  const {data: listings, isLoading, error} = useGetAllListings();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const featuredListings = listings?.data?.slice(0, 3);

  return (
    <div className="text-center">
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true}}>
        <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Discover our handpicked selection of the most exceptional properties
          currently available on the market.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        {...staggerContainer()}
        viewport={{once: true}}>
        {featuredListings?.map((listing) => (
          <PropertyCard key={listing.id} property={listing} />
        ))}
      </motion.div>

      <motion.div
        initial={{opacity: 0, y: 10}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.3, delay: 0.2}}
        viewport={{once: true}}>
        <Button asChild variant="outline" size="lg">
          <Link href="/properties" className="group">
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
