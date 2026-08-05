import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function Footer() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const base = `/${lang}`;
  const year = new Date().getFullYear();

  const explore = [
    { to: `${base}/services`, label: t("nav.services") },
    { to: `${base}/about`, label: t("nav.about") },
    { to: `${base}/insights`, label: t("nav.insights") },
    { to: `${base}/contact`, label: t("nav.contact") },
    { to: `${base}/privacy`, label: t("footer.privacy") },
  ];
  const markets = t("footer.marketsList", { returnObjects: true });
  const marketList = Array.isArray(markets) ? markets : [];

  const ColHeading = ({ children }) => (
    <h4 className="hu-mono mb-5 text-[11px] uppercase tracking-[0.18em] text-[#5eead4]/80">
      {children}
    </h4>
  );
  const FooterLink = ({ to, children }) => (
    <Link
      to={to}
      className="group inline-flex w-fit text-sm text-white/65 transition-colors hover:text-white"
    >
      <span className="bg-gradient-to-r from-[#5eead4] to-[#5eead4] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
    </Link>
  );

  return (
    <footer data-testid="site-footer" className="relative bg-[#0A2240] text-white">
      <div className="h-px w-full hu-gradient-navy-teal opacity-70" />
      <div className="hu-container py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <Logo onDark size={36} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {t("footer.tagline")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={`${base}/contact`}
                data-testid="footer-book-consultation-button"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#10B981]"
              >
                {t("nav.cta")}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${t("contact.info.email")}`}
                aria-label={t("contact.info.emailLabel")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
              <span>{t("footer.offices")}</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <ColHeading>{t("footer.explore")}</ColHeading>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.to}>
                  <FooterLink to={l.to}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <ColHeading>{t("footer.markets")}</ColHeading>
            <ul className="space-y-3">
              {marketList.map((m) => (
                <li key={m} className="text-sm text-white/65">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-white/50">{t("footer.disclaimer")}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/50">
              © {year} HealthUnion Global. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55">
              <Link to={`${base}/privacy`} className="hover:text-white">
                {t("footer.privacy")}
              </Link>
              <span className="cursor-default hover:text-white/80">{t("footer.terms")}</span>
              <button
                type="button"
                data-testid="footer-cookie-settings"
                onClick={() => window.dispatchEvent(new Event("hu:open-cookie"))}
                className="hover:text-white"
              >
                {t("footer.cookies")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
