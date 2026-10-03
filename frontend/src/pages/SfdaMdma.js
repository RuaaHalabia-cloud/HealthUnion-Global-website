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

const SERVICE = "sfda_mdma_registration";

export default function SfdaMdma() {
  useSeo("sfdaMdma");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const support = t("sfdaMdma.support.items", { returnObjects: true });
  const process = t("sfdaMdma.process.items", { returnObjects: true });
  const faqs = t("sfdaMdma.faq.items", { returnObjects: true });
  const supportItems = Array.isArray(support) ? support : [];
  const processItems = Array.isArray(process) ? process : [];
  const faqItems = Array.isArray(faqs) ? faqs : [];
  const contactUrl = `${base}/contact?service=${SERVICE}`;

  const ctaProps = (placement) => ({
    onClick: () => trackEvent("ksa_mdma_cta_click", { placement, service_interest: SERVICE }),
  });

  return (
    <div data-testid="sfda-mdma-page">
      <section className="relative overflow-hidden bg-[#0A2240] text-white">
        <div className="pointer-events-none absolute inset-0 hu-gradient-navy-teal opacity-90" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#5eead4]/10 blur-3xl" />
        <div className="relative hu-container py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl hu-fade-up">
            <Eyebrow>{t("sfdaMdma.hero.eyebrow")}</Eyebrow>
            <h1 className="hu-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t("sfdaMdma.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {t("sfdaMdma.hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to={contactUrl} {...ctaProps("hero") }>
                <Button className="h-12 w-full rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981] sm:w-auto">
                  {t("sfdaMdma.hero.primaryCta")}
                  <ArrowRight className="ms-2 h-4 w-4 rtl-flip" />
                </Button>
              </Link>
              <a
                href="https://wa.me/966592369636"
                target="_blank"
                rel="noopener noreferrer"
                {...ctaProps("hero_whatsapp")}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle className="me-2 h-4 w-4" />
                {t("sfdaMdma.hero.whatsappCta")}
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:max-w-xl sm:gap-6">
              {(t("sfdaMdma.hero.proof", { returnObjects: true }) || []).map((item) => (
                <div key={item} className="text-xs leading-snug text-white/70 sm:text-sm">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hu-section bg-white">
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{t("sfdaMdma.audience.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">
              {t("sfdaMdma.audience.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaMdma.audience.body")}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {(t("sfdaMdma.audience.items", { returnObjects: true }) || []).map((item, index) => {
              const Icon = [Globe2, FileSearch, BadgeCheck][index] || ShieldCheck;
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
            <Eyebrow>{t("sfdaMdma.support.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">
              {t("sfdaMdma.support.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaMdma.support.subtitle")}</p>
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
        <div className="hu-container grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{t("sfdaMdma.process.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">
              {t("sfdaMdma.process.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">{t("sfdaMdma.process.subtitle")}</p>
          </Reveal>
          <ol className="space-y-4 lg:col-span-8">
            {processItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <li className="flex gap-4 rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-5 sm:p-6">
                  <span className="hu-display flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A2240] text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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

      <section className="hu-section border-y border-[#1E3A8A]/10 bg-[#F8FAFC]">
        <div className="hu-container max-w-4xl">
          <Reveal>
            <Eyebrow>{t("sfdaMdma.faq.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240] sm:text-4xl">{t("sfdaMdma.faq.title")}</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-[#1E3A8A]/10 rounded-2xl border border-[#1E3A8A]/10 bg-white px-6 sm:px-8">
            {faqItems.map((item) => (
              <Reveal key={item.question}>
                <div className="py-6">
                  <h3 className="text-base font-semibold text-[#0A2240]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/65">{item.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#0A2240]/55">{t("sfdaMdma.disclaimer")}</p>
        </div>
      </section>

      <section className="bg-[#0A2240] py-14 text-white sm:py-16">
        <div className="hu-container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">{t("sfdaMdma.finalCta.title")}</h2>
            <p className="mt-3 text-base leading-relaxed text-white/70">{t("sfdaMdma.finalCta.text")}</p>
          </div>
          <Link to={contactUrl} {...ctaProps("footer") }>
            <Button className="h-12 rounded-xl bg-[#0D9488] px-6 font-semibold text-white hover:bg-[#10B981]">
              {t("sfdaMdma.finalCta.button")}
              <ArrowRight className="ms-2 h-4 w-4 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
