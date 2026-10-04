import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  Globe2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "@/components/Reveal";
import useSeo from "@/hooks/useSeo";
import { trackEvent } from "@/lib/tracking";

const SERVICE = "sfda_technical_file_gap";
const SFDA_REQUIREMENTS_URL = "https://www.sfda.gov.sa/sites/default/files/2021-12/REQ1En.pdf";

export default function SfdaTechnicalFile() {
  useSeo("sfdaTechnicalFile");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const support = t("sfdaTechnicalFile.support.items", { returnObjects: true });
  const focus = t("sfdaTechnicalFile.focus.items", { returnObjects: true });
  const process = t("sfdaTechnicalFile.process.items", { returnObjects: true });
  const faqs = t("sfdaTechnicalFile.faq.items", { returnObjects: true });
  const supportItems = Array.isArray(support) ? support : [];
  const focusItems = Array.isArray(focus) ? focus : [];
  const processItems = Array.isArray(process) ? process : [];
  const faqItems = Array.isArray(faqs) ? faqs : [];
  const contactUrl = `${base}/contact?service=${SERVICE}`;

  const ctaProps = (placement, channel) => ({
    onClick: () => {
      trackEvent("ksa_technical_file_cta_click", { placement, service_interest: SERVICE });
      if (channel === "whatsapp") {
        trackEvent("whatsapp_click", { market: "saudi_arabia", placement, service_interest: SERVICE });
      }
    },
  });

  return (
    <div data-testid="sfda-technical-file-page">
      <section className="relative overflow-hidden bg-[#0A2240] text-white">
        <div className="pointer-events-none absolute inset-0 hu-gradient-navy-teal opacity-90" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#5eead4]/10 blur-3xl" />
        <div className="relative hu-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl hu-fade-up">
            <Eyebrow>{t("sfdaTechnicalFile.hero.eyebrow")}</Eyebrow>
            <h1 className="hu-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("sfdaTechnicalFile.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{t("sfdaTechnicalFile.hero.subtitle")}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={contactUrl} {...ctaProps("hero")}>
                <Button className="h-12 w-full rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981] sm:w-auto">
                  {t("sfdaTechnicalFile.hero.primaryCta")}
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
                <MessageCircle className="me-2 h-4 w-4" />
                {t("sfdaTechnicalFile.hero.whatsappCta")}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:max-w-xl sm:gap-6">
              {(t("sfdaTechnicalFile.hero.proof", { returnObjects: true }) || []).map((item) => (
                <div key={item} className="text-xs leading-snug text-white/70 sm:text-sm">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hu-section bg-white">
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{t("sfdaTechnicalFile.audience.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaTechnicalFile.audience.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaTechnicalFile.audience.body")}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {(t("sfdaTechnicalFile.audience.items", { returnObjects: true }) || []).map((item, index) => {
              const Icon = [FileSearch, Globe2, BadgeCheck][index] || ShieldCheck;
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
            <Eyebrow>{t("sfdaTechnicalFile.support.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaTechnicalFile.support.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaTechnicalFile.support.subtitle")}</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {supportItems.map((item, index) => {
              const Icon = [FileSearch, ClipboardCheck, ShieldCheck, FileCheck2, BadgeCheck][index] || CheckCircle2;
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
              <Eyebrow>{t("sfdaTechnicalFile.focus.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0A2240] sm:text-3xl">{t("sfdaTechnicalFile.focus.title")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#0A2240]/70">{t("sfdaTechnicalFile.focus.subtitle")}</p>
              <ul className="mt-6 space-y-4">
                {focusItems.map((item) => (
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
              <Eyebrow>{t("sfdaTechnicalFile.output.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0A2240] sm:text-3xl">{t("sfdaTechnicalFile.output.title")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#0A2240]/70">{t("sfdaTechnicalFile.output.body")}</p>
              <a
                href={SFDA_REQUIREMENTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0D9488]"
              >
                {t("sfdaTechnicalFile.guidanceLink")}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="hu-section border-y border-[#1E3A8A]/10 bg-[#F8FAFC]">
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{t("sfdaTechnicalFile.process.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaTechnicalFile.process.title")}</h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaTechnicalFile.process.subtitle")}</p>
          </Reveal>
          <ol className="space-y-4 lg:col-span-8">
            {processItems.map((item, index) => (
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
            <Eyebrow>{t("sfdaTechnicalFile.faq.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaTechnicalFile.faq.title")}</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] px-6 sm:px-8">
            {faqItems.map((item) => (
              <Reveal key={item.question}>
                <div className="py-6">
                  <h3 className="text-base font-semibold text-[#0A2240]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/65">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#0A2240]/55">{t("sfdaTechnicalFile.disclaimer")}</p>
        </div>
      </section>

      <section className="bg-[#0A2240] py-14 text-white sm:py-16">
        <div className="hu-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{t("sfdaTechnicalFile.finalCta.title")}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{t("sfdaTechnicalFile.finalCta.text")}</p>
          </div>
          <Link to={contactUrl} {...ctaProps("footer")}>
            <Button className="h-12 rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981]">
              {t("sfdaTechnicalFile.finalCta.button")}
              <ArrowRight className="ms-2 h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
