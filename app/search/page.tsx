"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";
import ByName from "@/components/search/ByName";
import ByCategory from "@/components/search/ByCategory";
import ByCountry from "@/components/search/ByCountry";
import { Button } from "@/components/ui/button";
function SearchFun() {
  const searchParams = useSearchParams();
  const mealQuery = searchParams.get("meal");
  const [categoryOpened, setCategoryOpened] = useState<boolean>(true);
  const [byNameOpened, setByNameOpened] = useState<boolean>(true);
  const [byCountryOpened, setByCountryOpened] = useState<boolean>(true);

  return (
    <div className="min-h-screen px-5 lg:px-10 2xl:px-20 py-8">
      <div className="    mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-5xl font-bold mb-2">
              Search <span className="text-yellow-500"> Results</span>
            </h1>
            <div>
              <SearchBar Page={true} />
            </div>
          </div>
          <div className="w-full flex  justify-center items-center  gap-5 p-5">
            <Button
              title="Close Category section"
              className={` ${!byNameOpened && "opacity-50"}`}
              variant="outline"
              onClick={() => {
                setByNameOpened(true);
                setCategoryOpened(false);
                setByCountryOpened(false);
              }} 
            >
              By Name
            </Button>
            <Button
              title="Close Category section"
              className={` ${!categoryOpened && "opacity-50"}`}
              variant="outline"
              onClick={() => {
                setCategoryOpened(true);
                setByNameOpened(false);
                setByCountryOpened(false);
              }}
            >
              By Category
            </Button>
            <Button
              title="Close Category section"
              className={` ${!byCountryOpened && "opacity-50"}`}
              variant="outline"
              onClick={() => {
                setByCountryOpened(true);
                setByNameOpened(false);
                setCategoryOpened(false);
              }}
            >
              By Country
            </Button>
          </div>

          {!mealQuery && (
            <div className="text-center py-12">
              <div className="text-xl text-neutral-500 mb-4">
                No search query provided
              </div>
              <p className="text-neutral-400">
                Please enter a search term to find meals
              </p>
            </div>
          )}

          {mealQuery && (
            <p className="text-lg dark:text-neutral-400 text-neutral-600 text-center md:text-start">
              Showing results for:
              <span className="font-semibold text-yellow-600 ml-2   ">
                {mealQuery}
              </span>
            </p>
          )}
        </div>
        {byNameOpened && <ByName Query={mealQuery} />}

        {categoryOpened && <ByCategory Query={mealQuery} />}

        {byCountryOpened && <ByCountry Query={mealQuery} />}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <SearchFun />
    </Suspense>
  );
}
