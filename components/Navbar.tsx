"use client";
import React from "react";
import { Hamburger } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
//Links Data
import LinksHer from "@/Data/Links.json";
const Navbar = () => {
  const  LinkPath= usePathname();   
  return (
    <section className="w-full min-h-15 flex justify-evenly items-center">
      <h1 className="text-2xl flex items-end w-fit gap-1">
        <Hamburger size={40}  className="text-yellow-500"/>
        OBA
      </h1>

      <div className="flex gap-2 justify-center items-center overflow-hidden">
        {LinksHer.map((item, i) => (
          <motion.div
            transition={{ duration: 0.2 }}
            key={i}
            whileHover={{ y: -5 }}
          >
            <Link href={item.href} 
            className={`
              text-[16px]
               ${LinkPath === item.href && "text-yellow-500"}
              `}
            >
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
