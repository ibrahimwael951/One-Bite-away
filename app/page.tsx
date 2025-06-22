import HeroSection from "@/components/home/HeroSection";
import  { ModeToggle } from "@/components/ModeToggle";
import React from "react"

export default function Home() {
  return (
    <main>
      <HeroSection/>
      
       <div className="min-h-screen flex justify-center items-center w-full ">
       <ModeToggle/>   
        
       </div>
    </main>
  );  
}       