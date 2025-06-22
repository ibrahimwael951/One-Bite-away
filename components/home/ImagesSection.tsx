"use client";
import React, { useState, useEffect } from "react";
import DraggableImage from "@/components/ui/DraggableImage";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";

const ImagesSection = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfTablet = () => {
        setIsTablet(window.innerWidth <= 1028);
      };
      checkIfTablet();
      window.addEventListener("resize", checkIfTablet);
      return () => window.removeEventListener("resize", checkIfTablet);
    }
  }, []);

  const images = [
    "/Burger.jpg",
    "/cake.jpg",
    "/Spaghetti.jpg",
    "/pancake.jpg",
    "/salad.jpg",
  ];

  const imageGroups = [
    [
      { src: "/cake.jpg", top: 0, left: isTablet ? 0 : 100, width: 300 },
      { src: "/salad.jpg", top: 100, left: isTablet ? 120 : 260, height: 300 },
    ],
    [
      { src: "/Burger.jpg", top: 40, left: isTablet ? 30 : 90, height: 300 },
      { src: "/pancake.jpg", top: 190, left: isTablet ? 130 : 200, width: 250 },
    ],
    [
      { src: "/Spaghetti.jpg", top: 40, left: isTablet ? -20 : 50 },
      {
        src: "/Seafoods.jpg",
        top: 160,
        left: isTablet ? 60 : 150,
        height: 200,
      },
    ],
  ];

  return (
    <section>
      <div className=" hidden md:flex flex-col md:flex-row items-center justify-evenly  w-full min-h-[500px]  max-w-7xl m-auto overflow-hidden">
        {/* Pc and tablet Section , cuz its hard to be responsive website so i made it like that :> */}
        {imageGroups.map((group, i) => (
          <div key={i} className="relative h-[400px] w-full md:w-3/5 lg:w-2/5">
            {group.map((img, j) => (
              <DraggableImage key={j} alt="image" {...img} delay={0.8} />
            ))}
          </div>
        ))}
      </div>
      {/* mobile section */}
      <motion.div
        viewport={{
          once: true,
          amount: 0.5,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 ,transition:{ delay: 0.8} }}
        transition={{ duration: 0.5, }}
        className="mt-5 w-full h-[500px] md:hidden "
      >
        <Swiper
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
      </motion.div>
    </section>
  );
};

export default ImagesSection;
