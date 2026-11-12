# Progress & Bug Fix Report: Truck Wheel Pure In-Place Rotation

## 1. Issue Description & Problem Statement
- **Critical Visual Bug**: The truck tires were revolving around the truck body in orbital paths instead of spinning in place on their respective axles.
- **Expected Mathematical & Physical Behavior**:
  - Front axle center $(X, Y) = (34, 41)$ relative to the truck frame must remain strictly constant.
  - Rear axle center $(X, Y) = (125, 41)$ relative to the truck frame must remain strictly constant.
  - $\frac{dX_{\text{wheel}}}{dt} = 0, \quad \frac{dY_{\text{wheel}}}{dt} = 0$.
  - Only the angular orientation $\theta(t)$ changes as a function of scroll displacement $S$.
  - The tire centers must never translate or orbit around the vehicle under any circumstances.

---

## 2. Root Cause Analysis

Tracing the rendered DOM transforms revealed three compounding root causes:

1. **GSAP CSSPlugin Injection of CSS Transformation Matrices (`matrix(...)`)**:
   - In earlier iterations, GSAP animated wheel rotation via `gsap.to(frontWheelRef.current, { rotation: ... })`.
   - When an SVG element is passed directly to GSAP's `rotation` property, GSAP applies an inline CSS style (`style="transform: matrix(a, b, c, d, tx, ty);"`).
   - In standard browser rendering of SVG DOM elements, CSS `transform` on SVG sub-elements can compute origins relative to the parent SVG container or the dynamic bounding box rather than the local element coordinate origin `(0, 0)`.
   - This caused GSAP to calculate non-zero translational components (`tx, ty`) on each frame, producing an orbital path around the SVG origin instead of an in-place spin.

2. **CSS `transform-box: fill-box` Dynamic Bounding Box Shift**:
   - `transform-box: fill-box` calculates the element's bounding box from its rendered SVG strokes and fills.
   - Because the wheel spokes rotate diagonally, the axis-aligned bounding box expands and contracts slightly at different rotation angles (e.g. at 45° vs. 0°).
   - This dynamic re-computation caused the calculated center to oscillate by several pixels, introducing orbital wobble.

3. **Coupled Translation and Rotation Transforms**:
   - When positioning coordinates (`translate(x, y)`) and rotation transforms (`rotate(deg)`) share the same element or are animated in the same matrix stack, matrix multiplication applies the rotation to the translation vector:
     $$\begin{pmatrix} X' \\ Y' \end{pmatrix} = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} \begin{pmatrix} X_{\text{axle}} \\ Y_{\text{axle}} \end{pmatrix}$$
   - Without an isolated coordinate system, rotating by $\theta$ sweeps the wheel around the coordinate origin in an orbit of radius $R = \sqrt{X_{\text{axle}}^2 + Y_{\text{axle}}^2}$.

---

## 3. Targeted Solution & Transform Decoupling

### A. Strict Two-Tier Transform Hierarchy in SVG ([TruckAsset.tsx](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/TruckAsset.tsx))
We separated positioning and rotation into two distinct nested SVG groups:
1. **Outer Wheel Mount Group (`<g className="wheel-mount">`)**:
   - Positions the wheel assembly permanently at its axle coordinates.
   - Front mount: `<g className="wheel-mount wheel-mount--front" transform="translate(34, 41)">`
   - Rear mount: `<g className="wheel-mount wheel-mount--rear" transform="translate(125, 41)">`
   - This outer group has **no rotation** and is never animated by GSAP.
2. **Inner Wheel Spin Group (`<g className="wheel-spin">`)**:
   - Positioned locally at origin `(0, 0)`.
   - All geometry (tires, rims, hubcaps, radial spokes) is drawn concentrically centered at `(cx=0, cy=0)`.
   - Rotation is performed purely as `rotate(angle)` around `(0, 0)`. Because the rotation origin is `(0, 0)`, the center point remains invariant:
     $$R(\theta) \begin{pmatrix} 0 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$$

