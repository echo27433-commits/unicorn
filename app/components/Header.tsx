import { forwardRef } from "react";

import Hero from "./Hero";
import PageHeroHeader from "./PageHeroHeader";

const Header = forwardRef<HTMLElement>(function Header(_, ref) {
  return (
    <PageHeroHeader ref={ref} size="home" intensity="home">
      <Hero />
    </PageHeroHeader>
  );
});

export default Header;
