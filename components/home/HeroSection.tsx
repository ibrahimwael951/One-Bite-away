"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Navigation } from "swiper/modules";
import { FadeUp } from "@/Data/animation";
import { useUser } from "@clerk/nextjs";
const images = [
  "/Fast-Food.jpg",
  "/grilled.jpg",
  "/break-Fast.jpg",
  "/see-Food.jpg",
];

const HeroSection = () => {
  
  const { isLoaded, isSignedIn } = useUser();
 
  if (!isLoaded)
    return (
      <section className="min-h-screen px-5 flex justify-center items-center flex-col mb-10 ">
        <h1 className="w-3/6 rounded-2xl  h-20 mb-2 animate-pulse bg-neutral-300 dark:bg-neutral-800" />
        <p className="w-2/5 rounded-2xl  mb-2 h-7 animate-pulse bg-neutral-300 dark:bg-neutral-800 " />
        <div className="h-96 w-4/5 rounded-2xl animate-pulse bg-neutral-300 dark:bg-neutral-800" />
      </section>
    );
  if (isSignedIn) return null;
  return (
    <section id="Home" className="min-h-screen px-5 lg:px-16 mt-8 "> 
      <div className="text-center w-fit mx-auto">
        <motion.h1
          {...FadeUp}
          transition={{ duration: 0.5 }}
          className="text-7xl font-semibold  w-full"
        >
          One
          <span className="text-yellow-500 "> Bite </span>
          away
        </motion.h1>
        <motion.p
          {...FadeUp}
          transition={{ duration: 0.5  }}
          className=" w-full "
        >
          one way to know whats ur next bite gonna be
        </motion.p>
      </div>
      <motion.div
        {...FadeUp}
        transition={{ duration: 0.5 }}
        className="relative w-full md:w-4/5 h-[500px] m-auto overflow-hidden rounded-4xl my-10 select-none "
      >
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop={true}
          slidesPerView="auto"
          spaceBetween={0}
          className="h-full w-full"
        >
          {images.map((item, i) => (
            <SwiperSlide
              key={i}
              className="mx-1 w-full max-h-[75vh] rounded-4xl overflow-hidden"
            >
              <Image
                draggable={false}
                src={item}
                alt={`image number ${i + 1} of ${images.length} `}
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev absolute left-4 top-1/2 z-10 text-white p-2 px-3 rounded-full overflow-hidden">
          ←
          <span className="absolute top-0 left-0 w-full h-full -z-10 bg-black opacity-45" />
        </button>
        <button className="swiper-button-next absolute right-4 top-1/2 z-10 text-white p-2 px-3 rounded-full overflow-hidden">
          →
          <span className="absolute top-0 left-0 w-full h-full -z-10 bg-black opacity-45" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
