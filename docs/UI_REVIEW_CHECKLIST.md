# UI Review Checklist: Hyderabad Goa Transport (HGT)

This checklist serves as the objective quality assurance criteria for validating the user interface, motion physics, and responsiveness of the Hyderabad Goa Transport landing page.

---

## 1. Visual & Aesthetic Fidelity
- [x] **Background Color**: Pure white (`#FFFFFF`) throughout the entire hero and page background.
- [x] **Typography**: High-contrast editorial serif (`Bodoni Moda` / Didone family) applied to the welcome hero and primary titles.
- [x] **Welcome Text Case**: Exactly lowercase: `welcome to hyderabad goa transport`.
- [x] **Whitespace & Minimalist Purity**: No heavy borders, no dark dashboard panels, no neon colors, no gradients, and no glassmorphism cards.
- [x] **Header Restraint**: Visual weight is minimal; brand name on left, discrete sans-serif links on right.

---

## 2. Typing Animation Sequence
- [x] **Deliberate Character-by-Character**: Letters reveal sequentially from left to right over ~3 to 3.5 seconds.
- [x] **No Sudden Flash**: The message does not flash or fade in as an entire block on page load.
- [x] **Typing Cursor**: A clean 2px black blinking cursor marks current character position and cleanly vanishes after completion.
- [x] **Layout Stability**: Container height is locked during typing so no layout shifts (CLS = 0) occur as text appears.
- [x] **Stationary Truck During Typing**: The truck remains motionless at the bottom-right while typing is in progress.

---

## 3. Truck Asset & Motion Physics
- [x] **Visual Match to Reference**:
  - Red cab (`#E03E2D`) with dark window tint and amber headlight.
  - Slate dark chassis and bed (`#263645`).
  - Distinct wheels with dark rubber tires and lighter rims with visible radial spokes.
  - Truck faces left (cab on left, bed on right).
- [x] **Road Alignment**: Thin horizontal road line spans viewport width; truck tires rest precisely on the road line without floating or clipping.
- [x] **Travel Direction**: Travels from bottom-right toward bottom-left.
- [x] **Wheel Rotation Synchronization**: Wheels rotate continuously and proportionally to displacement distance ($\Delta x$).
- [x] **Reverse Rolling**: Scrolling back up causes the truck to roll rightwards and the wheels to rotate in reverse naturally.
- [x] **Smooth Scrubbing**: No erratic stuttering, frame skips, or timeline duplication on trackpad or mouse wheel.
- [x] **Proportional Scale**: Truck dimensions stay in scale (desktop ~160px width, mobile ~120px width) without overpowering typography.

---

## 4. Content Flow & Section Transitions
- [x] **Unpin Transition**: Hero unpins cleanly when truck completes travel, smoothly transitioning into "About Us".
- [x] **About Us ("Who We Are")**: Editorial heading `Moving goods. Connecting places.` and concise company overview.
- [x] **Services Section**: 3 clean services (`Goods Transportation`, `Long-Distance Cargo`, `Business Logistics`) with restrained presentation.
- [x] **Contact Section**: Clearly organized direct contact channels (phone, email, route coverage) with minimal inquiry form.

---

## 5. Responsive Design & Multi-Device Usability
- [x] **Desktop (>= 1200px)**: Balanced two-line hero text, full header navigation, expansive horizontal truck journey.
- [x] **Tablet (768px - 1199px)**: Proportional typography scaling, adequate margins.
- [x] **Mobile (< 768px)**:
  - Clean responsive header with mobile drawer (no horizontal scrollbar or overflow).
  - Welcome text wraps gracefully without word clipping.
  - Truck journey remains contained within viewport boundaries.
  - Touch scrolling is natural and unhindered.

---

## 6. Accessibility & Code Health
- [x] **Semantic Elements**: Proper use of `<header>`, `<main>`, `<section>`, `<nav>`, and `<footer>`.
- [x] **Heading Structure**: Single `<h1>` for hero welcome, followed by structured `<h2>` and `<h3>`.
- [x] **Reduced Motion**: Respects `prefers-reduced-motion: reduce` by presenting final completed state without forced typing or locking pins.
- [x] **Console Hygiene**: 0 unhandled errors, 0 memory leaks, clean ScrollTrigger instance teardown on unmount.
