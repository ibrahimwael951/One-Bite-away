"use client";
import React from "react";
import Link from "next/link";
import { Hamburger } from "lucide-react";
import LinksData from "@/Data/Links.json";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer className="w-full min-h-96 flex gap-y-14 flex-col md:flex-row  justify-between items-center p-10 bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
      <div className="flex flex-col items-center md:items-start  gap-6 justify-center">
        <h1 className="text-4xl font-semibold w-fit flex items-end justify-center">
          <Hamburger size={40} className="text-yellow-500" />
          OBA
        </h1>

        <div className="text-4xl font-semibold flex flex-col gap-2 w-fit ml-5">
          {LinksData.map((item, i) => (
            <Link key={i} href={item.href} className=" hover:text-yellow-500">
              <motion.div
                transition={{ duration: 0.2 }}
                whileHover={{ y: -5 }}
                className="w-full text-center md:text-start opacity-70 "
              >
                {item.Title}
              </motion.div>
            </Link>
          ))}
        </div>
        <p className="text-sm opacity-65">© 2025 Ibrahim Wael</p>
      </div>
      <div className="flex flex-col gap-8 justify-center h-full items-center">
        <h1 className="text-3xl">
          Contact
          <span className="text-yellow-500"> me? </span>
          okay :)
        </h1>

        <form className="flex flex-col justify-center gap-2">
          <div className="flex gap-2 w-full">
            <motion.input
              whileFocus={{ scale: 1.04 }}
              type="text"
              placeholder="Ur Name"
              className="w-2/4 bg-yellow-500 rounded-2xl p-2 placeholder:text-black placeholder:opacity-70 text-black outline-none"
            />
            <motion.input
              whileFocus={{ scale: 1.04 }}
              type="text"
              placeholder="Ur Email"
              className="w-2/4 bg-yellow-500 rounded-2xl p-2 placeholder:text-black placeholder:opacity-70 text-black outline-none"
            />
          </div>
          <motion.textarea
            whileFocus={{ scale: 1.04 }}
            placeholder="Ur Massage"
            className="bg-yellow-500 rounded-2xl p-2 placeholder:text-black placeholder:opacity-70 text-black outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }} 
            type="submit"
            className="p-3 w-full border border-yellow-500 rounded-2xl hover:bg-yellow-500"
          >
            Submit
          </motion.button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
