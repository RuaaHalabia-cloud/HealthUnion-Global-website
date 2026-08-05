import { useEffect, useState } from "react";
import { Link, NavLink, useParams, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Globe,
  ShieldCheck,
  Activity,
  FileCheck2,
  BadgeCheck,
  FlaskConical,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const MEGA_ICONS = {
  na: [FileCheck2, BadgeCheck],
  saudi: [ShieldCheck, Activity],
  gcc: [Globe, FlaskConical],
};

const navItemDark =
  "inline-flex items-center h-9 px-3.5 rounded-md text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white focus:outline-none cursor-pointer";

export default function Header() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isRtl = lang === "ar";
  const base = `/${lang}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const flatLinks = [
    { to: `${base}/about`, label: t("nav.about") },
    { to: `${base}/insights`, label: t("nav.insights") },
    { to: `${base}/contact`, label: t("nav.contact") },
  ];

  const mega = t("nav.mega", { returnObjects: true }) || {};
  const groups = Array.isArray(mega.groups) ? mega.groups : [];

  const switchLang = (newLang) => {
    if (newLang === lang) return;
    const rest = location.pathname.replace(/^\/(en|ar)/, "");
    navigate(`/${newLang}${rest}${location.hash || ""}`);
  };

  // Markets: scroll to the Focus Markets section on the home page (navigating home first if needed).
  const goToMarkets = () => {
    setOpen(false);
    const scrollNow = () => {
      const el = document.getElementById("focus-markets");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };
    const onHome = location.pathname === base || location.pathname === `${base}/`;
    if (onHome) {
      scrollNow();
    } else {
      navigate(base);
      let tries = 0;
      const iv = setInterval(() => {
        if (scrollNow() || tries++ > 15) clearInterval(iv);
      }, 100);
    }
  };

  const LangSwitch = () => (
    <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1">
      <button
        data-testid="language-switch-en"
        onClick={() => switchLang("en")}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          lang === "en" ? "bg-white text-[#0A2240] shadow-sm" : "text-white/80 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        data-testid="language-switch-ar"
        onClick={() => switchLang("ar")}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          lang === "ar" ? "bg-white text-[#0A2240] shadow-sm" : "text-white/80 hover:text-white"
        }`}
      >
        العربية
      </button>
    </div>
  );

  const linkClass = ({ isActive }) => cn(navItemDark, isActive && "bg-white/10 text-white");

  return (
    <header
      data-testid="site-header"
      className={`sticky top-0 z-50 bg-[#0A2240] border-b transition-all duration-300 ${
        scrolled ? "border-white/10 shadow-[0_8px_30px_rgba(10,34,64,0.25)]" : "border-transparent"
      }`}
    >
      <div className="hu-container">
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-4">
          <Link to={base} aria-label="HealthUnion Global home" data-testid="header-logo-link">
            <Logo onDark size={34} />
          </Link>

          {/* Desktop nav: plain links + Services mega-menu */}
          <nav data-testid="site-header-nav" className="hidden items-center gap-1 md:flex">
            <NavLink to={base} end className={linkClass}>
              {t("nav.home")}
            </NavLink>

            <NavigationMenu dir={isRtl ? "rtl" : "ltr"}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    data-testid="header-services-trigger"
                    className={cn(
                      navItemDark,
                      "bg-transparent data-[state=open]:bg-white/10 data-[state=open]:text-white data-[state=open]:hover:bg-white/10 data-[state=open]:focus:bg-white/10"
                    )}
                  >
                    {t("nav.services")}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[min(92vw,720px)] p-4">
                      <div className="mb-3 flex items-center justify-between px-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0D9488]">
                          {mega.label}
                        </span>
                        <Link
                          to={`${base}/services`}
                          className="text-xs font-medium text-[#1E3A8A] hover:underline"
                        >
                          {mega.viewAll}
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-x-2 gap-y-3 sm:grid-cols-3">
                        {groups.map((g) => {
                          const icons = MEGA_ICONS[g.key] || [];
                          return (
                            <div key={g.key}>
                              <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#0A2240]/45">
                                {g.title}
                              </div>
                              {(g.items || []).map((it, i) => {
                                const Icon = icons[i] || Globe;
                                return (
                                  <Link
                                    key={it.title}
                                    to={`${base}/services`}
                                    data-testid="header-mega-item"
                                    className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-[#F8FAFC]"
                                  >
                                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#0A2240]/10 text-[#0D9488] transition-all duration-200 group-hover:scale-105 group-hover:border-[#0A2240] group-hover:bg-[#0A2240] group-hover:text-white">
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold text-[#0A2240]">
                                        {it.title}
                                      </span>
                                      <span className="block text-xs leading-snug text-[#0A2240]/60">
                                        {it.desc}
                                      </span>
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-4 rounded-xl hu-gradient-navy-teal px-4 py-3 text-white">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold">{mega.promoTitle}</div>
                          <div className="text-xs text-white/80">{mega.promoText}</div>
                        </div>
                        <Link to={`${base}/contact`}>
                          <Button className="whitespace-nowrap bg-white font-semibold text-[#0A2240] hover:bg-white/90">
                            {t("nav.cta")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button type="button" data-testid="header-markets-link" onClick={goToMarkets} className={navItemDark}>
              {t("nav.markets")}
            </button>

            {flatLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            <LangSwitch />
            <Link to={`${base}/contact`}>
              <Button
                data-testid="header-book-consultation-button"
                className="bg-[#0D9488] hover:bg-[#10B981] text-white rounded-xl font-semibold"
              >
                {t("nav.cta")}
              </Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <LangSwitch />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  data-testid="header-mobile-menu-button"
                  aria-label="Open menu"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side={isRtl ? "left" : "right"}
                className="bg-[#0A2240] border-white/10 text-white w-[82%] max-w-sm overflow-y-auto"
              >
                <div className="mt-6 flex flex-col gap-1">
                  <SheetClose asChild>
                    <NavLink
                      to={base}
                      end
                      className={({ isActive }) =>
                        `px-3 py-3 text-base font-medium rounded-lg ${
                          isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                        }`
                      }
                    >
                      {t("nav.home")}
                    </NavLink>
                  </SheetClose>

                  <SheetClose asChild>
                    <NavLink
                      to={`${base}/services`}
                      className={({ isActive }) =>
                        `px-3 py-3 text-base font-medium rounded-lg ${
                          isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                        }`
                      }
                    >
                      {t("nav.services")}
                    </NavLink>
                  </SheetClose>
                  <div className="mb-1 ml-2 flex flex-col gap-0.5 border-s border-white/10 ps-3">
                    {groups.flatMap((g) =>
                      (g.items || []).map((it) => (
                        <SheetClose asChild key={it.title}>
                          <Link
                            to={`${base}/services`}
                            className="rounded-md px-2 py-2 text-sm text-white/65 hover:bg-white/5 hover:text-white"
                          >
                            {it.title}
                          </Link>
                        </SheetClose>
                      ))
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={goToMarkets}
                    className="rounded-lg px-3 py-3 text-start text-base font-medium text-white/80 hover:bg-white/5"
                  >
                    {t("nav.markets")}
                  </button>

                  {flatLinks.map((l) => (
                    <SheetClose asChild key={l.to}>
                      <NavLink
                        to={l.to}
                        className={({ isActive }) =>
                          `px-3 py-3 text-base font-medium rounded-lg ${
                            isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                          }`
                        }
                      >
                        {l.label}
                      </NavLink>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <Link to={`${base}/contact`} className="mt-4">
                      <Button className="w-full bg-[#0D9488] hover:bg-[#10B981] text-white rounded-xl font-semibold">
                        {t("nav.cta")}
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
