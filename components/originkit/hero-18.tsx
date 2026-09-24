"use client";

import "./hero-18.css";
import Hero from "@/components/originkit/ui/hero-18/hero";

/** Source: https://github.com/sridhar-raj/Tornado-Section/tree/main/src/app/sections/hero */
const Hero18 = () => (
  // 769px was the section's design height, used as a floor. A 1366x768 laptop
  // gives ~720px of viewport, so the floor pushed the stats line and the logo
  // ticker under the fold on the most common desktop screen there is. The hero
  // takes the viewport it is given; the floor only catches genuinely short
  // windows, where scrolling is the right answer anyway.
  <main className="relative w-full lg:h-[calc(100vh-var(--nav-h))] lg:min-h-[600px] lg:shrink-0">
    <Hero />
  </main>
);

export default Hero18;
