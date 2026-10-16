# Hyderabad Goa Transport (HGT) — Workspace Rules & Instructions

## 1. Project Overview
A premium, minimalist corporate landing page for Hyderabad Goa Transport built with React, Vite, TypeScript, GSAP (with ScrollTrigger), and Vanilla CSS design tokens.

## 2. Core Constraints & Aesthetic Mandate
- **Strict Visual Restraint**: Background must be pure white (`#FFFFFF`) with pure black editorial Didone typography (`Bodoni Moda` / serif).
- **No Conventional Logistics Clutter**: Absolutely NO gradient cards, neon accents, dark mode toggles, 3D trucks, glassmorphism, or stock photography hero images.
- **Precision Motion Choreography**:
  - Hero typing sequence (`"welcome to hyderabad goa transport"`) must complete first.
  - The illustrated cargo truck (red cab, slate chassis, distinct rotating wheels, facing left) journeys right-to-left.
  - Truck movement and wheel rotation must scrub synchronously with user scroll via GSAP ScrollTrigger.
  - Reverse scrolling must naturally reverse truck travel and wheel rotation.
- **Zero CLS & Clean Cleanup**: Ensure GSAP ScrollTrigger instances are cleanly created inside `useGSAP` or `useEffect` and killed on unmount.
- **Mobile First & Responsive**: Verify on viewport widths 375px, 768px, 1024px, and 1440px without any horizontal overflow.

## 3. Key Reference Documents
- Product Brief: [docs/PRODUCT_BRIEF.md](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/docs/PRODUCT_BRIEF.md)
- Design System: [docs/DESIGN_SYSTEM.md](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/docs/DESIGN_SYSTEM.md)
- UI Review Checklist: [docs/UI_REVIEW_CHECKLIST.md](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/docs/UI_REVIEW_CHECKLIST.md)
