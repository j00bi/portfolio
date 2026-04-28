import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { cubicOut, theme } from "./theme";

export const CTAAnimation = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width < 680;
  const headline = interpolate(frame, [8, 54], [0, 1], {
    easing: Easing.bezier(...cubicOut),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const detail = interpolate(frame, [42, 84], [0, 1], {
    easing: Easing.bezier(...cubicOut),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 0.08 + Math.sin(frame / 30) * 0.025;

  return (
    <AbsoluteFill
      style={{
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: theme.parchment,
        color: theme.nearBlack,
        fontFamily: theme.serif,
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: theme.brand,
          opacity: pulse,
          transform: `scale(${interpolate(Math.sin(frame / 30), [-1, 1], [8.4, 10.6])})`,
        }}
      />
      <div style={{ position: "relative" }}>
        <h2
          style={{
            margin: 0,
            color: theme.nearBlack,
            fontSize: compact ? 34 : 54,
            fontWeight: 400,
            lineHeight: 1,
            opacity: headline,
            transform: `scale(${interpolate(headline, [0, 1], [0.96, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        >
          Let's build something.
        </h2>
        <p
          style={{
            margin: "22px 0 0",
            color: theme.stone,
            fontSize: compact ? 13 : 16,
            lineHeight: 1.6,
            opacity: detail,
          }}
        >
          husnisarafi17@gmail.com · github.com/j00bi
        </p>
      </div>
    </AbsoluteFill>
  );
};
