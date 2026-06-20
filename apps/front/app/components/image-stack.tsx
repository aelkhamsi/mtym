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
  const [rotations] = useState(() =>
    images.map(() => Math.floor(Math.random() * 21) - 10)
  );

  const handleNext = () => {
    setActive((prev) => (prev + 1) % images.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 3000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="relative isolate h-60 md:h-80 w-full max-w-sm md:max-w-lg mx-auto antialiased">
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{
              opacity: 0,
              scale: 0.9,
              z: -100,
              rotate: rotations[index],
            }}
            animate={{
              opacity: isActive(index) ? 1 : 0.7,
              scale: isActive(index) ? 1 : 0.95,
              z: isActive(index) ? 0 : -100,
              rotate: isActive(index) ? 0 : rotations[index],
              zIndex: isActive(index) ? 999 : images.length + 2 - index,
              y: isActive(index) ? [0, -80, 0] : 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              z: 100,
              rotate: rotations[index],
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
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 300px"
              className="h-full w-full object-cover rounded-3xl object-center"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
