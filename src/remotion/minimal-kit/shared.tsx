import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, staticFile } from "remotion";

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

export const stageCover: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const MinimalFrame = ({ children }: { children: ReactNode }) => {
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
