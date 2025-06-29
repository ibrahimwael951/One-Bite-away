"use client";
import { Button } from "@/components/ui/button";
import FoodCard from "@/components/ui/FoodCard";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUpAnimate } from "@/Data/animation";
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCountries: string;
  strArea: string;
}
interface country {
  strArea: string;
}
export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [countries, setCountries] = useState<country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_API}list.php?a=list`)
      .then((res) => res.json())
      .then((data) => setCountries(data.meals));
  }, []);

  useEffect(() => {
    if (selectedCountries) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_API}/filter.php?a=${selectedCountries}`
      )
        .then((res) => res.json())
        .then((data) => setMeals(data.meals));
    }
  }, [selectedCountries]);

  return (
    <section className="min-h-screen px-5 lg:px-10">
      <div className=" flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-5 my-6">
        <h1 className="text-5xl font-semibold ">
          Choose what <span className="text-yellow-500"> Country </span> do you
          want
        </h1>
        <Button variant="outline" onClick={() => setIsMenuOpen((b) => !b)}>
          {isMenuOpen ? "Hide" : "Show"} Category
        </Button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            {...FadeUpAnimate}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.2 } }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10"
          >
            {countries.map((Countries) => (
              <div
                key={Countries.strArea}
                className={`cursor-pointer border p-3 rounded-xl shadow-sm hover:shadow-md transition ${
                  selectedCountries === Countries.strArea
                    ? "bg-yellow-500"
                    : "border-yellow-500"
                }`}
                onClick={() => setSelectedCountries(Countries.strArea)}
              >
                <h2 className="text-center font-semibold mt-2">
                  {Countries.strArea}
                </h2>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mb-20 w-fit mx-auto">
        {meals.map((meal) => (
          <FoodCard
            key={meal.idMeal}
            id={meal.idMeal}
            category={selectedCountries || "No Data "}
            country={selectedCountries || "No Data"}
            name={meal.strMeal}
            image={meal.strMealThumb}
          />
        ))}
      </div>
    </section>
  );
}
