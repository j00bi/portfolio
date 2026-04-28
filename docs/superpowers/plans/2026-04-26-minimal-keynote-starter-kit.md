# Minimal Keynote Starter Kit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a second Remotion starter kit with unbranded iPhone-15-like product assets, hands, flashcards, and warp transitions, with every asset previewable as its own standalone composition in Remotion Studio.

**Architecture:** Keep the existing deep-glow kit intact and add a parallel minimal-kit system. Store SVG assets under `public/remotion-assets-minimal/`, implement each preview composition in a focused file under `src/remotion/minimal-kit/`, and centralize shared palette, sizing, and wrapper styles in one shared module so all compositions render consistently.

**Tech Stack:** Remotion v4, React 18, TypeScript, Vite, SVG asset files, `npx remotion still` smoke renders

---

## File Structure

### New files

- `public/remotion-assets-minimal/STAGE_001.svg`
- `public/remotion-assets-minimal/PHONE_001.svg`
- `public/remotion-assets-minimal/PHONE_002.svg`
- `public/remotion-assets-minimal/HANDS_001.svg`
- `public/remotion-assets-minimal/HANDS_002.svg`
- `public/remotion-assets-minimal/CARDS_001.svg`
- `public/remotion-assets-minimal/CARDS_002.svg`
- `public/remotion-assets-minimal/WARP_001.svg`
- `public/remotion-assets-minimal/WARP_002.svg`
- `src/remotion/minimal-kit/shared.tsx`
- `src/remotion/minimal-kit/MinimalStageComp.tsx`
- `src/remotion/minimal-kit/PhoneFrontComp.tsx`
- `src/remotion/minimal-kit/PhoneAngleComp.tsx`
- `src/remotion/minimal-kit/HandsFrameComp.tsx`
- `src/remotion/minimal-kit/HandsHoldComp.tsx`
- `src/remotion/minimal-kit/FlashcardsStackComp.tsx`
- `src/remotion/minimal-kit/FlashcardSingleComp.tsx`
- `src/remotion/minimal-kit/WarpHorizontalComp.tsx`
- `src/remotion/minimal-kit/WarpVerticalComp.tsx`
- `src/remotion/minimal-kit/MinimalStarterKitShowcase.tsx`

### Modified files

- `src/remotion/Root.tsx`

### Responsibility map

- `public/remotion-assets-minimal/*.svg`: reusable visual source assets
- `src/remotion/minimal-kit/shared.tsx`: palette, dimensions, shared wrapper, shared asset URLs
- `src/remotion/minimal-kit/*Comp.tsx`: one composition per asset
- `src/remotion/minimal-kit/MinimalStarterKitShowcase.tsx`: sequential showcase of the new kit
- `src/remotion/Root.tsx`: composition registration only

### Task 1: Shared Minimal-Kit Foundation

**Files:**
- Create: `src/remotion/minimal-kit/shared.tsx`
- Test: `src/remotion/Root.tsx`

- [ ] **Step 1: Write the failing smoke test**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStageComp tmp-minimal-stage.png --scale=0.25 --frame=0
```

Expected: FAIL with a composition lookup error because `MinimalStageComp` is not registered yet.

- [ ] **Step 2: Add the shared module**

Create `src/remotion/minimal-kit/shared.tsx`:

```tsx
import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill, staticFile} from "remotion";

export const minimalPalette = {
  bg: "#F6F4EF",
  bgWarm: "#F1EFEA",
  bgDeep: "#E8E4DD",
  graphite: "#1F1F22",
  graphiteSoft: "#2A2A2E",
  border: "rgba(31,31,34,0.12)",
  shadow: "rgba(15,15,18,0.16)",
  glass: "rgba(255,255,255,0.72)",
};

export const compositionSize = {
  width: 1920,
  height: 1080,
  fps: 30,
};

