"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";

interface props {
  src: string;
  alt: string;
  title: string;
}

const ImageHover: React.FC<props> = ({ src, alt, title }) => {
  return (
    <motion.div
      {...FadeUp}
      whileHover="hover"
      initial="rest"
      className="relative w-full  h-[250px] cursor-pointer"
    >
      <Image
        alt={alt}
        src={src}
        width={500}
        height={500}
        draggable={false}
        className="rounded-lg w-full h-full object-cover"
      />
      {/* transparent bg */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 0.5 },
        }}
        className="absolute top-0 left-0 h-full w-full bg-black "
      />
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.2 }}
        className=" absolute top-0 left-0 flex justify-center items-center w-full h-full text-4xl"
      >
        {title}
      </motion.div>
    </motion.div>
  );
};

export default ImageHover;
