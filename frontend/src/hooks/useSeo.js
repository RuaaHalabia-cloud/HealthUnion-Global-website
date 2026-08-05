import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Sets document title + meta description per page using the meta.* translation keys.
export default function useSeo(pageKey) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const title = t(`meta.${pageKey}.title`);
    const desc = t(`meta.${pageKey}.description`);
    if (title) document.title = title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    if (desc) metaDesc.setAttribute("content", desc);

    // OpenGraph basics
    const setOg = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setOg("og:title", title || "");
    setOg("og:description", desc || "");
    setOg("og:type", "website");
    setOg("og:locale", i18n.language === "ar" ? "ar_SA" : "en_US");
  }, [pageKey, t, i18n.language]);
}