export const minimalAssets = {
  stage: staticFile("remotion-assets-minimal/STAGE_001.svg"),
  phoneFront: staticFile("remotion-assets-minimal/PHONE_001.svg"),
  phoneAngle: staticFile("remotion-assets-minimal/PHONE_002.svg"),
  handsFrame: staticFile("remotion-assets-minimal/HANDS_001.svg"),
  handsHold: staticFile("remotion-assets-minimal/HANDS_002.svg"),
  cardsStack: staticFile("remotion-assets-minimal/CARDS_001.svg"),
  cardSingle: staticFile("remotion-assets-minimal/CARDS_002.svg"),
  warpHorizontal: staticFile("remotion-assets-minimal/WARP_001.svg"),
  warpVertical: staticFile("remotion-assets-minimal/WARP_002.svg"),
};

export const previewPanel: CSSProperties = {
  position: "absolute",
  inset: 72,
  borderRadius: 32,
  overflow: "hidden",
  background: "linear-gradient(180deg, #F7F5F0 0%, #ECE7DE 100%)",
  boxShadow: "0 30px 80px rgba(15,15,18,0.12)",
};

export const productShadow = (opacity = 0.16): CSSProperties => ({
  filter: `drop-shadow(0 36px 48px rgba(15,15,18,${opacity}))`,
});

export const MinimalFrame = ({children}: {children: ReactNode}) => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at top, #FFFFFF 0%, #F6F4EF 48%, #ECE7DE 100%)",
      }}
    >
      <div style={previewPanel}>{children}</div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 3: Verify the file compiles structurally**

Run:

```bash
npx tsc --noEmit --ignoreDeprecations 6.0
```

Expected: PASS or only unrelated pre-existing type issues outside the new file. If there is a new error from `shared.tsx`, fix it before moving on.

- [ ] **Step 4: Commit**

```bash
git add src/remotion/minimal-kit/shared.tsx
git commit -m "feat: add minimal kit shared remotion primitives"
```

### Task 2: Stage Asset And Standalone Composition

**Files:**
- Create: `public/remotion-assets-minimal/STAGE_001.svg`
- Create: `src/remotion/minimal-kit/MinimalStageComp.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-minimal-stage.png`

- [ ] **Step 1: Write the failing smoke render**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStageComp tmp-minimal-stage.png --scale=0.25 --frame=15
```

Expected: FAIL because the composition is still missing.

- [ ] **Step 2: Create the stage asset**

Create `public/remotion-assets-minimal/STAGE_001.svg`:

```svg
<svg width="2048" height="1024" viewBox="0 0 2048 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="1024" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="0.62" stop-color="#F6F4EF"/>
      <stop offset="1" stop-color="#E9E4DB"/>
    </linearGradient>
    <radialGradient id="spot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1024 260) rotate(90) scale(260 680)">
      <stop offset="0" stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="24"/>
    </filter>
  </defs>
  <rect width="2048" height="1024" fill="url(#bg)"/>
  <rect width="2048" height="1024" fill="url(#spot)"/>
  <ellipse cx="1024" cy="740" rx="520" ry="84" fill="#D7D0C6" fill-opacity="0.5" filter="url(#blur)"/>
  <ellipse cx="1024" cy="808" rx="660" ry="56" fill="#CFC8BE" fill-opacity="0.35"/>
</svg>
```

- [ ] **Step 3: Create the stage composition and register it**

Create `src/remotion/minimal-kit/MinimalStageComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets} from "./shared";

export const MinimalStageComp = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <MinimalFrame>
      <Img
        src={minimalAssets.stage}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
        }}
      />
    </MinimalFrame>
  );
};
```

Modify `src/remotion/Root.tsx` imports and registration:

```tsx
import {Composition} from "remotion";
import {AssetShowcase} from "./AssetShowcase";
import {BlankHeading} from "./BlankHeading";
import {MinimalStageComp} from "./minimal-kit/MinimalStageComp";
import {compositionSize} from "./minimal-kit/shared";
```

Add the composition near the top of the returned fragment:

```tsx
<Composition
  id="MinimalStageComp"
  component={MinimalStageComp}
  durationInFrames={90}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the smoke render to verify it passes**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStageComp tmp-minimal-stage.png --scale=0.25 --frame=30
