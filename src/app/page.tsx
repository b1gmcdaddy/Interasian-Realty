import Hero from "@/components/home/hero";
import FeaturedProperties from "@/components/home/featured-properties";
import PropertyTypes from "@/components/home/property-types";
import CallToAction from "@/components/home/call-to-action";

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
