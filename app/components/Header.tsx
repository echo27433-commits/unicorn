import Hero from "./Hero";
import LineWaves from "./LineWaves";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <Navbar />

      <header className="relative flex min-h-screen flex-col overflow-hidden bg-black">
        <div
          className="absolute inset-0 z-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.85) 64%, black 76%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 38%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.85) 64%, black 76%, black 100%)",
          }}
        >
          <LineWaves
            speed={0.16}
            innerLineCount={44}
            outerLineCount={52}
            warpIntensity={1.25}
            rotation={-38}
            edgeFadeWidth={0.08}
            colorCycleSpeed={0.65}
            brightness={0.9}
            color1="#ff5f28"
            color2="#ffc49a"
            color3="#ff3a00"
            enableMouseInteraction={true}
            mouseInfluence={2.8}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, #000000 40%, rgba(0,0,0,0.97) 48%, rgba(0,0,0,0.88) 54%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.52) 66%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.16) 78%, rgba(0,0,0,0.06) 84%, transparent 92%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen opacity-70"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 46%, rgba(255,95,40,0.04) 54%, rgba(255,95,40,0.1) 64%, rgba(255,95,40,0.14) 72%, rgba(255,95,40,0.08) 80%, transparent 90%)",
          }}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[50%] bg-[radial-gradient(ellipse_85%_80%_at_90%_50%,rgba(255,95,40,0.28),transparent_75%)]" />

        <div className="relative z-10 flex min-h-screen flex-col pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <Hero />
        </div>
      </header>
    </>
  );
}
