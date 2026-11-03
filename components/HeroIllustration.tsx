export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 520"
      role="img"
      aria-labelledby="hero-art-title"
      xmlns="http://www.w3.org/2000/svg"
      className="hero-illustration"
    >
      <title id="hero-art-title">
        A person sitting cross-legged in a calm yoga pose, surrounded by small
        labels for nutrition, fitness, meditation and health check-ups
      </title>

      <circle cx="260" cy="272" r="214" fill="#DCE7DF" />
      <path
        d="M260 58a214 214 0 0 1 0 428 214 214 0 0 1 0-428Z"
        fill="none"
        stroke="#E9E2D0"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <circle cx="260" cy="240" r="132" fill="#E9E2D0" />

      <path
        d="M92 330c-14-24-6-54 18-64 24-10 50 6 50 32"
        fill="none"
        stroke="#B9CFC0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M428 190c16-20 42-20 54-2 12 18 2 42-20 48"
        fill="none"
        stroke="#B9CFC0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="452" cy="292" r="7" fill="#C0664A" opacity="0.55" />
      <circle cx="74" cy="160" r="5" fill="#C0664A" opacity="0.55" />
      <circle cx="396" cy="410" r="6" fill="#0F3B30" opacity="0.2" />

      {/* Mat */}
      <rect x="140" y="374" width="240" height="16" rx="8" fill="#C0664A" />
      <rect x="168" y="384" width="184" height="6" rx="3" fill="#A64B2E" opacity="0.35" />

      {/* Figure */}
      <g>
        <circle cx="260" cy="146" r="14" fill="#0F3B30" />
        <circle cx="260" cy="176" r="29" fill="#d79b80" />
        <path
          d="M231 176c0-20 13-35 29-35s29 15 29 35c-7-11-17-16-29-16s-22 5-29 16Z"
          fill="#0F3B30"
        />
        <path
          d="M233 204c8-5 18-7 27-7s19 2 27 7l11 80c-11 9-24 13-38 13s-27-4-38-13l11-80Z"
          fill="#C0664A"
        />
        <path
          d="M240 214c12 6 28 6 40 0"
          fill="none"
          stroke="#A64B2E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M230 210c-15 20-24 42-27 64"
          fill="none"
          stroke="#d79b80"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M290 210c15 20 24 42 27 64"
          fill="none"
          stroke="#d79b80"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx="202" cy="279" r="8" fill="#d79b80" />
        <circle cx="318" cy="279" r="8" fill="#d79b80" />
        <path
          d="M190 302c19-21 51-29 70-29s51 8 70 29c-15 30-41 47-70 47s-55-17-70-47Z"
          fill="#174D40"
        />
        <path
          d="M205 310c25 4 55 16 55 34-20 3-41-2-55-15Z"
          fill="#0F3B30"
        />
        <path
          d="M315 310c-25 4-55 16-55 34 20 3 41-2 55-15Z"
          fill="#0F3B30"
        />
        <path
          d="M239 347c7 6 35 6 42 0"
          fill="none"
          stroke="#F7F3EA"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Floating chips */}
      <g>
        <rect x="18" y="86" width="146" height="50" rx="25" fill="#FFFFFF" stroke="#E9E2D0" />
        <circle cx="45" cy="111" r="15" fill="#DCE7DF" />
        <path
          d="M45 104c5 0 8 4 8 8-5 0-8-4-8-8Zm0 0c-5 0-8 4-8 8 5 0 8-4 8-8Zm0 8v6"
          fill="none"
          stroke="#0F3B30"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <text
          x="69"
          y="117"
          fill="#0F3B30"
          fontFamily="Segoe UI, sans-serif"
          fontSize="15"
          fontWeight="600"
        >
          Nutrition
        </text>

        <rect x="356" y="66" width="152" height="50" rx="25" fill="#FFFFFF" stroke="#E9E2D0" />
        <circle cx="383" cy="91" r="15" fill="#DCE7DF" />
        <circle cx="383" cy="88" r="4.5" fill="none" stroke="#0F3B30" strokeWidth="1.8" />
        <path
          d="M376 99c2-5 5-7 7-7s5 2 7 7"
          fill="none"
          stroke="#0F3B30"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <text
          x="407"
          y="97"
          fill="#0F3B30"
          fontFamily="Segoe UI, sans-serif"
          fontSize="15"
          fontWeight="600"
        >
          Meditation
        </text>

        <rect x="10" y="252" width="130" height="50" rx="25" fill="#FFFFFF" stroke="#E9E2D0" />
        <circle cx="37" cy="277" r="15" fill="#DCE7DF" />
        <path
          d="M29 274h16M29 280h16M32 271v9M42 271v9"
          fill="none"
          stroke="#0F3B30"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <text
          x="61"
          y="283"
          fill="#0F3B30"
          fontFamily="Segoe UI, sans-serif"
          fontSize="15"
          fontWeight="600"
        >
          Fitness
        </text>

        <rect x="342" y="352" width="162" height="50" rx="25" fill="#FFFFFF" stroke="#E9E2D0" />
        <circle cx="369" cy="377" r="15" fill="#DCE7DF" />
        <path
          d="M369 385c-6-3-8-7-8-11 0-2.5 2-4.5 4.5-4.5 1.5 0 3 .8 3.5 2 .5-1.2 2-2 3.5-2 2.5 0 4.5 2 4.5 4.5 0 4-2 8-8 11Z"
          fill="none"
          stroke="#0F3B30"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <text
          x="393"
          y="383"
          fill="#0F3B30"
          fontFamily="Segoe UI, sans-serif"
          fontSize="15"
          fontWeight="600"
        >
          Check-up
        </text>
      </g>

      <path
        d="M164 130c6-4 12-4 18 0M336 300c6-4 12-4 18 0"
        fill="none"
        stroke="#C0664A"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
