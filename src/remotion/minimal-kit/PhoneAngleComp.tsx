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

export const PhoneAngleComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 74,
      mass: 0.98,
    },
  });

  const deviceOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const deviceScale = interpolate(reveal, [0, 1], [0.95, 1]);
  const stageOpacity = interpolate(reveal, [0, 1], [0.7, 0.92]);
  const driftX = Math.sin(frame / 44) * 12;
  const driftY = Math.cos(frame / 40) * -8;
  const driftRotate = -1.8 + Math.sin(frame / 58) * 0.6;
  const glowOpacity = interpolate(reveal, [0, 1], [0.22, 0.1]);

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
              "radial-gradient(circle at 52% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.34) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: glowOpacity,
          }}
        />
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              width: 1120,
              height: 780,
              ...productShadow(0.22),
              opacity: deviceOpacity,
              transform: `translate(${driftX}px, ${driftY}px) rotate(${driftRotate}deg) scale(${deviceScale})`,
              transformOrigin: "50% 62%",
            }}
          >
            <Img
              src={minimalAssets.phoneAngle}
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
