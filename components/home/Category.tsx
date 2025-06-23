"use client";
import React from "react";
import ImageHover from "../ui/ImageHover";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
//
const Category = () => {
  const categoriesData = [
    { name: "Fast Food", image: "/Burger.jpg" },
    { name: "Grilled", image: "/grilled.jpg" },
    { name: "Breakfast", image: "/break-Fast.jpg" },
    { name: "Seafood", image: "/see-Food.jpg" },
    { name: "Pasta", image: "/pasta.jpg" },
    { name: "Salads", image: "/SaladS.jpg" },
    { name: "Desserts", image: "/Desserts.jpg" },
    { name: "Asian", image: "/asian-food.jpg" },
    { name: "Juices", image: "/Juices.jpg" },
    { name: "Vegan", image: "/vagen-food.jpg" },
    { name: "Soups", image: "/salad.jpg" },
  ];

  return (
    <section className="min-h-screen px-5 lg:px-16    ">
      <motion.h1 {...FadeUp} className="text-5xl mb-10">
        Just tap on what you feel like to
        <span className="text-yellow-500"> Bitting </span>
        today
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3 ">
        {categoriesData.map((Item, i) => (
          <motion.div {...FadeUp}>
            <ImageHover
              key={i}
              src={Item.image}
              alt={Item.name}
              title={Item.name}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Category;
