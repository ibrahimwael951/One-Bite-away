"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
interface props {
  textSize?: number;
  onClick?: void;
  text: string;
  href: string;
  bg?: boolean;
}
const hoverAndTap = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};
const CustomButton: React.FC<props> = ({
  textSize = 20,
  onClick,
  href,
  text,
  bg = false,
}) => {
  return onClick ? (
    <motion.button
      {...FadeUp}
      {...hoverAndTap}
      onClick={onClick}
      style={{ fontSize: textSize }}
      className={` p-2 inline  ${
        bg ? "bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-500"
          : "text-yellow-500 hover:bg-yellow-500 hover:text-black"
      } border border-yellow-500 rounded-2xl`}
    >
      {text}
    </motion.button>
  ) : (
    <Link href={href}>
      <motion.button
        {...hoverAndTap}
        {...FadeUp}
        style={{ fontSize: textSize }}
        className={` p-2  ${
          bg ? "bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-500"
            : "text-yellow-500 hover:bg-yellow-500 hover:text-black"
        } border border-yellow-500 rounded-2xl`}
      >
        {text}
      </motion.button>
    </Link>
  );
};

export default CustomButton;
