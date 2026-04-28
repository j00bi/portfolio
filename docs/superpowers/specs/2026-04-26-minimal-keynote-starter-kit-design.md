# Minimal Keynote Starter Kit Design

Date: `2026-04-26`
Project: `husni-portfolio-remotion`
Topic: `apple-like minimal product asset kit`

## Goal

Create a second Remotion starter kit with a restrained product-film aesthetic inspired by modern Apple keynote visuals, while remaining fully unbranded. The kit must be production-useful as a reusable asset system and also easy to inspect composition-by-composition inside Remotion Studio.

## Core Direction

The visual language is premium, minimal, and product-centric:

- Backgrounds are near-white, pale warm gray, or soft graphite gradients.
- Lighting is studio-soft, with clean shadows and restrained reflections.
- The hero device is an unbranded iPhone-15-like silhouette with rounded corners, slim bezels, flat glass, and subtle metallic sidewalls.
- Hands are supportive framing elements, not dominant characters.
- Flashcards are editorial and quiet: thin borders, soft translucency, strong spacing.
- Warp transitions are optical and polished, not sci-fi or glitch-heavy.

The output should feel calm, expensive, and deliberate.

## Asset Scope

The kit will be delivered as a full set of standalone assets plus a sequence showcase. Each asset will exist both as a reusable file and as its own independent Remotion composition so the user can preview it directly in Studio.

### Asset files

- `STAGE_001.svg`: Minimal cyclorama stage with soft spotlight and floor falloff
- `PHONE_001.svg`: Front-facing unbranded premium phone hero
- `PHONE_002.svg`: Angled product phone for editorial or transition use
- `HANDS_001.svg`: Left/right framing hands for reveal compositions
- `HANDS_002.svg`: Holding-hands composition designed for product placement
- `CARDS_001.svg`: Stacked flashcards with subtle depth and translucency
- `CARDS_002.svg`: Single editorial flashcard for feature callouts
- `WARP_001.svg`: Clean horizontal lens-warp transition plate
- `WARP_002.svg`: Vertical product-swap warp element

### Remotion compositions

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

Each composition must render a single asset cleanly in a controlled frame, with enough motion to preview the intended use without turning the composition into a full scene.

## Composition Rules

All compositions follow the same presentation system:

- `1920x1080`, `30fps`
- Clean title-free render surface by default
- Minimal camera-free motion using `spring()` and `interpolate()`
- Slow, premium timing rather than punchy kinetic timing
- Strong negative space
- No visible logos, no text on the product, no device UI chrome unless explicitly decorative

The standalone compositions are preview tools, not full advertisements. They should expose the asset clearly and make it easy for the user to inspect silhouette, spacing, and motion quality.

## Motion System

The motion system is quiet and premium:

- Stage: slow fade and soft light bloom
- Phone front: gentle vertical rise, tiny scale settle, subtle reflection drift
- Phone angle: slight rotation drift and shadow breathing
- Hands frame: soft inward reveal with very low-amplitude motion
- Hands hold: steady support pose with minor float
- Flashcards stack: staggered depth rise with clean easing
- Single flashcard: short editorial slide-up and settle
- Warp horizontal: lens-like squeeze and release across x-axis
- Warp vertical: polished vertical stretch and reconvergence

No glitch, RGB split, neon glow, or aggressive bounce should appear in this kit.

## Styling Rules

The styling should stay narrow and consistent:

- Palette:
  - Background `#F6F4EF`, `#F1EFEA`, `#E8E4DD`
  - Graphite `#1F1F22`, `#2A2A2E`
  - Glass white `rgba(255,255,255,0.72)`
  - Border `rgba(31,31,34,0.12)`
  - Shadow `rgba(15,15,18,0.16)`
- Rounded geometry should feel hardware-accurate, not bubbly.
- Shadows should be soft and wide, never harsh.
- Reflections should be faint and used only where they help the product read as premium.
- Hands should remain simplified enough to avoid uncanny detail while still reading as elegant and human.

## File Placement

The new asset pack should live alongside the existing deep-glow pack without overwriting it.

- Files go in `public/remotion-assets-minimal/`
- New composition code goes in `src/remotion/`
- Root registration is updated to include each standalone composition and the new showcase

This preserves the existing deep-glow system while adding a second, visually distinct starter kit.

## Preview Experience

`MinimalStarterKitShowcase` should preview the pack in sequence, not as a dense grid. The sequence order is:

1. Stage
2. Phone front
3. Phone angle
4. Hands frame
5. Hands hold
6. Flashcards stack
7. Flashcard single
8. Warp horizontal
9. Warp vertical

The sequence should feel like one family of assets, with consistent spacing, background treatment, and timing.

## Verification

Implementation is complete only when:

- All asset files exist in `public/remotion-assets-minimal/`
- Each asset has a dedicated Remotion composition
- The new showcase composition renders successfully
- Every standalone composition is visible in Remotion Studio
- At least one rendered still confirms the final look of the full showcase

## Notes

- The phone design should be inspired by iPhone 15 proportions and hardware restraint, but must remain unbranded.
- The user specifically wants all assets viewable separately as compositions, so that requirement is mandatory rather than optional.
- This spec does not include real product UI screens. Device screens may remain abstract or neutral unless later requested.
