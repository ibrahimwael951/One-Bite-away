"use client";
import React from "react";
import { motion } from "framer-motion";
import CustomButton from "@/components/ui/CustomButton";
export default function NotFound() {
  return (
    <section className="min-h-screen px-5 lg:px-10  flex justify-center items-center gap-20 flex-col">
      <div className="text-6xl font-semibold flex flex-wrap justify-center items-center gap-3">
        {[
          "Sry ",
          " mate",
          " we",
          " did",
          " not",
          " Found",
          " the",
          " page",
        ].map((Item, i) => (
          <motion.h1
            viewport={{ once: true, amount: 0.5 }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, delay: i * 0.1 },
            }}
            key={Item}
            className={` ${Item === " Found" && "text-yellow-500"}`}
          >
            {Item}
          </motion.h1>
        ))}
      </div>

      <div className="flex justify-center items-center gap-5">
        <CustomButton text="Home" textSize={18} href="/" bg={true} />
        <CustomButton text="Support" textSize={18} href="/support" />
      </div>
      <motion.div 
      viewport={{once:true,amount:0.5}}
      initial={{opacity:0 , y:20}}
      whileInView={{opacity:1 , y:0}}
      transition={{delay:0.9}}
      className="absolute top-2/4 left-2/4 -translate-2/4 text-[40vw] -z-20 opacity-60 text-neutral-300 dark:text-neutral-800 " >404</motion.div>
    </section>
  );
}
