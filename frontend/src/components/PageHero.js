import { Eyebrow } from "@/components/Reveal";

// Light, editorial page hero (Swiss / high-contrast direction).
export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden border-b border-[#1E3A8A]/10 bg-gradient-to-b from-[#EEF2F6] to-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D9488]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-[#1E3A8A]/5 blur-3xl" />
      <div className="relative hu-container py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl hu-fade-up">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="hu-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0A2240] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#0A2240]/70">{subtitle}</p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
