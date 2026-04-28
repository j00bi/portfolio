# Portfolio Design Inspiration Brief

> Compiled from X/Twitter posts for Codex ingestion. No API access needed to consume.

---

## 1. @Hoxygo — JavaScript Animation Library

**Source:** https://x.com/Hoxygo/status/2047789215191089278

**What it is:** A demo/recommendation of an open-source JavaScript animation library.

**Key points for portfolio:**
- Library controls CSS, SVG, and DOM animations
- Lightweight and fast, suitable for interactive websites
- Supports timeline-based animations and complex motion with simple code
- Video demo shows smooth professional-grade animations

**How to apply to Husni's portfolio:**
- Use this kind of library (e.g., GSAP, Anime.js, Motion One) for scroll-triggered animations
- Timeline-based sequences for project case study reveals
- SVG path animations for skill icons or decorative elements
- Keep animations lightweight — don't bloat the portfolio

---

## 2. @yui540 — CSS Animation Tips (with source code)

**Source:** https://x.com/yui540/status/2047952959716405480
**GitHub:** https://github.com/yui540/css-animations/tree/main/2026-04-25

**What it is:** Four standalone CSS animation examples, pure CSS (no JS), each in a single HTML file.

### Tip 1: 巻き物 (Scroll/Unroll Animation)
- A scroll/paper unrolling effect
- Uses `@keyframes draw-line` with `translateX` to animate a line drawing across
- Combined with a `scale` transform on the roll element
- Uses `animation-fill-mode: both` and `reverse forwards` for bidirectional play
- **Portfolio use:** Project card reveal, section transitions, "unrolling" content panels

### Tip 2: ガタンガタン (Domino/Bounce Fall)
- Domino-like blocks that bounce and fall with staggered timing
- Uses CSS custom properties `--delay` on each child for stagger
- Two-phase animation: `bounce` (ease-in-out) then `fall` (cubic-bezier overshoot)
- `transform-origin: bottom center` for realistic pivot
- **Portfolio use:** Staggered entrance animations for skill bars, project cards, or list items

### Tip 3: 交代 (Plus/Minus Swap)
- A plus sign morphs into a minus sign and back
- Uses two overlapping elements with `::before` and `::after` pseudo-elements
- `transform: rotate(90deg)` to create the plus, then reverses
- Color swap between foreground and background
- **Portfolio use:** Accordion toggles, expand/collapse project details, theme toggle

### Tip 4: 波紋 (Ripple Effect)
- Concentric circles expanding and fading out from center
- `@keyframes fade-in-out` with `scale(0)` → `scale(1)` and `opacity: 1` → `0`
- Uses `::before` and `::after` with animation-delay for layered ripple
- `border-radius: 50%` for perfect circles
- **Portfolio use:** Click effects, hover feedback on buttons, loading indicators

**General CSS animation techniques observed:**
- All use CSS custom properties (`--delay`) for stagger control
- `animation-fill-mode: both` and `forwards` for state management
- `cubic-bezier()` for custom easing curves
- `transform-origin` manipulation for realistic physics
- No JavaScript required — pure CSS is sufficient for microinteractions

---

## 3. @Jackywine — Design Reference Websites

**Source:** https://x.com/Jackywine/status/2046815560735076469

**What it is:** A curated list of websites to improve design taste/visual sense.

**Websites listed:**
1. **dark.design** — Dark mode design inspiration gallery
2. **footer.design** — Creative footer design examples
3. **landingly.co** — Landing page design inspiration
4. **godly.website** — Curated web design showcase
5. **awwwards.com** — Award-winning website gallery

**Key message:** "Improving your aesthetic sense is especially important in the AI era."

**How to apply to Husni's portfolio:**
- Browse these galleries before designing the portfolio layout
- Study dark mode examples (Husni's existing portfolio uses dark theme)
- Look at footer designs for creative bottom sections
- Study landing page patterns for the hero section
- Use awwwards for overall layout and interaction inspiration

---

## 4. @madebywild — AI-Assisted Site Build Case Study

**Source:** https://x.com/madebywild/status/2047325877688578335

**What it is:** Wild (a creative studio) built the "Wild Week Athens" event site in 1.5 weeks using mainly AI and no-code tools.

**Key points:**
- AI doesn't make designers obsolete — it shifts weight to taste, creative instinct, and understanding craft
- Fast prototyping with AI + no-code can produce professional results
- The final output is a polished event website

**How to apply to Husni's portfolio:**
- Use AI tools (like Codex, Hermes) to accelerate portfolio development
- Focus on taste and creative direction rather than raw implementation time
- The portfolio itself can showcase AI-assisted workflow as a differentiator
- Good case study for the "process" section of the portfolio

---

## Synthesis: Actionable Design Directions

Based on all four inspirations:

1. **Microinteractions layer** — Add CSS-only animations inspired by yui540:
   - Staggered card entrances (domino bounce pattern)
   - Ripple effects on hover/click
   - Smooth section reveals (scroll unroll pattern)
   - Accordion project details with +/− morph toggle

2. **Animation library** — Use GSAP or similar for:
   - Scroll-triggered project case study panels
   - Timeline-based hero section sequences
   - SVG icon animations

3. **Visual direction** — Browse Jackywine's recommended sites for:
   - Dark theme layout patterns
   - Creative footer designs
   - Landing page hero section inspiration

4. **Narrative angle** — The portfolio can tell the story of an AI-era engineer who uses AI tools effectively, inspired by madebywild's AI-assisted build approach.

5. **Tech stack recommendation:**
   - Pure CSS for microinteractions (following yui540's approach)
   - One animation library (GSAP/Motion One) for complex sequences
   - Dark theme base with subtle motion
   - Mobile-first, responsive
   - No heavy JS frameworks — keep it performant

---

## 5. @lucas_flatwhite — Blender + Three.js + Krita Portfolio

**Source:** https://x.com/lucas_flatwhite/status/2047315393434571005
**Repo:** https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio (362 stars)
**Live:** https://www.mr-pandas-psychologically-safe-portfolio.com/
**Tutorial:** https://www.youtube.com/watch?v=zyWD2E8AHCg
**Article:** https://tympanus.net/codrops/2025/12/30/the-increasing-importance-of-psychological-safety-and-self-awareness-for-creative-work/

**What it is:** A concept portfolio built entirely with Blender (3D art), Krita (texture painting), and Three.js (interactive web rendering). Won FWA of the Day and Awwwards SOTD.

**Key points:**
- Full 3D scene rendered in browser via Three.js
- Models created and textured in Blender, hand-painted with Krita
- Interactive paper/craft aesthetic — notebook material, origami-style animations
- Narrative-driven: Mr. Panda character guides visitors through content
- Rich microinteractions: burning paper effects, hover states, easter eggs
- Single-page experience, no traditional sections

**How to apply to Husni's portfolio:**
- Blender MCP + Codex can generate 3D scenes/objects programmatically
- Export Blender scenes as glTF/GLB, load in Three.js for web
- Krita for hand-painted textures on 3D models
- Interactive 3D portfolio where visitors navigate through a 3D space
- Character or mascot element could add personality
- Paper/craft aesthetic is distinctive and memorable
- Could blend with scroll narrative: 3D scene reacts to scroll position

**Tech stack for this direction:**
- Blender (3D modeling, scene composition)
- Krita (texture painting)
- Three.js (web rendering, camera, lighting)
- GSAP (scroll-linked animations, timeline control)
- Single HTML file with embedded GLB or external asset loading
