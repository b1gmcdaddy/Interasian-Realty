"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        className="text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Let our expert team help you navigate the real estate market and find
          the perfect property.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg" variant="secondary">
            <Link href="/properties" className="group">
              Browse Properties
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white/20 hover:text-white">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
