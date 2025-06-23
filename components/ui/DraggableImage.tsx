"use client";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import React from "react";
import { opacity } from "@/Data/animation";
interface props {
  src: string;
  alt: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  width?: number;
  height?: number;
  delay?: number;
}

const DraggableImage: React.FC<props> = ({
  src,
  top,
  right,
  left,
  bottom,
  alt,
  height = 200,
  width = 200,
  delay = 0,
}) => {
  const controls = useAnimation();
  return (
    <motion.div
      drag
      dragElastic={0.55}
      onDragEnd={() => {
        controls.start({ x: 0, y: 0 });
      }}
      animate={controls}
      whileTap={{ scale: 1.1, zIndex: 10 }}
      {...opacity}
      transition={{ duration: 0.5 }}
      style={{
        top,
        left,
        right,
        bottom,
        position: "absolute",
        width,
        height,
      }}
      className={`
        absolute  
        
         rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing shadow-lg

        `}
    >
      <div className="absolute top-0 left-0 w-full h-full z-10" />
      <Image
        src={src}
        alt={alt}
        width={500}
        height={500}
        draggable={false}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default DraggableImage;
