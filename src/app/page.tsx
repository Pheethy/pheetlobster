"use client";

import { motion } from "framer-motion";

const MotionSpan = motion.span;

export default function Home() {
  return (
    <div className="w-screen h-screen bg-surface">
      <div className="flex justify-center items-center min-h-full">
        <div className="relative z-10 text-center space-y-4 min-w-6xl mx-auto px-4">
          {/* ตัวอักษร */}
          <motion.h1
            className="text-white text-8xl font-fJalla tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            <MotionSpan
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              A NEW
            </MotionSpan>
            <MotionSpan
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              GENERATION
            </MotionSpan>
            <MotionSpan
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              COMMUNICATIONS
            </MotionSpan>
            <MotionSpan
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              AGENCY
            </MotionSpan>
          </motion.h1>

          {/* รูปภาพหมา */}
          <motion.div
            animate={{ rotate: 360 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src="https://storage.googleapis.com/pheethy-dev-bucket/images/user/5e4fec_1734685748807.jpg"
              alt="Featured"
              className="w-48 h-48 object-cover"
            />
          </motion.div>

          {/* progress bar  */}
          <motion.div
            className="mt-8 bg-gray-700 h-2 w-64 mx-auto rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: 256 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.7)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
