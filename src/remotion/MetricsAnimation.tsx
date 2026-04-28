import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { cubicOut, theme } from "./theme";

const metrics = [
  { value: 3, suffix: " yrs", label: "automation & process delivery" },
  { value: 50, suffix: "%", label: "robot productivity increase (EOA)" },
  { value: 99, suffix: "%", label: "live workflow uptime maintained" },
  { value: 3, suffix: "", label: "RPA platforms: BluePrism · UiPath · AA" },
];

export const MetricsAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const compact = width < 680;

  return (
    <AbsoluteFill
      style={{
        background: theme.parchment,
        color: theme.nearBlack,
        fontFamily: theme.serif,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: compact ? "1fr 1fr" : "repeat(4, 1fr)",
          height: "100%",
          borderTop: `1px solid ${theme.sand}`,
          borderBottom: `1px solid ${theme.sand}`,
        }}
      >
        {metrics.map((metric, index) => {
          const progress = spring({
            frame: Math.max(0, frame - index * 4),
            fps,
            config: {
              damping: 38,
              mass: 1,
              stiffness: 54,
            },
            durationInFrames: 92,
          });
          const eased = interpolate(progress, [0, 1], [0, 1], {
            easing: Easing.bezier(...cubicOut),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const count = Math.round(metric.value * eased);
          const rise = interpolate(eased, [0, 1], [18, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={metric.label}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
                padding: compact ? "20px 12px" : "34px 28px",
                borderRight:
                  !compact && index < metrics.length - 1 ? `1px solid ${theme.sand}` : "none",
                borderBottom:
                  compact && index < metrics.length - 2 ? `1px solid ${theme.sand}` : "none",
                opacity: interpolate(eased, [0, 0.35, 1], [0, 0.8, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${rise}px)`,
              }}
            >
              <div
                style={{
                  color: theme.brand,
                  fontSize: compact ? 40 : 64,
                  lineHeight: 0.9,
                  letterSpacing: 0,
                }}
              >
                {count}
                <span style={{ fontSize: compact ? 18 : 30 }}>{metric.suffix}</span>
              </div>
              <p
                style={{
                  margin: compact ? "12px 0 0" : "18px 0 0",
                  color: theme.olive,
                  fontSize: compact ? 13 : 18,
                  lineHeight: 1.35,
                }}
              >
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
