---
version: alpha
name: Husni
description: Dark minimal portfolio for an RPA engineer exploring agentic AI. Scroll-driven motion, warm amber accents, editorial typography. Inspired by Claude/Anthropic design language.
colors:
  background: "#0c0c0c"
  surface: "#131313"
  card: "#171717"
  border: "#1f1f1f"
  border-lit: "#2a2520"
  text: "#e8e4dc"
  text-dim: "#6d6862"
  text-mid: "#a09a92"
  accent: "#e0a04a"
  accent-soft: "#c4883e"
  glow: "rgba(224, 160, 74, 0.15)"
  glow-strong: "rgba(224, 160, 74, 0.35)"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 4.5rem
    fontWeight: "400"
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: Instrument Serif
    fontSize: 2.8rem
    fontWeight: "400"
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  company:
    fontFamily: Instrument Serif
    fontSize: 1.5rem
    fontWeight: "400"
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: Inter
    fontSize: 0.9rem
    fontWeight: "300"
    lineHeight: 1.75
  label:
    fontFamily: Inter
    fontSize: 0.72rem
    fontWeight: "400"
    lineHeight: 1.0
    letterSpacing: "0.15em"
  label-mid:
    fontFamily: Inter
    fontSize: 0.8rem
    fontWeight: "400"
    lineHeight: 1.4
    letterSpacing: "0.02em"
  stat:
    fontFamily: Inter
    fontSize: 2.4rem
    fontWeight: "600"
    lineHeight: 1.0
    letterSpacing: "-0.02em"
  tech-tag:
    fontFamily: Inter
    fontSize: 0.7rem
    fontWeight: "400"
    lineHeight: 1.0
    letterSpacing: "0.06em"
rounded:
  sm: 6px
  DEFAULT: 10px
  lg: 12px
  full: 9999px
spacing:
  unit: 8px
  section-pad: 80px
  content-max: 900px
  card-pad: 28px
  entry-gap: 72px
components:
  nav:
    backgroundColor: "rgba(12, 12, 12, 0.6)"
    textColor: "{colors.text-dim}"
    backdropFilter: blur(12px)
  nav-link-active:
    textColor: "{colors.accent}"
  hero-name-char:
    textColor: "{colors.text}"
    transform: translateY(100%)
    opacity: 0
  hero-name-char-in:
    transform: translateY(0)
    opacity: 1
    transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
  hero-accent-line:
    backgroundColor: "linear-gradient(90deg, {colors.accent}, transparent)"
    width: 80px
    height: 2px
  timeline-track:
    backgroundColor: "{colors.border}"
    width: 2px
  timeline-fill:
    backgroundColor: "linear-gradient(180deg, {colors.accent}, {colors.accent-soft})"
    boxShadow: "0 0 8px {colors.glow}"
  timeline-node:
    borderColor: "{colors.border}"
    backgroundColor: "{colors.background}"
    size: 12px
  timeline-node-lit:
    borderColor: "{colors.accent}"
    backgroundColor: "{colors.accent}"
    boxShadow: "0 0 0 4px {colors.glow}, 0 0 16px {colors.glow-strong}"
  project-card:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.border}"
    textColor: "{colors.text}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.card-pad}"
  project-card-hover:
    borderColor: "{colors.border-lit}"
    transform: translateY(-3px)
  skill-cell:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.border}"
  footer-link:
    textColor: "{colors.text-dim}"
  footer-link-hover:
    textColor: "{colors.accent}"
---

## Overview

Editorial dark portfolio for Husni Sarafi — an RPA Consultant at EY transitioning into agentic AI. The design language borrows from Claude/Anthropic's website: restrained elegance, warm amber as the sole accent color, generous whitespace, and scroll-driven motion that makes the page feel alive without being flashy.

The emotional response should be: this person is precise, intentional, and quietly confident. Not loud, not trendy — someone who thinks in systems.

## Colors

