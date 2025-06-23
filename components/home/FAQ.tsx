"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const faqs = [
  {
    question: "What is this app about?",
    answer:
      "its about food and helps u to decide what to bite today :)"
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes its free , but u can support the app with sharing it with ur friends or family :) "
  },
  {
    question: "Can I see food from different countries?",
    answer:
      "Yeah u can ,but the api not support all countries :( ,so i hope u find ur country :) "
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

  return (
    <section className="min-h-screen px-5 lg:px-16 py-2 mt-20">
      <h1 className="text-5xl font-semibold">
        any
        <span className="text-yellow-500"> questions? </span>. Yes!
      </h1>
      <div className="max-w-4xl w-full mt-10 mx-auto">
        <AnimatePresence mode="wait">
          {faqs.map((item, i) => (
            <div key={item.question} className="w-full">
              <motion.button
                viewport={{ once: true, amount: 0.5 }}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: i * 0.1 },
                }}
                whileHover={{ x: 10 }}
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
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQ;