```

Expected: PASS and create `tmp-minimal-stage.png`.

- [ ] **Step 5: Commit**

```bash
git add public/remotion-assets-minimal/STAGE_001.svg src/remotion/minimal-kit/MinimalStageComp.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote stage asset"
```

### Task 3: Phone Assets And Standalone Compositions

**Files:**
- Create: `public/remotion-assets-minimal/PHONE_001.svg`
- Create: `public/remotion-assets-minimal/PHONE_002.svg`
- Create: `src/remotion/minimal-kit/PhoneFrontComp.tsx`
- Create: `src/remotion/minimal-kit/PhoneAngleComp.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-phone-front.png`, `tmp-phone-angle.png`

- [ ] **Step 1: Write the failing smoke renders**

Run:

```bash
npx remotion still src/remotion/index.ts PhoneFrontComp tmp-phone-front.png --scale=0.25 --frame=30
npx remotion still src/remotion/index.ts PhoneAngleComp tmp-phone-angle.png --scale=0.25 --frame=30
```

Expected: FAIL because neither composition is registered yet.

- [ ] **Step 2: Create the phone asset SVGs**

Create `public/remotion-assets-minimal/PHONE_001.svg`:

```svg
<svg width="720" height="1240" viewBox="0 0 720 1240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="body" x1="360" y1="0" x2="360" y2="1240" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#44454A"/>
      <stop offset="1" stop-color="#1D1E21"/>
    </linearGradient>
    <linearGradient id="screen" x1="360" y1="98" x2="360" y2="1142" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#121316"/>
      <stop offset="1" stop-color="#050607"/>
    </linearGradient>
  </defs>
  <rect x="88" y="24" width="544" height="1192" rx="120" fill="url(#body)"/>
  <rect x="104" y="40" width="512" height="1160" rx="108" fill="#696B72" fill-opacity="0.25"/>
  <rect x="126" y="92" width="468" height="1056" rx="92" fill="url(#screen)"/>
  <rect x="256" y="126" width="208" height="34" rx="17" fill="#111215"/>
  <path d="M170 170C250 110 470 94 566 146" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="20"/>
</svg>
```

Create `public/remotion-assets-minimal/PHONE_002.svg`:

```svg
<svg width="900" height="1200" viewBox="0 0 900 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(180 40) rotate(12 270 560)">
    <rect x="50" y="20" width="440" height="1080" rx="110" fill="#222328"/>
    <rect x="68" y="38" width="404" height="1044" rx="98" fill="#4A4C52" fill-opacity="0.24"/>
    <rect x="88" y="92" width="364" height="952" rx="84" fill="#090A0C"/>
    <rect x="204" y="124" width="132" height="28" rx="14" fill="#131417"/>
    <path d="M142 164C224 120 352 118 430 160" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="18"/>
  </g>
