"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/Data/animation";
interface props {
  textSize?: number;  
  onclick?: () => void;
  text: string;
  href?: string;
  bg?: boolean;
}

const hoverAndTap = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
  exit: { scale: 0.8 },
};

const CustomButton: React.FC<props> = ({
  textSize = 20,
  onclick,
  href,
  text,
  bg = false,
}) => {
  const className = `p-2 inline cursor-pointer  w-fit mx-auto my-5 ${
    bg
      ? "bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-500"
      : "text-yellow-500 hover:bg-yellow-500 hover:text-black"
  } border border-yellow-500 rounded-2xl`;

  if (onclick && !href) {
    return (
      <AnimatePresence>
        <motion.button
          {...FadeUp}
          {...hoverAndTap}
          onClick={onclick}
          style={{ fontSize: textSize }}
          className={className}
        >
          {text}
        </motion.button>
      </AnimatePresence>
    );
  }

  if (href && !onclick) {
    return (
      <AnimatePresence>
        <Link href={href}>
          <motion.button
            {...hoverAndTap}
            {...FadeUp}
            style={{ fontSize: textSize }}
            className={className}
          >
            {text}
          </motion.button>
        </Link>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.button
        {...FadeUp}
        {...hoverAndTap}
        style={{ fontSize: textSize }}
        className={className}
      >
        {text}
      </motion.button>
    </AnimatePresence>
  );
};

export default CustomButton;
