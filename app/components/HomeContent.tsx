"use client";

import { useState } from "react";
import HeroSection from "./HeroSection";
import ParticleCanvas from "./ParticleCanvas";
import SmoothScrollProvider from "./SmoothScrollProvider";
import Navbar from "./Navbar";
import PillarsSection from "./PillarsSection";
import GuardrailsSection from "./GuardrailsSection";
import StealthSection from "./StealthSection";
import HowItWorksSection from "./HowItWorksSection";
import WalletSection from "./WalletSection";
import PartnersSection from "./PartnersSection";
import WaitlistCTA from "./WaitlistCTA";
import Footer from "./Footer";
import WaitlistModal from "./WaitlistModal";

export default function HomeContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <SmoothScrollProvider>
      <main className="relative bg-[var(--bg)] min-h-screen">
        <ParticleCanvas />
        <Navbar onOpenWaitlist={openWaitlist} />
        <HeroSection onOpenWaitlist={openWaitlist} />
        <PillarsSection />
        <GuardrailsSection />
        <StealthSection />
        <HowItWorksSection onOpenWaitlist={openWaitlist} />
        <WalletSection />
        <PartnersSection />
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
