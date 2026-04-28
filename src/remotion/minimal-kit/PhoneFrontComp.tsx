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

export const PhoneFrontComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 18,
      stiffness: 76,
      mass: 0.95,
    },
  });

  const deviceOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const deviceScale = interpolate(reveal, [0, 1], [0.94, 1]);
  const stageOpacity = interpolate(reveal, [0, 1], [0.68, 0.9]);
  const driftY = Math.sin(frame / 36) * -10;
  const driftRotate = Math.sin(frame / 52) * 0.7;
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
              "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.4) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: glowOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              width: 980,
              height: 760,
              ...productShadow(0.2),
              opacity: deviceOpacity,
              transform: `translateY(${driftY}px) rotate(${driftRotate}deg) scale(${deviceScale})`,
              transformOrigin: "50% 58%",
            }}
          >
            <Img
              src={minimalAssets.phoneFront}
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
