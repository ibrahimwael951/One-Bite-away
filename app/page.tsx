import React from "react";
import About from "@/components/home/About";
import Category from "@/components/home/Category";
import FAQ from "@/components/home/FAQ";
import HeroSection from "@/components/home/HeroSection";
import RandomFood from "@/components/home/RandomFood";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <RandomFood/>    s
      <Category />
      <FAQ />
    </main>
  );
}
