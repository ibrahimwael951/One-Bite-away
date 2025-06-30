"use client";
import React from "react";
import ImageHover from "../ui/ImageHover";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
//
const Category = () => {
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

  return (
    <section id="category" className="min-h-screen px-5 lg:px-16   my-16 ">
      <motion.h1 {...FadeUp} className="text-5xl mb-2 font-semibold">
        Just tap on what you feel like to
        <span className="text-yellow-500"> Bitting </span>
        today
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
