"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Meal } from "@/types/Meal";
import SearchBar from "@/components/ui/SearchBar";
import FoodCard from "@/components/ui/FoodCard";

function SearchFun() {
  const searchParams = useSearchParams();
  const mealQuery = searchParams.get("meal");

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMeals = async (searchParams: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_API}/search.php?s=${encodeURIComponent(
          searchParams
        )}`
      );
      const data = await res.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
        setError("There is no meals found :( ");
      }
    } catch (error) {
      console.log("Error fetching meals", error);
      setError("Error fetching meals");
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mealQuery) {
      fetchMeals(mealQuery);
    }
  }, [mealQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-yellow-500">Loading meals...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold   mb-2">
              Search <span className="text-yellow-500"> Results</span>
            </h1>
            <div>
              <SearchBar Page={true} />
            </div>
          </div>
          {mealQuery && (
            <p className="text-lg dark:text-neutral-400 text-neutral-600 text-center md:text-start">
              Showing results for:
              <span className="font-semibold text-yellow-600 ml-2   ">
                {mealQuery}
              </span>
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-xl text-neutral-500 mb-4">{error}</div>
            <p className="text-neutral-400">Try searching for something else</p>
          </div>
        )}

        {/* Results Grid */}
        {meals.length > 0 && (
          <>
            <div className="mb-6">
              <p className="dark:text-neutral-400 text-neutral-600">
                Found {meals.length} meal{meals.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <FoodCard
                  key={meal.idMeal}
                  id={meal.idMeal}
                  Instructions={meal.strInstructions}
                  category={meal.strCategory}
                  country={meal.strArea}
                  image={meal.strMealThumb}
                  name={meal.strMeal}
                  Tags={meal.strTags || undefined}
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
    </div>
  );
}

export default function Page() {
  <Suspense
    fallback={
      <div className="flex justify-center items-center min-w-screen">
        We adjust ur Search page :)
      </div>
    }
  >
    <SearchFun />
  </Suspense>;
}
