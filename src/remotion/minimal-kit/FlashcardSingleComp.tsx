import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  MinimalFrame,
  minimalAssets,
  productShadow,
  stageCover,
} from "./shared";

export const FlashcardSingleComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 18,
      stiffness: 74,
      mass: 0.94,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.74, 0.95]);
  const cardOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const cardScale = interpolate(reveal, [0, 1], [0.965, 1]);
  const cardY = Math.sin(frame / 44) * -5;
  const cardRotate = -0.8 + Math.sin(frame / 66) * 0.45;
  const glowOpacity = interpolate(reveal, [0, 1], [0.18, 0.07]);

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
              "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.34) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: glowOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 22,
          }}
        >
          <div
            style={{
              width: 980,
              height: 760,
              ...productShadow(0.18),
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) rotate(${cardRotate}deg) scale(${cardScale})`,
              transformOrigin: "50% 60%",
            }}
          >
            <Img
              src={minimalAssets.cardSingle}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </MinimalFrame>
  );
};
