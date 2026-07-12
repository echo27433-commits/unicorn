import { forwardRef } from "react";

import Hero from "./Hero";
import Navbar from "./Navbar";
import PageHeaderBackdrop from "./PageHeaderBackdrop";

const Header = forwardRef<HTMLElement>(function Header(_, ref) {
  return (
    <>
      <Navbar />

      <header
        ref={ref}
        className="relative z-0 flex min-h-[100svh] w-full max-w-[100%] flex-col overflow-x-clip overflow-y-hidden bg-black md:min-h-screen md:will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <PageHeaderBackdrop intensity="home" />

        <div className="relative z-10 flex min-h-[100svh] flex-col pointer-events-none md:min-h-screen [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
          <Hero />
        </div>
      </header>
    </>
  );
});

export default Header;
