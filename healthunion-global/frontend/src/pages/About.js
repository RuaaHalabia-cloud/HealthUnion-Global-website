import { useTranslation } from "react-i18next";
import { MapPin, ShieldCheck, Globe2, Layers, GitMerge, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal, Eyebrow } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import useSeo from "@/hooks/useSeo";

export default function About() {
  useSeo("about");
  const { t } = useTranslation();

  const units = [
    { key: "na", icon: Globe2, img: "https://images.pexels.com/photos/13891122/pexels-photo-13891122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
    { key: "saudi", icon: ShieldCheck, img: "https://images.pexels.com/photos/6213098/pexels-photo-6213098.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
  ];
  const valueIcons = [Layers, GitMerge, Lock];
  const values = t("about.values.items", { returnObjects: true }) || [];

  return (
    <div>
      <PageHero
        eyebrow={t("about.hero.eyebrow")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <section className="hu-section bg-[#F8FAFC]">
        <div className="hu-container space-y-10">
          {units.map((u, i) => {
            const Icon = u.icon;
            const reverse = i % 2 === 1;
            return (
              <Reveal key={u.key}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className={`lg:col-span-5 ${reverse ? "lg:order-2" : ""}`}>
                    <div className="overflow-hidden rounded-xl border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-md)]">
                      <img src={u.img} alt="" className="h-72 w-full object-cover" />
                    </div>
                  </div>
                  <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A2240] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-[#0A2240]">
                      {t(`about.${u.key}.title`)}
                    </h2>
                    <Badge variant="outline" className="mt-3 border-[#1E3A8A]/30 text-[#1E3A8A] font-medium">
                      <MapPin className="h-3.5 w-3.5 me-1" />
                      {t(`about.${u.key}.location`)}
                    </Badge>
                    <p className="mt-4 text-base leading-relaxed text-[#0A2240]/75">
                      {t(`about.${u.key}.desc`)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="hu-section bg-white border-t border-[#1E3A8A]/10">
        <div className="hu-container">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t("about.hero.eyebrow")}</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0A2240]">
              {t("about.values.title")}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = valueIcons[i] || Layers;
              return (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="h-full rounded-xl bg-[#F8FAFC] border border-[#1E3A8A]/10 p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0D9488]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#0A2240]">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#0A2240]/70">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