- **Background (#0c0c0c):** Near-black with a very slight warm undertone. Not pure #000 — softer on the eyes.
- **Accent (#e0a04a):** Warm amber/gold. The only color that moves. Used sparingly — timeline glow, labels, links, highlights. Its scarcity is what makes it powerful.
- **Text (#e8e4dc):** Warm off-white. Not pure white — reduces glare on dark backgrounds.
- **Borders (#1f1f1f):** Just barely visible. They define structure without drawing attention.

## Typography

Dual-font strategy: **Instrument Serif** for headings and identity, **Inter** for everything else.

- **Display name:** The hero heading uses Instrument Serif at 4.5rem. Each character is individually animated on page load — sliding up from below with staggered spring easing. This is the single moment of expressiveness.
- **Headings:** Section titles use Instrument Serif with wide letter-spacing on the label above (0.15em uppercase). The serif font gives an editorial, almost typewriter-meets-literary feel.
- **Body:** Inter at 300 weight. Light but legible. Let the text breathe with 1.75 line-height.
- **Labels/tags:** Small, uppercase, widely-spaced Inter. These are the "metadata voice" — year markers, tech tags, section labels.

## Motion

Motion is scroll-linked, not event-triggered. The entire page responds to scroll position.

- **Hero name:** Staggered character reveal on load (not scroll). ~50ms between characters, spring easing. An amber accent line draws underneath after all characters land.
- **Section fade-in:** Every content section starts invisible, translated 40px down. As the user scrolls, elements opacity+translate into position proportionally — not binary on/off. Uses `requestAnimationFrame` with cubic ease-out.
- **Timeline:** The centerpiece animation. A vertical track with a gold fill line that grows proportionally to scroll progress. Node dots glow when they enter the viewport — border fills with amber, background lights up, outer glow ring appears. Year labels shift to accent color.
- **Project cards:** Subtle lift on hover (-3px) with border brightening. A radial amber gradient appears at top-left corner on hover.
- **Nav:** Backdrop blur, becomes visible on scroll. Active section tracking highlights current nav link.

All motion uses `prefers-reduced-motion` media query to disable animations for accessibility.

## Layout

Single-column, max-width 900px, centered. Content-heavy, not decoration-heavy.

- **Hero:** Full viewport height. Name, role label, subtitle, 3 stats. The name animation is the hero moment.
- **Experience:** Vertical timeline with scroll-driven fill. 3 entries (IBM → E-Outsource → EY). Each entry has year, company (serif), kind (dim label), body text.
- **Projects:** 2-column grid of cards. 5 projects. Each card has name (serif), tech tags (uppercase amber), description.
- **Skills:** Seamless grid with 1px borders between cells. 5 skills in a 2-column layout (last cell spans or sits alone).
- **Education:** Single card.
- **Footer:** Minimal — links + one-liner.

## Components

- **Timeline:** Track is a 2px line with a gradient fill. Nodes are 12px circles centered on the track. When lit, they get a 4px glow ring + 16px ambient shadow. The fill height is driven by scroll progress (0-100% of the timeline container).
- **Project card:** No shadow by default. Border brightens + translateY on hover. Top-left radial gradient glow on hover (position: absolute, inset: 0, gradient ellipse at top-left).
- **Skill grid:** Background color on the grid container creates the 1px gap borders between cells. Cells have card background. Hover darkens slightly.
- **Nav:** Fixed top, backdrop-filter blur, transparent border that becomes visible on scroll. Logo is serif initials ("HS").

## Do's and Don'ts

- **Do** keep amber scarce — only timeline, labels, links, highlights. Overuse kills its effect.
- **Do** use scroll-linked motion everywhere — the page should feel like it's breathing as you move through it.
- **Do** use Instrument Serif sparingly — only for headings, company names, and the hero name. Inter handles everything else.
- **Don't** add more accent colors. Amber is the only one.
- **Don't** use shadows except for the timeline glow effect. Borders define structure.
- **Don't** use JavaScript frameworks. Pure CSS + vanilla JS. The file should be self-contained.
- **Don't** make animations binary (on/off). They should be proportional to scroll position.
- **Don't** forget prefers-reduced-motion. This is non-negotiable.
