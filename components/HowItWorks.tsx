function PhoneMock() {
  return (
    <div className="mock-form" aria-hidden="true">
      <span className="mock-line short" />
      <span className="mock-line" />
      <span className="mock-line" />
      <span className="mock-line short" />
      <span className="mock-btn" />
    </div>
  );
}

function PeopleMock() {
  return (
    <div className="mock-people" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <svg key={index} viewBox="0 0 54 84" fill="none">
          <circle cx="27" cy="15" r="9" fill="#D79B80" />
          <path
            d="M27 6c-5 0-9 4-9 9 0 2 1 4 2 5 1-4 3-6 7-6s6 2 7 6c1-1 2-3 2-5 0-5-4-9-9-9Z"
            fill="#0F3B30"
          />
          <path
            d="M18 26h18l4 22c-2 3-5 4-8 4H22c-3 0-6-1-8-4l4-22Z"
            fill={index === 1 ? "#C0664A" : "#0F3B30"}
          />
          <path
            d="M20 30c-7 8-8 16-6 23M34 30c7 8 8 16 6 23"
            stroke="#D79B80"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M14 50c5-4 9-5 13-5s8 1 13 5"
            stroke="#174D40"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M17 62c7-5 13-6 20 0"
            stroke="#174D40"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      ))}
    </div>
  );
}

function ProfileMock() {
  return (
    <div className="mock-card" aria-hidden="true">
      <div className="mock-avatar">
        <span />
        <span />
      </div>
      <div className="mock-avatar">
        <span />
        <span />
      </div>
      <div className="mock-connect" />
    </div>
  );
}

const STEPS = [
  {
    title: "Join the community",
    copy: "Sign up in under a minute. It's free.",
    visual: <PhoneMock />,
  },
  {
    title: "Try a free camp",
    copy: "Join a wellness camp near you and experience it first-hand.",
    visual: <PeopleMock />,
  },
  {
    title: "Connect with the right service",
    copy: "Find yoga, fitness, nutrition or check-ups that suit you.",
    visual: <ProfileMock />,
  },
];

export function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head center">
          <h2>How it works</h2>
          <p>Three simple steps, starting with hello.</p>
        </div>

        <div className="steps">
          {STEPS.map((step, index) => (
            <div className="step" key={step.title}>
              <span className="step-number" aria-hidden="true">
                {index + 1}
              </span>
              <div className="step-visual">{step.visual}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
