"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {LucideIcon, DivideIcon} from "lucide-react";
import {Home, Building2, Building, Map, Trees, Store} from "lucide-react";
import {cn} from "@/lib/utils";
import {fadeIn, staggerContainer} from "@/lib/motion";
import {Card} from "@/components/ui/card";

interface PropertyTypeCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  href: string;
}

const PropertyTypeCard = ({
  icon: Icon,
  title,
  count,
  href,
}: PropertyTypeCardProps) => {
  return (
    <motion.div
      whileHover={{y: -5, transition: {duration: 0.2}}}
      whileTap={{y: 0}}>
      <Link href={href}>
        <Card
          className={cn(
            "relative flex flex-col items-center text-center p-6 h-full",
            "hover:shadow-lg transition-shadow duration-300",
            "overflow-hidden group"
          )}>
          <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-xl mb-1">{title}</h3>
          <p className="text-muted-foreground">{count} Properties</p>

          <div
            className={cn(
              "absolute inset-0 bg-primary/5 -z-10 transform scale-x-0",
              "group-hover:scale-x-100 transition-transform duration-300 origin-left"
            )}
          />
        </Card>
      </Link>
    </motion.div>
  );
};

export default function PropertyTypes() {
  const propertyTypes = [
    {icon: Home, title: "Houses", count: 25, href: "/properties?type=house"},
    {
      icon: Building2,
      title: "Condos",
      count: 18,
      href: "/properties?type=condo",
    },
    {
      icon: Building,
      title: "Apartments",
      count: 12,
      href: "/properties?type=apartment",
    },
    {icon: Map, title: "Land", count: 8, href: "/properties?type=land"},
    {
      icon: Trees,
      title: "House & Lot",
      count: 15,
      href: "/properties?type=house-and-lot",
    },
    {
      icon: Store,
      title: "Commercial",
      count: 10,
      href: "/properties?type=commercial",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-12"
        {...fadeIn()}
        viewport={{once: true}}>
        <h2 className="text-3xl font-bold mb-2">Browse by Property Type</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse collection of properties categorized by type to
          find what you're looking for.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        {...staggerContainer()}
        viewport={{once: true}}>
        {propertyTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: index * 0.1}}
            viewport={{once: true}}>
            <PropertyTypeCard {...type} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
