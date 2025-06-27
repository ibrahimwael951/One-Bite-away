import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  return (
    <motion.div 
    initial={{opacity:0 , y:-50}}
    animate={{opacity:1, y:0}}
    >
      <Link href={`/food/${id}`}>
        <motion.div
          initial="rest"
          whileHover={isMobile? "rest":"hover"}
          className="w-[100%]  lg:w-[300px] h-[300px] flex  relative overflow-hidden rounded-2xl border border-yellow-500"
        >
          <motion.div
            variants={{
              rest: { x: 0 },
              hover: { x: "-120%" },
            }}
            transition={{ duration: 0.2 }}
            className="text-xs absolute top-0 left-0 m-2  p-2 bg-amber-500  text-black rounded-2xl"
          >
            {category}
          </motion.div>

          <Image
            src={image}
            alt={name} 
            className="w-auto max-w-2/5 h-full lg:max-w-full lg:rounded-md object-cover bg-amber-500"
            width={500}
            height={500}
            draggable={false}
          />
          <div className=" lg:hidden p-4 flex flex-col w-full justify-center items-center text-center text-yellow-500 font-semibold  ">
            <h1 className="text-4xl mb-2">
              {name}
            </h1>
            <p>{country}</p>
          </div>
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }} 
            className="absolute top-0 left-0 h-full w-full  flex justify-center items-center flex-col "
          >
            <h1 className="text-white font-semibold text-lg z-10 text-center">{name}</h1>
            <p className="z-10 text-xs text-white">{country}</p> 
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50  -z-0" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
