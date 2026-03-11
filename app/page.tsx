import HeroSection from "./components/HeroSection";
import ParticleCanvas from "./components/ParticleCanvas";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative bg-black min-h-screen">
        <ParticleCanvas />
        <HeroSection />
      </main>
    </SmoothScrollProvider>
  );
}
