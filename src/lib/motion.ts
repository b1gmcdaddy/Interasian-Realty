import {MotionProps} from "framer-motion";

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay: number = 0.2
): MotionProps => {
  return {
    initial: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay,
      },
    },
    exit: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): MotionProps => {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const hoverScale = {
  whileHover: {scale: 1.03},
  whileTap: {scale: 0.98},
  transition: {type: "spring", stiffness: 400, damping: 17},
};
