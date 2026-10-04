import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckCircle2, Info, ArrowRight, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import useSeo from "@/hooks/useSeo";

const SERVICE_IMG =
  "https://images.pexels.com/photos/9574395/pexels-photo-9574395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

function PathwayBlock({ k, t, showDisclaimer = false, image, detailsLinks = [] }) {
  const items = t(`services.${k}.items`, { returnObjects: true }) || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-7">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0A2240]">
          {t(`services.${k}.title`)}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#0A2240]/70">
          {t(`services.${k}.subtitle`)}
        </p>
        <ul className="mt-7 space-y-3.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl bg-white border border-[#1E3A8A]/10 p-4 shadow-[var(--hu-shadow-sm)]"
            >
              <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-[#0D9488]" />
              <span className="text-sm sm:text-base text-[#0A2240]/85 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        {showDisclaimer && (
          <Alert
            data-testid="services-disclaimer-alert"
            className="mt-6 bg-[#F8FAFC] border-[#1E3A8A]/20"
          >
            <Info className="h-4 w-4 text-[#1E3A8A]" />
            <AlertDescription className="text-sm text-[#0A2240]/80 leading-relaxed">
              {t("services.gcc.disclaimer")}
            </AlertDescription>
          </Alert>
        )}
        {detailsLinks.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {detailsLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0D9488]"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 rtl-flip" />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="lg:col-span-5">
        <div className="overflow-hidden rounded-xl border border-[#1E3A8A]/10 shadow-[var(--hu-shadow-md)]">
          <img src={image} alt="" className="h-64 lg:h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  useSeo("services");
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const overview = t("services.overview", { returnObjects: true }) || {};
  const overviewItems = Array.isArray(overview.items) ? overview.items : [];

  return (
    <div>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
      />

      <section className="border-b border-[#1E3A8A]/10 bg-white py-12 sm:py-14">
        <div className="hu-container">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D9488]">{overview.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2240]">{overview.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-[#0A2240]/70">{overview.subtitle}</p>
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {overviewItems.map((item, index) => {
              const isSaudi = index === 1;
              const destination = isSaudi
                ? `${base}/sfda-medical-device-registration-mdma`
                : `${base}/contact`;
              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-6">
                    <h3 className="text-lg font-bold text-[#0A2240]">{item.title}</h3>
                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#0A2240]/70">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#0A2240]/45">{overview.forLabel}</p>
                        <p className="mt-1">{item.for}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#0A2240]/45">{overview.deliverablesLabel}</p>
                        <p className="mt-1">{item.deliverables}</p>
                      </div>
                    </div>
                    <Link to={destination} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:text-[#0D9488]">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 rtl-flip" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hu-section bg-[#F8FAFC]">
        <div className="hu-container">
          <Tabs defaultValue="saudi" className="w-full">
            <TabsList className="flex flex-wrap h-auto bg-white border border-[#1E3A8A]/10 p-1.5 rounded-xl gap-1">
              <TabsTrigger value="na" data-testid="services-tab-na" className="rounded-lg data-[state=active]:bg-[#0A2240] data-[state=active]:text-white px-4 py-2 text-sm font-medium">
                {t("services.tabs.na")}
              </TabsTrigger>
              <TabsTrigger value="saudi" data-testid="services-tab-saudi" className="rounded-lg data-[state=active]:bg-[#0A2240] data-[state=active]:text-white px-4 py-2 text-sm font-medium">
                {t("services.tabs.saudi")}
              </TabsTrigger>
              <TabsTrigger value="gcc" data-testid="services-tab-gcc" className="rounded-lg data-[state=active]:bg-[#0A2240] data-[state=active]:text-white px-4 py-2 text-sm font-medium">
                {t("services.tabs.gcc")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="na" className="mt-10">
              <Reveal><PathwayBlock k="na" t={t} image={SERVICE_IMG} /></Reveal>
            </TabsContent>
            <TabsContent value="saudi" className="mt-10">
              <Reveal>
                <PathwayBlock
                  k="saudi"
                  t={t}
                  detailsLinks={[
                    { to: `${base}/sfda-medical-device-registration-mdma`, label: t("sfdaMdma.servicesLink") },
                    { to: `${base}/sfda-mds-g30-reliance-assessment`, label: t("sfdaReliance.servicesLink") },
                    { to: `${base}/sfda-technical-file-gap-assessment`, label: t("sfdaTechnicalFile.servicesLink") },
                    { to: `${base}/saudi-medical-device-distributor-regulatory-support`, label: t("sfdaDistributorSupport.servicesLink") },
                  ]}
                  image="https://images.pexels.com/photos/13891122/pexels-photo-13891122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </Reveal>
            </TabsContent>
            <TabsContent value="gcc" className="mt-10">
              <Reveal>
                <PathwayBlock
                  k="gcc"
                  t={t}
                  showDisclaimer
                  image="https://images.pexels.com/photos/36339062/pexels-photo-36339062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
              </Reveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="bg-white border-t border-[#1E3A8A]/10">
        <div className="hu-container py-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-lg font-semibold text-[#0A2240]">{t("home.ctaBand.title")}</p>
          <Link to={`${base}/contact`}>
            <Button className="bg-[#0D9488] hover:bg-[#10B981] text-white rounded-xl font-semibold h-11 px-6">
              {t("nav.cta")}
              <ChevronRight className="h-4 w-4 ms-2 rtl-flip" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
