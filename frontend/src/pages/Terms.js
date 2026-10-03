import { useTranslation } from "react-i18next";
import PageHero from "@/components/PageHero";
import useSeo from "@/hooks/useSeo";

export default function Terms() {
  useSeo("terms");
  const { t } = useTranslation();
  const sections = t("termsPage.sections", { returnObjects: true });
  const sectionList = Array.isArray(sections) ? sections : [];

  return (
    <div>
      <PageHero
        eyebrow={t("termsPage.hero.eyebrow")}
        title={t("termsPage.hero.title")}
        subtitle={t("termsPage.hero.subtitle")}
      />
      <section className="hu-section bg-white">
        <div className="hu-container max-w-3xl">
          <p className="text-base leading-relaxed text-[#0A2240]/75">{t("termsPage.intro")}</p>
          <div className="mt-10 space-y-9">
            {sectionList.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-bold text-[#0A2240]">{section.title}</h2>
                {(section.body || []).map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-base leading-relaxed text-[#0A2240]/75">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
          <p className="mt-12 rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-5 text-sm leading-relaxed text-[#0A2240]/65">
            {t("termsPage.contact")}
          </p>
        </div>
      </section>
    </div>
  );
}
