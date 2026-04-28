import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { cubicOut, theme } from "./theme";

const projects = [
  {
    name: "Meeting Min",
    stack: "Python · Whisper · Ollama · SSH · Docker",
    description:
      "Self-hosted bilingual meeting minutes bot. Captures Teams audio, Whisper STT (auto-detects Malay/EN), LLM summarisation. SSH tunneling for locked-down corp environments.",
  },
  {
    name: "Mazda AIO",
    stack: "HTML · CSS · JS · React · Vite",
    description:
      "Custom speedometer & instrument cluster UI for Mazda Connect CMU (2015 Mazda 2). Real-time driving data, CAN bus exploration, embedded automotive UI on production hardware.",
  },
  {
    name: "RAG Demo",
    stack: "Python · ChromaDB · Ollama · FastAPI",
    description:
      "Chat with your PDFs. ChromaDB vector storage + local Ollama LLM. Self-hosted, Dockerized, privacy-first.",
  },
  {
    name: "Yeelight Backlight",
    stack: "Python · NumPy · MSS · TCP",
    description:
      "Real-time monitor ambient lighting. Screen-edge color → Yeelight bslamp3 over LAN TCP. 6 iterations solving TCP buffer overflow, temporal smoothing, adaptive rate limiting.",
  },
  {
    name: "Celestial Clock",
    stack: "HTML Canvas · JS · REST API",
    description:
      "Prayer-synced sky — gradients tied to actual Islamic prayer times via Aladhan API. Sun arc, moon with phase, twinkling stars, layered mountain silhouettes.",
  },
  {
    name: "Bursa Sector Catalyst",
    stack: "Research · Data Analysis",
    description:
      "Sector catalyst analysis model for Bursa Malaysia. Actuarial probability thinking applied to stock sector rotation. Early research phase.",
  },
];

export const ProjectsAnimation = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const compact = width < 680;

  return (
    <AbsoluteFill style={{ background: theme.parchment, fontFamily: theme.serif }}>
      <div
        style={{
          display: "grid",
          height: "100%",
          borderTop: `1px solid ${theme.sand}`,
        }}
      >
        {projects.map((project, index) => {
          const enter = spring({
            frame: Math.max(0, frame - index * 12),
            fps,
            config: {
              damping: 44,
              mass: 1,
              stiffness: 62,
            },
            durationInFrames: 78,
          });
          const eased = interpolate(enter, [0, 1], [0, 1], {
            easing: Easing.bezier(...cubicOut),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <article
              key={project.name}
              style={{
                display: "grid",
                gridTemplateColumns: compact ? "1fr" : "220px 1fr",
                gap: compact ? 6 : 26,
                alignContent: "center",
                minHeight: compact ? 118 : 92,
                padding: compact ? "14px 0" : "18px 0",
                borderBottom: `1px solid ${theme.sand}`,
                opacity: eased,
                transform: `translateX(${interpolate(eased, [0, 1], [60, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px)`,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: theme.nearBlack,
                  fontSize: compact ? 15 : 14,
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                {project.name}
              </h3>
              <div>
                <div
                  style={{
                    marginBottom: 7,
                    color: theme.stone,
                    fontFamily: theme.mono,
                    fontSize: compact ? 10 : 11,
                    lineHeight: 1.35,
                    textAlign: compact ? "left" : "right",
                  }}
                >
                  {project.stack}
                </div>
                <p
                  style={{
                    margin: 0,
                    color: theme.olive,
                    fontSize: compact ? 12.5 : 13,
                    lineHeight: 1.5,
                  }}
                >
                  {project.description}
                </p>
              </div>
            </article>
          );
        })}

        <aside
          style={{
            alignSelf: "end",
            marginTop: 22,
            padding: compact ? "18px 16px" : "22px 24px",
            border: `1px solid ${theme.sand}`,
            background: theme.ivory,
            color: theme.olive,
            fontSize: compact ? 14 : 16,
            lineHeight: 1.45,
            opacity: interpolate(frame, [96, 134], [0, 1], {
              easing: Easing.bezier(...cubicOut),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <strong style={{ color: theme.nearBlack }}>Builder instinct</strong> — Every
          project starts with "I wish this existed" and ends with something running on
          actual hardware — a car head unit, a living room lamp, a Teams meeting.
        </aside>
      </div>
    </AbsoluteFill>
  );
};
