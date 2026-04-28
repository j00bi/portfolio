const contacts = [
  { label: "github.com/j00bi", href: "https://github.com/j00bi" },
  { label: "x.com/whoshusni", href: "https://x.com/whoshusni" },
  { label: "husnisarafi17@gmail.com", href: "mailto:husnisarafi17@gmail.com" },
  { label: "Kuala Lumpur, Malaysia" },
];

export const Header = () => {
  return (
    <header className="site-header">
      <div>
        <h1>Husni Sarafi</h1>
        <p>RPA Consultant · Automation Engineer</p>
      </div>
      <address aria-label="Contact links">
        {contacts.map((contact, index) => (
          <span key={contact.label}>
            {contact.href ? (
              <a href={contact.href} rel="noreferrer">
                {contact.label}
              </a>
            ) : (
              contact.label
            )}
            {index < contacts.length - 1 ? <b>·</b> : null}
          </span>
        ))}
      </address>
    </header>
  );
};
