import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Reliable flag CDN; GCC uses the UAE flag as a representative Gulf marker.
const FLAGS = {
  usa: "https://flagcdn.com/w640/us.png",
  canada: "https://flagcdn.com/w640/ca.png",
  saudi: "https://flagcdn.com/w640/sa.png",
  gcc: "https://flagcdn.com/w640/ae.png",
};
const ACCENT = { usa: "#1E3A8A", canada: "#0D9488", saudi: "#0A2240", gcc: "#0D9488" };
const FALLBACK = "linear-gradient(135deg,#0A2240 0%,#1E3A8A 50%,#0D9488 100%)";

function Tile({ m, className, active, onHover }) {
  const { t } = useTranslation();
  const isActive = active === m.key;
  const isDimmed = active !== null && !isActive;
  return (
    <div
      data-testid={m.testid}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border border-[#1E3A8A]/10 transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100"
      )}
      onMouseEnter={() => onHover(m.key)}
      onMouseLeave={() => onHover(null)}
      style={{ background: FALLBACK }}
    >
      <img
        src={FLAGS[m.key]}
        alt=""
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        className="h-full w-full object-cover transition-[filter,transform] duration-500 group-hover:scale-[1.05]"
        style={{ filter: isActive ? "grayscale(0) brightness(1)" : "grayscale(0.85) brightness(0.82)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2240]/80 via-[#0A2240]/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <div className="hu-mono text-[10px] uppercase tracking-[0.16em] text-white/75">
          {t(`home.markets.${m.key}.tag`)}
        </div>
        <div className="mt-0.5 text-sm font-semibold leading-tight text-white">
          {t(`home.markets.${m.key}.title`)}
        </div>
      </div>
    </div>
  );
}

function Row({ m, active, onHover }) {
  const { t } = useTranslation();
  const isActive = active === m.key;
  const isDimmed = active !== null && !isActive;
  const raw = t(`home.markets.${m.key}.points`, { returnObjects: true });
  const points = Array.isArray(raw) ? raw : [];
  const accent = ACCENT[m.key];
  return (
    <div
      className={cn(
        "cursor-pointer border-b border-[#1E3A8A]/10 pb-4 transition-opacity duration-300",
        isDimmed ? "opacity-50" : "opacity-100"
      )}
      onMouseEnter={() => onHover(m.key)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-3">
        <span
          className="h-3 rounded-[5px] transition-all duration-300"
          style={{ width: isActive ? "1.4rem" : "1rem", background: isActive ? accent : "rgba(10,34,64,0.2)" }}
        />
        <span
          className={cn(
            "hu-display text-lg font-semibold tracking-tight transition-colors duration-300 md:text-xl",
            isActive ? "text-[#0A2240]" : "text-[#0A2240]/70"
          )}
        >
          {t(`home.markets.${m.key}.title`)}
        </span>
        <span className="hu-mono ms-auto hidden text-[10px] uppercase tracking-[0.16em] text-[#0A2240]/45 sm:block">
          {t(`home.markets.${m.key}.tag`)}
        </span>
      </div>
      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <ul className="space-y-1.5 overflow-hidden ps-[34px]">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-[#0A2240]/70">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FocusMarkets({ markets = [] }) {
  const [active, setActive] = useState(null);
  const colA = markets.filter((_, i) => i % 2 === 0);
  const colB = markets.filter((_, i) => i % 2 === 1);

  return (
    <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Staggered flag grid */}
      <div className="flex gap-3 sm:gap-4">
        <div className="flex flex-1 flex-col gap-3 sm:gap-4">
          {colA.map((m) => (
            <Tile key={m.key} m={m} className="aspect-[4/5]" active={active} onHover={setActive} />
          ))}
        </div>
        <div className="mt-10 flex flex-1 flex-col gap-3 sm:mt-14 sm:gap-4">
          {colB.map((m) => (
            <Tile key={m.key} m={m} className="aspect-[4/5]" active={active} onHover={setActive} />
          ))}
        </div>
      </div>

      {/* Interactive market list */}
      <div className="flex flex-col gap-4">
        {markets.map((m) => (
          <Row key={m.key} m={m} active={active} onHover={setActive} />
        ))}
      </div>
    </div>
  );
}
