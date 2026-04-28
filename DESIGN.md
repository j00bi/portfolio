---
version: alpha
name: Husni — 3D Portfolio
description: Interactive 3D portfolio built with Blender + Three.js. Scroll drives camera through a 3D scene. Dark, editorial, warm amber accent. Objects and environments created in Blender, rendered in browser.
colors:
  background: "#0c0c0c"
  surface: "#111111"
  border: "#1c1c1c"
  border-lit: "#2a2520"
  text: "#e8e4dc"
  text-dim: "#6d6862"
  text-mid: "#a09a92"
  accent: "#e0a04a"
  accent-soft: "#c4883e"
  glow: "rgba(224, 160, 74, 0.12)"
  glow-strong: "rgba(224, 160, 74, 0.3)"
  paper: "#f5f0e6"
  paper-text: "#2c2418"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 5rem
    fontWeight: "400"
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: Instrument Serif
    fontSize: 2.4rem
    fontWeight: "400"
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  company:
    fontFamily: Instrument Serif
    fontSize: 1.8rem
    fontWeight: "400"
    lineHeight: 1.2
  body:
    fontFamily: Inter
    fontSize: 0.9rem
    fontWeight: "300"
    lineHeight: 1.75
  label:
    fontFamily: Inter
    fontSize: 0.7rem
    fontWeight: "400"
    letterSpacing: "0.15em"
    textTransform: uppercase
  stat:
    fontFamily: Inter
    fontSize: 2.2rem
    fontWeight: "600"
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  tech:
    fontFamily: Inter
    fontSize: "0.65rem"
    fontWeight: "400"
    letterSpacing: "0.08em"
    textTransform: uppercase
rounded:
  sm: 6px
  DEFAULT: 10px
  lg: 12px
  full: 9999px
spacing:
  unit: 8px
  content-max: 860px
---

## Core Concept

A 3D interactive portfolio. The user scrolls through a Three.js scene — not a flat page. The camera moves through a dark 3D environment, passing by floating objects, text panels, and lit elements that represent career milestones, projects, and skills.

Think: walking through a dimly lit gallery. Each room has something different. The scroll wheel is your feet.

Inspiration: Mr. Panda's Psychologically Safe Portfolio (Blender + Three.js + Krita), Anthropic's scroll-driven site, dark editorial aesthetics.

## Scene Layout (scroll-driven camera path)

The camera follows a predefined path through a 3D space. Scroll position maps to camera position along this path. The scene is pre-lit with warm amber point lights and cool ambient fill.

### Zone 1: Arrival (0-15% scroll)
- Camera starts close to a large floating object — maybe a desk, a terminal, or an abstract geometric shape
- "Husni Sarafi" text materializes as a 3D text or as an HTML overlay that fades in
- Ambient particles drift slowly
- Single amber point light illuminates the center

### Zone 2: Context (15-25% scroll)
- Camera pulls back. The object from Zone 1 shrinks into the distance
- Stats and role text appear as floating panels or HTML overlays
- Environment reveals itself — dark space with subtle fog

### Zone 3: Journey (25-65% scroll) — THE TIMELINE
- Camera moves along a path that passes by 3 stations (career entries)
- Each station is a lit area with text/info
- A glowing amber line on the floor connects the stations — the timeline
- As camera approaches each station, it lights up. As it passes, it dims
- 3D objects at each station represent the company/role (abstract is fine)

### Zone 4: Work (65-82% scroll) — PROJECTS
- Camera enters a different space — maybe an open area with floating project cards/objects
- Each project is represented by a 3D element or a floating HTML panel
- Objects gently rotate/bob in place
- Camera weaves between them

### Zone 5: Foundation (82-92% scroll) — SKILLS
- A grid or constellation of small lit nodes/objects
- Each represents a skill
- Camera moves through or above them
- They pulse gently

### Zone 6: Close (92-100% scroll)
- Camera arrives at a final spot
- Contact info appears
- Closing message
- Scene gently fades or the camera settles

## Technical Implementation

### Three.js Setup
- Load Three.js from CDN (unpkg or cdnjs)
- Use `importmap` for clean ES module imports
- Scene: dark fog (exponential, near 10, far 80), ambient light (dim cool), point lights (warm amber)
- Camera: PerspectiveCamera, position driven by scroll along a CatmullRomCurve3 path
- Renderer: WebGLRenderer with antialias, toneMapping, shadows
- Post-processing: optional bloom pass for the glow effect

### Camera Path
- Define a 3D curve (CatmullRomCurve3) with control points for each zone
- Scroll position (0-1) maps to `curve.getPoint(t)`
- Camera looks ahead on the curve using `curve.getPoint(t + 0.01)` as the lookAt target
- Smooth interpolation, no snapping

### HTML Overlay (CSS2DRenderer or manual projection)
- Text content (name, role, stats, timeline entries, projects, skills, contact) rendered as HTML divs overlaid on the 3D canvas
- Position each div using CSS2DRenderer or by projecting 3D world positions to screen coordinates
- Opacity and transform of each div driven by scroll progress (same principle as before)
- This keeps text crisp (no 3D text rendering needed) while the scene provides atmosphere

### Scroll Handler
- Single `requestAnimationFrame` loop
- Calculate scroll progress (0-1)
- Update camera position on curve
- Update HTML overlay opacity/transform for each zone
- Update any per-zone 3D animations (object rotation, light intensity, etc.)

### 3D Assets
- For now: use primitive Three.js geometries (boxes, spheres, cylinders, torus) with emissive materials
- Colors: dark surface (#111), amber emissive (#e0a04a) for lit elements, dim blue-grey for ambient
- Later: replace primitives with Blender-exported GLB models via Blender MCP

### Responsive
- Full-screen canvas, no scrolling body (prevent default scroll, use wheel event)
- HTML overlays use responsive font sizes (clamp)
- Mobile: simpler camera path, fewer particles, touch scroll support

### Performance
- Target 60fps on mid-range hardware
- Keep polygon count low (primitives for now)
- Use instanced meshes if many similar objects
- Particles: use Points with BufferGeometry (max ~500 particles)
- Fog hides draw distance issues

## Files
- `web/index.html` — single file, everything inline
- `assets/` — future GLB models from Blender (not needed for v1)

## Do's and Don'ts

- **Do** make scroll feel like walking through a space — smooth, continuous camera movement
- **Do** use HTML overlays for text — keep it crisp, don't render text in 3D
- **Do** keep the amber accent consistent — lit elements, glow, accent text
- **Do** use fog and lighting to create depth and atmosphere
- **Do** use primitives first — ship fast, replace with Blender models later
- **Do** include prefers-reduced-motion — skip camera animation, show all content at once
- **Don't** make the user wait — assets should be minimal for v1 (no external GLB yet)
- **Don't** overcomplicate the scene — dark space, fog, a few lit objects, camera path
- **Don't** use frameworks beyond Three.js
- **Don't** add more accent colors
- **Don't** make it feel like a tech demo — it's a portfolio, it needs content and personality
