"use client";
import React from "react";
import { Hamburger } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

//Links Data
import LinksData from "@/Data/Links.json";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const LinkPath = usePathname();

  return (
    <nav className="w-full min-h-15 flex justify-evenly items-center">
      <Link href="/" className="text-2xl flex items-end w-fit gap-1">
        <Hamburger size={40} className="text-yellow-500" />
        OBA
      </Link>

      <div className="flex gap-3 justify-center items-center overflow-hidden">
        {LinksData.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className={`
            text-[16px]
             ${LinkPath === item.href && "text-yellow-500"}
            `}
          >
            <motion.div transition={{ duration: 0.2 }} whileHover={{ y: -5 }}>
              {item.Title}
            </motion.div>
          </Link>
        ))}

        <ModeToggle />
      </div>
      <div>
        {isLoaded ? (
          isSignedIn ? (
            <UserButton   />
          ) : (
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="hover:bg-transparent border border-yellow-500 text-black hover:text-yellow-500 bg-yellow-500 p-2 rounded-2xl  cursor-pointer"
              >
                Sign In
              </motion.button>
            </SignInButton>
          )
        ) : (
          <button className="hover:bg-transparent border border-yellow-500 text-black hover:text-yellow-500 bg-yellow-500 p-2 rounded-2xl  cursor-pointer">
            Loading
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
