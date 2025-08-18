import HeroSection from "@/app/components/homepage/hero-section";
import SecondSection from "@/app/components/homepage/second-section";
import ThirdSection from "@/app/components/homepage/third-section";
import FourthSection from "@/app/components/homepage/fourth-section";
import FifthSection from "../components/homepage/fifth-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
    </>
  );
}