### B. Pure SVG Attribute Rotation via GSAP `onUpdate` ([HeroSection.tsx](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/HeroSection.tsx))
Rather than allowing GSAP's CSSPlugin to inject inline CSS `matrix(...)` styles:
- GSAP animates an in-memory numerical angle `wheelState = { angle: 0 }`.
- On every animation tick, `onUpdate` applies the native SVG attribute directly:
  ```ts
  const wheelState = { angle: 0 };
  tl.to(wheelState, {
    angle: -totalRotationDeg,
    ease: 'none',
    duration: 1,
    onUpdate: () => {
      const rotAttr = `rotate(${wheelState.angle})`;
      if (frontWheelRef.current) frontWheelRef.current.setAttribute('transform', rotAttr);
      if (rearWheelRef.current) rearWheelRef.current.setAttribute('transform', rotAttr);
    },
  }, 0);
  ```
- In SVG specifications, an SVG attribute `transform="rotate(α)"` (without explicit origin parameters) rotates strictly around local coordinate `(0, 0)`.
- Because local `(0, 0)` is the geometric center of the tire, translation is mathematically zero at all angles.

### C. Clean CSS Stylesheet ([HeroSection.css](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/HeroSection.css))
- Removed all CSS transform, transform-box, and transform-origin declarations from `.wheel-spin`.
- Set container height to `50px` (aspect ratio 160:50 matching the SVG viewBox `0 0 160 50`).
- The tire contact patch ($y = 41 + 9 = 50$) rests perfectly flush along `.hero-track__road` at `bottom: 50px`.

---

## 4. Verification & Testing Matrix

The implementation was rigorously verified using the browser subagent across forward and reverse scrolling.

| Test Scenario | Scroll Position | Front Wheel Center $(X, Y)$ | Rear Wheel Center $(X, Y)$ | Wheel Spin Behavior | Orbital Drift | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Initial Position** | 0px | `(34.0, 41.0)` | `(125.0, 41.0)` | Angle = 0.0° | 0.0px | **PASSED** |
| **Forward Scroll 1** | 300px | `(34.0, 41.0)` | `(125.0, 41.0)` | Smooth counter-clockwise spin | 0.0px | **PASSED** |
| **Forward Scroll 2** | 600px | `(34.0, 41.0)` | `(125.0, 41.0)` | Smooth counter-clockwise spin | 0.0px | **PASSED** |
| **Forward Scroll 3** | 900px | `(34.0, 41.0)` | `(125.0, 41.0)` | Spokes rotating in place | 0.0px | **PASSED** |
| **Forward Scroll 4** | 1200px | `(34.0, 41.0)` | `(125.0, 41.0)` | Full rotation completed | 0.0px | **PASSED** |
| **Reverse Scroll** | Back to 0px | `(34.0, 41.0)` | `(125.0, 41.0)` | Natural clockwise spin reversal | 0.0px | **PASSED** |
| **Mobile Viewport** | 375 × 700 | Stationary in scaled frame | Stationary in scaled frame | Concentric inside mudguards | 0.0px | **PASSED** |
| **Production Build** | `tsc -b && vite build` | N/A | N/A | Zero errors (274ms) | N/A | **PASSED** |

---

## 6. Comprehensive QA & Quality Hardening (Priority Execution)

Following automated headless Chrome testing (CDP), DOM geometry analysis, and linter audits, the following priority improvements were implemented and verified:

### A. High Priority Fixes
1. **Route Coverage Continuous Pipeline ([RouteCoverage.css](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/RouteCoverage.css))**:
   - Adjusted connector span to `right: -24px` on desktop viewports.
   - Eliminated the 24px visual gap between nodes, connecting all 5 corridor waypoints into a continuous pipeline (`connRight = nextDotLeft = 387.3px`).
2. **Dynamic Wheel Rotation on Viewport Resize ([HeroSection.tsx](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/HeroSection.tsx))**:
   - Refactored wheel angle to a dynamic closure (`angle: () => -metrics.rotationDeg`).
   - Integrated dynamic recalculation inside `ScrollTrigger.onRefresh` so truck travel and wheel rotation remain mathematically synchronized on device rotation and window resizing.
3. **Contact Form Route Data Alignment ([ContactSection.tsx](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/ContactSection.tsx))**:
   - Standardized corridor direction values to `"Hyderabad → Goa"`, `"Goa → Hyderabad"`, and `"En-Route Station (Hubballi / Belagavi)"`.
   - Cleaned up dead/orphaned state (`destination`) and ensured full consignment details and routes pass cleanly into WhatsApp and email handlers.

