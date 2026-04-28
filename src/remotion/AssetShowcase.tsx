import type {CSSProperties} from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  background: "#05050F",
  surface: "#0D0D1A",
  edgeA: "#6C63FF",
  edgeB: "#00D4FF",
  edgeC: "#FF3CAC",
  text: "#F0F0FF",
  dim: "#8D8CB2",
};

const deepGlow = (color: string) => ({
  boxShadow: [
    `0 0 8px 2px ${color}`,
    `0 0 24px 8px ${color}66`,
    `0 0 60px 20px ${color}22`,
  ].join(", "),
});

const textGlow = (color: string) => ({
  textShadow: `0 0 10px ${color}, 0 0 30px ${color}88, 0 0 60px ${color}33`,
});

const cardStyle: CSSProperties = {
  background: "rgba(13, 13, 26, 0.82)",
  border: "1px solid rgba(108, 99, 255, 0.24)",
  borderRadius: 20,
  overflow: "hidden",
  position: "relative",
};

const assetList = [
  {name: "BG_001", path: staticFile("remotion-assets/BG_001.svg"), w: 190, h: 94},
  {name: "BG_002", path: staticFile("remotion-assets/BG_002.svg"), w: 190, h: 94},
  {name: "BG_004", path: staticFile("remotion-assets/BG_004.svg"), w: 190, h: 94},
  {name: "BOX_001", path: staticFile("remotion-assets/BOX_001.svg"), w: 168, h: 100},
  {name: "BOX_002", path: staticFile("remotion-assets/BOX_002.svg"), w: 168, h: 100},
  {name: "BOX_003", path: staticFile("remotion-assets/BOX_003.svg"), w: 108, h: 108},
  {name: "FIG_003", path: staticFile("remotion-assets/FIG_003.svg"), w: 110, h: 110},
  {name: "TX_001", path: staticFile("remotion-assets/TX_001.svg"), w: 170, h: 34},
  {name: "TX_003", path: staticFile("remotion-assets/TX_003.svg"), w: 170, h: 96},
  {name: "TX_004", path: staticFile("remotion-assets/TX_004.svg"), w: 108, h: 108},
];

export const AssetShowcase = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = spring({
    fps,
    frame,
    config: {stiffness: 90, damping: 12},
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        color: palette.text,
        fontFamily: '"Space Grotesk", "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(108, 99, 255, 0.18), transparent 28%), radial-gradient(circle at 75% 18%, rgba(0, 212, 255, 0.16), transparent 26%), linear-gradient(180deg, #070712 0%, #05050F 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 72,
          borderRadius: 28,
          border: "1px solid rgba(108, 99, 255, 0.24)",
          background: "rgba(5, 5, 15, 0.72)",
          ...deepGlow(palette.edgeA),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 128,
          right: 128,
          transform: `translateY(${interpolate(titleIn, [0, 1], [24, 0])}px)`,
          opacity: titleIn,
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: palette.dim,
            marginBottom: 12,
          }}
        >
          Husni Remotion Asset Pack
        </div>
        <div
          style={{
            fontSize: 66,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.94,
            width: 840,
            ...textGlow(palette.edgeB),
          }}
        >
          Deep glow starter kit for cinematic portfolio motion.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 128,
          right: 128,
          top: 296,
          bottom: 88,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {assetList.map((asset, index) => {
          const delay = index * 4;
          const progress = spring({
            fps,
            frame: Math.max(0, frame - 16 - delay),
            config: {stiffness: 110, damping: 11},
          });
          return (
            <div
              key={asset.name}
              style={{
                ...cardStyle,
                opacity: progress,
                transform: `translateY(${interpolate(progress, [0, 1], [32, 0])}px) scale(${interpolate(
                  progress,
                  [0, 1],
                  [0.94, 1]
                )})`,
                padding: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 14,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: palette.dim,
                  marginBottom: 10,
                }}
              >
                <span>{asset.name}</span>
                <span style={{fontSize: 11, color: "rgba(240,240,255,0.52)"}}>svg</span>
              </div>
              <div
                style={{
                  height: 116,
                  borderRadius: 14,
                  background:
                    "linear-gradient(180deg, rgba(108,99,255,0.08), rgba(0,212,255,0.02)), rgba(240,240,255,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={asset.path}
                  style={{
                    width: asset.w,
                    height: asset.h,
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
