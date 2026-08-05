import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ShieldCheck,
  Globe2,
  FileCheck2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal, Eyebrow } from "@/components/Reveal";
import FocusMarkets from "@/components/FocusMarkets";
import useSeo from "@/hooks/useSeo";
import { getPosts } from "@/lib/api";

const HERO_IMG =
  "https://images.pexels.com/photos/6213098/pexels-photo-6213098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400";

export default function Home() {
  useSeo("home");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const Arrow = lang === "ar" ? ChevronRight : ArrowRight;

  const { data: posts = [] } = useQuery({
    queryKey: ["posts", lang],
    queryFn: () => getPosts(lang),
  });

  const markets = [
    { key: "usa", testid: "market-card-usa" },
    { key: "canada", testid: "market-card-canada" },
    { key: "saudi", testid: "market-card-saudi" },
    { key: "gcc", testid: "market-card-gcc" },
  ];

  const trustItems = t("home.trust.items", { returnObjects: true }) || [];
  const heroStats = t("home.hero.stats", { returnObjects: true }) || [];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A2240]">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 hu-gradient-navy-teal opacity-90" />
          <div className="absolute inset-0 hu-noise" />
        </div>
        <div className="relative hu-container py-24 sm:py-28 lg:py-36">
          <div className="max-w-3xl hu-fade-up">
            <Eyebrow light>{t("home.hero.eyebrow")}</Eyebrow>
            <h1 className="hu-display mt-5 text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold text-white leading-[1.04]">
              {t("home.hero.headline")}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75 max-w-2xl">
              {t("home.hero.subheadline")}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link to={`${base}/contact`}>
                <Button
                  data-testid="hero-primary-cta"
                  size="lg"
                  className="bg-[#0D9488] hover:bg-[#10B981] text-white rounded-xl font-semibold h-12 px-7 w-full sm:w-auto"
                >
                  {t("home.hero.primaryCta")}
                  <Arrow className="h-4 w-4 ms-2 rtl-flip" />
                </Button>
              </Link>
              <Link to={`${base}/services`}>
                <Button
                  data-testid="hero-secondary-cta"
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white rounded-xl font-semibold h-12 px-7 w-full sm:w-auto"
                >
                  {t("home.hero.secondaryCta")}
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl border-t border-white/10 pt-7">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="hu-display text-2xl sm:text-3xl font-bold text-[#5eead4]">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-[#1E3A8A]/10">
        <div className="hu-container py-7">
          <p className="text-center text-xs font-medium uppercase tracking-[0.14em] text-[#0A2240]/55">
            {t("home.trust.title")}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <span key={item} className="text-sm font-semibold text-[#1E3A8A]/80">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS MARKETS */}
      <section id="focus-markets" className="hu-section scroll-mt-20 bg-[#F8FAFC]">
        <div className="hu-container">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t("home.markets.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0A2240]">
              {t("home.markets.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">
              {t("home.markets.subtitle")}
            </p>
          </Reveal>

          <FocusMarkets markets={markets} />
        </div>
      </section>

      {/* PATHWAYS — how we work */}
      <section className="hu-section bg-white">
        <div className="hu-container">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <Reveal>
              <Eyebrow>{t("home.pathways.eyebrow")}</Eyebrow>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0A2240]">
                {t("home.pathways.title")}
              </h2>
            </Reveal>
            <Reveal className="self-end">
              <p className="text-base leading-relaxed text-[#0A2240]/70">
                {t("home.pathways.subtitle")}
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Featured: North America */}
            <Reveal className="md:row-span-2">
              <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl hu-gradient-navy-teal p-8 text-white">
                <div className="pointer-events-none absolute inset-0 hu-noise opacity-60" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div className="hu-display mt-6 text-5xl font-bold tracking-tight">01</div>
                  <h3 className="mt-2 text-2xl font-bold">{t("home.pathways.na.title")}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">{t("home.pathways.na.desc")}</p>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-2 border-t border-white/20 pt-5">
                  {["FDA", "Health Canada", "ISO 13485"].map((c) => (
                    <span key={c} className="hu-mono rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-wide text-white/85">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Saudi Arabia */}
            <Reveal delay={0.06}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-7 transition-colors hover:border-[#0D9488]/30">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0D9488]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="hu-display text-2xl font-bold text-[#0D9488]">02</div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#0A2240]">{t("home.pathways.saudi.title")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/70">{t("home.pathways.saudi.desc")}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["SFDA", "GHAD", "MDMA"].map((c) => (
                    <span key={c} className="hu-mono rounded-full border border-[#1E3A8A]/15 bg-white px-3 py-1 text-[11px] tracking-wide text-[#0A2240]/65">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Other GCC */}
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-7 transition-colors hover:border-[#1E3A8A]/30">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A]">
                      <FileCheck2 className="h-5 w-5" />
                    </div>
                    <div className="hu-display text-2xl font-bold text-[#1E3A8A]">03</div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#0A2240]">{t("home.pathways.gcc.title")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/70">{t("home.pathways.gcc.desc")}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["UAE", "Qatar", "Kuwait", "Bahrain", "Oman"].map((c) => (
                    <span key={c} className="hu-mono rounded-full border border-[#1E3A8A]/15 bg-white px-3 py-1 text-[11px] tracking-wide text-[#0A2240]/65">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-9">
            <Link to={`${base}/services`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:text-[#0D9488] transition-colors">
              {t("common.viewServices")}
              <ChevronRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="hu-section bg-[#F8FAFC]">
        <div className="hu-container">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t("home.insightsPreview.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0A2240]">
              {t("home.insightsPreview.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#0A2240]/70">
              {t("home.insightsPreview.subtitle")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {posts.slice(0, 3).map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <Link to={`${base}/insights/${post.slug}`} className="group block h-full">
                  <article className="h-full overflow-hidden rounded-xl bg-white border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-sm)] hover:shadow-[var(--hu-shadow-md)] hover:-translate-y-0.5 transition-[transform,box-shadow]">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="border-[#1E3A8A]/30 text-[#1E3A8A] font-medium">
                        {post.category}
                      </Badge>
                      <h3 className="mt-3 text-lg font-semibold text-[#0A2240] leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#0A2240]/65 line-clamp-2">{post.excerpt}</p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-9">
            <Link to={`${base}/insights`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] hover:text-[#0D9488] transition-colors">
              {t("common.allInsights")}
              <ChevronRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative overflow-hidden bg-[#0A2240]">
        <div className="absolute inset-0 hu-gradient-navy-teal opacity-95" />
        <div className="absolute inset-0 hu-noise" />
        <div className="relative hu-container py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {t("home.ctaBand.title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                {t("home.ctaBand.subtitle")}
              </p>
            </div>
            <Link to={`${base}/contact`} className="shrink-0">
              <Button
                size="lg"
                className="bg-white text-[#0A2240] hover:bg-white/90 rounded-xl font-semibold h-12 px-7"
              >
                {t("home.ctaBand.cta")}
                <Arrow className="h-4 w-4 ms-2 rtl-flip" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
