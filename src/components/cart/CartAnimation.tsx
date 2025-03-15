"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type CartAnimationProps = {
  productImage: string;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  onComplete: () => void;
};

export default function CartAnimation({
  productImage,
  startPosition,
  endPosition,
  onComplete,
}: CartAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
  }, [productImage]);

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ 
            opacity: 1,
            scale: 1,
            x: startPosition.x,
            y: startPosition.y,
            position: "fixed",
            zIndex: 100
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: endPosition.x,
            y: endPosition.y
          }}
          transition={{
            type: "spring",
            duration: 0.7,
            bounce: 0.25
          }}
          onAnimationComplete={() => {
            setIsAnimating(false);
            onComplete();
          }}
          className="pointer-events-none"
        >
          <img
            src={productImage}
            alt="Product being added to cart"
            className="w-16 h-16 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}