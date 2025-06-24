"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Marquee } from "@/components/marquee";
import Image from "next/image";

const companies = [
  {
    logo: "/google.svg",
  },
  {
    logo: "/meta.svg",
  },
  {
    logo: "/spotify.svg",
  },
  {
    logo: "/supabase.svg",
  },
  {
    logo: "/digitalocean.svg",
  },
];

export default function HeroSection() {
  const starsRef = useRef<HTMLDivElement>(null);
  const [starPositions, setStarPositions] = useState<
    Array<{ left: string; top: string }>
  >([]);

  useEffect(() => {
    // Generate star positions on client side only
    const positions = Array.from({ length: 25 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 40}%`,
    }));
    setStarPositions(positions);
  }, []);

  useEffect(() => {
    if (starsRef.current && starPositions.length > 0) {
      const stars = starsRef.current.querySelectorAll(".star");

      stars.forEach((star) => {
        gsap.to(star, {
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 3 + 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: Math.random() * 2,
        });
      });
    }
  }, [starPositions]);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div ref={starsRef} className="absolute inset-0 overflow-hidden">
        {starPositions.map((position, i) => (
          <div
            key={i}
            className="star absolute w-0.5 h-0.5 bg-white rounded-full opacity-80"
            style={{
              left: position.left,
              top: position.top,
            }}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4 sm:mb-5">
          <svg
            fill="none"
            height="48"
            viewBox="0 0 44 48"
            width="44"
            className="sm:w-[60px] sm:h-[64px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#fff">
              <path d="m16 8 5.0912 10.9088 10.9088 5.0912-10.9088 5.0912-5.0912 10.9088-5.0912-10.9088-10.9088-5.0912 10.9088-5.0912z" />
              <path
                d="m20.0469 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z"
                opacity=".5"
              />
            </g>
          </svg>
        </div>
        <div className="mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-wagner font-bold">
            AI isn&apos;t just about
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl p-1 sm:p-2 font-wagner font-bold bg-gradient-to-r from-accent-1 to-accent-2 bg-clip-text text-transparent ">
            replacing tasks
          </h2>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 max-w-xs sm:max-w-2xl lg:max-w-3xl px-2 sm:px-0">
            It&apos;s about amplifying{" "}
            <span className="text-white font-semibold relative font-wagner-reverse-italic">
              you
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary"></div>
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xs sm:max-w-lg lg:max-w-2xl mt-3 sm:mt-5 px-2 sm:px-0">
            Deploy autonomous AI agents that think, act, and adapt — while you
            focus on what matters most to your business.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-6 px-4 sm:px-0">
          <button className="w-full sm:w-auto px-6 sm:px-4 text-sm sm:text-md py-3 sm:py-2 bg-accent-1 text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-accent-1/10  border border-accent-1 shadow-lg hover:shadow-xl cursor-pointer">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-4 text-sm sm:text-md py-3 sm:py-2 bg-transparent border border-white/20 hover:border-secondary/40 text-white font-medium rounded-lg transition-all duration-300 backdrop-blur-sm hover:bg-secondary/5 cursor-pointer">
            Watch Demo
          </button>
        </div>

        <div className="mt-10">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-300 mb-3 sm:mb-4">
            Trusted by leading companies
          </h3>
          <div className="relative">
            <Marquee pauseOnHover>
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-2 gap-3"
                >
                  <Image
                    src={company.logo}
                    alt={`Logo of ${company.logo}`}
                    width={150}
                    height={16}
                    className="object-contain grayscale hover:grayscale-0 hover:scale-110 transition-all duration-500"
                  />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
