"use client";
import React, { useEffect, useState } from "react";
import { Meal } from "@/types/Meal";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import FoodCard from "@/components/ui/FoodCard";
import CustomButton from "@/components/ui/CustomButton";

export default function Page() {
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

  useEffect(() => {
    const fetchRandomMeals = async () => {
      setLoading(true);
      try {
        const mealPromises = Array.from({ length: 20 }, () =>
          fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(
            (res) => res.json()
          )
        );

        const results = await Promise.all(mealPromises);
        const allMeals = results.map((res) => res.meals[0]);

        const uniqueMeals = Array.from(
          new Map(allMeals.map((meal) => [meal.idMeal, meal])).values()
        );

        SetMeals(uniqueMeals);
      } catch (error) {
        console.error("Error fetching random meals:", error);
      } finally { 
        setLoading(false);
      }
    };

    fetchRandomMeals();
  }, []); 

  if (loading)
    return (
      <section className="  px-5 lg:px-10">
        <h1 className="w-2/4 h-20 bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-2xl my-5" />
        <div className="w-full h-[500px] bg-neutral-300 dark:bg-neutral-800 animate-pulse rounded-2xl my-5" />
      </section>
    );
  return (
    <section className="min-h-screen  px-5 lg:px-10 mt-10 flex flex-col">
      <motion.h1 {...FadeUp} className="text-5xl font-semibold">
        Food would u <span className="text-yellow-500"> like </span> to bite{" "}
      </motion.h1>
      <div className="grid grid-cols-1  lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-10 w-fit mx-auto">
        {meals.slice(0, visibleCount).map((Item) => (
          <FoodCard
            key={`${Item.idMeal},${Item.strMeal}`}
            name={Item.strMeal}
            image={Item.strMealThumb}
            category={Item.strCategory}
            id={Item.idMeal}
            country={Item.strArea}
          />
        ))}
      </div>

      {ButtonVisible ? (
        <CustomButton
          text="Show More"
          onclick={() => setVisibleCount((prev) => prev + 10)}
          bg={true}
        />
      ) : (
        <CustomButton
          text="Reload page ?"
          onclick={() => {
            setTimeout(() => location.reload(), 500);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          bg={true}
        />
      )}
    </section>
  );
}
