"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Meal } from "@/types/Meal";
import { Button } from "./button";
import { Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
interface Props {
  Page?: boolean;
}
const SearchBar: React.FC<Props> = ({ Page = false }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const LinkPath = usePathname();

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 720);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      router.push(`/search?meal=${encodeURIComponent(inputValue.trim())}`);
      setShowDropdown(false);
    }  
  };

  const fetchMeals = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_API}/search.php?s=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();

      if (data.meals) {
        setSuggestions(data.meals.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue) {
        fetchMeals(inputValue);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleSuggestionClick = (meal: Meal) => {
    setInputValue(meal.strMeal);
    setShowDropdown(false);
    router.push(`/Search/${encodeURIComponent(meal.strMeal)}`);
  };

  if (LinkPath === "/search" && !Page) return null;
  if (isMobile && !Page)
    return (
      <Link href="/search">
        <Button variant="outline">
          <Search />
        </Button>
      </Link>
    );
  return (
    <div className="relative w-72 max-w-md">
      <div className="flex gap-2 items-center justify-center">
        <input
          className="w-full outline-none border border-yellow-500 text-yellow-500 rounded-xl p-2 duration-150 z-10"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={() => inputValue && setShowDropdown(true)}
          placeholder="Search for Meals..."
        />
        {Page && (
          <Link href={`/search?meal=${inputValue}`}>
            <Button variant="outline">
              <Search />
            </Button>
          </Link>
        )}
      </div>
      <AnimatePresence>
        {showDropdown && inputValue.length >= 1 && !Page && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 dark:bg-neutral-900 bg-white border border-yellow-500 rounded-xl mt-1 shadow-lg z-10 max-h-64 overflow-y-auto scrollBar"
          >
            {isLoading ? (
              <div className="p-3 text-center text-neutral-500">Loading...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((meal) => (
                <div
                  key={meal.idMeal}
                  onClick={() => handleSuggestionClick(meal)}
                  className="flex items-center p-3 bg-white dark:bg-yellow-500  hover:bg-yellow-50 dark:hover:bg-yellow-100 text-neutral-900 dark:text-white dark:hover:text-black cursor-pointer border-b border-yellow-200 last:border-b-0 duration-75"
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-lg object-cover mr-3"
                    width={50}
                    height={50}
                  />
                  <span className=" font-medium">{meal.strMeal}</span>
                </div>
              ))
            ) : (
              inputValue &&
              !isLoading && (
                <div className="p-3 text-center text-neutral-500">
                  No meals found
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
