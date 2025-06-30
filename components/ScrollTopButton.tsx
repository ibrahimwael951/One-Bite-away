"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollTop}
          className="fixed bottom-10 right-10 border-2 border-yellow-500 bg-yellow-500 text-black dark:hover:bg-neutral-900   hover:bg-neutral-200 hover:text-yellow-500 p-2 rounded-2xl duration-100 cursor-pointer z-[100]"
        >
          <ChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollTopButton;
