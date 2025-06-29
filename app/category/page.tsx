"use client";
import React, { useEffect, useState } from "react";
import FoodCard from "@/components/ui/FoodCard";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, FadeUpAnimate } from "@/Data/animation";
import { Button } from "@/components/ui/button";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_API}categories.php`)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_API}/filter.php?c=${selectedCategory}`
      )
        .then((res) => res.json())
        .then((data) => setMeals(data.meals));
    }
  }, [selectedCategory]);

  return (
    <section className="min-h-screen px-5 lg:px-10 py-10">
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mb-6">
        <h1 className="text-center md:text-start text-5xl font-bold">
          Search Meals by <span className="text-yellow-500"> Category </span>
        </h1>
        <Button
          variant="outline"
          onClick={() => setIsCategoryMenuOpen((b) => !b)}
        >
          {isCategoryMenuOpen ? "Hide" : "Show"} Category
        </Button>
      </div>

      <AnimatePresence>
        {isCategoryMenuOpen && (
          <motion.div
            {...FadeUpAnimate}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10"
          >
            {categories.map((category) => (
              <div
                key={category.idCategory}
                className={`cursor-pointer border p-3 rounded-xl shadow-sm hover:shadow-md transition ${
                  selectedCategory === category.strCategory
                    ? "bg-yellow-500"
                    : "border-yellow-500"
                }`}
                onClick={() => setSelectedCategory(category.strCategory)}
              >
                <h2 className="text-center font-semibold mt-2">
                  {category.strCategory}
                </h2>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {selectedCategory && (
        <div>
          <motion.h2 {...FadeUp} className="text-2xl font-semibold mb-4">
            {meals.length} Meals in
            <span className="text-yellow-500"> {selectedCategory} </span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mb-20 w-fit mx-auto">
            {meals.map((meal) => (
              <FoodCard
                key={meal.idMeal}
                name={meal.strMeal}
                image={meal.strMealThumb}
                category={selectedCategory}
                id={meal.idMeal}
                country={meal.strArea}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
