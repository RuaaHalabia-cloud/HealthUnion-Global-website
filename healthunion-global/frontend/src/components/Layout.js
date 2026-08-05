import { useEffect } from "react";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const SUPPORTED = ["en", "ar"];

export default function Layout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!SUPPORTED.includes(lang)) {
      navigate("/en", { replace: true });
      return;
    }
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    localStorage.setItem("hu_lang", lang);
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", dir);
  }, [lang, i18n, navigate]);

  // scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // hreflang alternate links for SEO
  useEffect(() => {
    const head = document.head;
    const existing = head.querySelectorAll("link[data-hreflang]");
    existing.forEach((el) => el.remove());
    const path = location.pathname.replace(/^\/(en|ar)/, "");
    const origin = window.location.origin;
    ["en", "ar"].forEach((l) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = l;
      link.href = `${origin}/${l}${path}`;
      link.setAttribute("data-hreflang", "true");
      head.appendChild(link);
    });
    const xDefault = document.createElement("link");
    xDefault.rel = "alternate";
    xDefault.hreflang = "x-default";
    xDefault.href = `${origin}/en${path}`;
    xDefault.setAttribute("data-hreflang", "true");
    head.appendChild(xDefault);
  }, [location.pathname]);

  return (
    <div className="App bg-[#F8FAFC]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
