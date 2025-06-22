"use client";
import React from "react";
import ImagesSection from "./ImagesSection";
import { motion } from "framer-motion";
const About = () => {
  return (
    <section className="min-h-screen px-5 lg:px-16  mt-8 ">
      <motion.h1
        viewport={{ once: true, amount: 0.5 }}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl mb-2"
      >
        easier way to bite ur food
      </motion.h1>
      <motion.p
        viewport={{ once: true, amount: 0.5 }}
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 ,delay:0.4}}
        className="ml-4 text-sm font-extralight"
      >
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
