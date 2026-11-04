import { Check, Mail } from "lucide-react";

function CampIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-labelledby="camp-art-title"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="camp-art-title">
        A small group practising yoga together outdoors at a community wellness
        camp
      </title>
      <rect width="480" height="360" rx="16" fill="#DCE7DF" />
      <circle cx="390" cy="78" r="42" fill="#E9E2D0" />
      <path
        d="M0 268c58-24 110-22 160 0 62 28 134 28 210-6 42-19 79-21 110-10v108H0Z"
        fill="#CFE0D3"
      />
      <path
        d="M0 300c70-18 138-14 200 8 66 24 140 20 280-22v74H0Z"
        fill="#B9CFC0"
      />

      <g transform="translate(78 148)">
        <rect x="-12" y="126" width="120" height="10" rx="5" fill="#C0664A" />
        <circle cx="48" cy="18" r="14" fill="#D79B80" />
        <path
          d="M34 18c0-10 6-17 14-17s14 7 14 17c-3-6-8-8-14-8s-11 2-14 8Z"
          fill="#0F3B30"
        />
        <path
          d="M36 36c7-4 18-4 24 0l6 44c-8 5-28 5-36 0l6-44Z"
          fill="#C0664A"
        />
        <path
          d="M30 44c-9 12-12 24-12 34M66 44c9 12 12 24 12 34"
          stroke="#D79B80"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M20 82c12-10 24-15 28-15s16 5 28 15c-8 16-18 24-28 24s-20-8-28-24Z"
          fill="#0F3B30"
        />
      </g>

      <g transform="translate(214 166)">
        <rect x="-10" y="108" width="108" height="9" rx="4.5" fill="#C0664A" />
        <circle cx="44" cy="16" r="13" fill="#D79B80" />
        <path
          d="M31 16c0-9 6-15 13-15s13 6 13 15c-3-5-7-7-13-7s-10 2-13 7Z"
          fill="#0F3B30"
        />
        <path
          d="M33 32c6-3 16-3 22 0l5 38c-7 4-25 4-32 0l5-38Z"
          fill="#174D40"
        />
        <path
          d="M28 39c-8 10-11 21-11 30M60 39c8 10 11 21 11 30"
          stroke="#D79B80"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M19 71c10-9 21-13 25-13s15 4 25 13c-7 14-16 21-25 21s-18-7-25-21Z"
          fill="#0F3B30"
        />
      </g>

      <g transform="translate(338 176)">
        <rect x="-8" y="96" width="96" height="8" rx="4" fill="#C0664A" />
        <circle cx="40" cy="14" r="12" fill="#D79B80" />
        <path
          d="M28 14c0-8 5-14 12-14s12 6 12 14c-3-5-7-6-12-6s-9 1-12 6Z"
          fill="#0F3B30"
        />
        <path
          d="M30 29c6-3 14-3 20 0l4 34c-6 4-22 4-28 0l4-34Z"
          fill="#C0664A"
        />
        <path
          d="M25 35c-7 9-9 19-9 26M55 35c7 9 9 19 9 26"
          stroke="#D79B80"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M18 62c9-8 18-11 22-11s13 3 22 11c-6 12-14 18-22 18s-16-6-22-18Z"
          fill="#0F3B30"
        />
      </g>

      <path
        d="M56 96c12-10 25-13 38-8M90 122c8-4 16-3 22 2"
        stroke="#C0664A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M406 190c8-18 22-28 42-30M434 218c6-9 14-14 24-15"
        stroke="#174D40"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
}

const CAMP_POINTS = [
  "Guided yoga and movement",
  "Nutrition awareness",
  "Time to ask questions",
];

export function Camps() {
  const mailto =
    "mailto:theayovira@gmail.com?subject=Wellness%20camp%20request&body=Hello%20Ayovira%2C%0A%0AI%27d%20like%20to%20request%20a%20wellness%20camp.%0A%0AName%3A%0AOrganisation%3A%0ACity%3A%0APreferred%20date%3A%0A%0AThank%20you.";

  return (
    <section className="section section-camps" id="camps">
      <div className="container camps-grid">
        <div className="camps-art">
          <CampIllustration />
        </div>

        <div className="camps-copy">
          <h2>
            Free wellness camps for schools, workplaces and communities in
            Faridabad
          </h2>
          <p>
            Short, welcoming sessions that make wellness feel simple and close to
            home.
          </p>

          <ul className="check-list">
            {CAMP_POINTS.map((point) => (
              <li key={point}>
                <Check size={18} strokeWidth={2.4} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>

          <a className="btn btn-primary" href={mailto}>
            <Mail size={18} aria-hidden="true" />
            Request a camp
          </a>
          <p className="small-note">Starting in Faridabad.</p>
        </div>
      </div>
    </section>
  );
}
