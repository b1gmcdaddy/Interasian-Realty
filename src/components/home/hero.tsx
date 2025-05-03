"use client";

import {useState} from "react";
import Link from "next/link";
import {motion} from "framer-motion";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {PRICE_RANGE, FEATURED_CITIES} from "@/lib/constants";
import {PROPERTY_TYPES} from "@/lib/types";
import {cn} from "@/lib/utils";

export default function Hero() {
  const [propertyType, setPropertyType] = useState("all");
  const [city, setCity] = useState("any");
  const [priceRange, setPriceRange] = useState(`0-${PRICE_RANGE.max}`);

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg')",
          filter: "brightness(0.7)",
        }}
      />

      <div className="container px-4 relative z-10 mx-auto">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover the perfect place to call home with our extensive listings
            of properties
          </p>

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2, duration: 0.5}}
            className={cn(
              "bg-background/95 backdrop-blur-md rounded-lg shadow-lg p-4 md:p-6",
              "dark:bg-background/90"
            )}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Property Type
                </label>
                <Select defaultValue="all" onValueChange={setPropertyType}>
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
                <label className="block text-sm font-medium text-foreground mb-1">
                  Location
                </label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Location</SelectItem>
                    {FEATURED_CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={`0-${PRICE_RANGE.max}`}>
                      Any Price
                    </SelectItem>
                    <SelectItem value="0-500000">Up to $500,000</SelectItem>
                    <SelectItem value="500000-1000000">
                      PHP 500,000 - PHP 1,000,000
                    </SelectItem>
                    <SelectItem value="1000000-2000000">
                      PHP 1,000,000 - PHP 2,000,000
                    </SelectItem>
                    <SelectItem value={`2000000-PHP {PRICE_RANGE.max}`}>
                      PHP 2,000,000+
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="xl:col-span-1 md:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Keywords
                </label>
                <div className="relative">
                  <Input placeholder="Pool, garage, etc." />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button asChild size="lg" className="w-full md:w-auto md:px-8">
                <Link href="/properties">
                  <Search className="mr-2 h-4 w-4" />
                  Search Properties
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
