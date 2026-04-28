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

export const HandsFrameComp = () => {
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

  const stageOpacity = interpolate(reveal, [0, 1], [0.72, 0.92]);
  const phoneOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const phoneScale = interpolate(reveal, [0, 1], [0.95, 1]);
  const handsOpacity = interpolate(reveal, [0, 1], [0, 0.98]);
  const groupScale = interpolate(reveal, [0, 1], [0.97, 1]);
  const groupY = Math.sin(frame / 48) * -6;
  const groupRotate = Math.sin(frame / 68) * 0.35;
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
              "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.38) 24%, rgba(255,255,255,0) 58%)",
            mixBlendMode: "screen",
            opacity: glowOpacity,
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
              position: "relative",
              width: 1220,
              height: 840,
              transform: `translateY(${groupY}px) rotate(${groupRotate}deg) scale(${groupScale})`,
              transformOrigin: "50% 72%",
            }}
          >
            <Img
              src={minimalAssets.handsFrame}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: handsOpacity,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 22,
              }}
            >
              <div
                style={{
                  width: 760,
                  height: 690,
                  ...productShadow(0.18),
                  opacity: phoneOpacity,
                  transform: `scale(${phoneScale})`,
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
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </MinimalFrame>
  );
};
