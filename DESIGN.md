---
version: alpha
name: Husni — Scroll Narrative
description: Single scroll-driven narrative portfolio. The entire page is one choreographed animation — scroll is the timeline. Elements don't just appear, they transform and flow into each other. Dark, editorial, warm amber accent.
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
    fontSize: 0.65rem
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

The entire page is ONE scroll-driven animation. There are no "sections" in the traditional sense — there is a single continuous sequence that plays as the user scrolls from top to bottom. Scroll position IS the timeline. Every element's position, opacity, and transform is a function of scroll progress.

The emotional arc:
1. **Arrival** (0-12%) — Name appears. Confident, still, alone on screen.
2. **Context** (12-22%) — Name shrinks and moves up. Role and summary fade in below. Stats count up.
3. **Journey** (22-62%) — Timeline draws downward. Three career entries appear one at a time, each fading in as you scroll to it, each fading out as you scroll past. The golden line fills continuously.
4. **Work** (62-82%) — Projects appear in a staggered grid, cards sliding in from alternating sides.
5. **Foundation** (82-92%) — Skills grid fills in like a mosaic, cell by cell.
6. **Close** (92-100%) — Contact info and a single closing line.

## Animation Sequence (scroll-linked)

Every element has a `data-scroll` attribute with a start and end percentage (0-100 of total scroll). Between those points, the element transitions from its initial state to its final state. Outside that range, it's either hidden (before start) or at final state (after end).

### Phase 1: Arrival (0-12% scroll)

- **Name "Husni Sarafi"**: Each character starts at opacity:0, translateY:40px. As scroll progresses 0→8%, each char slides up and fades in with stagger (50ms offset per char, spring easing). By 8% scroll, all chars are visible.
- **Accent line**: At 8% scroll, a thin amber line (2px, 80px wide) draws itself from left to right under the name. Uses width transition from 0→80px. Completes by 10%.
- **Subtitle "RPA Consultant · Automation Engineer"**: Fades in from opacity:0 at 10%, completes by 12%.

### Phase 2: Context (12-22% scroll)

- **Name**: Smoothly scales down from 5rem to 3rem and translates upward to become a persistent header. This is the key transition — the hero becomes the page header.
- **Stats row** (3 stats: years, processes, systems): Each stat fades in from below with stagger. The numbers count up from 0 to their final value using a JS counter animated by scroll progress.
- **Summary paragraph**: Fades in below stats.

### Phase 3: Journey (22-62% scroll) — THE TIMELINE

This is the centerpiece. A vertical golden line draws downward as the user scrolls through this range. Three career entries appear one at a time.

- **Timeline track**: A 2px line at the left edge of the content area. Its height grows from 0% to 100% of the timeline container as scroll progresses from 22% to 62%. The line has a gradient: amber at the growing tip, fading to transparent at the top.
- **Node dots**: 12px circles on the track. Each appears when its entry is in view. Initially: border color = border (#1c1c1c), background = background (#0c0c0c). When lit: border = accent (#e0a04a), background = accent, with a 4px glow ring + 16px ambient shadow.
- **Entry 1 (IBM, 2023)**: Appears at ~28% scroll. Year label fades in first, then company name (Instrument Serif), then role label, then body text. Each element has a 30ms stagger. As you scroll past (~38%), it fades to 40% opacity and stays there.
- **Entry 2 (E-Outsource, 2024)**: Appears at ~38% scroll. Same stagger pattern. Fades to 40% at ~48%.
- **Entry 3 (EY, 2026)**: Appears at ~48% scroll. Same stagger pattern. Stays at full opacity (it's the current role).

The key: entries don't disappear — they dim. The timeline is a trail of where you've been, with the current position brightest.

### Phase 4: Work (62-82% scroll) — PROJECTS

- **Section label "Selected Work"**: Fades in from below at 62%.
- **Project cards**: 2-column grid. 5 cards total. Each card slides in from alternating sides (odd from left, even from right) with opacity fade. Stagger: 40ms between cards. Cards have:
  - Name in Instrument Serif
  - Tech tags in uppercase amber
  - Description in Inter 300
  - Hover: translateY(-3px), border brightens, subtle amber radial gradient at top-left
- Cards don't scroll — they're positioned in a grid that fades/slides in as a group.

### Phase 5: Foundation (82-92% scroll) — SKILLS

- **Section label "Core Stack"**: Fades in at 82%.
- **Skill grid**: Seamless grid with 1px gap borders. Cells fill in one by one with a mosaic effect — each cell fades in with a slight scale from 0.95→1. Stagger: 20ms between cells. 5 skills total.

### Phase 6: Close (92-100% scroll) — CONTACT

- **Education line**: Fades in. "BSc Actuarial Science — UiTM Shah Alam"
- **Contact links**: Email and GitHub fade in with stagger.
- **Closing line**: A single line in Instrument Serif: "Let's build something." Fades in last.

## Technical Implementation

- **Scroll handler**: Single `requestAnimationFrame` loop. On scroll, calculate total scroll progress (0-1). For each element with `data-scroll`, calculate its local progress and apply transform/opacity.
- **No IntersectionObserver for main animations** — everything is scroll-position-driven. Use IntersectionObserver ONLY for the nav active state.
- **CSS custom properties**: Each element's progress is set as `--progress` CSS variable. CSS `calc()` and `transition` handle the visual interpolation.
- **Stats counter**: JS counts from 0 to final value, progress tied to scroll position.
- **Nav**: Fixed top, backdrop blur, appears after 5% scroll. Active link tracking via IntersectionObserver on section markers.
- **prefers-reduced-motion**: All scroll animations disabled. Content visible immediately. Nav still works.

## Layout

- Single column, max-width 860px, centered.
- Generous vertical spacing between phases (80px+).
- The page is TALL — maybe 600vh total — to give enough scroll distance for the animation to breathe. Each phase gets enough scroll room for smooth transitions.

## Do's and Don'ts

- **Do** make scroll feel like a timeline — smooth, continuous, proportional.
- **Do** keep amber scarce — only timeline, labels, tags, highlights.
- **Do** use Instrument Serif for all headings, Inter for everything else.
- **Do** make the name→header transition seamless — it's the signature moment.
- **Do** dim (not hide) past timeline entries — the trail matters.
- **Don't** use binary on/off animations. Everything is proportional to scroll.
- **Don't** add more accent colors.
- **Don't** use frameworks. Single HTML file, pure CSS + vanilla JS.
- **Don't** make the page feel like separate sections stitched together. It's ONE flow.
- **Don't** forget prefers-reduced-motion.
