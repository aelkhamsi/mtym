"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/app/components/homepage/hero-section";
import SecondSection from "@/app/components/homepage/second-section";
import ThirdSection from "@/app/components/homepage/third-section";
import FourthSection from "@/app/components/homepage/fourth-section";
import FifthSection from "@/app/components/homepage/fifth-section";
import Footer from "@/app/components/layout/footer/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel");
      panels.forEach(panel => {
        ScrollTrigger.create({
          trigger: panel,
          start: () => panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      });
    });
  
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="panel w-full">
        <HeroSection />
      </div>

      <div className="panel w-full">
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <div className="h-[20rem] bg-[#122019]"></div>
      </div>
    </>
  );
}
