import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TruckAsset } from './TruckAsset';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const FULL_TEXT = 'welcome to hyderabad goa transport';

export const HeroSection: React.FC = () => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const heroPinRef = useRef<HTMLDivElement>(null);
  const truckContainerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const frontWheelRef = useRef<SVGGElement>(null);
  const rearWheelRef = useRef<SVGGElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // 1. Character-by-character typing animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedCount(FULL_TEXT.length);
      setIsTypingComplete(true);
      setCursorVisible(false);
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      currentIndex += 1;
      setDisplayedCount(currentIndex);

      if (currentIndex >= FULL_TEXT.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        setTimeout(() => {
          setCursorVisible(false);
        }, 450);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // 2. GSAP ScrollTrigger for pinned scroll-driven truck travel & wheel rotation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const heroSection = heroPinRef.current;
    const truckEl = truckContainerRef.current;
    const roadEl = roadRef.current;
    if (!heroSection || !truckEl || !roadEl) return;

    // Calculate dynamic travel distance across the viewport
    const calculateDistance = () => {
      const viewportWidth = window.innerWidth;
      const truckWidth = truckEl.offsetWidth || 160;
      const margin = Math.max(24, viewportWidth * 0.05);
      return Math.max(200, viewportWidth - truckWidth - margin * 2);
    };

    let travelDistance = calculateDistance();

    // Wheel diameter in SVG is 18 units; SVG width is 160.
    const svgWheelDiameter = 18;
    const svgWidth = 160;
    const renderedTruckWidth = truckEl.offsetWidth || 160;
    const renderedWheelDiameter = (svgWheelDiameter / svgWidth) * renderedTruckWidth;
    const wheelCircumference = Math.PI * renderedWheelDiameter;
    const totalWheelRotations = travelDistance / wheelCircumference;
    const totalRotationDeg = totalWheelRotations * 360;

    // GSAP Timeline synchronized with ScrollTrigger
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1, // Fluid momentum damping
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            travelDistance = calculateDistance();
          },
        },
      });

      // Move vehicle from right toward left
      tl.to(truckEl, {
        x: () => -travelDistance,
        ease: 'none',
        duration: 1,
      }, 0);

      // Rotate tires purely around their own local (0, 0) axle center via SVG transform attribute
      const wheelState = { angle: 0 };
      tl.to(wheelState, {
        angle: -totalRotationDeg,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          const rotAttr = `rotate(${wheelState.angle})`;
          if (frontWheelRef.current) {
            frontWheelRef.current.setAttribute('transform', rotAttr);
          }
          if (rearWheelRef.current) {
            rearWheelRef.current.setAttribute('transform', rotAttr);
          }
        },
      }, 0);

      // Fade out the scroll prompt indicator on initial scroll
      if (scrollIndicatorRef.current) {
        tl.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: 'power1.out',
        }, 0);
      }
    }, heroPinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero-stage" ref={heroPinRef}>
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

      {/* Pinned Road & Vehicle Journey Track */}
      <div className="hero-track">
        {/* Continuous Hairline Road */}
        <div className="hero-track__road" ref={roadRef}>
          <div className="hero-track__road-line"></div>
        </div>

        {/* Scroll-Driven Illustrated Cargo Vehicle */}
        <div className="hero-track__truck-wrapper" ref={truckContainerRef}>
          <TruckAsset
            className="hero-track__truck-svg"
            frontWheelRef={frontWheelRef}
            rearWheelRef={rearWheelRef}
          />
        </div>

        {/* Interactive Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className={`hero-track__scroll-hint ${isTypingComplete ? 'is-ready' : ''}`}
        >
          <span className="scroll-hint-label">Scroll to journey</span>
          <div className="scroll-hint-line">
            <span className="scroll-hint-dot"></span>
          </div>
        </div>
      </div>
    </section>
  );
};