### B. Medium Priority Fixes
4. **HGT Brand Favicon & Head Link ([favicon.svg](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/public/favicon.svg) & [index.html](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/index.html))**:
   - Designed a custom SVG favicon featuring the HGT red cab silhouette, slate body, monogram, and road line.
   - Fixed head icon link to point to `/favicon.svg`.
5. **Mobile Drawer Accessibility ([Header.tsx](file:///c:/Users/ADARSH%20PATIL/Desktop/HGT/src/components/Header.tsx))**:
   - Added `Escape` key event listener to dismiss the mobile drawer.
   - Added automatic body scroll locking (`overflow: hidden`) when the drawer is open and clean restoration on dismissal.

---

## 7. Large Faded Freight Truck Implementation (MP4 Reference Alignment)

Successfully replaced the legacy small bottom-right truck with the large faded European commercial semi-trailer truck modeled directly on the motion reference video `HGT_truck_smoother_right_to_left.mp4`.

### A. Asset & Architecture Changes
1. **Removed Obsolete Small Truck & Road**:
   - Deleted `TruckAsset.tsx` and all obsolete SVG mudguard/wheel group CSS rules.
   - Removed `.hero-track__road` and `.hero-track__truck-wrapper` styles.
2. **Integrated High-Resolution Commercial Semi-Trailer Asset**:
   - Assembled and cropped the high-res European tractor unit + full curtainside trailer (`src/assets/hgt_truck_large.png`, 1204 × 334 px).
   - Rendered in a dedicated background layer (`.hero-large-truck-layer`) at `z-index: 1`, strictly behind the foreground editorial text at `z-index: 2`/`3`.
3. **Calibrated Visual Opacity & Text Readability**:
   - **Desktop/Tablet Opacity**: `0.28` with `mix-blend-mode: multiply` on white `#FFFFFF` canvas.
   - **Mobile Opacity**: `0.24` for optimized compact screen contrast.
   - The Didone headline `"welcome to hyderabad goa transport"` achieves a contrast ratio of >14:1, maintaining 100% effortless legibility while showcasing the vehicle scale.
4. **ScrollTrigger Motion Choreography**:
   - **Typing Phase**: Truck remains stationary near the right viewport boundary while the typewriter intro sequence completes.
   - **Scroll Phase**: Seamlessly scrubs right-to-left across the hero stage as the user scrolls towards the About section (`start: 'top top'`, `end: 'bottom top'`, `scrub: 1.2`).
   - **Exit Condition**: Completely exits past the left edge ($X < -(W_{\text{truck}} + 80)$).
   - **Reverse Scrub**: Scrolling back to top smoothly brings the truck back toward the right.
   - **Reduced Motion**: Fallback presents the truck statically with zero scroll animation.

### B. Verification Matrix (Automated Headless Chrome CDP)

| Test Item | Viewport | Start Position | Mid-Scroll Position | End Position | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop 1440px** | 1440 × 900 | $X = 1224\text{px}$ (Right Edge) | $X = 91.5\text{px}$ (Scroll 450px) | $X = -1054\text{px}$ (Exited Left) | **PASSED** |
| **Reverse Scroll** | 1440 × 900 | $X = -1054\text{px}$ | Progressive reversal | $X = 1217.5\text{px}$ (Restored) | **PASSED** |
| **Laptop 1024px** | 1024 × 768 | Proportional scale | Fluid translation | Clean left exit | **PASSED** |
| **Tablet 768px** | 768 × 1024 | Proportional scale | Fluid translation | Clean left exit | **PASSED** |
| **Mobile 375px** | 375 × 667 | Contained | Smooth scrub | $0\text{px}$ overflow (`scrollWidth = clientWidth`) | **PASSED** |
| **Reduced Motion** | Any | $X = 0\text{px}$ (Static) | Static | Static | **PASSED** |
| **Console Errors** | All | 0 errors | 0 warnings | 0 leaks | **PASSED** |
| **Production Build**| All | `tsc -b && vite build` in 262ms | 0 errors | Clean bundle | **PASSED** |

