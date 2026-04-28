import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { cubicOut, theme } from "./theme";

const experience = [
  {
    company: "IBM Malaysia",
    role: "Process Delivery Specialist · AutomationAnywhere · Accounts Receivable",
    year: "2023",
    body: "Monitored live AA robots supporting AR operations for the Vietnamese market. Experimented with VBA, built scripts that caught the team's attention, contributed to live automation development. This is where the RPA journey started.",
  },
  {
    company: "E-Outsource Asia",
    role: "Associate Consultant · UiPath · AutomationAnywhere",
    year: "2024",
    body: "End-to-end RPA ownership: discovery, design, development, deployment, monitoring. Shipped LOMAS logistics automation, e-invoice pipeline (SAP ERP → IRBM), and Excel macro PO processing. 50% productivity increase. 99% uptime across all live workflows.",
  },
  {
    company: "Ernst & Young",
    role: "RPA Consultant · BluePrism · Utility Sector",
    year: "2026 → Present",
    body: "Managing BluePrism processes for a national utility provider — SMART Meter Billing and AMI data pipelines. Monitors robot health, triages failures, ensures stability across high-volume transactional workflows.",
  },
];

export const ExperienceAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const compact = width < 680;

  return (
    <AbsoluteFill style={{ background: theme.parchment, fontFamily: theme.serif }}>
      <div
        style={{
          display: "grid",
          gap: 18,
          height: "100%",
          padding: "4px 0",
        }}
      >
        {experience.map((item, index) => {
          const enter = spring({
            frame: Math.max(0, frame - index * 15),
            fps,
            config: {
              damping: 42,
              mass: 1,
              stiffness: 58,
            },
            durationInFrames: 80,
          });
          const eased = interpolate(enter, [0, 1], [0, 1], {
            easing: Easing.bezier(...cubicOut),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <article
              key={item.company}
              style={{
                minHeight: compact ? 190 : 150,
                padding: compact ? "18px 16px 18px 16px" : "24px 28px 24px 24px",
                border: `1px solid ${theme.sand}`,
                borderLeft: `2px solid ${theme.brand}`,
                background: theme.ivory,
                opacity: eased,
                transform: `translateY(${interpolate(eased, [0, 1], [42, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px)`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: theme.nearBlack,
                  fontSize: compact ? 18 : 18,
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {item.company}
              </h3>
              <div
                style={{
                  marginTop: 8,
                  color: theme.stone,
                  fontFamily: theme.mono,
                  fontSize: compact ? 10.5 : 12,
                  lineHeight: 1.45,
                }}
              >
                {item.role} · {item.year}
              </div>
              <p
                style={{
                  margin: "14px 0 0",
                  color: theme.olive,
                  fontSize: compact ? 13 : 14,
                  lineHeight: 1.55,
                }}
              >
                {item.body}
              </p>
            </article>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
