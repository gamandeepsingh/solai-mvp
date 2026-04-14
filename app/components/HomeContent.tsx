"use client";

import { useState } from "react";
import HeroSection from "./HeroSection";
import ParticleCanvas from "./ParticleCanvas";
import SmoothScrollProvider from "./SmoothScrollProvider";
import PartnersSection from "./PartnersSection";
import Navbar from "./Navbar";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import CommandsShowcase from "./CommandsShowcase";
import WaitlistCTA from "./WaitlistCTA";
import Footer from "./Footer";
import WaitlistModal from "./WaitlistModal";

export default function HomeContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      <main className="relative bg-black min-h-screen">
        <ParticleCanvas />
        <Navbar onOpenWaitlist={() => setWaitlistOpen(true)} />
        <HeroSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <FeaturesSection />
        <HowItWorksSection />
        <PartnersSection />
        <CommandsShowcase />
        <WaitlistCTA />
        <Footer />
        <WaitlistModal
          isOpen={waitlistOpen}
          onClose={() => setWaitlistOpen(false)}
        />
      </main>
    </SmoothScrollProvider>
  );
}