</svg>
```

- [ ] **Step 3: Create the phone compositions and register them**

Create `src/remotion/minimal-kit/PhoneFrontComp.tsx`:

```tsx
import {Img, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {MinimalFrame, minimalAssets, productShadow} from "./shared";

export const PhoneFrontComp = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rise = spring({fps, frame, config: {stiffness: 80, damping: 12}});

  return (
    <MinimalFrame>
      <Img
        src={minimalAssets.stage}
        style={{position: "absolute", inset: 0, objectFit: "cover"}}
      />
      <Img
        src={minimalAssets.phoneFront}
        style={{
          position: "absolute",
          width: 420,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, ${interpolate(rise, [0, 1], [110, 10])}px) scale(${interpolate(
            rise,
            [0, 1],
            [0.94, 1]
          )})`,
          ...productShadow(),
        }}
      />
    </MinimalFrame>
  );
};
```

Create `src/remotion/minimal-kit/PhoneAngleComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets, productShadow} from "./shared";

export const PhoneAngleComp = () => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 90], [-4, 6]);

  return (
    <MinimalFrame>
      <Img
        src={minimalAssets.stage}
        style={{position: "absolute", inset: 0, objectFit: "cover"}}
      />
      <Img
        src={minimalAssets.phoneAngle}
        style={{
          position: "absolute",
          width: 500,
          left: "50%",
          top: "47%",
          transform: `translate(-50%, 10px) rotate(${drift}deg)`,
          ...productShadow(0.14),
        }}
      />
    </MinimalFrame>
  );
};
```

Modify `src/remotion/Root.tsx`:

```tsx
import {PhoneAngleComp} from "./minimal-kit/PhoneAngleComp";
import {PhoneFrontComp} from "./minimal-kit/PhoneFrontComp";
```

Add:

```tsx
<Composition
  id="PhoneFrontComp"
  component={PhoneFrontComp}
  durationInFrames={90}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
<Composition
  id="PhoneAngleComp"
  component={PhoneAngleComp}
  durationInFrames={90}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the smoke renders to verify they pass**

Run:

```bash
npx remotion still src/remotion/index.ts PhoneFrontComp tmp-phone-front.png --scale=0.25 --frame=45
npx remotion still src/remotion/index.ts PhoneAngleComp tmp-phone-angle.png --scale=0.25 --frame=45
```

Expected: PASS for both renders.

- [ ] **Step 5: Commit**

```bash
git add public/remotion-assets-minimal/PHONE_001.svg public/remotion-assets-minimal/PHONE_002.svg src/remotion/minimal-kit/PhoneFrontComp.tsx src/remotion/minimal-kit/PhoneAngleComp.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote phone assets"
```

### Task 4: Hands Assets And Standalone Compositions

**Files:**
- Create: `public/remotion-assets-minimal/HANDS_001.svg`
- Create: `public/remotion-assets-minimal/HANDS_002.svg`
- Create: `src/remotion/minimal-kit/HandsFrameComp.tsx`
- Create: `src/remotion/minimal-kit/HandsHoldComp.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-hands-frame.png`, `tmp-hands-hold.png`

- [ ] **Step 1: Write the failing smoke renders**

Run:

```bash
npx remotion still src/remotion/index.ts HandsFrameComp tmp-hands-frame.png --scale=0.25 --frame=45
npx remotion still src/remotion/index.ts HandsHoldComp tmp-hands-hold.png --scale=0.25 --frame=45
```

Expected: FAIL because the compositions are not registered yet.

- [ ] **Step 2: Create the hand asset SVGs**

Create `public/remotion-assets-minimal/HANDS_001.svg`:

```svg
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M126 664C168 544 256 452 350 446C410 442 448 478 468 534C486 584 470 652 428 704C374 770 286 814 212 798C156 786 112 744 126 664Z" fill="#D7C2B3"/>
  <path d="M1476 664C1434 544 1346 452 1252 446C1192 442 1154 478 1134 534C1116 584 1132 652 1174 704C1228 770 1316 814 1390 798C1446 786 1490 744 1476 664Z" fill="#D7C2B3"/>
</svg>
```

Create `public/remotion-assets-minimal/HANDS_002.svg`:

```svg
<svg width="1600" height="900" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M342 750C282 700 254 614 286 548C310 500 362 470 416 476C490 484 550 552 588 648C618 722 582 800 500 820C438 834 386 794 342 750Z" fill="#D7C2B3"/>
  <path d="M1258 750C1318 700 1346 614 1314 548C1290 500 1238 470 1184 476C1110 484 1050 552 1012 648C982 722 1018 800 1100 820C1162 834 1214 794 1258 750Z" fill="#D7C2B3"/>
</svg>
```

- [ ] **Step 3: Create the hands compositions and register them**

Create `src/remotion/minimal-kit/HandsFrameComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets} from "./shared";

export const HandsFrameComp = () => {
  const frame = useCurrentFrame();
  const leftX = interpolate(frame, [0, 40], [-90, 0], {extrapolateRight: "clamp"});

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.handsFrame}
        style={{
          position: "absolute",
          inset: 0,
          objectFit: "contain",
          transform: `translateX(${leftX}px)`,
        }}
      />
      <Img
        src={minimalAssets.phoneFront}
        style={{
          position: "absolute",
          width: 360,
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </MinimalFrame>
  );
};
```

Create `src/remotion/minimal-kit/HandsHoldComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets} from "./shared";

export const HandsHoldComp = () => {
  const frame = useCurrentFrame();
  const floatY = interpolate(frame, [0, 60, 120], [8, -4, 8]);

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.handsHold}
        style={{position: "absolute", inset: 0, objectFit: "contain"}}
      />
      <Img
        src={minimalAssets.phoneFront}
        style={{
          position: "absolute",
          width: 340,
          left: "50%",
          top: "49%",
          transform: `translate(-50%, ${floatY}px)`,
        }}
      />
    </MinimalFrame>
  );
};
```

Modify `src/remotion/Root.tsx`:

```tsx
import {HandsFrameComp} from "./minimal-kit/HandsFrameComp";
import {HandsHoldComp} from "./minimal-kit/HandsHoldComp";
```

Add:

```tsx
<Composition
  id="HandsFrameComp"
  component={HandsFrameComp}
  durationInFrames={120}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
