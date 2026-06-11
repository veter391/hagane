import { CinematicStage } from "./_components/effects/CinematicStage";
import { MidFog } from "./_components/effects/MidFog";
import { GodRays } from "./_components/effects/GodRays";
import { ParticleField } from "./_components/effects/ParticleField";
import { Hero } from "./_components/sections/Hero";
import { Manifesto } from "./_components/sections/Manifesto";
import { FiveCrafts } from "./_components/sections/FiveCrafts";
import { ForgeProcess } from "./_components/sections/ForgeProcess";
import { RecentCuts } from "./_components/sections/RecentCuts";
import { BushidoCode } from "./_components/sections/BushidoCode";
import { Duel } from "./_components/sections/Duel";
import { Footer } from "./_components/sections/Footer";

export default function Home() {
  return (
    <>
      <CinematicStage />
      <MidFog />
      <GodRays />
      <ParticleField mode="scroll" />
      <main className="relative">
        <Hero />
        <Manifesto />
        <FiveCrafts />
        <ForgeProcess />
        <RecentCuts />
        <BushidoCode />
        <Duel />
        <Footer />
      </main>
    </>
  );
}
