import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MinimalFrame, minimalAssets, productShadow, stageCover } from "./shared";

const SCENE_LENGTH = 24;

const layerGlow = (opacity: number) => ({
  background:
    "radial-gradient(circle at 50% 28%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.32) 24%, rgba(255,255,255,0) 58%)",
  mixBlendMode: "screen" as const,
  opacity,
});

const CenteredLayer = ({
  children,
  paddingTop = 0,
}: {
  children: React.ReactNode;
  paddingTop?: number;
}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingTop,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const MinimalStarterKitShowcase = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sceneFrame = frame % SCENE_LENGTH;
  const sceneIndex = Math.min(8, Math.floor(frame / SCENE_LENGTH));
  const reveal = spring({
    fps,
    frame: sceneFrame,
    config: {
      damping: 18,
      stiffness: 74,
      mass: 0.96,
    },
  });

  const stageOpacity = interpolate(reveal, [0, 1], [0.72, 0.95]);
  const glowOpacity = interpolate(reveal, [0, 1], [0.18, 0.06]);
  const floatY = Math.sin(frame / 48) * -5;
  const softRotate = Math.sin(frame / 68) * 0.4;

  const renderScene = () => {
    switch (sceneIndex) {
      case 0:
        return null;
      case 1:
        return (
          <CenteredLayer paddingTop={26}>
            <div
              style={{
                width: 980,
                height: 760,
                opacity: reveal,
                transform: `translateY(${floatY}px) rotate(${softRotate}deg) scale(${interpolate(
                  reveal,
                  [0, 1],
                  [0.94, 1]
                )})`,
                transformOrigin: "50% 58%",
                ...productShadow(0.2),
              }}
            >
              <Img src={minimalAssets.phoneFront} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </CenteredLayer>
        );
      case 2:
        return (
          <CenteredLayer paddingTop={24}>
            <div
              style={{
                width: 1120,
                height: 780,
                opacity: reveal,
                transform: `translate(${Math.sin(frame / 44) * 10}px, ${Math.cos(frame / 40) * -6}px) rotate(${
                  -1.8 + Math.sin(frame / 58) * 0.5
                }deg) scale(${interpolate(reveal, [0, 1], [0.95, 1])})`,
                transformOrigin: "50% 62%",
                ...productShadow(0.22),
              }}
            >
              <Img src={minimalAssets.phoneAngle} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </CenteredLayer>
        );
      case 3:
        return (
          <CenteredLayer>
            <div
              style={{
                position: "relative",
                width: 1220,
                height: 840,
                transform: `translateY(${floatY}px) rotate(${softRotate}deg) scale(${interpolate(
                  reveal,
                  [0, 1],
                  [0.97, 1]
                )})`,
                transformOrigin: "50% 72%",
              }}
            >
              <Img
                src={minimalAssets.handsFrame}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: reveal }}
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
                    transform: `scale(${interpolate(reveal, [0, 1], [0.95, 1])})`,
                    transformOrigin: "50% 58%",
                    ...productShadow(0.18),
                  }}
                >
                  <Img src={minimalAssets.phoneFront} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              </div>
            </div>
          </CenteredLayer>
        );
      case 4:
        return (
          <CenteredLayer paddingTop={18}>
            <div
              style={{
                position: "relative",
                width: 1180,
                height: 840,
                transform: `translateY(${Math.sin(frame / 48) * -4}px) scale(${interpolate(reveal, [0, 1], [0.98, 1])})`,
                transformOrigin: "50% 84%",
              }}
            >
              <Img
                src={minimalAssets.handsHold}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: reveal }}
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
                    transform: `scale(${interpolate(reveal, [0, 1], [0.96, 1])})`,
                    transformOrigin: "50% 62%",
                    ...productShadow(0.2),
                  }}
                >
                  <Img src={minimalAssets.phoneFront} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
              </div>
            </div>
          </CenteredLayer>
        );
      case 5:
        return (
          <CenteredLayer paddingTop={18}>
            <div
              style={{
                width: 1080,
                height: 820,
                opacity: reveal,
                transform: `translateY(${Math.sin(frame / 42) * -6}px) rotate(${Math.sin(frame / 60) * 0.75}deg) scale(${interpolate(
                  reveal,
                  [0, 1],
                  [0.96, 1]
                )})`,
                transformOrigin: "50% 62%",
                ...productShadow(0.18),
              }}
            >
              <Img src={minimalAssets.cardsStack} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </CenteredLayer>
        );
      case 6:
        return (
          <CenteredLayer paddingTop={22}>
            <div
              style={{
                width: 980,
                height: 760,
                opacity: reveal,
                transform: `translateY(${Math.sin(frame / 44) * -5}px) rotate(${
                  -0.8 + Math.sin(frame / 66) * 0.45
                }deg) scale(${interpolate(reveal, [0, 1], [0.965, 1])})`,
                transformOrigin: "50% 60%",
                ...productShadow(0.18),
              }}
            >
              <Img src={minimalAssets.cardSingle} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </CenteredLayer>
        );
      case 7:
        return (
          <CenteredLayer>
            <Img
              src={minimalAssets.warpHorizontal}
              style={{
                width: 1220,
                height: 686,
                objectFit: "contain",
                opacity: reveal,
                transform: `translateY(${Math.sin(frame / 48) * -4}px) scale(${interpolate(
                  reveal,
                  [0, 1],
                  [0.92, 1.02]
                )}, ${interpolate(reveal, [0, 1], [0.96, 1])})`,
              }}
            />
          </CenteredLayer>
        );
      default:
        return (
          <CenteredLayer>
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
                  opacity: reveal,
                  transform: `translateY(${Math.sin(frame / 52) * -4}px) scale(${interpolate(
                    reveal,
                    [0, 1],
                    [0.975, 1]
                  )}, ${interpolate(reveal, [0, 1], [0.92, 1])})`,
                }}
              />
            </div>
          </CenteredLayer>
        );
    }
  };

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
        <AbsoluteFill style={layerGlow(glowOpacity)} />
        {renderScene()}
      </AbsoluteFill>
    </MinimalFrame>
  );
};
