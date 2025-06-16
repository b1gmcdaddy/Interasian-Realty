"use client";

import {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {Search, Eye} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import useGetAllListings from "@/hooks/listings/useGetAllListings";
import {Property} from "@/lib/types";
import {cn} from "@/lib/utils";
import {formatPrice} from "@/lib/utils";
import Loader from "../layout/loader";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const {data: listings} = useGetAllListings({
    searchQuery: searchQuery || undefined,
    pageSize: 5,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      router.push(
        `/properties?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleResultClick = (listing: Property) => {
    setLoading(true);
    router.push(`/properties/${listing.id}`);
    setShowResults(false);
  };

  const handleViewAll = () => {
    router.push("/properties");
  };

  if (loading) return <Loader />;

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
            <form onSubmit={handleSearch} className="relative" ref={searchRef}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by property name or location..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  className="w-full h-12 pl-4 pr-12 text-lg text-black dark:text-white"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  className="w-full md:w-auto md:px-8 cursor-pointer"
                  onClick={handleViewAll}
                  type="button">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Properties
                </Button>
              </div>

              {showResults &&
                searchQuery &&
                listings?.data &&
                listings.data?.length > 0 && (
                  <div className="absolute w-full mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-h-[300px] overflow-y-auto z-50">
                    {listings.data?.map((listing) => (
                      <div
                        key={listing.id}
                        onClick={() => handleResultClick(listing)}
                        className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer border-b last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {listing.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {listing.location}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatPrice(listing.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
