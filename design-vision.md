# Portfolio Vision — "Tactile Minimalism"

## The Core Idea

The portfolio feels like a **curated gallery you walk through** — each section is a physical object with weight, surface, and warmth. Not flat, not flashy. Things react to you because they're *there*, not because they're trying to impress.

The thread through all your references:
- **Joel Tankard** — surface texture (bump mapping)
- **kaolti** — card interaction (deck navigation)
- **DaniyarUI** — reactive displacement (material depth)

Together they say: *this page has texture. touch it.*

---

## Section-by-Section Plan

### 1. Hero — "The Threshold"

A warm, minimal landing that sets the tactile tone immediately.

```
┌──────────────────────────────────┐
│  AI Automation Engineer         │ <- red eyebrow
│                                 │
│  Building AI systems that run   │
│  themselves — and keep running. │ <- massive heading
│                                 │
│  Self-hosted LLM pipelines in   │ <- rotating cursor text
│  production.                    │    (from existing ticker)
│                                 │
│  [Explore work] [Contact]       │ <- buttons
│                                 │
│  ┌─────────────────────────┐    │
│  │  3D hero visual         │    │ <- existing orbit/glass device
│  │  (orbital rings +       │    │    from current React portfolio
│  │   floating metric cards)│    │
│  └─────────────────────────┘    │
└──────────────────────────────────┘
```

**Key elements:**
- Glass-device visual from the current React portfolio (warm tones, orbit rings, floating metric cards with 99% uptime / 5 AI projects)
- Rotating cursor text (already working in React version)
- Subtle background grid (44px intervals, 3.5% opacity)

### 2. Ticker — "The Signal"

A scrolling ribbon that shows what's currently being shipped. Already exists in the React portfolio — just needs porting.

`Currently shipping ▸ autonomous agents running 24/7. ▸ bilingual AI meeting transcription. ▸ RAG pipelines with local inference.`

### 3. Work — "The Cards" ✅ (Mostly done)

Your card design won — the vertical stack with 3D floating icons. This is the centerpiece.

```
┌──────────────────────────────────────────────┐
│  ⚡ Agent Harness      [Hermes] [OpenClaw]  │
│  ├── Autonomous AI operations               │
│  │  Daily autonomous AI assistant running   │
│  │  24/7...                                 │
│  │  Python  LLM APIs  Cron  MCP  Freqtrade  │
└──────────────────────────────────────────────┘
```

**Already done:**
- ✅ Vertical stack layout
- ✅ 3D Blender-rendered icons with perspective hover
- ✅ Badges (Hermes + OpenClaw, Whisper STT, ChromaDB, Bulb)
- ✅ Interactive bulb toggle for Yeelight

**Still to layer in:** displacement hover effect from DaniyarUI's tweet on the icon area (or card background) — subtle ripple when hovering each card.

### 4. Skills — "The Console"

A switchable mode panel showing toolkits. Already exists in the React portfolio as tabbed skill groups.

**Layout idea:**
```
┌──────────────────────────────────────────────┐
│ Capability Console                           │
│                                              │
│  [AI & LLMs]  [Engineering]  [RPA & Data]   │ <- mode tabs
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Python│ │Docker│ │FastAPI│ │Ollama│  ...   │ <- tag cloud
│  └──────┘ └──────┘ └──────┘ └──────┘       │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  Whisper STT, Ollama (local LLMs),   │    │
│  │  RAG with ChromaDB, prompt           │    │ <- description
│  │  engineering, bilingual MY/EN NLP.   │    │
│  │  Running autonomous agents 24/7.     │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

### 5. Contact/Footer — "The Threshold Out"

Clean, warm exit point.

```
┌──────────────────────────────────────────────┐
│ Open to AI engineering roles                 │
│                                              │
│ Three years of automation. Now building      │
│ the AI layer on top.                         │
│                                              │
│ [GitHub] [X] [Email]                         │
└──────────────────────────────────────────────┘
```

---

## Visual System

### Palette (already locked)
| Token | Hex | Use |
|-------|-----|-----|
| --ink | #101114 | Body text |
| --paper | #f7f3e8 | Page background |
| --surface | #fffaf0 | Card backgrounds |
| --line | #d8d0bd | Borders |
| --muted | #6f6a5f | Secondary text |
| --red | #c74735 | Eyebrow labels |
| --violet | #3d4a7d | Card signal lines |
| --cyan | #16a1a8 | Whisper/Agent badges |
| --green | #627c45 | RAG badges |
| --amber | #e0a04a | Bulb/Yeelight |

### Typography
- **Headings:** Instrument Serif (warm, serif — already used in current portfolio)
- **Body:** Inter (clean, readable sans-serif)
- **Code/Tags:** JetBrains Mono (from kami system)

### Surface Language
- Cards: radial gradient `circle at top left, #ffffff, #fff6e8` (your design)
- Border radius: 20px on cards, 999px on badges, 10px on tags
- Shadows: warm-toned `rgba(31,28,20, ...)` not cool gray
- Background grid: 44px intervals, 3.5% ink opacity

### Interaction Layer
- Cards lift on hover (translateY -4px)
- Icons float in 3D space (rotateX/Y on hover)
- Bulb toggles on click (CSS transitions)
- Displacement ripple on card surfaces (canvas overlay — optional enhancement)
- Skill tags pop in on mode switch (staggered animation)

---

## Build Order

| # | Section | Status | Next Action |
|---|---------|--------|-------------|
| 1 | Hero visual | 🔴 Not started | Port from React portfolio (orbit device + metrics) |
| 2 | Ticker | 🔴 Not started | Port from React portfolio |
| 3 | Work cards ✅ | Mostly done | Add displacement hover effect |
| 4 | Skills console | 🔴 Not started | Port from React portfolio |
| 5 | Footer | 🔴 Not started | Port from React portfolio |
| — | Assemble into single page | 🔴 Not started | Combine all sections into one HTML |

---

## The Name

**"Tactile Minimalism"** — warm, physical, substantial. Not sterile. Not noisy. Every interaction rewards curiosity with a subtle physical response.