<Composition
  id="HandsHoldComp"
  component={HandsHoldComp}
  durationInFrames={120}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the smoke renders to verify they pass**

Run:

```bash
npx remotion still src/remotion/index.ts HandsFrameComp tmp-hands-frame.png --scale=0.25 --frame=60
npx remotion still src/remotion/index.ts HandsHoldComp tmp-hands-hold.png --scale=0.25 --frame=60
```

Expected: PASS for both renders.

- [ ] **Step 5: Commit**

```bash
git add public/remotion-assets-minimal/HANDS_001.svg public/remotion-assets-minimal/HANDS_002.svg src/remotion/minimal-kit/HandsFrameComp.tsx src/remotion/minimal-kit/HandsHoldComp.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote hand assets"
```

### Task 5: Flashcard Assets And Standalone Compositions

**Files:**
- Create: `public/remotion-assets-minimal/CARDS_001.svg`
- Create: `public/remotion-assets-minimal/CARDS_002.svg`
- Create: `src/remotion/minimal-kit/FlashcardsStackComp.tsx`
- Create: `src/remotion/minimal-kit/FlashcardSingleComp.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-cards-stack.png`, `tmp-card-single.png`

- [ ] **Step 1: Write the failing smoke renders**

Run:

```bash
npx remotion still src/remotion/index.ts FlashcardsStackComp tmp-cards-stack.png --scale=0.25 --frame=45
npx remotion still src/remotion/index.ts FlashcardSingleComp tmp-card-single.png --scale=0.25 --frame=45
```

Expected: FAIL because the compositions are not registered yet.

- [ ] **Step 2: Create the card asset SVGs**

Create `public/remotion-assets-minimal/CARDS_001.svg`:

```svg
<svg width="1200" height="900" viewBox="0 0 1200 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="220" y="250" width="520" height="320" rx="36" transform="rotate(-8 220 250)" fill="rgba(255,255,255,0.72)" stroke="rgba(31,31,34,0.12)"/>
  <rect x="320" y="220" width="520" height="320" rx="36" transform="rotate(4 320 220)" fill="rgba(255,255,255,0.82)" stroke="rgba(31,31,34,0.12)"/>
  <rect x="270" y="292" width="280" height="22" rx="11" fill="#1F1F22" fill-opacity="0.72"/>
</svg>
```

Create `public/remotion-assets-minimal/CARDS_002.svg`:

```svg
<svg width="900" height="700" viewBox="0 0 900 700" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="120" y="110" width="660" height="480" rx="34" fill="rgba(255,255,255,0.78)" stroke="rgba(31,31,34,0.12)"/>
  <rect x="176" y="184" width="214" height="18" rx="9" fill="#1F1F22" fill-opacity="0.82"/>
  <rect x="176" y="228" width="396" height="14" rx="7" fill="#2A2A2E" fill-opacity="0.24"/>
  <rect x="176" y="258" width="344" height="14" rx="7" fill="#2A2A2E" fill-opacity="0.2"/>
</svg>
```

- [ ] **Step 3: Create the card compositions and register them**

Create `src/remotion/minimal-kit/FlashcardsStackComp.tsx`:

```tsx
import {Img, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {MinimalFrame, minimalAssets, productShadow} from "./shared";

export const FlashcardsStackComp = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({fps, frame, config: {stiffness: 70, damping: 12}});

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.cardsStack}
        style={{
          position: "absolute",
          width: 560,
          left: "50%",
          top: "52%",
          transform: `translate(-50%, -50%) scale(${0.92 + reveal * 0.08})`,
          ...productShadow(0.12),
        }}
      />
    </MinimalFrame>
  );
};
```

