"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function ValidateFormModal({
  onClose,
  errorMessage,
}: {
  onClose?: () => void;
  errorMessage: string;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-zinc-900 rounded-sm p-8 shadow-xl group hover:border-zinc-700 transition-all duration-500"
        role="dialog"
        aria-labelledby="validation-error-title"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-300 transition-colors duration-300"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mx-auto w-16 h-16 border border-zinc-700 rounded-full flex items-center justify-center mb-4 group-hover:border-red-500 transition-all duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-zinc-400 group-hover:text-red-500 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.h3
            id="validation-error-title"
            className="text-lg text-white mb-2 font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Validation Error
          </motion.h3>

          <motion.p
            className="text-zinc-500 text-sm mb-6 font-extralight tracking-wide"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {errorMessage}
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleClose}
              className="w-full bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 py-3 text-xs tracking-widest uppercase font-light transition-all duration-300"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
