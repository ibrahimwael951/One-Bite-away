"use client";
import React from "react";
import { Hamburger } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { motion } from "framer-motion";
import LinksHer from "@/Data/Links.json";
import Link from "next/link";
const Navbar = () => {
  return (
    <section className="w-full h-15 flex justify-evenly items-center">
      <h1 className="text-xl flex justify-  items-end w-fit gap-1">
        <Hamburger size={30} />
        OBA
      </h1>

      <div className="flex gap-2 justify-center items-center overflow-hidden">
        {LinksHer.map((item, i) => (
          <motion.div
            transition={{ duration: 0.2 }}
            key={i}
            whileHover={{ y: -5 }}
          >
            <Link href={item.href} className="hover:-translate-y-0.5">
              {item.Title}
            </Link>
          </motion.div>
        ))}
        <ModeToggle />
      </div>
    </section>
  );
};

export default Navbar;
