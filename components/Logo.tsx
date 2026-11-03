type LogoProps = {
  cream?: boolean;
  small?: boolean;
  className?: string;
};

export function Logo({ cream = false, small = false, className = "" }: LogoProps) {
  return (
    <span
      className={`logo ${cream ? "logo--cream" : ""} ${small ? "logo--small" : ""} ${className}`.trim()}
    >
      <svg
        viewBox="0 0 158 48"
        role="img"
        aria-label="Ayovira"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="2"
          y="35"
          fill="currentColor"
          style={{ fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif" }}
          fontSize="37"
          fontWeight="600"
          letterSpacing="-1.6"
        >
          ayovira
        </text>
        <path
          d="M23 41c9 5 21 5 30-1"
          fill="none"
          stroke="var(--terracotta)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
