"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center space-x-3"
    >
    <div className="text-xl">
    👜
    </div>
      <motion.span
        initial={{ x: -15, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="ml-2 text-xl font-light tracking-widest text-white uppercase"
      >
        Shopping Cart
      </motion.span>
    </motion.div>
  );
}