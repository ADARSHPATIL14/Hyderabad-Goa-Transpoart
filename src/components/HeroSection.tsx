import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hgtTruckLarge from '../assets/hgt_truck_large.png';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const FULL_TEXT = 'welcome to hyderabad goa transport';

export const HeroSection: React.FC = () => {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayedCount, setDisplayedCount] = useState<number>(() => isReducedMotion ? FULL_TEXT.length : 0);
  const [cursorVisible, setCursorVisible] = useState<boolean>(() => !isReducedMotion);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(() => isReducedMotion);

  const heroPinRef = useRef<HTMLDivElement>(null);
  const largeTruckRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 1. Character-by-character typing animation with clean unmount handling
  useEffect(() => {
    if (isReducedMotion) return;

    let currentIndex = 0;
    let cursorTimeout: ReturnType<typeof setTimeout> | null = null;

    const typingInterval = setInterval(() => {
      currentIndex += 1;
      setDisplayedCount(currentIndex);

      if (currentIndex >= FULL_TEXT.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        cursorTimeout = setTimeout(() => {
          setCursorVisible(false);
        }, 450);
      }
    }, 80);

    return () => {
      clearInterval(typingInterval);
      if (cursorTimeout) clearTimeout(cursorTimeout);
    };
  }, [isReducedMotion]);

  // 2. GSAP ScrollTrigger for large faded truck right-to-left journey across hero section
  useEffect(() => {
    const heroSection = heroPinRef.current;
    const truckEl = largeTruckRef.current;
    if (!heroSection || !truckEl) return;

    // For reduced motion users, present as an elegant static faded background
    if (isReducedMotion) {
      gsap.set(truckEl, { x: 0 });
      return;
    }

    const calculatePositions = () => {
      const viewportWidth = window.innerWidth;
      const truckWidth = truckEl.offsetWidth || 1100;
      // Positioned just outside/near right edge so front cab enters seamlessly on scroll
      const startX = viewportWidth * 0.85;
      // Complete exit through left edge: rear of truck completely clears left viewport boundary
      const endX = -(truckWidth + 80);
      return { startX, endX };
    };

    let { startX, endX } = calculatePositions();

    // Set initial stationary position outside/near right edge during typing
    gsap.set(truckEl, { x: startX });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top', // Smooth journey as hero scrolls towards About section
          scrub: 1.2, // Premium fluid momentum
          invalidateOnRefresh: true,
          onRefresh: () => {
            const pos = calculatePositions();
            startX = pos.startX;
            endX = pos.endX;
          },
        },
      });

      // Move large truck smoothly from right to left, completely exiting left
      tl.fromTo(
        truckEl,
        { x: () => startX },
        {
          x: () => endX,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // Fade out the scroll prompt indicator on initial scroll
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.2,
            ease: 'power1.out',
          },
          0
        );
      }
    }, heroPinRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section id="hero" className="hero-stage" ref={heroPinRef}>
      {/* Background Large Faded Truck Layer (Z-Index 1, behind hero text) */}
      <div className="hero-large-truck-layer" aria-hidden="true">
        <div className="hero-large-truck-wrapper" ref={largeTruckRef}>
          <img
            src={hgtTruckLarge}
            alt="Hyderabad Goa Transport Line-Haul Vehicle"
            className="hero-large-truck-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="container hero-stage__content">
        {/* Subtle Eyebrow */}
        <div className="hero-stage__eyebrow">
          <span className="eyebrow-dot"></span>
          <span>Inter-State Dedicated Freight Corridor</span>
        </div>

        {/* Editorial Didone Headline with Zero-CLS Ghosting */}
        <h1 className="hero-stage__headline" aria-label={FULL_TEXT}>
          <span className="hero-stage__typed">
            {FULL_TEXT.slice(0, displayedCount)}
          </span>
          {cursorVisible && (
            <span className="hero-stage__cursor" aria-hidden="true" />
          )}
          <span className="hero-stage__ghost" aria-hidden="true">
            {FULL_TEXT.slice(displayedCount)}
          </span>
        </h1>

        {/* Subtitle description */}
        <p className={`hero-stage__subtext ${isTypingComplete ? 'is-visible' : ''}`}>
          Connecting Telangana and Goa with punctual freight schedules, careful handling, and commercial reliability.
        </p>

        {/* Route Corridor Badge */}
        <div className={`hero-stage__corridor ${isTypingComplete ? 'is-visible' : ''}`}>
          <span className="corridor-point">Hyderabad</span>
          <span className="corridor-arrow">→</span>
          <span className="corridor-via">Raichur · Hubballi · Belagavi</span>
          <span className="corridor-arrow">→</span>
          <span className="corridor-point">Goa (Panaji & Vasco)</span>
        </div>
      </div>

      {/* Interactive Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className={`hero-scroll-hint ${isTypingComplete ? 'is-ready' : ''}`}
      >
        <span className="scroll-hint-label">Scroll to journey</span>
        <div className="scroll-hint-line">
          <span className="scroll-hint-dot"></span>
        </div>
      </div>
    </section>
  );
};
