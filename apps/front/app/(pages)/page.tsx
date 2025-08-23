"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "@/app/components/homepage/hero-section";
import SecondSection from "@/app/components/homepage/second-section";
import ThirdSection from "@/app/components/homepage/third-section";
import FourthSection from "@/app/components/homepage/fourth-section";
import FifthSection from "@/app/components/homepage/fifth-section";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".panel", containerRef.current);
      panels.forEach(panel => {
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      });
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div className="panel w-full">
        <HeroSection />
      </div>

      <div className="panel w-full">
        <SecondSection />
        <ThirdSection />
        <FourthSection />
        <FifthSection />
      </div>
    </div>
  );
}
