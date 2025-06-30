"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/Data/animation";
import { useUser } from "@clerk/nextjs";

const faqs = [
  {
    question: "What is this app about?",
    answer: "its about food and helps u to decide what to bite today :)",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes its free , but u can support the app with sharing it with ur friends or family :) ",
  },
  {
    question: "Can I see food from different countries?",
    answer:
      "Yeah u can ,but the api not support all countries :( ,so i hope u find ur country :) ",
  },
  {
    question: "Can I save my favorite dishes?",
    answer:
      "Ofc , u just need to login or sign in then save any dishes u want :) ",
  },
  {
    question: "Is there a mobile app version?",
    answer:
      "no :( , im Web Dev only so may be i will make it but if my web got sponsors :)",
  },
];
const FAQ = () => {
  const [opened, setOpened] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useUser();

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
    <section id="FAQ" className="min-h-screen px-5 lg:px-16 py-2 mt-20">
      <h1 className="text-5xl font-semibold">
        any
        <span className="text-yellow-500"> questions? </span>. Yes!
      </h1>
      <div className="max-w-4xl w-full mt-10 mx-auto">
        <AnimatePresence mode="wait">
          {faqs.map((item, i) => (
            <motion.div
              viewport={{ once: true, amount: 0.5 }}
              initial={{ x: -100, opacity: 0 }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { delay: i * 0.1 },
              }}
              key={item.question}
              className="w-full"
            >
              <motion.button
                whileHover={{ x: 10 }} //
                className=" text-start w-full p-4  text-xl md:text-lg dark:bg-neutral-800 dark:text-white text-black bg-neutral-200 rounded-2xl my-2"
                onClick={() =>
                  setOpened(opened === item.question ? null : item.question)
                }
              >
                {item.question}
              </motion.button>
              {opened === item.question && (
                <motion.div
                  key={`answer-${item.question}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="overflow-hidden bg-yellow-500 text-black rounded-2xl p-5"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div {...FadeUp} className="mx-auto w-fit text-center mt-20">
        <h1>
          Didnt get ur
          <span className="text-yellow-500"> Answer ? </span>, feel free to
          contact me
          <span className="text-yellow-500"> {":)"} </span>
        </h1>
        <motion.button
          whileTap={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          className="mt-5"
        >
          <a
            href="mailto:ibrahimwael809@gmail.com"
            className="text-yellow-500 text-2xl font-semibold"
          >
            Email Me
          </a>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default FAQ;
