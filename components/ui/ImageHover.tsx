"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";

interface props {
  src: string;
  alt: string;
  title: string;
}

const ImageHover: React.FC<props> = ({ src, alt, title }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <motion.div
      {...FadeUp}
      initial="rest"
      whileHover="hover"
      className="relative w-full h-[250px] cursor-pointer select-none"
    >
      <Image
        alt={alt}
        src={src}
        width={500}
        height={500}
        draggable={false}
        className="rounded-lg w-full h-full object-cover"
      />

      {isMobile ? (
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-50 rounded-lg" />
      ) : (
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.5 },
          }}
          className="absolute top-0 left-0 h-full w-full bg-black rounded-lg"
        />
      )}
      {isMobile ? (
        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full text-4xl text-white font-semibold">
          {title}
        </div>
      ) : (
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-0 left-0 flex justify-center items-center w-full h-full text-4xl text-white font-semibold"
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageHover;
