import Button from "./Button";

const avatars = [
  { initials: "SL", label: "Client 1" },
  { initials: "AR", label: "Client 2" },
  { initials: "PM", label: "Client 3" },
];

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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-1 flex-col px-4 pb-6 pt-28 sm:pb-8 sm:pt-32 md:px-8 md:pb-10 md:pt-44 lg:px-12 lg:pt-48"
    >
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-5 sm:gap-6 md:gap-8">
        <div className="relative max-w-4xl lg:max-w-5xl">
          <div
            className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 sm:-inset-x-8 sm:-inset-y-10 md:-inset-x-12 md:-inset-y-14"
            style={{
              background:
                "radial-gradient(ellipse 70% 65% at 30% 40%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)",
            }}
            aria-hidden
          />

          <div className="relative z-[1]">
            <p className="mb-4 flex max-w-[18rem] items-center gap-2 text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.14em] text-[#ff5f28] sm:max-w-none sm:text-xs sm:tracking-[0.18em] md:mb-6 md:text-sm">
              <span aria-hidden>✦</span>
              Digital Solutions That Drive Impact
            </p>

            <h1 className="text-[2.75rem] font-light leading-[1.06] tracking-tight text-white sm:text-6xl sm:leading-[1.04] md:text-8xl lg:text-9xl xl:text-[7rem] xl:leading-[1.01]">
              Build. Scale.
              <br />
              Lead the{" "}
              <span className="text-gradient-future">Future.</span>
            </h1>

            <p className="mt-5 max-w-[30.5rem] text-[0.8125rem] leading-relaxed text-white/55 sm:text-sm md:mt-7 md:text-[0.95rem]">
              We partner with ambitious businesses to design and deliver digital
              solutions that spark innovation and accelerate growth.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 md:mt-12 md:gap-5">
              <Button
                href="#contact"
                variant="primary"
                className="w-full justify-center sm:w-auto md:text-lg"
              >
                Book a Call
              </Button>
              <Button
                href="#services"
                variant="secondary"
                className="w-full justify-center sm:w-auto md:text-lg"
              >
                Explore Services
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-3 sm:mt-8 md:mt-10">
              <div className="flex -space-x-3">
                {avatars.map((avatar) => (
                  <span
                    key={avatar.initials}
                    title={avatar.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#ff5f28]/25 text-[0.6rem] font-semibold tracking-wide text-white sm:h-9 sm:w-9 sm:text-[0.65rem] md:h-10 md:w-10 md:text-xs"
                  >
                    {avatar.initials}
                  </span>
                ))}
              </div>
              <p className="text-xs text-white/55 sm:text-sm md:text-base">
                Trusted by{" "}
                <span className="font-semibold text-white">100+</span> growing
                businesses
              </p>
            </div>
          </div>
        </div>

        <div className="stats-bar grid grid-cols-1 gap-4 rounded-2xl px-4 py-4 sm:grid-cols-3 sm:gap-0 sm:px-8 sm:py-6 md:px-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 sm:gap-4 ${
                index > 0
                  ? "border-t border-white/10 pt-4 sm:border-t-0 sm:border-l sm:border-white/10 sm:pt-0 sm:pl-8 md:pl-10"
                  : ""
              }`}
            >
              <span className="stat-icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#ff5f28] sm:h-11 sm:w-11">
                <span className="stat-icon-glow">{stat.icon}</span>
              </span>
              <div>
                <p className="stat-value-glow text-xl font-semibold sm:text-2xl md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-white/55 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
