"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Hamburger } from "lucide-react";
import LinksData from "@/Data/Links.json";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
const Footer = () => {
  const { isSignedIn } = useUser();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [massage, setMassage] = useState("");
  const [error,setError]=useState(false)
  
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
        email,
        massage,
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log("Message sent successfully!");
      setName("");
      setEmail("");
      setMassage("");
      setSuccess(true);             
    }
    else{
      setError(true)
    }
  }

  return (
    <footer className="w-full min-h-96 flex gap-y-14 flex-col md:flex-row  justify-between items-center p-10 bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
      <div className="flex flex-col items-center md:items-start  gap-6 justify-center">
        <h1 className="text-4xl font-semibold w-fit flex items-end justify-center">
          <Hamburger size={40} className="text-yellow-500" />
          OBA
        </h1>

        <div className="text-4xl font-semibold flex flex-col gap-2 w-fit ml-5">
          {isSignedIn
            ? LinksData.SignedIn.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className=" hover:text-yellow-500"
                >
                  <motion.div
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="w-full text-center md:text-start opacity-70 "
                  >
                    {item.Title}
                  </motion.div>
                </Link>
              ))
            : LinksData.notSignedIn.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className=" hover:text-yellow-500"
                >
                  <motion.div
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="w-full text-center md:text-start opacity-70 "
                  >
                    {item.Title}
                  </motion.div>
                </Link>
              ))}
        </div>
        <p className="text-sm opacity-65">© 2025 Ibrahim Wael</p>
      </div>
      <div className="flex flex-col gap-8 justify-center h-full items-center">
        <h1 className="text-3xl">
          Contact
          <span className="text-yellow-500"> me? </span>
          okay :)
        </h1>

        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col justify-center gap-2"
        >
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-yellow-500 rounded-2xl  "
              >
                <h1 className="text-2xl font-semibold">Massage Send Successfully :)</h1>
                <p className="text-lg">Ty for Ur Massage </p>
              </motion.div>
            )}
            {error && (
                   <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-yellow-500 rounded-2xl  "
                 >
                   <h1 className="text-2xl font-semibold">Some thing went wrong :(</h1>
                   <p className="text-lg">Try again later</p>
                 </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-2 w-full">
            <motion.input
              required
              name="name"
              whileFocus={{ scale: 1.01 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Ur Name"
              className="w-2/4 border-2 border-yellow-500    rounded-2xl p-2 outline-none"
            />
            <motion.input
              required
              name="email"
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ur Email"
              className="w-2/4 border-2 border-yellow-500    rounded-2xl p-2 outline-none"
            />
          </div>
          <motion.textarea
            required
            name="massage"
            value={massage}
            onChange={(e) => setMassage(e.target.value)}
            whileFocus={{ scale: 1.01 }}
            placeholder="Ur Massage"
            className="border-2 border-yellow-500 rounded-2xl p-2 outline-none"
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
      </div>
    </footer>
  );
};

export default Footer;
