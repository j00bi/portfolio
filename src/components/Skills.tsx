const skills = [
  {
    label: "RPA Platforms",
    body: "BluePrism, UiPath, AutomationAnywhere — from process discovery to deployment and monitoring at enterprise scale.",
  },
  {
    label: "Integration",
    body: "SQL databases, REST APIs, SAP ERP, and IRBM middleware. End-to-end pipelines from data extraction through transformation to upload.",
  },
  {
    label: "Languages",
    body: "Python, JavaScript, VB.Net, PowerShell, SQL. Python is the primary language for personal projects and scripting.",
  },
  {
    label: "AI & LLMs",
    body: "Whisper STT, Ollama (local LLMs), RAG pipelines with ChromaDB, agentic workflows, bilingual MY/EN NLP.",
  },
  {
    label: "Infrastructure",
    body: "Docker, SSH tunneling, Oracle Cloud, FastAPI backends. Self-hosting over SaaS by default.",
  },
  {
    label: "Documentation",
    body: "SOPs, FSD, SDD, SIT test scripts, technical READMEs. Quarterly documentation cycles delivered consistently.",
  },
];

export const Skills = () => {
  return (
    <section className="section skills-section" aria-labelledby="skills-heading">
      <div className="section-kicker">Core Skills</div>
      <h2 id="skills-heading">Systems, automation, and durable delivery.</h2>
      <div className="skill-table">
        {skills.map((skill) => (
          <article key={skill.label}>
            <h3>{skill.label}</h3>
            <p>{skill.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
