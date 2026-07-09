import Button from "./Button";

const stats = [
  {
    value: "120+",
    label: "Projects Delivered",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l4-4 4 4 5-6" />
      </svg>
    ),
  },
  {
    value: "25+",
    label: "Industries Served",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-1 flex-col px-4 pb-8 pt-28 md:px-8 md:pb-10 md:pt-32 lg:px-12">
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl xl:text-[4.35rem] xl:leading-[1.06]">
              Empowering Businesses
              <br />
              To Grow With{" "}
              <span className="inline bg-gradient-to-r from-[#ff2f00] via-[#ffffff] via-50% to-[#ff5f28] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]">
                Innovative
                <br />
                Digital Solutions.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 md:mt-10 md:text-lg">
              We help startups and enterprises scale faster with custom web apps,
              bold branding, and data-driven digital strategies that turn ideas into
              measurable growth.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5 md:mt-14">
              <Button href="#contact" variant="primary" className="md:text-lg">
                Book a Call
              </Button>
              <Button href="#services" variant="secondary" className="md:text-lg">
                View Our Services
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end md:absolute md:bottom-0 md:right-0 md:mt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card min-w-[170px] rounded-2xl px-5 py-4 backdrop-blur-md md:min-w-[190px] md:px-6 md:py-5"
              >
                <div className="flex items-start gap-3">
                  <span className="stat-icon-glow mt-0.5 text-[#ff5f28]">{stat.icon}</span>
                  <div>
                    <p className="stat-value-glow text-2xl font-bold md:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
