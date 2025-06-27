"use client";
import React from "react";
import ImagesSection from "./ImagesSection";
import { motion } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import { useUser } from "@clerk/nextjs";
import { Pizza } from "lucide-react";
const About = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <section className="min-h-screen px-5 lg:px-10 flex flex-col my-8 ">
        <h1 className="w-3/5 rounded-2xl  h-12 mb-2 animate-pulse bg-neutral-300 dark:bg-neutral-800" />
        <p className="w-4/5 rounded-2xl  mb-2 h-20 animate-pulse bg-neutral-300 dark:bg-neutral-800 " />
        <div className="h-96 w-full rounded-2xl animate-pulse bg-neutral-300 dark:bg-neutral-800" />
      </section>
    );
  if (isSignedIn) return null;
  return (
    <section className="min-h-screen px-5 lg:px-16 ">
      <motion.h1
        {...FadeUp}
        className="text-5xl flex items-end gap-2 mb-2 font-semibold"
      >
        <span className="text-yellow-500">
          <Pizza size={50} />
        </span>
        About Us
      </motion.h1>
      <motion.p {...FadeUp} className="lg:ml-6 text-xl font-extralight">
        <span className="text-yellow-500"> One Bite Away </span>, is just an app
        <span className="text-yellow-500"> </span>
        to helps u to choice ur food So as not to lose your{" "}
        <span className="text-yellow-500"> mind </span> in thinking too much ,
        we are not <span className="text-yellow-500"> restaurant </span>, its
        just shows u food and The way to cook , u can order it from ur local
        delivery or u can just cook it its simple and easy to use , . we hope u
        get ur meal as soon as possible :) , if u like it just share it with ur
        friends , i will be happy to see that project helps people
      </motion.p>
      <ImagesSection />
    </section>
  );
};

export default About;
