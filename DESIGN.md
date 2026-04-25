---
version: alpha
name: Husni — Desk Concept
description: Interactive first-person desk scene portfolio. No scrolling page — instead, a 2D illustrated desk with clickable objects that reveal information. Skeuomorphic, tactile, intimate. Inspired by point-and-click adventure games and madebywild's editorial craft.
colors:
  background: "#1a1612"
  desk-surface: "#2a2218"
  desk-highlight: "#3d3226"
  paper: "#f5f0e6"
  paper-shadow: "#d4c9b5"
  paper-text: "#2c2418"
  paper-text-dim: "#6b5e4f"
  envelope: "#e8ddd0"
  envelope-shadow: "#c4b5a0"
  envelope-seal: "#c45a3c"
  folder: "#3a6b5c"
  folder-dark: "#2d5448"
  folder-highlight: "#4a8b6c"
  folder-text: "#f0ebe3"
  accent: "#c45a3c"
  accent-soft: "#a04830"
  gold: "#d4a853"
  gold-glow: "rgba(212, 168, 83, 0.3)"
  ink: "#2c2418"
  ink-dim: "#6b5e4f"
  white: "#f5f0e6"
  shadow: "rgba(0, 0, 0, 0.4)"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 2.8rem
    fontWeight: "400"
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: Instrument Serif
    fontSize: 1.6rem
    fontWeight: "400"
    lineHeight: 1.2
  body:
    fontFamily: Inter
    fontSize: 0.85rem
    fontWeight: "300"
    lineHeight: 1.65
    color: "{colors.paper-text}"
  label:
    fontFamily: Inter
    fontSize: 0.65rem
    fontWeight: "400"
    letterSpacing: "0.12em"
    textTransform: uppercase
    color: "{colors.paper-text-dim}"
  handwritten:
    fontFamily: Caveat
    fontSize: 1.2rem
    fontWeight: "400"
    color: "{colors.ink-dim}"
rounded:
  sm: 2px
  DEFAULT: 4px
  md: 6px
  lg: 10px
---

## Concept

The portfolio is a single-screen desk scene. The user is sitting at a wooden desk, first-person POV. No scrolling — everything happens through interaction with objects on the desk.

The desk has:
- **A green file folder** (center-left) — clicking it opens to reveal a resume preview (name, role, summary, skills at a glance). It animates open like a real folder.
- **A sealed envelope** (upper-right corner) — clicking it breaks the seal, the envelope opens and a letter slides out showing employment history (the timeline). The letter unfolds.
- **A pen** (decorative, idle)
- **A coffee mug** (decorative, idle, subtle steam animation)
- **Business card** (lower-left) — shows name + email + links

The whole scene is rendered in CSS — no canvas, no images. The desk is a gradient, objects are CSS shapes with shadows. Everything is built from divs, borders, gradients, and box-shadows.

## Interaction Flow

1. **Page load:** Desk fades in. Objects have subtle idle animations (mug steam, pen shadow shift). A small "click to explore" hint pulses near the folder.
2. **Click folder:** Folder slides up and opens (CSS transform + clip-path). Inside: paper with resume summary — name (serif), role, 3-line bio, skill tags. Click X or click outside to close.
3. **Click envelope:** Seal breaks (scale + rotate animation), envelope flap opens (rotateX), letter slides up and unfolds (height transition). Inside: employment timeline — 3 entries with year, company, role, description. Click X or click outside to close.
4. **Hover states:** Objects lift slightly on hover (translateY -2px, shadow deepens). Cursor changes to pointer.

## Motion

- All transitions use CSS transitions with cubic-bezier(0.16, 1, 0.3, 1) spring easing.
- Folder open: 500ms — translate + rotate + scale.
- Envelope open: 600ms — seal break (200ms) → flap open (200ms) → letter slide (200ms).
- Close animations: 300ms ease-out, reverse of open.
- Idle animations: mug steam is a CSS keyframe (opacity + translateY loop, 3s infinite).
- prefers-reduced-motion: all animations disabled, objects still clickable.

## Layout

Single viewport, no scroll. The desk fills the entire screen.

- Desk surface: gradient from #2a2218 to #1a1612 (top to bottom), with a subtle wood grain texture via repeating-linear-gradient.
- Objects positioned absolutely within the desk container.
- Folder: center-left, ~200px wide.
- Envelope: upper-right, ~160px wide.
- Business card: lower-left, ~140px wide.
- Mug: upper-left, ~60px wide.
- Pen: center-right, ~120px long, rotated -15deg.

## Typography on Paper

When folder/envelope are open, the content inside uses:
- Paper background: #f5f0e6 (warm cream)
- Text: #2c2418 (dark ink)
- Headings: Instrument Serif
- Body: Inter 300
- Labels: Inter 400, uppercase, wide tracking
- A subtle paper texture via repeating-linear-gradient (very faint lines)

## Do's and Don'ts

- **Do** make it feel tactile — real shadows, real paper colors, real envelope mechanics.
- **Do** keep it to one screen — no scrolling. Everything fits in the viewport.
- **Do** use CSS only for all graphics — no images, no SVGs, no canvas.
- **Do** make objects feel clickable — hover states, cursor changes, subtle lift.
- **Do** include prefers-reduced-motion.
- **Don't** add more interactive objects beyond folder, envelope, business card, mug, pen.
- **Don't** use any framework. Single HTML file, all CSS + vanilla JS.
- **Don't** make it feel like a game — it's a portfolio. Tasteful, not gimmicky.
- **Don't** forget mobile — on small screens, objects rearrange to fit (stack vertically or reduce size).
