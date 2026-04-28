import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MinimalFrame, minimalAssets, stageCover } from "./shared";

export const WarpHorizontalComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 70,
      mass: 1,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.76, 0.93]);
  const warpOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const warpScaleX = interpolate(reveal, [0, 1], [0.92, 1.02]);
  const warpScaleY = interpolate(reveal, [0, 1], [0.96, 1]);
  const warpY = Math.sin(frame / 48) * -4;
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
          <Img
            src={minimalAssets.warpHorizontal}
            style={{
              width: 1220,
              height: 686,
              objectFit: "contain",
              opacity: warpOpacity,
              transform: `translateY(${warpY}px) scale(${warpScaleX}, ${warpScaleY})`,
            }}
          />
        </AbsoluteFill>
      </AbsoluteFill>
    </MinimalFrame>
  );
};
