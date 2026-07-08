import Button from "./Button";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years Experience" },
];

const services = ["Web Development", "Branding", "SEO", "UI/UX Design"];

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-10 text-center md:px-8 md:pb-24 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <span className="text-glow-orange mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFAA00]/30 bg-[#FFAA00]/10 px-4 py-1.5 text-xs font-medium tracking-wide text-[#FFAA00] md:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFAA00]" />
          Now accepting new clients for 2026
        </span>

        <h1 className="text-glow-white text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          Empowering Businesses
          <br />
          To Grow With{" "}
          <span className="text-glow-orange text-[#FFAA00]">Innovative Digital</span>
          <br />
          Solutions.
        </h1>

        <p className="text-glow-muted mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          We help startups and enterprises scale faster with custom web apps,
          bold branding, and data-driven digital strategies that turn ideas into
          measurable growth.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="#contact" variant="primary" className="px-7 py-3 md:text-base">
            Book a Call
          </Button>
          <Button href="#contact" variant="secondary" className="px-7 py-3 md:text-base">
            Contact
          </Button>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-4 border-y border-white/10 py-8 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-glow-orange text-2xl font-bold text-[#FFAA00] md:text-3xl">
                {stat.value}
              </span>
              <span className="text-glow-muted text-xs text-white/60 md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {services.map((service) => (
            <span
              key={service}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 md:text-sm"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
