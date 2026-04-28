import { Player } from "@remotion/player";
import type { ComponentType, CSSProperties, MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MinimalStarterKitShowcase } from "./remotion/minimal-kit/MinimalStarterKitShowcase";
import { MetricsAnimation } from "./remotion/MetricsAnimation";
import "./styles/global.css";

type InlinePlayerProps = {
  ariaLabel: string;
  className?: string;
  component: ComponentType;
  durationInFrames: number;
};

type Project = {
  name: string;
  signal: string;
  stack: string;
  description: string;
  artifact: string;
};

const projects: Project[] = [
  {
    name: "Meeting Min",
    signal: "Bilingual AI minutes",
    stack: "Python / Whisper / Ollama / Docker",
    description:
      "Self-hosted meeting intelligence for locked-down environments: Teams audio capture, Malay-English transcription, local LLM summarisation, and SSH tunneling.",
    artifact: "/remotion-assets-minimal/CARDS_001.svg",
  },
  {
    name: "Mazda AIO",
    signal: "Automotive UI",
    stack: "React / Vite / CAN bus research",
    description:
      "Custom infotainment cluster experiments for Mazda Connect hardware, turning real driving context into a cleaner instrument surface.",
    artifact: "/remotion-assets-minimal/PHONE_002.svg",
  },
  {
    name: "Yeelight Backlight",
    signal: "Physical automation",
    stack: "Python / NumPy / TCP",
    description:
      "Realtime screen-edge colour sampling for ambient lighting, tuned through smoothing, rate limits, and LAN-level reliability fixes.",
    artifact: "/remotion-assets-minimal/WARP_001.svg",
  },
];

const skills = [
  "BluePrism",
  "UiPath",
  "AutomationAnywhere",
  "Python",
  "PowerShell",
  "SQL",
  "FastAPI",
  "Docker",
  "Whisper",
  "Ollama",
  "RAG",
  "SAP",
];

const contacts = [
  ["GitHub", "https://github.com/j00bi"],
  ["X", "https://x.com/whoshusni"],
  ["Email", "mailto:husnisarafi17@gmail.com"],
];

const InlinePlayer = ({ ariaLabel, className = "", component, durationInFrames }: InlinePlayerProps) => {
  return (
    <div className={`remotion-stage ${className}`} aria-label={ariaLabel}>
      <Player
        component={component}
        durationInFrames={durationInFrames}
        fps={30}
        compositionWidth={1200}
        compositionHeight={900}
        loop
        autoPlay
        controls={false}
        clickToPlay={false}
        muted
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

const useTilt = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--tilt-x", `${(-y * 9).toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${(x * 11).toFixed(2)}deg`);
  };

  const onMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  };

  return { ref, onMouseMove, onMouseLeave };
};

export const App = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [activeSkill, setActiveSkill] = useState("Automation");
  const [cursorText, setCursorText] = useState("Designing automations that survive real operations.");
  const tilt = useTilt();
  const project = projects[activeProject];

  const skillRows = useMemo(
    () => ({
      Automation: skills.slice(0, 3),
      Engineering: skills.slice(3, 8),
      AI: skills.slice(8, 11),
      Systems: [skills[5], skills[7], skills[11]],
    }),
    []
  );

  useEffect(() => {
    const words = [
      "BluePrism reliability",
      "local LLM workflows",
      "hardware-aware interfaces",
      "quiet documentation",
    ];
    const timer = window.setInterval(() => {
      setCursorText((current) => {
        const index = words.indexOf(current);
        return words[(index + 1 + words.length) % words.length];
      });
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="portfolio-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label="Husni Sarafi home">
          <span>HS</span>
          <strong>Husni Sarafi</strong>
        </a>
        <div className="navlinks">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">RPA consultant / automation engineer</p>
          <h1>
            Interactive systems for teams that need the work to keep moving.
          </h1>
          <p className="hero-lede">
            I build automation, AI workflow experiments, and product-like tools from Kuala Lumpur, with a bias toward self-hosted systems and useful interfaces.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">Explore work</a>
            <a className="secondary-action" href="mailto:husnisarafi17@gmail.com">Start a conversation</a>
          </div>
        </div>

        <div
          className="hero-visual"
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="glass-device">
            <div className="device-header">
              <span />
              <span />
              <span />
            </div>
            <InlinePlayer
              ariaLabel="Looping Remotion 3D portfolio visual"
              className="hero-player"
              component={MinimalStarterKitShowcase}
              durationInFrames={216}
            />
            <div className="hero-asset-collage" aria-hidden="true">
              <img className="asset asset-phone" src="/remotion-assets-minimal/PHONE_001.svg" alt="" />
              <img className="asset asset-cards" src="/remotion-assets-minimal/CARDS_002.svg" alt="" />
              <img className="asset asset-warp" src="/remotion-assets-minimal/WARP_002.svg" alt="" />
            </div>
          </div>
          <div className="floating-card card-one">
            <span>99%</span>
            <p>workflow uptime maintained</p>
          </div>
          <div className="floating-card card-two">
            <span>3 yrs</span>
            <p>enterprise automation delivery</p>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Current focus">
        <span>Currently tuned for</span>
        <strong>{cursorText}</strong>
      </section>

      <section className="metrics-section" aria-label="Portfolio metrics">
        <InlinePlayer
          ariaLabel="Animated portfolio metrics"
          className="metrics-player"
          component={MetricsAnimation}
          durationInFrames={120}
        />
      </section>

      <section id="work" className="work-section">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Tap through the build stack.</h2>
        </div>
        <div className="work-grid">
          <div className="project-tabs" role="tablist" aria-label="Project selector">
            {projects.map((item, index) => (
              <button
                key={item.name}
                className={index === activeProject ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={index === activeProject}
                onClick={() => setActiveProject(index)}
              >
                <span>{item.name}</span>
                <small>{item.signal}</small>
              </button>
            ))}
          </div>

          <article className="project-card">
            <div className="artifact-wrap">
              <img src={project.artifact} alt="" />
            </div>
            <div>
              <p className="project-stack">{project.stack}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" className="skills-console">
        <div className="section-heading">
          <p className="eyebrow">Capability console</p>
          <h2>Switch modes, see the toolkit.</h2>
        </div>
        <div className="mode-switcher" role="tablist" aria-label="Skill modes">
          {Object.keys(skillRows).map((mode) => (
            <button
              key={mode}
              type="button"
              className={activeSkill === mode ? "active" : ""}
              aria-selected={activeSkill === mode}
              onClick={() => setActiveSkill(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="skill-cloud" aria-live="polite">
          {skillRows[activeSkill as keyof typeof skillRows].map((skill, index) => (
            <span key={`${activeSkill}-${skill}`} style={{ "--delay": `${index * 70}ms` } as CSSProperties}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div>
          <p className="eyebrow">Available for serious automation work</p>
          <h2>Make the boring parts reliable, then make the interface feel alive.</h2>
        </div>
        <div className="contact-links">
          {contacts.map(([label, href]) => (
            <a key={label} href={href} rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
};
