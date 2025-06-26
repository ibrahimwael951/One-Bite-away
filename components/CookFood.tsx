"use client";
import React, { useEffect, useState } from "react";
import { Meal } from "@/types/Meal";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import FoodCard from "./ui/FoodCard";
import CustomButton from "./ui/CustomButton";
const CookFood: React.FC = () => {
  const [meals, SetMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  const [ButtonVisible, setButtonVisible] = useState(true);

  useEffect(() => {
    if (visibleCount >= meals.length) {
      setButtonVisible(false);
    } else {
      setButtonVisible(true);
    }
  }, [visibleCount, meals.length]);

  console.log("Total meals:", meals.length);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          setLoading(false);
          SetMeals(data.meals);
        }
      })
      .catch((error) => console.error("error in fetch data from API", error));
    setLoading(false);
  }, []);

  if (loading)
    return (
      <section className="min-h-screen px-5 lg:px-10 mt-10">
        <h1 className="w-2/4 h-20 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-2xl my-5" />
        <div className="w-full h-[500px] bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-2xl my-5" />
      </section>
    );
  return (
    <section className="min-h-screen mt-10 flex flex-col">
      <motion.h1 {...FadeUp} className="text-5xl font-semibold">
        Food would u <span className="text-yellow-500"> like </span> to bite{" "}
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 my-20 w-fit mx-auto">
        {meals.slice(0, visibleCount).map((Item) => (
          <FoodCard
            key={Item.idMeal}
            name={Item.strMeal}
            image={Item.strMealThumb}
            category={Item.strCategory}
            id={Item.idMeal}
            country={Item.strArea}
          />
        ))}
      </div>

      {ButtonVisible && (
        <CustomButton
          text="Show More"
          onclick={() => setVisibleCount((prev) => prev + 10)}
          bg={true}
        />
      )}
    </section>
  );
};

export default CookFood;