Create `src/remotion/minimal-kit/FlashcardSingleComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets, productShadow} from "./shared";

export const FlashcardSingleComp = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 30], [48, 0], {extrapolateRight: "clamp"});

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.cardSingle}
        style={{
          position: "absolute",
          width: 600,
          left: "50%",
          top: "52%",
          transform: `translate(-50%, ${y}px)`,
          ...productShadow(0.1),
        }}
      />
    </MinimalFrame>
  );
};
```

Modify `src/remotion/Root.tsx`:

```tsx
import {FlashcardSingleComp} from "./minimal-kit/FlashcardSingleComp";
import {FlashcardsStackComp} from "./minimal-kit/FlashcardsStackComp";
```

Add:

```tsx
<Composition
  id="FlashcardsStackComp"
  component={FlashcardsStackComp}
  durationInFrames={90}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
<Composition
  id="FlashcardSingleComp"
  component={FlashcardSingleComp}
  durationInFrames={90}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the smoke renders to verify they pass**

Run:

```bash
npx remotion still src/remotion/index.ts FlashcardsStackComp tmp-cards-stack.png --scale=0.25 --frame=45
npx remotion still src/remotion/index.ts FlashcardSingleComp tmp-card-single.png --scale=0.25 --frame=45
```

Expected: PASS for both renders.

- [ ] **Step 5: Commit**

```bash
git add public/remotion-assets-minimal/CARDS_001.svg public/remotion-assets-minimal/CARDS_002.svg src/remotion/minimal-kit/FlashcardsStackComp.tsx src/remotion/minimal-kit/FlashcardSingleComp.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote flashcard assets"
```

### Task 6: Warp Assets And Standalone Compositions

**Files:**
- Create: `public/remotion-assets-minimal/WARP_001.svg`
- Create: `public/remotion-assets-minimal/WARP_002.svg`
- Create: `src/remotion/minimal-kit/WarpHorizontalComp.tsx`
- Create: `src/remotion/minimal-kit/WarpVerticalComp.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-warp-horizontal.png`, `tmp-warp-vertical.png`

- [ ] **Step 1: Write the failing smoke renders**

Run:

```bash
npx remotion still src/remotion/index.ts WarpHorizontalComp tmp-warp-horizontal.png --scale=0.25 --frame=30
npx remotion still src/remotion/index.ts WarpVerticalComp tmp-warp-vertical.png --scale=0.25 --frame=30
```

Expected: FAIL because the compositions are not registered yet.

- [ ] **Step 2: Create the warp asset SVGs**

Create `public/remotion-assets-minimal/WARP_001.svg`:

```svg
<svg width="1600" height="320" viewBox="0 0 1600 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="warp" x1="0" y1="160" x2="1600" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="120" y="142" width="1360" height="36" rx="18" fill="url(#warp)"/>
  <ellipse cx="800" cy="160" rx="180" ry="64" fill="#FFFFFF" fill-opacity="0.35"/>
</svg>
```

Create `public/remotion-assets-minimal/WARP_002.svg`:

```svg
<svg width="520" height="1080" viewBox="0 0 520 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="warp" x1="260" y1="0" x2="260" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="188" y="120" width="144" height="840" rx="72" fill="url(#warp)"/>
  <ellipse cx="260" cy="540" rx="114" ry="280" fill="#FFFFFF" fill-opacity="0.26"/>
</svg>
```

- [ ] **Step 3: Create the warp compositions and register them**

Create `src/remotion/minimal-kit/WarpHorizontalComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets} from "./shared";

export const WarpHorizontalComp = () => {
  const frame = useCurrentFrame();
  const squeeze = interpolate(frame, [0, 30, 60], [0.84, 1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.warpHorizontal}
        style={{
          position: "absolute",
          width: 980,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scaleX(${squeeze})`,
          opacity: 0.9,
        }}
      />
    </MinimalFrame>
  );
};
```

Create `src/remotion/minimal-kit/WarpVerticalComp.tsx`:

```tsx
import {Img, interpolate, useCurrentFrame} from "remotion";
import {MinimalFrame, minimalAssets} from "./shared";

export const WarpVerticalComp = () => {
  const frame = useCurrentFrame();
  const stretch = interpolate(frame, [0, 30, 60], [0.8, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Img
        src={minimalAssets.warpVertical}
        style={{
          position: "absolute",
          height: 760,
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scaleY(${stretch})`,
          opacity: 0.9,
        }}
      />
    </MinimalFrame>
  );
};
```

Modify `src/remotion/Root.tsx`:

```tsx
import {WarpHorizontalComp} from "./minimal-kit/WarpHorizontalComp";
import {WarpVerticalComp} from "./minimal-kit/WarpVerticalComp";
```

Add:

```tsx
<Composition
  id="WarpHorizontalComp"
  component={WarpHorizontalComp}
  durationInFrames={75}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
<Composition
  id="WarpVerticalComp"
  component={WarpVerticalComp}
  durationInFrames={75}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the smoke renders to verify they pass**

Run:

```bash
npx remotion still src/remotion/index.ts WarpHorizontalComp tmp-warp-horizontal.png --scale=0.25 --frame=36
npx remotion still src/remotion/index.ts WarpVerticalComp tmp-warp-vertical.png --scale=0.25 --frame=36
```

Expected: PASS for both renders.

- [ ] **Step 5: Commit**

```bash
git add public/remotion-assets-minimal/WARP_001.svg public/remotion-assets-minimal/WARP_002.svg src/remotion/minimal-kit/WarpHorizontalComp.tsx src/remotion/minimal-kit/WarpVerticalComp.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote warp assets"
```

### Task 7: Sequential Showcase And Final Root Wiring

**Files:**
- Create: `src/remotion/minimal-kit/MinimalStarterKitShowcase.tsx`
- Modify: `src/remotion/Root.tsx`
- Test: `tmp-minimal-showcase.png`

- [ ] **Step 1: Write the failing smoke render**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStarterKitShowcase tmp-minimal-showcase.png --scale=0.25 --frame=90
```

Expected: FAIL because the composition is not registered yet.

- [ ] **Step 2: Create the showcase composition**

Create `src/remotion/minimal-kit/MinimalStarterKitShowcase.tsx`:

```tsx
import {Img, Sequence, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {MinimalFrame, minimalAssets, productShadow} from "./shared";

export const MinimalStarterKitShowcase = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phoneIn = spring({fps, frame: Math.max(0, frame - 24), config: {stiffness: 80, damping: 12}});

  return (
    <MinimalFrame>
      <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      <Sequence from={0} durationInFrames={24}>
        <Img src={minimalAssets.stage} style={{position: "absolute", inset: 0, objectFit: "cover"}} />
      </Sequence>
      <Sequence from={24} durationInFrames={24}>
        <Img
          src={minimalAssets.phoneFront}
          style={{
            position: "absolute",
            width: 390,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, ${120 - phoneIn * 100}px) scale(${0.94 + phoneIn * 0.06})`,
            ...productShadow(),
          }}
        />
      </Sequence>
      <Sequence from={48} durationInFrames={24}>
        <Img
          src={minimalAssets.phoneAngle}
          style={{
            position: "absolute",
            width: 460,
            left: "50%",
            top: "48%",
            transform: "translate(-50%, 0) rotate(4deg)",
            ...productShadow(0.14),
          }}
        />
      </Sequence>
      <Sequence from={72} durationInFrames={24}>
        <Img src={minimalAssets.handsFrame} style={{position: "absolute", inset: 0, objectFit: "contain"}} />
        <Img
          src={minimalAssets.phoneFront}
          style={{position: "absolute", width: 320, left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
        />
      </Sequence>
      <Sequence from={96} durationInFrames={24}>
        <Img src={minimalAssets.handsHold} style={{position: "absolute", inset: 0, objectFit: "contain"}} />
        <Img
          src={minimalAssets.phoneFront}
          style={{position: "absolute", width: 300, left: "50%", top: "48%", transform: "translate(-50%, 0)"}}
        />
      </Sequence>
      <Sequence from={120} durationInFrames={24}>
        <Img
          src={minimalAssets.cardsStack}
          style={{position: "absolute", width: 560, left: "50%", top: "52%", transform: "translate(-50%, -50%)"}}
        />
      </Sequence>
      <Sequence from={144} durationInFrames={24}>
        <Img
          src={minimalAssets.cardSingle}
          style={{position: "absolute", width: 620, left: "50%", top: "52%", transform: "translate(-50%, -50%)"}}
        />
      </Sequence>
      <Sequence from={168} durationInFrames={18}>
        <Img
          src={minimalAssets.warpHorizontal}
          style={{position: "absolute", width: 980, left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
        />
      </Sequence>
      <Sequence from={186} durationInFrames={18}>
        <Img
          src={minimalAssets.warpVertical}
          style={{position: "absolute", height: 760, left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}
        />
      </Sequence>
    </MinimalFrame>
  );
};
```

- [ ] **Step 3: Register the showcase composition**

Modify `src/remotion/Root.tsx`:

```tsx
import {MinimalStarterKitShowcase} from "./minimal-kit/MinimalStarterKitShowcase";
```

Add:

```tsx
<Composition
  id="MinimalStarterKitShowcase"
  component={MinimalStarterKitShowcase}
  durationInFrames={210}
  fps={compositionSize.fps}
  width={compositionSize.width}
  height={compositionSize.height}
/>
```

- [ ] **Step 4: Run the showcase smoke render**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStarterKitShowcase tmp-minimal-showcase.png --scale=0.25 --frame=120
```

Expected: PASS and produce a still showing the minimal-kit sequence.

- [ ] **Step 5: Commit**

```bash
git add src/remotion/minimal-kit/MinimalStarterKitShowcase.tsx src/remotion/Root.tsx
git commit -m "feat: add minimal keynote showcase composition"
```

### Task 8: Studio Verification Pass

**Files:**
- Test: `src/remotion/Root.tsx`

- [ ] **Step 1: Start Remotion Studio**

Run:

```bash
npx remotion studio src/remotion/index.ts
```

Expected: Studio starts locally and lists all minimal-kit compositions:

- `MinimalStageComp`
- `PhoneFrontComp`
- `PhoneAngleComp`
- `HandsFrameComp`
- `HandsHoldComp`
- `FlashcardsStackComp`
- `FlashcardSingleComp`
- `WarpHorizontalComp`
- `WarpVerticalComp`
- `MinimalStarterKitShowcase`

- [ ] **Step 2: Click through each standalone composition**

Expected:

- Every asset is individually viewable
- No composition is blank
- Motion feels restrained and premium
- Nothing in the new kit borrows the deep-glow neon language from the older asset pack

- [ ] **Step 3: Render final verification stills**

Run:

```bash
npx remotion still src/remotion/index.ts MinimalStarterKitShowcase remotion-minimal-showcase.png --scale=0.25 --frame=120
npx remotion still src/remotion/index.ts PhoneFrontComp remotion-phone-front.png --scale=0.25 --frame=45
```

Expected: PASS for both renders and produce image artifacts suitable for visual review.

- [ ] **Step 4: Commit**

```bash
git add remotion-minimal-showcase.png remotion-phone-front.png
git commit -m "test: verify minimal keynote asset kit renders"
```

## Self-Review

### Spec coverage

- Separate asset files: covered by Tasks 2 through 6
- Separate standalone compositions for every asset: covered by Tasks 2 through 6
- Sequence showcase: covered by Task 7
- Root wiring for Studio visibility: covered by Tasks 2 through 7
- Verification by render and Studio inspection: covered by Task 8

### Placeholder scan

- No `TODO`, `TBD`, or deferred implementation markers remain
- Every task includes exact file paths
- Every verification step includes an exact command and expected result

### Type consistency

- `compositionSize`, `minimalAssets`, and `MinimalFrame` are defined once in `shared.tsx` and reused consistently
- Every composition name in the plan matches its Root registration name exactly
- Every asset URL key matches the corresponding SVG filename
