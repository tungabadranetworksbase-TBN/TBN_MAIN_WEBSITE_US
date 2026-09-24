// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { site } from "@/lib/site";

import Tornado from "@/components/originkit/ui/hero-18/tornado";
import BorderOrbit from "@/components/originkit/ui/hero-18/border-orbit";
import HeroBackgroundTablet from "@/components/originkit/ui/hero-18/hero-background-tablet";
import HeroBackgroundMobile from "@/components/originkit/ui/hero-18/hero-background-mobile";
import LogoTicker from "@/components/originkit/ui/hero-18/logo-ticker";


/** Public asset under /sections/hero-18/assets */
function asset(file: string) {
  return `/originkit/hero-18/${file}`;
}

const imgDiagonalLines = asset("diagonal-lines.png");
const imgDiagonalLines1 = asset("diagonal-lines-1.svg");
const imgDiagonalLines2 = asset("diagonal-lines-2.svg");
const imgDiagonalLines3 = asset("diagonal-lines-3.svg");
const imgPolygon1 = asset("polygon-1.svg");
const imgPolygon2 = asset("polygon-2.svg");
const imgSubtract = asset("subtract.svg");
const imgBoldAstronomyPlanet = asset("bold-astronomy-planet.svg");
const imgGroup = asset("group.svg");
const imgElement = asset("element.svg");
const imgElement1 = asset("element-1.svg");
const imgElement2 = asset("element-2.svg");
const imgElement3 = asset("element-3.svg");
const imgElement4 = asset("element-4.svg");
const imgElements = asset("elements.svg");
const imgEllipse = asset("ellipse.svg");
const imgEllipse1 = asset("ellipse-1.svg");

const inter = "font-[family-name:var(--font-inter)]";
const interTight = "font-[family-name:var(--font-inter-tight)]";
const lato = "font-[family-name:var(--font-lato)]";
const heroStats = `${site.figures[0].value} engineers trained · ${site.figures[1].value} placed · ${site.figures[3].value} hiring partners`;

const instrumentSerif = "font-[family-name:var(--font-instrument-serif)]";


