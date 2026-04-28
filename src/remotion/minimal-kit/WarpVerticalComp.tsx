import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MinimalFrame, minimalAssets, stageCover } from "./shared";

export const WarpVerticalComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 70,
      mass: 1.02,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.76, 0.93]);
  const warpOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const warpScaleX = interpolate(reveal, [0, 1], [0.975, 1]);
  const warpScaleY = interpolate(reveal, [0, 1], [0.92, 1]);
  const warpY = Math.sin(frame / 52) * -4;
  const haloOpacity = interpolate(reveal, [0, 1], [0.12, 0.05]);

  return (
    <MinimalFrame>
      <AbsoluteFill>
        <Img
          src={minimalAssets.stage}
          style={{
            ...stageCover,
            opacity: stageOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.24) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: haloOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 0",
              boxSizing: "border-box",
            }}
          >
            <Img
              src={minimalAssets.warpVertical}
              style={{
                width: "100%",
                height: "100%",
                maxWidth: 620,
                maxHeight: "100%",
                objectFit: "contain",
                opacity: warpOpacity,
                transform: `translateY(${warpY}px) scale(${warpScaleX}, ${warpScaleY})`,
              }}
            />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </MinimalFrame>
  );
};
