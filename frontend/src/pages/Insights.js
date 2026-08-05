import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import useSeo from "@/hooks/useSeo";
import { getPosts } from "@/lib/api";

function formatDate(dateStr, lang) {
  try {
    return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-US", {
      dateStyle: "medium",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function Insights() {
  useSeo("insights");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", lang],
    queryFn: () => getPosts(lang),
  });

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category))),
    [posts]
  );

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [posts, category, search]);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== (featured && featured.id));

  return (
    <div>
      <PageHero
        eyebrow={t("insights.hero.eyebrow")}
        title={t("insights.hero.title")}
        subtitle={t("insights.hero.subtitle")}
      />

      <section className="hu-section bg-[#F8FAFC]">
        <div className="hu-container">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 h-4 w-4 text-[#0A2240]/40" />
              <Input
                data-testid="blog-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("insights.searchPlaceholder")}
                className="ps-10 bg-white border-[#1E3A8A]/15 h-11"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="blog-category-select" className="w-full sm:w-64 bg-white border-[#1E3A8A]/15 h-11">
                <SelectValue placeholder={t("insights.allCategories")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("insights.allCategories")}</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <p className="text-[#0A2240]/60">…</p>
          ) : filtered.length === 0 ? (
            <p data-testid="insights-empty" className="text-[#0A2240]/60">{t("insights.empty")}</p>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Reveal>
                  <Link
                    to={`${base}/insights/${featured.slug}`}
                    data-testid="blog-featured-card"
                    className="group block mb-8"
                  >
                    <article className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl bg-white border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-sm)] hover:shadow-[var(--hu-shadow-md)] transition-shadow">
                      <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                        <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-7 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-[#0D9488] hover:bg-[#0D9488] text-white">{t("insights.featured")}</Badge>
                          <Badge variant="outline" className="border-[#1E3A8A]/30 text-[#1E3A8A]">{featured.category}</Badge>
                        </div>
                        <h2 className="mt-4 text-2xl lg:text-3xl font-bold tracking-tight text-[#0A2240] leading-snug">
                          {featured.title}
                        </h2>
                        <p className="mt-3 text-base text-[#0A2240]/70 leading-relaxed line-clamp-3">
                          {featured.excerpt}
                        </p>
                        <div className="mt-5 flex items-center gap-4 text-xs text-[#0A2240]/55">
                          <span>{formatDate(featured.date, lang)}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {featured.reading_time} {t("common.minRead")}
                          </span>
                        </div>
                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] group-hover:text-[#0D9488] transition-colors">
                          {t("common.readArticle")}
                          <ArrowRight className="h-4 w-4 rtl-flip" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <Reveal key={post.id} delay={i * 0.06}>
                    <Link to={`${base}/insights/${post.slug}`} data-testid="blog-card" className="group block h-full">
                      <article className="h-full overflow-hidden rounded-xl bg-white border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-sm)] hover:shadow-[var(--hu-shadow-md)] hover:-translate-y-0.5 transition-[transform,box-shadow]">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <div className="p-6">
                          <Badge variant="outline" className="border-[#1E3A8A]/30 text-[#1E3A8A]">{post.category}</Badge>
                          <h3 className="mt-3 text-lg font-semibold text-[#0A2240] leading-snug line-clamp-2">{post.title}</h3>
                          <p className="mt-2 text-sm text-[#0A2240]/65 line-clamp-2">{post.excerpt}</p>
                          <div className="mt-4 flex items-center gap-4 text-xs text-[#0A2240]/55">
                            <span>{formatDate(post.date, lang)}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {post.reading_time} {t("common.minRead")}
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