export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] lg:h-full h18-background">
      {/* Background — mobile (Figma node 654:625) */}
      <div className="md:hidden">
        <HeroBackgroundMobile />
      </div>

      {/* Background — tablet (Figma node 654:376) */}
      <div className="hidden md:block lg:hidden">
        <HeroBackgroundTablet />
      </div>

      {/* Background — desktop. The Figma "Background" group: four "Elements Wrapper" stacks of
          blurred, colour-blended rectangles/ellipses plus two standalone glow ellipses, forming
          the diffuse ambient light field the vortex sits in. Sits behind the Tornado.
          Anchored top-left at its native size — it's a localized top-left glow, not artwork
          meant to stretch across the viewport, so the wrapper is full-size only to avoid
          clipping; the rays themselves stay put via their fixed pixel offsets. */}
      <div className="pointer-events-none absolute -top-[127px] left-0 hidden h-full w-full lg:block">
        <div
          className="drop-shadow-[0px_4px_7px_rgba(0,0,0,0.25)] relative size-full"
          style={{ transform: "scaleX(-1)", transformOrigin: "720px 0" }}
        >
          <div className="absolute contents left-[-294.8px] top-[-567.51px]">
            <div className="absolute contents left-[299.96px] size-[1866.579px] top-[-738.76px]">
              <div className="absolute flex items-center justify-center left-[961.61px] size-[1204.928px] top-[-738.76px]">
                <div className="flex-none rotate-45">
                  <div
                    className="h-[887.578px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[138.846px_171.255px] mask-size-[2322.501px_2322.501px] relative w-[816.448px]"
                    style={{ maskImage: `url("${imgElement}")` }}
                  >
                    <div className="absolute inset-[-29.85%_-32.46%]">
                      <img alt="" className="block max-w-none size-full" src={imgElement1} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute flex h-[1027.001px] items-center justify-center left-[463.52px] mix-blend-plus-lighter top-[-190.98px] w-[995.599px]">
                <div className="flex-none rotate-[43.56deg] skew-x-[-0.22deg]">
                  <div
                    className="bg-gradient-to-b blur-[15.303px] from-[#fcc000] h-[1253.563px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-568.574px_-376.532px] mask-size-[2322.501px_2322.501px] opacity-30 relative to-[80%] to-[rgba(252, 192, 0, 0)] w-[176.97px]"
                    style={{ maskImage: `url("${imgElement}")` }}
                  />
                </div>
              </div>
              <div className="absolute flex h-[1001.24px] items-center justify-center left-[530.89px] mix-blend-plus-lighter top-[-97.69px] w-[1021.671px]">
                <div className="flex-none rotate-[45.93deg] skew-x-[0.14deg]">
                  <div
                    className="bg-gradient-to-b blur-[27.029px] from-[#fcc000] h-[1253.592px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-475.135px_-469.815px] mask-size-[2322.501px_2322.501px] opacity-80 relative to-[88%] to-[rgba(252, 192, 0, 0)] w-[176.965px]"
                    style={{ maskImage: `url("${imgElement}")` }}
                  />
                </div>
              </div>
              <div className="absolute flex h-[972.247px] items-center justify-center left-[608.38px] top-[-3.5px] w-[1047.775px]">
                <div className="flex-none rotate-[48.45deg] skew-x-[0.52deg]">
                  <div
                    className="bg-[rgba(252, 192, 0, 0)] blur-[15.833px] h-[1253.321px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-371.539px_-564.01px] mask-size-[2322.501px_2322.501px] opacity-30 relative w-[177.01px]"
                    style={{ maskImage: `url("${imgElement}")` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute contents left-[299.96px] size-[1866.58px] top-[-738.76px]">
            <div className="absolute flex items-center justify-center left-[961.61px] size-[1204.928px] top-[-738.76px]">
              <div className="flex-none rotate-45">
                <div className="h-[887.578px] relative w-[816.448px]">
                  <div className="absolute inset-[-29.85%_-32.46%]">
                    <img alt="" className="block max-w-none size-full" src={imgElement1} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[1027.001px] items-center justify-center left-[463.52px] mix-blend-plus-lighter top-[-190.98px] w-[995.599px]">
              <div className="flex-none rotate-[43.56deg] skew-x-[-0.22deg]">
                <div className="bg-gradient-to-b blur-[15.303px] from-[#fcc000] h-[1253.563px] opacity-30 relative to-[80%] to-[rgba(252, 192, 0, 0)] w-[176.97px]" />
              </div>
            </div>
            <div className="absolute flex h-[1001.24px] items-center justify-center left-[577px] top-[-102px] w-[1021.671px]">
              <div className="flex-none rotate-[45.93deg] skew-x-[0.14deg]">
                <div
                  className="blur-[27.029px] h-[1253.592px] opacity-51 relative w-[176.965px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(179.20787263074158deg, rgb(252, 192, 0) 23.065%, rgba(252, 192, 0, 0.737) 14.923%, rgba(252, 192, 0, 0.307) 51.616%, rgba(252, 192, 0, 0) 99.903%)",
                  }}
                />
              </div>
            </div>
            <div className="absolute flex h-[972.247px] items-center justify-center left-[608.38px] top-[-3.5px] w-[1047.775px]">
              <div className="flex-none rotate-[48.45deg] skew-x-[0.52deg]">
                <div className="bg-[rgba(252, 192, 0, 0)] blur-[15.833px] h-[1253.321px] opacity-30 relative w-[177.01px]" />
              </div>
            </div>
            <div className="absolute flex items-center justify-center left-[930.06px] mix-blend-plus-lighter size-[597.079px] top-[29.37px]">
              <div className="flex-none rotate-45">
                <div className="h-[844.398px] relative w-0">
                  <div className="absolute inset-[-3.06%_-28.45px]">
                    <img alt="" className="block max-w-none size-full" src={imgElement2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center justify-center left-[727.28px] mix-blend-plus-lighter size-[597.079px] top-[-114.14px]">
              <div className="flex-none rotate-45">
                <div className="h-[844.398px] relative w-0">
                  <div className="absolute inset-[-3.06%_-28.45px]">
                    <img alt="" className="block max-w-none size-full" src={imgElement2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center justify-center left-[866.38px] mix-blend-plus-lighter size-[446.999px] top-[72.37px]">
              <div className="flex-none rotate-45">
                <div className="h-[632.151px] relative w-0">
                  <div className="absolute inset-[-4.08%_-26.46px]">
                    <img alt="" className="block max-w-none size-full" src={imgElement3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute contents left-[-239.55px] size-[1955.623px] top-[-880.31px]">
            <div className="absolute flex items-center justify-center left-[467.8px] size-[1248.275px] top-[-880.31px]">
              <div className="flex-none rotate-45">
                <div className="h-[948.879px] opacity-30 relative w-[816.448px]">
                  <div className="absolute inset-[-27.93%_-32.46%]">
                    <img alt="" className="block max-w-none size-full" src={imgElement4} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[1087.991px] items-center justify-center left-[-75.99px] mix-blend-plus-lighter top-[-304.68px] w-[1057.022px]">
              <div className="flex-none rotate-[43.47deg] skew-x-[-0.4deg]">
                <div className="bg-gradient-to-b blur-[15px] from-[#fcc000] h-[1340.103px] opacity-9 relative to-[88%] to-[rgba(252, 192, 0, 0)] w-[176.978px]" />
              </div>
            </div>
            <div className="absolute flex h-[1062.596px] items-center justify-center left-[-8.45px] mix-blend-plus-lighter top-[-211.58px] w-[1082.746px]">
              <div className="flex-none rotate-46 skew-x-[0.26deg]">
                <div className="bg-gradient-to-b blur-[28px] from-[#fcc000] h-[1340.156px] opacity-24 relative to-[88%] to-[rgba(252, 192, 0, 0)] w-[176.969px]" />
              </div>
            </div>
            <div className="absolute flex h-[1033.896px] items-center justify-center left-[69.65px] top-[-117.91px] w-[1108.382px]">
              <div className="flex-none rotate-[48.69deg] skew-x-[0.95deg]">
                <div className="bg-[rgba(252, 192, 0, 0)] blur-[16px] h-[1339.663px] opacity-9 relative w-[177.056px]" />
              </div>
            </div>
          </div>
          <div className="absolute contents left-[-551.67px] size-[1715.427px] top-[-857.71px]">
            <div className="absolute flex items-center justify-center left-[32.41px] size-[1131.347px] top-[-857.71px]">
              <div className="flex-none rotate-45">
                <div className="h-[783.518px] opacity-30 relative w-[816.448px]">
                  <div className="absolute inset-[-33.44%_-32.09%]">
                    <img alt="" className="block max-w-none size-full" src={imgElements} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[923.47px] items-center justify-center left-[-388.11px] mix-blend-plus-lighter top-[-357.18px] w-[891.334px]">
              <div className="flex-none rotate-[43.73deg] skew-x-[0.11deg]">
                <div
                  className="blur-[40px] h-[1106.666px] opacity-24 relative w-[176.958px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180.31009561457427deg, rgb(252, 192, 0) 38.81%, rgba(252, 192, 0, 0) 72.523%)",
                  }}
                />
              </div>
            </div>
            <div className="absolute flex h-[897.087px] items-center justify-center left-[-321.04px] mix-blend-plus-lighter top-[-263.59px] w-[917.996px]">
              <div className="flex-none rotate-[45.82deg] skew-x-[-0.07deg]">
                <div className="bg-[rgba(252, 192, 0, 0)] blur-[40px] h-[1106.651px] opacity-24 relative w-[176.96px]" />
              </div>
            </div>
            <div className="absolute flex h-[867.597px] items-center justify-center left-[-244.58px] top-[-168.51px] w-[944.893px]">
              <div className="flex-none rotate-[48.05deg] skew-x-[-0.27deg]">
                <div className="bg-[rgba(252, 192, 0, 0)] blur-[15.833px] h-[1106.791px] opacity-9 relative w-[176.939px]" />
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center left-[-126.42px] mix-blend-plus-lighter size-[963.238px] top-[-269.64px]">
            <div className="flex-none rotate-45">
              <div className="h-[1240.037px] relative w-[122.187px]">
                <div className="absolute inset-[-8.06%_-81.84%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex items-center justify-center left-[349.92px] mix-blend-plus-lighter size-[963.238px] top-[-356.04px]">
            <div className="flex-none rotate-45">
              <div className="h-[1240.037px] relative w-[122.187px]">
                <div className="absolute inset-[-3.71%_-37.65%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal line textures (desktop) */}
      <div className="hidden lg:contents">
        <div className="absolute contents left-[859px] top-[-79px]">
          <div
            className="absolute bg-size-[7px_7px] bg-top-left h-[762px] left-[651px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[156px_-53px] mask-size-[811px_855px] top-[-78px] w-[1296px]"
            style={{ backgroundImage: `url("${imgDiagonalLines}")`, maskImage: `url("${imgDiagonalLines1}")` }}
          />
        </div>
        <div className="absolute contents left-[465px] top-[41px]">
          <div
            className="absolute bg-size-[7px_7px] bg-top-left h-[762px] left-[361.4px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[168.353px_100.314px] mask-size-[474.229px_622.65px] top-[-78.24px] w-[1296px]"
            style={{ backgroundImage: `url("${imgDiagonalLines}")`, maskImage: `url("${imgDiagonalLines2}")` }}
          />
        </div>
        <div className="absolute contents left-[-50px] top-[302px]">
          <div
            className="absolute bg-size-[7px_7px] bg-top-left h-[762px] left-[-258px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[156px_-53px] mask-size-[685px_658px] top-[303px] w-[1296px]"
            style={{ backgroundImage: `url("${imgDiagonalLines}")`, maskImage: `url("${imgDiagonalLines3}")` }}
          />
        </div>
      </div>

      {/* Hero content — mobile/tablet */}
      <div className="relative z-10 flex flex-col items-center gap-[40px] px-6 pb-[20px] pt-[16px] text-center md:gap-[56px] md:px-10 md:pb-[24px] md:pt-[24px] lg:hidden">
        <div className="flex flex-col items-center gap-[20px] md:gap-[24px]">
          <div className="relative flex items-center gap-[10px] rounded-[12px] bg-[rgba(255,255,255,0.02)] px-[12px] py-[8px]">
            <div className="bg-[#fcc000] content-stretch flex items-center p-[6.4px] relative rounded-[80px] shrink-0">
              <div className="relative shrink-0 size-[19.2px]">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBoldAstronomyPlanet} />
              </div>
            </div>
            <p className={`${lato} text-[15px] text-white tracking-[-0.3px] whitespace-nowrap md:text-[17px]`}>
              Industry-focused networking training
            </p>
            <BorderOrbit />
          </div>
          <div className="flex flex-col items-center gap-[14px] text-white md:gap-[16px]">
            <h1 className={`${instrumentSerif} max-w-[280px] font-normal leading-[1.15] text-[34px] tracking-[-0.68px] md:max-w-[460px] md:text-[52px] md:leading-[1.1] md:tracking-[-1.04px]`}>
              The Network You Build Is The Net Worth You Earn
            </h1>
            <p className={`${lato} max-w-[320px] text-[15px] leading-[1.4] opacity-70 md:max-w-[440px] md:text-[18px]`}>
              Hands-on networking training on real enterprise equipment, with internships and placement support until you are hired.
            </p>
          </div>
          <div className="flex items-center gap-[12px] md:gap-[16px]">
            <a
              href="/courses"
              className="relative flex items-center justify-between gap-[8px] overflow-clip rounded-[12px] border-t border-[rgba(255,255,255,0.15)] py-[12px] pl-[18px] pr-[12px] shadow-[0px_3px_6px_0px_rgba(82,82,82,0.1)] transition-[filter] duration-150 hover:brightness-110 md:py-[14px] md:pl-[24px] md:pr-[14px]"
            >
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none rounded-[12px]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 4.0988%, rgba(255, 255, 255, 0) 43.902%), linear-gradient(90deg, rgb(252, 192, 0) 0%, rgb(252, 192, 0) 100%)",
                }}
              />
              <p className={`${lato} relative font-bold text-[14px] text-[#08080a] tracking-[-0.28px] whitespace-nowrap md:text-[16px]`}>
                View Courses
              </p>
              <div className="relative shrink-0 size-[18px] md:size-[22px]">
                <div className="absolute inset-[28.66%_35.71%_23.78%_35.72%]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.3)]" />
            </a>
            <a
              href="/contact"
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] border-solid flex items-center justify-center gap-[10px] rounded-[10px] py-[12px] pl-[18px] pr-[12px] transition-colors duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] md:py-[14px] md:pl-[24px] md:pr-[14px]"
            >
              <p className={`${lato} text-[13px] text-white tracking-[-0.35px] whitespace-nowrap md:text-[14px]`}>
                Book a Demo
              </p>
              <div className="relative shrink-0 size-[18px] md:size-[22px]">
                <div className="absolute inset-[28.66%_35.71%_23.78%_35.72%]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[12px] self-stretch">
          <p className={`${interTight} font-light text-[14px] text-white opacity-50 md:text-[16px]`}>
            {heroStats}
          </p>
          <LogoTicker className="h-[42px] w-full md:h-[82px]" />
        </div>
      </div>

      {/* Hero content — desktop. Same centered 1440px reference frame as the desktop nav above,
          so both stay aligned to the same left margin as the viewport grows past 1440px. */}
      <div
        className="pointer-events-none hidden lg:absolute lg:inset-y-0 lg:z-10 lg:block lg:w-[1440px]"
        style={{
          left: "max(0px, calc((100% - 1440px) / 2))",
          transform: "scale(min(1, calc(100vw / 1440px)))",
          transformOrigin: "top left",
        }}
      >
      <div className="pointer-events-auto lg:absolute lg:content-stretch lg:flex flex-col gap-[72px] items-start left-[82px] top-[207px] w-[688px]">
        <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0">
          <div className="bg-[rgba(255,255,255,0.02)] content-stretch flex flex-col gap-[10px] items-start px-[12px] py-[8px] relative rounded-[12px] shrink-0">
            <div className="content-stretch flex gap-[10px] items-center justify-center relative rounded-[12px] shrink-0">
              <div className="bg-[#fcc000] content-stretch flex items-center p-[6.4px] relative rounded-[80px] shrink-0">
                <div className="relative shrink-0 size-[19.2px]">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBoldAstronomyPlanet} />
                </div>
              </div>
              <p className={`${lato} font-normal leading-[normal] relative shrink-0 text-[17px] text-white tracking-[-0.34px] whitespace-nowrap`}>
                Industry-focused networking training
              </p>
            </div>
            <BorderOrbit />
          </div>
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0">
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white">
              <p className={`${instrumentSerif} font-normal leading-[1.1] relative shrink-0 text-[62px] tracking-[-1.24px] w-[502px]`}>
                The Network You Build Is The Net Worth You Earn
              </p>
              <p className={`${lato} font-normal leading-[normal] opacity-70 relative shrink-0 text-[20px] tracking-[-0.4px] w-[474px]`}>
                Hands-on networking training on real enterprise equipment, with internships and placement support until you are hired.
              </p>
            </div>
            <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
              <a
                href="/courses"
                className="border-[rgba(255,255,255,0.15)] border-solid border-t content-stretch flex items-center justify-between overflow-clip pl-[24px] pr-[14px] py-[14px] relative rounded-[12px] shadow-[0px_63px_18px_0px_rgba(82,82,82,0),0px_40px_16px_0px_rgba(82,82,82,0.01),0px_23px_14px_0px_rgba(82,82,82,0.05),0px_10px_10px_0px_rgba(82,82,82,0.09),0px_3px_6px_0px_rgba(82,82,82,0.1)] shrink-0 w-[136px] transition-[filter] duration-150 hover:brightness-110"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[12px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 4.0988%, rgba(255, 255, 255, 0) 43.902%), linear-gradient(90deg, rgb(252, 192, 0) 0%, rgb(252, 192, 0) 100%)",
                  }}
                />
                <p className={`${lato} font-bold leading-[1.5] relative shrink-0 text-[16px] text-white tracking-[-0.32px] whitespace-nowrap`}>
                  View Courses
                </p>
                <div className="relative shrink-0 size-[22px]">
                  <div className="absolute inset-[28.66%_35.71%_23.78%_35.72%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.3)]" />
              </a>
              <a
                href="/contact"
                className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex gap-[10px] h-full items-center justify-center pl-[24px] pr-[14px] py-[14px] relative rounded-[10px] shrink-0 transition-colors duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]"
              >
                <p className={`${lato} font-normal leading-[1.5] relative shrink-0 text-[14px] text-white tracking-[-0.42px] whitespace-nowrap`}>
                  Book a Demo
                </p>
                <div className="relative shrink-0 size-[22px]">
                  <div className="absolute inset-[28.66%_35.71%_23.78%_35.72%]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <p className={`${interTight} font-light leading-[1.3] opacity-50 relative shrink-0 text-[16px] text-white w-full`}>
            {heroStats}
          </p>
          <LogoTicker className="h-[85px] w-full" />
        </div>
      </div>
      </div>

      {/* Particle sphere — live WebGL vortex (Originkit Tornado); single instance, repositioned per breakpoint.
          Desktop fits the 1440:1024 frame to the hero's HEIGHT and anchors it right. The old box
          covered on width instead (130% of the viewport), which on a laptop — 720px tall against the
          1024px the section was drawn for — made a 1170px frame inside a 769px hero: the camera
          frames the form to the frame's height, so two thirds of the vortex sat off-screen and what
          was left was the waist, blown out across the copy. Fitting height keeps the whole form.
          The left edge of the frame is masked out rather than aligned: the vortex lights its own
          floor to the frame's edge, so any boundary inside the viewport reads as a seam, and the
          fade doubles as the ground the headline is set on. */}
      <div className="relative z-0 h-[340px] w-full md:h-[440px] lg:absolute lg:inset-0 lg:h-auto lg:overflow-hidden lg:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.55)_26%,black_44%)]">
        <div className="h-full w-full lg:absolute lg:left-0 lg:top-1/2 lg:aspect-[1440/1024] lg:h-auto lg:w-[max(130%,calc(100vh*1440/1024))] lg:-translate-y-1/2">
          <Tornado
            background="transparent"
            /* Narrower than the stock form at both ends. The default 1150px
               floor and 380px crown were drawn to fill a 1024px-tall artboard;
               on a laptop the frame crops to the widest part of each flare, and
               the two of them met across the middle of the section as a solid
               bright wall. Pulling both in leaves the waist — the part that
               reads as a vortex — as what the crop actually keeps. */
            topRadius={300}
            bottomRadius={820}
            /* A step back from the default 75. It costs a little presence and
               buys the whole silhouette instead of a slab of its middle. */
            zoom={70}
            /* Brand gold, sampled from the logo. The vortex is the one place
               the mark's material is allowed to fill the screen — but it is
               behind live copy, so the bloom is set to sit under the text
               rather than compete with it. */
            /* The stock 240 strands is three times what the engine's own
               budget assumes, and the strand pass is CPU work every rebuild.
               At this size the difference between 240 and 96 is not visible;
               the difference in frame time is the whole page. */
            lineOptions={{ color: "#FCC000", glow: 3.5, count: 80 }}
            dotOptions={{ color: "#FCE418", glow: 0.9, count: 2800 }}
            cometOptions={{ color: "#FCD80C", glow: 6, count: 8 }}
          />
        </div>
        {/* Blends the hard top edge of the tornado canvas into the content above it — only
            needed on mobile/tablet, where the tornado sits as a normal-flow block below the
            CTAs; on desktop it's a full-bleed background with no edge to blend. Extends above
            the canvas's own top edge (not clipped — overflow-hidden above is lg-only now) so the
            fade spans across the boundary itself rather than starting exactly on it, which was
            leaving a visible seam where the canvas's clear color met the lighter page background. */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-[64px] h-[160px] lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(10,10,10,0) 0%, #0a0a0a 40%, #0a0a0a 55%, rgba(10,10,10,0) 100%)",
          }}
        />
      </div>

      {/* Floating shard accents (desktop) */}
      <div className="hidden lg:absolute lg:flex h-[195.131px] items-center justify-center left-[-162px] top-[508px] w-[166.822px]">
        <div className="flex-none rotate-[35.26deg]">
          <div className="h-[189px] relative w-[70.683px]">
            <div className="absolute inset-[-132.28%_-346.99%_-107.28%_-346.99%]">
              <img alt="" className="block max-w-none size-full" src={imgPolygon1} />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:absolute lg:flex h-[192.545px] items-center justify-center right-[-92.25px] top-[-170.71px] w-[171.896px]">
        <div className="-scale-y-100 flex-none rotate-[37.91deg]">
          <div className="h-[189px] relative w-[70.683px]">
            <div className="absolute inset-[-132.28%_-346.99%_-107.28%_-346.99%]">
              <img alt="" className="block max-w-none size-full" src={imgPolygon2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
