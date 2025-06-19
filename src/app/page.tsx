import Hero from "@/components/home/hero";
import FeaturedProperties from "@/components/home/featured-properties";
import PropertyTypes from "@/components/home/property-types";
import CallToAction from "@/components/home/call-to-action";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Inter Asian Realty Services Inc.",
  description:
    "Discover the perfect property in Cebu with Inter Asian Realty Services. Browse our extensive collection of houses, condos, apartments, and more.",
  openGraph: {
    title: "Inter Asian Realty Services Inc.",
    description:
      "Discover the perfect property in Cebu with Inter Asian Realty Services. Browse our extensive collection of houses, condos, apartments, and more.",
    images: [
      {
        url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        width: 1200,
        height: 630,
        alt: "Inter Asian Realty Services - Find Your Dream Property",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <FeaturedProperties />
      </section>

      <section className="bg-muted py-12 md:py-16">
        <PropertyTypes />
      </section>

      <section className="bg-[#D6B588] py-16">
        <CallToAction />
      </section>
    </div>
  );
}
