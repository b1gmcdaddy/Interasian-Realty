"use client";

import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {ChevronLeft, ChevronRight, Maximize2} from "lucide-react";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({images, title}: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <Dialog>
          <div className="group relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full object-cover rounded-lg h-[400px] md:h-[500px] lg:h-[600px]"
              />
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                aria-label="Previous image">
                <ChevronLeft className="h-6 w-6" />
              </button>

              <DialogTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                  aria-label="View fullscreen">
                  <Maximize2 className="h-6 w-6" />
                </button>
              </DialogTrigger>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                aria-label="Next image">
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>

          <DialogContent className="max-w-5xl">
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full object-contain max-h-[80vh]"
              />

              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex overflow-x-auto space-x-2 pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.98}}
            className={cn(
              "relative overflow-hidden rounded-md flex-shrink-0",
              "h-20 w-20 md:h-24 md:w-24 bg-muted",
              index === currentImageIndex ? "ring-2 ring-primary" : ""
            )}>
            <img
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
