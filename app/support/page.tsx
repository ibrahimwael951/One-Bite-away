"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Bug, Heart, Minimize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, opacityAnimate } from "@/Data/animation";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";

export default function Page() {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [subject, setSubject] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      subject.length <= 10 ||
      message.length <= 10 ||
      email.length <= 5 ||
      name.length <= 2
    ) {
      setShowErrors(true);
      return;
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: `${process.env.NEXT_PUBLIC_CONTACT_KEY}`,
        from: "One-Bite-Away",
        name,
        subject,
        email,
        message,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
      setSuccess(true);
    } else {
      setError(true);
    }
  }
  if (success)
    return (
      <section className="min-h-screen flex flex-col text-center justify-center items-center px-5 lg:px-10 2xl:px-20  ">
        <h1 className="text-5xl font-semibold mb-2">
          Your message send <span className="text-yellow-500"> Successfully </span> 
        </h1>
        <p className="text-lg mb-10">Ty for Ur message </p>

        <div className="flex justify-center items-center gap-5">
          <CustomButton text="Home" textSize={18} href="/" bg={true} />
          <CustomButton text="Search" textSize={18} href="/search" />
        </div>
      </section>
    );
  if (error)
    return (
      <section className="min-h-screen flex flex-col text-center justify-center items-center px-5 lg:px-10 2xl:px-20  ">
        <h1 className="text-5xl font-semibold mb-2">Some thing went <span className="text-yellow-500"> Wrong </span> :(</h1>
        <p className="text-lg mb-10">Try again later</p>
        <div className="flex justify-center items-center gap-5">
          <CustomButton text="Home" textSize={18} href="/" bg={true} />
          
        </div>
      </section>
    );
  return (
    <section className="min-h-screen px-5 lg:px-10 2xl:px-20 my-10 overflow-x-hidden">
      <motion.h1 {...FadeUp} className="text-5xl font-semibold mb-10">
        Does any <span className="text-yellow-500"> Problem </span> happened ?
      </motion.h1>

      <div className="relative flex flex-col sm:flex-row  my-10  gap-2 md:gap-5 justify-center items-center  w-fit  md:max-w-2xl m-auto  ">
        {[
          {
            Text: "No, I just wanted to say Thanks ",
            Icon: <Heart size={50} />,
          },
          {
            Text: "Yes, and i will say all Problem Details",
            Icon: <Bug size={50} />,
          },
        ].map((item) => (
          <motion.div
            key={item.Text}
            {...FadeUp}
            animate={
              subject === item.Text
                ? {
                    y: -20,
                    background: "oklch(79.5% 0.184 86.047)",
                    color: "black",
                  }
                : { scale: 1, background: "", color: "" }
            }
            onClick={() => setSubject(item.Text)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
            className={` w-full h-52 sm:w-2/4  sm:h-[240px] md:w-[300px] md:h-[200px] border-2 border-yellow-500 rounded-2xl p-5   flex flex-col justify-evenly items-center gap-5 text-center cursor-pointer  font-semibold text-lg box-content
    
                `}
          >
            {item.Icon}
            <h1>{item.Text}</h1>
          </motion.div>
        ))}
        <AnimatePresence>
          {subject.length <= 0 && showErrors && (
            <motion.div
              {...opacityAnimate}
              className="absolute left-2/4 -bottom-8  -translate-x-2/4 text-2xl  text-red-500"
            >
              please select ur subject
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <form className=" w-full md:max-w-2xl mx-auto  " onSubmit={handleSubmit}>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-yellow-500 rounded-2xl  "
            >
              <h1 className="text-2xl font-semibold">
                message Send Successfully :)
              </h1>
              <p className="text-lg">Ty for Ur message </p>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-yellow-500 rounded-2xl  "
            >
              <h1 className="text-2xl font-semibold">
                Some thing went wrong :(
              </h1>
              <p className="text-lg">Try again later</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2 mb-2 w-full ">
          <motion.input
            name="name"
            whileFocus={{ scale: 1.01 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Ur Name"
            className="w-2/4 border-2 border-yellow-500    rounded-2xl p-3 outline-none"
          />
          <motion.input
            name="email"
            required
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ur Email"
            className="w-2/4 border-2 border-yellow-500    rounded-2xl p-3 outline-none"
          />
        </div>
        <motion.textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          whileFocus={{ scale: 1.01 }}
          placeholder="Ur message"
          className="border-2 border-yellow-500 rounded-2xl p-3 outline-none w-full h-52"
        />
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="p-4 w-full  rounded-2xl bg-yellow-500 uppercase font-semibold text-xl"
        >
          Submit
        </motion.button>
      </form>
      <div className="absolute top-15 right-5  w-2/5 h-52 overflow-hidden">
        <AnimatePresence>
          {showErrors && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="absolute  w-full h-full rounded-2xl p-5  bg-neutral-100 dark:bg-neutral-900  border-2 border-yellow-500 "
            >
              <Button
                onClick={() => setShowErrors(false)}
                variant="outline"
                className="absolute top-2 right-2  "
              >
                <Minimize />
              </Button>
              <div className=" text-2xl font-semibold">
                Fell those
                <span className="text-yellow-500"> Methods </span>
              </div>
              <div>
                <AnimatePresence>
                  {subject.length <= 10 && (
                    <motion.h1 {...opacityAnimate}>
                      Select Subject from Two Cards
                    </motion.h1>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {message.length <= 10 && (
                    <motion.h1 {...opacityAnimate}>
                      Write ur message Input
                    </motion.h1>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {email.length <= 5 && (
                    <motion.h1 {...opacityAnimate}>
                      Select Subject from Two Cards
                    </motion.h1>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {name.length <= 2 && (
                    <motion.h1 {...opacityAnimate}>
                      Select Subject from Two Cards
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
