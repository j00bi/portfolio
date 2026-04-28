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

export const HandsHoldComp = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 20,
      stiffness: 72,
      mass: 1,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.74, 0.94]);
  const handsOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const phoneOpacity = interpolate(reveal, [0, 1], [0, 1]);
  const phoneScale = interpolate(reveal, [0, 1], [0.96, 1]);
  const groupScale = interpolate(reveal, [0, 1], [0.98, 1]);
  const groupY = Math.sin(frame / 54) * 4;
  const groupRotate = Math.sin(frame / 84) * 0.22;
  const glowOpacity = interpolate(reveal, [0, 1], [0.18, 0.08]);

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
              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.34) 24%, rgba(255,255,255,0) 60%)",
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
              position: "relative",
              width: 1180,
              height: 840,
              transform: `translateY(${groupY}px) rotate(${groupRotate}deg) scale(${groupScale})`,
              transformOrigin: "50% 84%",
            }}
          >
            <Img
              src={minimalAssets.handsHold}
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
                paddingBottom: 68,
              }}
            >
              <div
                style={{
                  width: 760,
                  height: 690,
                  ...productShadow(0.2),
                  opacity: phoneOpacity,
                  transform: `scale(${phoneScale})`,
                  transformOrigin: "50% 62%",
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
