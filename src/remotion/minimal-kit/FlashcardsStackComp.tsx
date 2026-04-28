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

export const FlashcardsStackComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 19,
      stiffness: 74,
      mass: 0.96,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.72, 0.94]);
  const cardsOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const cardsScale = interpolate(reveal, [0, 1], [0.96, 1]);
  const cardsY = Math.sin(frame / 42) * -7;
  const cardsRotate = Math.sin(frame / 60) * 0.85;
  const glowOpacity = interpolate(reveal, [0, 1], [0.2, 0.08]);

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
              "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.36) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: glowOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 18,
          }}
        >
          <div
            style={{
              width: 1080,
              height: 820,
              ...productShadow(0.18),
              opacity: cardsOpacity,
              transform: `translateY(${cardsY}px) rotate(${cardsRotate}deg) scale(${cardsScale})`,
              transformOrigin: "50% 62%",
            }}
          >
            <Img
              src={minimalAssets.cardsStack}
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
