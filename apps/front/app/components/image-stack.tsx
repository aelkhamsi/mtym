"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Image = {
  name: string;
  src: string;
};
export const ImageStack = ({
  images,
  autoplay = false,
}: {
  images: Image[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="relative h-60 md:h-80 w-full max-w-sm md:max-w-lg mx-auto antialiased ">
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{
              opacity: 0,
              scale: 0.9,
              z: -100,
              rotate: randomRotateY(),
            }}
            animate={{
              opacity: isActive(index) ? 1 : 0.7,
              scale: isActive(index) ? 1 : 0.95,
              z: isActive(index) ? 0 : -100,
              rotate: isActive(index) ? 0 : randomRotateY(),
              zIndex: isActive(index)
                ? 999
                : images.length + 2 - index,
              y: isActive(index) ? [0, -80, 0] : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              z: 100,
              rotate: randomRotateY(),
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0 origin-bottom"
          >
            <Image
              src={image.src}
              alt={image.name}
              width={700}
              height={300}
              draggable={false}
              className="h-full w-full rounded-3xl object-cover object-center"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
