import {MOCK_PROPERTIES} from "@/lib/constants";
import Hero from "@/components/home/hero";
import FeaturedProperties from "@/components/home/featured-properties";
import PropertyTypes from "@/components/home/property-types";
import CallToAction from "@/components/home/call-to-action";

export default function Home() {
  // In a real app, you would fetch this data from your API
  const featuredProperties = MOCK_PROPERTIES.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <section className="container mx-auto px-4 py-12 md:py-16">
        <FeaturedProperties properties={featuredProperties} />
      </section>

      <section className="bg-muted py-12 md:py-16">
        <PropertyTypes />
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <CallToAction />
      </section>
    </div>
  );
}
