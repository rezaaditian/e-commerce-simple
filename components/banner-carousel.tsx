"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export type BannerSlide = {
  src: string;
  alt: string;
  href?: string;
  title?: string;
  subtitle?: string;
};

const AUTO_PLAY_MS = 5000;

export function BannerCarousel({ slides }: { slides: BannerSlide[] }) {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setCurrent((prev) => {
        if (index < 0) return slides.length - 1;
        if (index >= slides.length) return 0;
        return index;
      });
    },
    [slides.length]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(t);
  }, [slides.length, current, next]);

  if (!slides.length) return null;

  return (
    <section
      className="relative w-full overflow-hidden border-b border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800"
      aria-label="Promo banner carousel"
    >
      <div className="relative aspect-[21/9] w-full min-h-[200px] sm:aspect-[3/1] sm:min-h-[280px] md:min-h-[320px]">
        {slides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className="absolute inset-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
            }}
            aria-hidden={i !== current}
          >
            {slide.href ? (
              <Link
                href={slide.href}
                className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              >
                <SlideImage slide={slide} priority={i === 0} />
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white sm:p-6">
                    {slide.title && (
                      <p className="text-lg font-semibold sm:text-xl md:text-2xl">
                        {slide.title}
                      </p>
                    )}
                    {slide.subtitle && (
                      <p className="mt-0.5 text-sm opacity-90 sm:text-base">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </Link>
            ) : (
              <>
                <SlideImage slide={slide} priority={i === 0} />
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white sm:p-6">
                    {slide.title && (
                      <p className="text-lg font-semibold sm:text-xl md:text-2xl">
                        {slide.title}
                      </p>
                    )}
                    {slide.subtitle && (
                      <p className="mt-0.5 text-sm opacity-90 sm:text-base">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Arrows */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:ring-2 focus:ring-white sm:left-4"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 focus:ring-2 focus:ring-white sm:right-4"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 sm:bottom-4">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className="h-2 w-2 rounded-full transition sm:h-2.5 sm:w-2.5"
              style={{
                backgroundColor: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.4)",
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function SlideImage({ slide, priority }: { slide: BannerSlide; priority: boolean }) {
  return (
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      className="object-cover"
      sizes="100vw"
      priority={priority}
    />
  );
}
