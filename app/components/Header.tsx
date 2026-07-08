import Hero from "./Hero";
import LineWaves from "./LineWaves";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <LineWaves
          speed={0.1}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1.0}
          rotation={-45}
          edgeFadeWidth={0.15}
          colorCycleSpeed={0.3}
          brightness={0.25}
          color1="#FFAA00"
          color2="#ffffff"
          color3="#FFAA00"
          enableMouseInteraction={true}
          mouseInfluence={2.0}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      <div className="relative z-10 flex min-h-screen flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <Navbar />
        <Hero />
      </div>
    </header>
  );
}
