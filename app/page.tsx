"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientHeroSection from "@/components/GradientHeroSection";
import Laptop from "@/components/Laptop";
import Marken from "@/components/Marken";
import ClientLogosWall from "@/components/ClientLogosWall";
import TextVideoClip from "@/components/TextVideoClip";
import VieleDaten from "@/components/WarumProjekteScheitern";
import AnalyticsResponsive from "@/components/AnalyticsResponsive";
import UseCases from "@/components/UseCases";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import SoArbeitenWir from "@/components/SoArbeitenWir";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Header colorScheme="purple" />
      <GradientHeroSection colorScheme="purple" />
      <Laptop colorScheme="purple" />
      <Marken colorScheme="purple" />
      <ClientLogosWall colorScheme="purple" />
      <TextVideoClip colorScheme="purple" />
      <VieleDaten colorScheme="purple" />
      <AnalyticsResponsive colorScheme="purple" />
      <UseCases colorScheme="purple" />
      <LeadMagnetSection colorScheme="purple" />
      <SoArbeitenWir colorScheme="purple" />
      <Contact colorScheme="purple" />
      <Footer colorScheme="purple" />
    </main>
  );
}
