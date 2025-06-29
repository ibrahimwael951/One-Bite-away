"use client";
import React, { useEffect, useState, use } from "react";
import { Meal } from "@/types/Meal";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_API}/lookup.php?i=${resolvedParams.id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
        }
      } catch (err) {
        console.error("Error fetching meal:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch meal");
        setMeal(null);
      } finally {
        setLoading(false);
      }
    }

    if (resolvedParams.id) {
      fetchMeal();
    }
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <section className="min-h-screen px-5 py-10 max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded-md w-1/2 mb-6"></div>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full h-72 md:w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded-xl"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-1/4"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-1/3"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-full"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-full"></div>
              <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-5 lg:px-10 flex justify-center items-center gap-20 flex-col">
        <div className="text-6xl font-semibold flex flex-wrap justify-center items-center gap-3">
          {["Oops!", "Something", "went", "wrong"].map((item, i) => (
            <motion.h1
              viewport={{ once: true, amount: 0.5 }}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.2, delay: i * 0.1 },
              }}
              key={item}
              className={` ${item === "Something" && "text-red-600"}`}
            >
              {item}
            </motion.h1>
          ))}
        </div>
        <p className="text-lg text-neutral-600 text-center max-w-md">{error}</p>
        <div className="flex justify-center items-center gap-5">
          <CustomButton text="Home" textSize={18} href="/" bg={true} />
          <CustomButton
            text="Try Again"
            textSize={18}
            href={`/meal/${resolvedParams.id}`}
          />
        </div>
      </section>
    );
  }

  if (!meal) {
    return (
      <section className="min-h-screen px-5 lg:px-10 flex justify-center items-center gap-20 flex-col">
        <div className="text-6xl font-semibold flex flex-wrap justify-center items-center gap-3">
          {["Sorry", "mate,", "we", "did", "not", "find", "the", "meal"].map(
            (item, i) => (
              <motion.h1
                viewport={{ once: true, amount: 0.5 }}
                initial={{ opacity: 0, y: -50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.2, delay: i * 0.1 },
                }}
                key={item}
                className={`${item === "find" ? "text-yellow-500" : ""}`}
              >
                {item}
              </motion.h1>
            )
          )}
        </div>
        <div className="flex justify-center items-center gap-5">
          <CustomButton text="Home" textSize={18} href="/" bg={true} />
          <CustomButton text="Support" textSize={18} href="/support" />
        </div>
        <motion.div
          viewport={{ once: true, amount: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[40vw] -z-20 opacity-60 text-neutral-300 dark:text-neutral-800"
        >
          404
        </motion.div>
      </section>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return (
    <section className="min-h-screen px-5 py-10 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-semibold mb-6"
      >
        {meal.strMeal}
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <Image
            width={500}
            height={500}
            draggable={false}
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-72 md:h-96 rounded-xl object-cover shadow-lg"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Category:
            </p>
            <h2 className="text-2xl text-yellow-500 font-semibold">
              {meal.strCategory}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Area:
            </p>
            <h2 className="text-2xl text-yellow-500 font-semibold">
              {meal.strArea}
            </h2>
          </div>

          {ingredients.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-yellow-500">
                Ingredients:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ingredients.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{item.measure}</span>
                    <span>{item.ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-semibold mb-3 text-yellow-500">
              Instructions:
            </h3>
            <p className="whitespace-pre-line leading-relaxed text-neutral-700 dark:text-neutral-300">
              {meal.strInstructions}
            </p>
          </div>

          {meal.strYoutube && (
            <div className="pt-4">
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="hover:bg-yellow-500 hover:text-white transition-colors"
                >
                  Watch on YouTube
                </Button>
              </a>
            </div>
          )}

          {meal.strSource && (
            <div>
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="hover:bg-blue-500 hover:text-white transition-colors"
                >
                  View Source
                </Button>
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
