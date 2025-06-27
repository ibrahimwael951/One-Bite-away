import React from "react";
import { Meal } from "@/types/Meal";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_API}lookup.php?i=${params.id}`
  );
  const data = await res.json();
  const meal: Meal = data.meals[0];

  return (
    <section className="min-h-screen px-5   py-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-semibold mb-6"> {meal.strMeal} </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <Image
          width={500}
          height={500}
          draggable={false}
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-72 md:w-1/3 rounded-xl object-cover"
        />

        <div className="flex-1">
          <div className=" flex items-  mb-4">
            <p className="text-xs">Category : </p>
            <h1 className="text-2xl text-yellow-500 font-semibold"> 
              {meal.strCategory}
            </h1>
          </div>

          <div className=" flex items-  mb-4">
            <p className="text-xs">Area : </p>
            <h1 className="text-2xl text-yellow-500 font-semibold"> 
              {meal.strArea}
            </h1>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-yellow-500">Instructions :</h2>
          <p className="whitespace-pre-line">{meal.strInstructions}</p>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer" 
            >
                <Button variant="outline">

              Watch on YouTube
                </Button>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
