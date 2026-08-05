// HealthUnion Global logo: globe grid + protective shield, navy-to-teal gradient.
export const LogoMark = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="huLogoGrad" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0A2240" />
        <stop offset="0.5" stopColor="#1E3A8A" />
        <stop offset="1" stopColor="#0D9488" />
      </linearGradient>
    </defs>
    {/* Globe outer circle */}
    <circle cx="32" cy="32" r="26" stroke="url(#huLogoGrad)" strokeWidth="2.5" />
    {/* Globe meridians */}
    <ellipse cx="32" cy="32" rx="11" ry="26" stroke="url(#huLogoGrad)" strokeWidth="1.6" opacity="0.65" />
    <line x1="6" y1="32" x2="58" y2="32" stroke="url(#huLogoGrad)" strokeWidth="1.6" opacity="0.5" />
    <path d="M10 20 H54" stroke="url(#huLogoGrad)" strokeWidth="1.4" opacity="0.4" />
    <path d="M10 44 H54" stroke="url(#huLogoGrad)" strokeWidth="1.4" opacity="0.4" />
    {/* Shield */}
    <path
      d="M32 22 L43 26 V35 C43 42 38 46.5 32 49 C26 46.5 21 42 21 35 V26 Z"
      fill="url(#huLogoGrad)"
    />
    {/* Check / cross inside shield */}
    <path
      d="M27.5 35.5 L31 39 L37 31.5"
      stroke="#fff"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo = ({ onDark = false, size = 36 }) => (
  <span className="inline-flex items-center gap-2.5">
    <LogoMark size={size} />
    <span className="leading-none">
      <span
        className={`block text-[17px] font-bold tracking-tight ${
          onDark ? "text-white" : "text-[#0A2240]"
        }`}
      >
        HealthUnion
      </span>
      <span
        className={`block text-[12px] font-semibold tracking-[0.18em] uppercase ${
          onDark ? "text-[#5eead4]" : "text-[#0D9488]"
        }`}
      >
        Global
      </span>
    </span>
  </span>
);
