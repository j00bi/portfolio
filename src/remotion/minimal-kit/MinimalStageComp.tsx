import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {MinimalFrame, minimalAssets, stageCover} from "./shared";

export const MinimalStageComp = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 18,
      stiffness: 72,
      mass: 0.9,
    },
  });

  const imageOpacity = interpolate(reveal, [0, 1], [0.72, 1]);
  const bloomOpacity = interpolate(reveal, [0, 1], [0.22, 0.08]);
  const bloomScale = interpolate(reveal, [0, 1], [1.035, 1]);

  return (
    <MinimalFrame>
      <AbsoluteFill>
        <Img
          src={minimalAssets.stage}
          style={{
            ...stageCover,
            opacity: imageOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(circle at 50% 24%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.42) 22%, rgba(255,255,255,0) 56%)",
            mixBlendMode: "screen",
            opacity: bloomOpacity,
            transform: `scale(${bloomScale})`,
          }}
        />
      </AbsoluteFill>
    </MinimalFrame>
  );
};
