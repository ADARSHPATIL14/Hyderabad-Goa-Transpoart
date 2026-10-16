# Design System: Hyderabad Goa Transport (HGT)

## 1. Visual Direction & Design Philosophy
The visual direction is **"Editorial Minimalist Logistics"**.
Drawing inspiration directly from the provided high-contrast Didone typographic reference and the illustrated cargo truck asset:
- **Purity & White Space**: Pure white canvas with generous negative space, signaling calm confidence and order.
- **Editorial Typography**: High-contrast modern serif with distinctive vertical emphasis and hairline serifs, balanced by crisp neo-grotesque sans-serif for UI clarity.
- **Choreographed Motion Engineering**: Restrained, physics-aligned animations that reward interaction without feeling chaotic or gimmicky.

---

## 2. Color Palette & Design Tokens

### Core Colors
| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--color-bg` | `#FFFFFF` | Primary background canvas |
| `--color-text-primary` | `#000000` | Headlines, primary text, brand logo |
| `--color-text-secondary` | `#4B5563` | Body copy, subtitles, descriptive text |
| `--color-text-muted` | `#9CA3AF` | Eyebrow labels, metadata, placeholders |
| `--color-border-subtle` | `#E5E7EB` | Ultra-thin dividers, road line, input borders |
| `--color-border-focus` | `#000000` | Focused input border, active state indicators |
| `--color-surface` | `#FAFAFA` | Subtle card background for interactive elements |

### Truck Illustration Accents (Derived from Reference)
| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--color-truck-cab` | `#E03E2D` | Truck cab body (warm crimson/vermilion) |
| `--color-truck-window` | `#1E293B` | Cab window glass tint |
| `--color-truck-chassis` | `#263645` | Slate dark chassis bed and frame |
| `--color-truck-tank` | `#1A242E` | Undercarriage fuel tank |
| `--color-truck-headlight` | `#FBBF24` | Amber front headlight indicator |
| `--color-truck-tire` | `#333C48` | Rubber tires |
| `--color-truck-rim` | `#94A3B8` | Wheel rims and central hubcap |

---

## 3. Typography & Type Scale

### Font Families
- **Primary Display Serif**: `'Bodoni Moda', 'DM Serif Display', Didot, 'Playfair Display', Georgia, serif`
  - High stroke contrast, vertical axis, razor-sharp serifs.
- **Body & Interface Sans**: `'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Highly legible, neutral, contemporary geometric proportions.

### Typographic Hierarchy
| Style | Font Family | Size (Desktop) | Size (Mobile) | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Bodoni Moda | `5.5rem` (88px) | `2.5rem` (40px) | 400 | 1.08 | `-0.02em` |
| **Section Heading** | Bodoni Moda | `3.25rem` (52px) | `2rem` (32px) | 400 | 1.15 | `-0.01em` |
| **Section Eyebrow** | Plus Jakarta Sans | `0.75rem` (12px) | `0.7rem` (11px) | 600 | 1.4 | `0.15em` (Caps) |
| **Card Heading** | Plus Jakarta Sans | `1.25rem` (20px) | `1.125rem` (18px) | 600 | 1.3 | `-0.01em` |
| **Body Regular** | Plus Jakarta Sans | `1.0625rem` (17px) | `0.9375rem` (15px) | 400 | 1.65 | `0` |
| **Nav & Button** | Plus Jakarta Sans | `0.8125rem` (13px) | `0.8125rem` (13px) | 500 | 1.2 | `0.06em` |

---

## 4. Layout, Grid & Spacing System

- **Base Spacing Unit**: 8px grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Container Max-Width**: `1180px` with responsive horizontal padding (`24px` on mobile, `48px` on desktop).
- **Hero Viewport**: `100vh` sticky pin container for seamless animation scrubbing.
- **Section Vertical Rhythm**: `clamp(80px, 12vh, 140px)` between major content blocks.

---

## 5. Motion & Animation Principles

### A. Welcome Typing Sequence
- **Duration**: ~3.2 seconds total (~75ms per character).
- **Execution**: Deliberate, rhythmic reveal of `"welcome to hyderabad goa transport"`.
- **Cursor**: 2px width black line, animated with CSS step blink (`opacity: 1` to `0`), cleanly dismissed 400ms after text finishes typing.
- **Reduced Motion**: Instantly displays complete text with no typing delay.

### B. Road & Truck Animation
- **Road Line**: 1.5px solid `#E5E7EB` pinned at `calc(100vh - 80px)` (desktop) or `calc(100vh - 60px)` (mobile).
- **Truck Size**: 160px width × 54px height (desktop), scaled proportionally on mobile (120px × 40px).
- **Starting Position**: Right edge of road line (`right: 5vw`).
- **Destination**: Left edge of road line (`left: 5vw` or just passing edge).
- **Travel Vector**: Right to Left (0% to -100% relative travel).
- **Wheel Rotation Physics**:
  - Distance formula: $\text{Rotation (degrees)} = - \left( \frac{\Delta x}{\pi \times d_{\text{wheel}}} \times 360^\circ \right)$.
  - Negative rotation corresponds to rolling leftward forward.
  - Both front and rear wheels rotate about their respective geometric centers `(cx, cy)` in SVG coordinates.
- **Scroll Synchronization**:
  - Controlled by GSAP `ScrollTrigger` with `scrub: 1` for buttery momentum damping.
  - Pin hero section for `150vh` of scroll distance to allow ample, comfortable tactile scrolling.
  - Reverse scrolling accurately reverses wheel spin and truck displacement.

---

## 6. Components Specification

1. **Header Navigation (`Header.tsx`)**:
   - Left: Brand title `Hyderabad Goa Transport` in elegant Bodoni serif.
   - Right: Clean links (`Home`, `About`, `Services`, `Contact`), minimal pill CTA for contact.
   - Fixed position, zero visual weight, backdrop blur on scroll.
2. **Hero Stage (`HeroSection.tsx`)**:
   - Contains typing headline container, road line, SVG truck, and subtle scroll indicator.
   - Scroll indicator: Subtle down arrow with pulsating micro-animation that fades out as user begins scrolling.
3. **About Section (`AboutSection.tsx`)**:
   - Eyebrow: `WHO WE ARE`
   - Editorial headline: `Moving goods. Connecting places.`
   - Body copy highlighting reliability, careful handling, and predictable transit.
4. **Services Section (`ServicesSection.tsx`)**:
   - Three minimal cards:
     1. `Goods Transportation`
     2. `Long-Distance Cargo`
     3. `Business Logistics`
   - Subtle top hairline borders, generous spacing, clean typography.
5. **Contact Section (`ContactSection.tsx`)**:
   - Direct inquiry telephone, email, route coverage (Hyderabad ⇄ Goa corridor).
   - Minimalist form with floating or clean underline fields.
6. **Footer (`Footer.tsx`)**:
   - Understated copyright, route indicator, and quick links.

---

## 7. Accessibility & Usability Standards
- **WCAG 2.1 AA Compliance**: All text achieves a minimum contrast ratio of `4.5:1` (pure black `#000000` on white `#FFFFFF` achieves `21:1`).
- **Keyboard Navigation**: Focus rings with clear offset indicators for interactive inputs and buttons.
- **Prefers-Reduced-Motion**: Media query bypasses scroll pinning and typing delay, rendering the truck statically in a balanced position and displaying full text immediately.
