import About from "@/components/home/About";
import Category from "@/components/home/Category";
import FAQ from "@/components/home/FAQ";
import HeroSection from "@/components/home/HeroSection";
import React from "react";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <About />
      <Category />
      <FAQ />
    </main>
  );
}
