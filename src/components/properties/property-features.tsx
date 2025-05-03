"use client";

import {motion} from "framer-motion";
import {Check} from "lucide-react";
import {fadeIn, staggerContainer} from "@/lib/motion";

interface PropertyFeaturesProps {
  features: string[];
}

export default function PropertyFeatures({features}: PropertyFeaturesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Property Features</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2"
        {...staggerContainer(0.05)}
        viewport={{once: true}}>
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.3, delay: index * 0.05}}
            viewport={{once: true}}
            className="flex items-center gap-2 py-1">
            <div className="flex-shrink-0 rounded-full bg-primary/10 p-1">
              <Check className="h-4 w-4 text-primary" />
            </div>
            <span>{feature}</span>
          </motion.div>
        ))}
      </motion.div>

      {features.length === 0 && (
        <p className="text-muted-foreground">
          No features listed for this property.
        </p>
      )}
    </div>
  );
}
