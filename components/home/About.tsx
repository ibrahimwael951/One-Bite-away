"use client";
import React from "react";
import ImagesSection from "./ImagesSection";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import { useUser } from "@clerk/nextjs";
const About = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <section className="min-h-screen px-5 flex flex-col my-10 ">
        <h1 className="w-3/5 rounded-2xl  h-12 mb-2 animate-pulse bg-neutral-300 dark:bg-neutral-800" />
        <p className="w-4/5 rounded-2xl  mb-2 h-20 animate-pulse bg-neutral-300 dark:bg-neutral-800 " />
        <div className="h-96 w-full rounded-2xl animate-pulse bg-neutral-300 dark:bg-neutral-800" />
      </section>
    );
  if (isSignedIn) return null;
  return (
    <section className="min-h-screen px-5 lg:px-16  mt-8 ">
      <motion.h1 {...FadeUp} className="text-5xl mb-2 font-semibold">
        Easiest way to
        <span className="text-yellow-500"> Choice </span>
        your Next bite
      </motion.h1>
      <motion.p {...FadeUp} className="ml-6 text-sm font-extralight">
        i made this app to make ur life easier and can pick ur next bite (food)
        u can order it from ur local delivery or u can just cook it its simple
        and easy to use , if u like it just share it with ur friends , i will be
        happy to see that project helps people
      </motion.p>
      <ImagesSection />
    </section>
  );
};

export default About;
