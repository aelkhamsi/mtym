"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/app/components/homepage/hero-section";
import SecondSection from "@/app/components/homepage/second-section";
import ThirdSection from "@/app/components/homepage/third-section";
import FourthSection from "@/app/components/homepage/fourth-section";
import FifthSection from "../components/homepage/fifth-section";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");

    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () =>
          panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
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
      </div>
    </>
  );
}
