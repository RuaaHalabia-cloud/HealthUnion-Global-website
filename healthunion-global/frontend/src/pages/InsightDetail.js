import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/api";

function formatDate(dateStr, lang) {
  try {
    return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-US", {
      dateStyle: "long",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function InsightDetail() {
  const { lang, slug } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", slug, lang],
    queryFn: () => getPost(slug, lang),
    retry: false,
  });

  if (isLoading) {
    return <div className="hu-container py-32 text-center text-[#0A2240]/60">…</div>;
  }
  if (isError || !post) {
    return (
      <div className="hu-container py-32 text-center">
        <p className="text-[#0A2240]/70">404</p>
        <Link to={`${base}/insights`} className="mt-4 inline-block text-[#1E3A8A] font-semibold">
          {t("common.backToInsights")}
        </Link>
      </div>
    );
  }

  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A2240]">
        <div className="absolute inset-0">
          <img src={post.image} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 hu-gradient-navy-teal opacity-85" />
        </div>
        <div className="relative hu-container py-16 sm:py-20">
          <Link
            to={`${base}/insights`}
            data-testid="back-to-insights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 rtl-flip" />
            {t("common.backToInsights")}
          </Link>
          <Badge className="mt-6 bg-white/15 hover:bg-white/15 text-white border-0">{post.category}</Badge>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center gap-5 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date, lang)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.reading_time} {t("common.minRead")}
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="hu-section bg-white">
        <div className="hu-container">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-[#0A2240]/80 font-medium">
              {post.excerpt}
            </p>
            <Separator className="my-8 bg-[#1E3A8A]/10" />
            <div className="space-y-6">
              {(post.body || []).map((para, i) => (
                <p key={i} className="text-base leading-[1.85] text-[#0A2240]/80">
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-12 rounded-2xl hu-gradient-navy-teal p-8 text-center">
              <h3 className="text-xl font-bold text-white">{t("home.ctaBand.title")}</h3>
              <p className="mt-2 text-sm text-white/80">{t("home.ctaBand.subtitle")}</p>
              <Link to={`${base}/contact`} className="mt-5 inline-block">
                <Button className="bg-white text-[#0A2240] hover:bg-white/90 rounded-xl font-semibold">
                  {t("nav.cta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
