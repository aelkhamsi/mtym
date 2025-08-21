"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useStackedPanels = () => {
  useEffect(() => {
    const panels = gsap.utils.toArray<HTMLElement>(".panel");

    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel,
        start: () =>
          panel.offsetHeight < window.innerHeight
            ? "top top"
            : "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [])
}

export default useStackedPanels;
