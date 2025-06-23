"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Navigation } from "swiper/modules";

const images = [
  "/Burger.jpg",
  "/cake.jpg",
  "/Spaghetti.jpg",
  "/pancake.jpg",
  "/salad.jpg",
];
const animate = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
};
const HeroSection = () => {
  return (
    <section className="min-h-screen px-5 lg:px-16  mt-8 ">
      <div className="text-center w-fit mx-auto">
        <motion.h1
          {...animate}
          transition={{ duration: 0.5 }}
          className="text-7xl font-medium  w-full"
        >
          One
          <span className="text-yellow-500"> Bite </span>
          away
        </motion.h1>
        <motion.p
          {...animate}
          transition={{ duration: 0.5, delay: 0.3 }}
          className=" w-full"
        >
          one way to know whats ur next bite gonna be
        </motion.p>
      </div>
      <motion.div
        {...animate}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative w-full md:w-4/5 h-[500px] m-auto overflow-hidden rounded-4xl my-10 "
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
