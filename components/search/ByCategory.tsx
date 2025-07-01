"use client";
import React, { useState, useEffect } from "react";
import { Meal } from "@/types/Meal";
import FoodCard from "@/components/ui/FoodCard";

interface props {
  Query: string | null;
} 

const Category: React.FC<props> = ({ Query }) => {
  const mealQuery = Query;
  const [categoryError, setCategoryError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryMeals, setCategoryMeals] = useState<Meal[]>([]);

  const fetchCategoryMeals = async (searchParams: string) => {
    setIsLoading(true);
    setCategoryError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_API}/filter.php?c=${encodeURIComponent(
          searchParams
        )}`
      );
      const data = await res.json();
      if (data.meals) {
        setCategoryMeals(data.meals);
      } else {
        setCategoryMeals([]);
        setCategoryError("There is no meals found by this category :( ");
      }
    } catch (error) {
      console.log("Error fetching meals", error);
      setCategoryError("Error fetching meals by Category");
      setCategoryMeals([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (mealQuery) {
      fetchCategoryMeals(mealQuery);
    }
  }, [mealQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-yellow-500">Loading meals...</div>
      </div>
    );
  }
  if (!Query) return null;
  return (
    <div className="min-h-96 my-20">
        <h1 className="text-5xl font-semibold">
            Result By <span className="text-yellow-500"> Category </span> 
        </h1>
      {categoryError && (
        <div className="text-center py-12">
          <div className="text-xl text-neutral-500 mb-4">{categoryError}</div>
          <p className="text-neutral-400">Try searching for something else</p>
        </div>
      )}
      {categoryMeals.length > 0 && (
        <>
          <div className="mb-6">
            <p className="dark:text-neutral-400 text-neutral-600">
              Found {categoryMeals.length} meal{categoryMeals.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryMeals.map((meal) => (
              <FoodCard
                key={meal.idMeal}
                id={meal.idMeal}
                Instructions={meal.strInstructions}
                category={meal.strCategory}
                country={meal.strArea}
                image={meal.strMealThumb}
                name={meal.strMeal}
                Tags={meal.strTags}
              />
            ))}
          </div>
        </>
      )}

      {!mealQuery && !isLoading && (
        <div className="text-center py-12">
          <div className="text-xl text-neutral-500 mb-4">
            No search query provided
          </div>
          <p className="text-neutral-400">
            Please enter a search term to find meals
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;
