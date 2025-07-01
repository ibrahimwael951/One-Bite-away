"use client";
import React from "react";
import ImageHover from "../ui/ImageHover";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import { useUser } from "@clerk/nextjs";

const categoriesData = [
  { name: "Fast Food", image: "/Fast-Food.jpg" },
  { name: "Grilled", image: "/grilled.jpg" },
  { name: "Breakfast", image: "/break-Fast.jpg" },
  { name: "Seafood", image: "/see-Food.jpg" },
  { name: "Pasta", image: "/pasta.jpg" },
  { name: "Salads", image: "/SaladS.jpg" },
  { name: "Desserts", image: "/Desserts.jpg" },
  { name: "Asian", image: "/asian-food.jpg" },
  { name: "Juices", image: "/Juices.jpg" },
  { name: "Vegan", image: "/vagen-food.jpg" },
  { name: "Soups", image: "/Soups.jpg" },
];
const Category = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <section className="min-h-screen px-5 flex justify-center items-center flex-col mb-10 ">
        <h1 className="w-3/6 rounded-2xl  h-20 mb-2 animate-pulse bg-neutral-300 dark:bg-neutral-800" />
        <p className="w-2/5 rounded-2xl  mb-2 h-7 animate-pulse bg-neutral-300 dark:bg-neutral-800 " />
        <div className="h-96 w-4/5 rounded-2xl animate-pulse bg-neutral-300 dark:bg-neutral-800" />
      </section>
    );
  if (isSignedIn) return null;
  return (
    <section id="category" className="min-h-screen px-5 lg:px-16   my-16 ">
      <motion.h1 {...FadeUp} className="text-5xl mb-2 font-semibold">
        All Categories you <span className="text-yellow-500"> want </span>
        and like
      </motion.h1>
      <motion.p {...FadeUp} className="mb-10 lg:ml-6">
        Our menu is designed to satisfy your cravings and desires.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3 ">
        {categoriesData.map((Item, i) => (
          <motion.div key={i} {...FadeUp}>
            <ImageHover src={Item.image} alt={Item.name} title={Item.name} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;
