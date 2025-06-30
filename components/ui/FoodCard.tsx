"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface props {
  name: string;
  id: string;
  category: string;
  country?: string;
  image: string;
  Tags?: string;
  Instructions?: string;
}
const FoodCard: React.FC<props> = ({
  category,
  country,
  id,
  name,
  image,
  Tags,
  Instructions,
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <Link href={`/meal/${id}`}>
        <div className=" bg-neutral-200 dark:bg-neutral-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-w-16 aspect-h-12">
            <Image
              src={image}
              alt={name}
              className="w-full h-48 object-cover rounded-t-xl"
              width={500}
              height={500}
              draggable={false}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold dark:text-neutral-200 text-neutral-800 mb-2">
              {name}
            </h3>

            <div className="flex items-center gap-4 mb-3">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
              {country && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {country}
                </span>
              )}
            </div>

            {Tags && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {category.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {Instructions && (
              <p className="dark:text-neutral-400 text-neutral-600 text-sm line-clamp-3">
                {Instructions.substring(0, 150)}...
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
//i made the card look like this so its more attractive for me and maybe u too :)
export default FoodCard;
