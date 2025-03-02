import React from "react";
import { motion } from "framer-motion";

export default function NavbarPink() {
  const children = {
    hidden: {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    },
    show: (i: number) => ({
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      transition: {
        ease: [0.11, 0.325, 0.16, 0.95],
        delay: Math.random() * (i / 50),
        dulation: 0.6,
      },
    }),
    exit: (i: number) => ({
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      transition: {
        ease: [0.645, 0.045, 0.355, 0.8],
        delay: Math.random() * (i / 50),
        dulation: 0.6,
      },
    }),
  };

  const navLink = {
    hidden: {
      y: "100%",
    },
    show: {
      y: 0,
      transition: {
        ease: "easeOut",
        delay: 0.2,
        dulation: 0.4,
      },
    },
    exit: {
      y: "100%",
      transition: {
        ease: "easeOut",
        dulation: 0.4,
      },
    },
  };
  return (
    <div className="w-screen h-screen overflow-hidden fixed inset-0">
      <div className=" w-full h-full grid grid-cols-20 grid-rows-1">
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((_, index) => (
          <motion.div
            key={index}
            className="w-full h-full bg-[#811ea5]"
            variants={children}
            initial="hidden"
            animate="show"
            exit="exit"
            custom={index}
          ></motion.div>
        ))}
      </div>
      <section className="absolute w-full h-full flex justify-center items-center z-30 inset-0">
        <ul className="w-[900px]">
          <li className="overflow-hideen">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <a href="#" className="text-[80px] hover:text-[#eaeaea]">
                TESTABILITY
              </a>
            </motion.div>
          </li>
          <li className="overflow-hideen">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <a href="#" className="text-[80px] hover:text-[#eaeaea]">
                SCALEABILITY
              </a>
            </motion.div>
          </li>
          <li className="overflow-hideen">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <a href="#" className="text-[80px] hover:text-[#eaeaea]">
                MAINTAINABILITY
              </a>
            </motion.div>
          </li>
          <li className="overflow-hideen">
            <motion.div
              variants={navLink}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <a href="#" className="text-[80px] hover:text-[#eaeaea]">
                SUSTAINABILITY🌼🐶
              </a>
            </motion.div>
          </li>
        </ul>
      </section>
    </div>
  );
}
