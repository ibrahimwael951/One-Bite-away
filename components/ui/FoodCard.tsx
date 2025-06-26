import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
interface props {
  name: string;
  id: string;
  category: string;
  country: string;
  image: string;
}
const FoodCard: React.FC<props> = ({ category, country, id, name, image }) => {
  return (
    <motion.div {...FadeUp}>
      <Link href={`/food/${id}`}>
        <motion.div
          initial="rest"
          whileHover="hover"
          className="w-[300px] h-[300px] relative overflow-hidden rounded-2xl bg-amber-500"
        >
          <motion.div
            variants={{
              rest: { x: 0 },
              hover: { x: "-120%" },
            }}
            transition={{ duration: 0.2 }}
            className="text-xs absolute top-0 left-0 m-2  p-2 bg-amber-500 text-black rounded-2xl"
          >
            {category}
          </motion.div>

          <Image
            src={image}
            alt={name}
            className="w-full h-full rounded-md object-cover"
            width={500}
            height={500}
            draggable={false}
          />
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            className="absolute top-0 left-0 h-full w-full  flex justify-center items-center flex-col "
          >
            <h1 className="text-white font-semibold text-lg z-10">{name}</h1>
            <p className="z-10 text-xs text-white">{country}</p>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50  -z-0" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
