import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/Reveal";
import useSeo from "@/hooks/useSeo";
import { trackEvent } from "@/lib/tracking";

const SERVICE = "saudi_distributor_regulatory_support";
const SFDA_GROUPING_GUIDANCE_URL = "https://www.sfda.gov.sa/sites/default/files/2026-05/MDS-G28.pdf";

export default function SfdaDistributorSupport() {
  useSeo("sfdaDistributorSupport");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const audience = t("sfdaDistributorSupport.audience.items", { returnObjects: true });
  const support = t("sfdaDistributorSupport.support.items", { returnObjects: true });
  const portfolio = t("sfdaDistributorSupport.portfolio.items", { returnObjects: true });
  const process = t("sfdaDistributorSupport.process.items", { returnObjects: true });
  const faqs = t("sfdaDistributorSupport.faq.items", { returnObjects: true });
  const contactUrl = `${base}/contact?service=${SERVICE}`;

  const ctaProps = (placement, channel) => ({
    onClick: () => {
      trackEvent("ksa_distributor_support_cta_click", { placement, service_interest: SERVICE });
      if (channel === "whatsapp") {
        trackEvent("whatsapp_click", { market: "saudi_arabia", placement, service_interest: SERVICE });
      }
    },
  });

  return (
    <div data-testid="sfda-distributor-support-page">
      <section className="relative overflow-hidden bg-[#0A2240] text-white">
        <div className="pointer-events-none absolute inset-0 hu-gradient-navy-teal opacity-90" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#5eead4]/10 blur-3xl" />
        <div className="relative hu-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl hu-fade-up">
            <Eyebrow>{t("sfdaDistributorSupport.hero.eyebrow")}</Eyebrow>
            <h1 className="hu-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("sfdaDistributorSupport.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{t("sfdaDistributorSupport.hero.subtitle")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={contactUrl} {...ctaProps("hero")}>
                <Button className="h-12 w-full rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981] sm:w-auto">
                  {t("sfdaDistributorSupport.hero.primaryCta")}
                  <ArrowRight className="ms-2 h-4 w-4 rtl-flip" />
                </Button>
              </Link>
              <a
                href="https://wa.me/966592369636"
                target="_blank"
                rel="noopener noreferrer"
                {...ctaProps("hero_whatsapp", "whatsapp")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("sfdaDistributorSupport.hero.whatsappCta")}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:max-w-xl sm:gap-6">
              {(t("sfdaDistributorSupport.hero.proof", { returnObjects: true }) || []).map((item) => (
                <div key={item} className="text-xs leading-snug text-white/70 sm:text-sm">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hu-section bg-white">
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{t("sfdaDistributorSupport.audience.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaDistributorSupport.audience.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaDistributorSupport.audience.body")}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {(Array.isArray(audience) ? audience : []).map((item, index) => {
              const Icon = [PackageCheck, FileSearch, BadgeCheck][index] || ShieldCheck;
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="h-full rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-6">
                    <Icon className="h-5 w-5 text-[#0D9488]" />
                    <h3 className="mt-5 text-base font-semibold text-[#0A2240]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/65">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hu-section border-y border-[#1E3A8A]/10 bg-[#F8FAFC]">
        <div className="hu-container">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t("sfdaDistributorSupport.support.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaDistributorSupport.support.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaDistributorSupport.support.subtitle")}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(Array.isArray(support) ? support : []).map((item, index) => {
              const Icon = [PackageCheck, ClipboardCheck, FileCheck2, FileSearch, ShieldCheck][index] || CheckCircle2;
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <div className="h-full rounded-2xl border border-[#1E3A8A]/10 bg-white p-6 shadow-[var(--hu-shadow-sm)]">
                    <Icon className="h-5 w-5 text-[#0D9488]" />
                    <h3 className="mt-4 text-base font-semibold text-[#0A2240]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/65">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hu-section bg-white">
        <div className="hu-container grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#0D9488]/20 bg-[#F0FDFA] p-6 sm:p-8">
              <Eyebrow>{t("sfdaDistributorSupport.portfolio.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0A2240] sm:text-3xl">{t("sfdaDistributorSupport.portfolio.title")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#0A2240]/70">{t("sfdaDistributorSupport.portfolio.subtitle")}</p>
              <ul className="mt-6 space-y-4">
                {(Array.isArray(portfolio) ? portfolio : []).map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#0A2240]/75">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0D9488]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-6 sm:p-8">
              <Eyebrow>{t("sfdaDistributorSupport.guidance.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0A2240] sm:text-3xl">{t("sfdaDistributorSupport.guidance.title")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#0A2240]/70">{t("sfdaDistributorSupport.guidance.body")}</p>
              <a
                href={SFDA_GROUPING_GUIDANCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0D9488]"
              >
                {t("sfdaDistributorSupport.guidance.link")}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hu-section border-y border-[#1E3A8A]/10 bg-[#F8FAFC]">
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{t("sfdaDistributorSupport.process.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaDistributorSupport.process.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaDistributorSupport.process.subtitle")}</p>
          </Reveal>
          <ol className="space-y-4 lg:col-span-8">
            {(Array.isArray(process) ? process : []).map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <li className="flex gap-4 rounded-2xl border border-[#1E3A8A]/10 bg-white p-5 sm:p-6">
                  <span className="hu-display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A2240] text-sm font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0A2240]">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#0A2240]/65">{item.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="hu-section bg-white">
        <div className="hu-container max-w-4xl">
          <Reveal>
            <Eyebrow>{t("sfdaDistributorSupport.faq.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaDistributorSupport.faq.title")}</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] px-6 sm:px-8">
            {(Array.isArray(faqs) ? faqs : []).map((item) => (
              <Reveal key={item.question}>
                <div className="py-6">
                  <h3 className="text-base font-semibold text-[#0A2240]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/65">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#0A2240]/55">{t("sfdaDistributorSupport.disclaimer")}</p>
        </div>
      </section>

      <section className="bg-[#0A2240] py-14 text-white sm:py-16">
        <div className="hu-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{t("sfdaDistributorSupport.finalCta.title")}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{t("sfdaDistributorSupport.finalCta.text")}</p>
          </div>
          <Link to={contactUrl} {...ctaProps("footer")}>
            <Button className="h-12 rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981]">
              {t("sfdaDistributorSupport.finalCta.button")}
              <ArrowRight className="ms-2 h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
