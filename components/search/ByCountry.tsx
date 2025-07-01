"use client";
import React, { useState, useEffect } from "react";
import { Meal } from "@/types/Meal";
import FoodCard from "@/components/ui/FoodCard";

interface props {
  Query: string | null;
} 

const Country: React.FC<props> = ({ Query }) => {
  const mealQuery = Query;
  const [CountryError, setCountryError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CountryMeals, setCountryMeals] = useState<Meal[]>([]);

  const fetchCountryMeals = async (searchParams: string) => {
    setIsLoading(true);
    setCountryError("");
    try { 
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_API}/filter.php?a=${encodeURIComponent(
          searchParams
        )}`
      );
      const data = await res.json();
      if (data.meals) {
        setCountryMeals(data.meals);
      } else {
        setCountryMeals([]);
        setCountryError("There is no meals found by this Country :( ");
      }
    } catch (error) {
      console.log("Error fetching meals", error);
      setCountryError("Error fetching meals by Country");
      setCountryMeals([]);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (mealQuery) {
      fetchCountryMeals(mealQuery);
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
            Result By <span className="text-yellow-500"> Country </span> 
        </h1>
      {CountryError && (
        <div className="text-center py-12">
          <div className="text-xl text-neutral-500 mb-4">{CountryError}</div>
          <p className="text-neutral-400">Try searching for something else</p>
        </div>
      )}
      {CountryMeals.length > 0 && (
        <>
          <div className="mb-6">
            <p className="dark:text-neutral-400 text-neutral-600">
              Found {CountryMeals.length} meal{CountryMeals.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CountryMeals.map((meal) => (
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

export default Country;
