"use client";
import React from "react";
import { Hamburger, Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
//Links Data
import LinksData from "@/Data/Links.json";
import { Button } from "./ui/button";

const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const LinkPath = usePathname();
  return (
    <nav className="relative w-full min-h-15 flex justify-between  lg:justify-between lg:px-28  2xl:px-60 items-center px-5 overflow-y-visible overflow-x-hidden">
      <Link
        href="/"
        className="text-2xl flex items-end w-fit gap-1 font-medium"
      >
        <Hamburger size={40} className="text-yellow-500" />
        OBA
      </Link>

      {isSignedIn && (
        <div className="hidden lg:flex gap-3 justify-center items-center overflow-hidden">
          {LinksData.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`
            text-[18px]  font-medium
             ${LinkPath === item.href && "text-yellow-500 "}
            `}
            >
              <motion.div transition={{ duration: 0.2 }} whileHover={{ y: -5 }}>
                {item.Title}
              </motion.div>
            </Link>
          ))}

          <ModeToggle />
        </div>
      )}
      <div className="flex gap-3 items-center ">
        {isSignedIn && (
          <div className="flex items-center gap-2   lg:hidden">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu size={35} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LinksData.map((Item) => (
                  <Link key={Item.Title} href={Item.href}>
                    <DropdownMenuItem>{Item.Title}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {isLoaded ? (
          isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="hover:bg-transparent border font-medium border-yellow-500 text-black hover:text-yellow-500 bg-yellow-500 p-2 rounded-2xl  cursor-pointer"
              >
                Sign In
              </motion.button>
            </SignInButton>
          )
        ) : (
          <button className="hover:bg-transparent border font-medium border-yellow-500 text-black hover:text-yellow-500 bg-yellow-500 p-2 rounded-2xl  cursor-pointer">
            Loading
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
