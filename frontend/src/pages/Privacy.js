import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import useSeo from "@/hooks/useSeo";

export default function Privacy() {
  useSeo("privacy");
  const { t } = useTranslation();
  const { lang } = useParams();
  const base = `/${lang}`;
  const sections = t("privacy.sections", { returnObjects: true }) || [];

  return (
    <div>
      <PageHero
        eyebrow={t("privacy.hero.eyebrow")}
        title={t("privacy.hero.title")}
        subtitle={t("privacy.hero.subtitle")}
      />

      <section className="hu-section bg-[#F8FAFC]">
        <div className="hu-container">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm font-medium text-[#0D9488]">{t("privacy.updated")}</p>
              <p className="mt-4 text-base leading-relaxed text-[#0A2240]/75">
                {t("privacy.intro")}
              </p>
            </Reveal>

            <div className="mt-10 space-y-10">
              {(Array.isArray(sections) ? sections : []).map((s, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A2240]">
                      {s.title}
                    </h2>
                    {(s.body || []).map((p, j) => (
                      <p key={j} className="mt-3 text-base leading-relaxed text-[#0A2240]/75">
                        {p}
                      </p>
                    ))}
                    {Array.isArray(s.items) && s.items.length > 0 && (
                      <ul className="mt-3 space-y-2">
                        {s.items.map((it, k) => (
                          <li
                            key={k}
                            className="flex items-start gap-2.5 text-base leading-relaxed text-[#0A2240]/75"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0D9488]" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 rounded-2xl border border-[#1E3A8A]/10 bg-white p-7 shadow-[var(--hu-shadow-sm)]">
                <h2 className="text-lg font-semibold text-[#0A2240]">{t("privacy.requestTitle")}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/70">
                  {t("privacy.requestBody")}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link to={`${base}/contact`}>
                    <span className="inline-flex items-center rounded-xl bg-[#0D9488] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#10B981]">
                      {t("nav.contact")}
                    </span>
                  </Link>
                  <a
                    href={`mailto:${t("privacy.email")}`}
                    className="text-sm font-medium text-[#1E3A8A] hover:underline"
                  >
                    {t("privacy.email")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
