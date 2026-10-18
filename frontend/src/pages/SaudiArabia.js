
import React from "react";
import { useParams } from "react-router-dom";

import useSeo from "@/hooks/useSeo";

const content = {
  en: {
    eyebrow: "HealthUnion Global | Saudi Arabia",
    title: "SFDA Medical Device Registration & Regulatory Affairs Services in Saudi Arabia",
    introduction:
      "HealthUnion Global supports medical device manufacturers and suppliers navigating SFDA regulatory requirements, including MDMA applications, technical documentation, and regulatory compliance.",
    assessment: "Request a Regulatory Assessment",
    servicesTitle: "Our SFDA Regulatory Services",
    learnMore: "Learn More",
    services: [
      {
        name: "SFDA Medical Device Marketing Authorization (MDMA)",
        path: "sfda-medical-device-registration-mdma"
      },
      {
        name: "Medical Device Classification & Regulatory Strategy",
        path: "sfda-medical-device-classification"
      },
      {
        name: "Technical File Preparation and Review",
        path: "sfda-technical-file-gap-assessment"
      },
      {
        name: "Saudi Authorized Representative Coordination",
        path: "saudi-authorized-representative"

      },
      {
        name: "SFDA Compliance & Documentation Support",
        path: "sfda-medical-device-compliance"
      },
      {
        name: "MDMA Renewal and Application Support",
        path: "sfda-mdma-renewal"

      }
    ],
    whyTitle: "Why Choose HealthUnion Global?",
    whyIntro:
      "HealthUnion Global is a Canadian-based regulatory affairs consultancy helping medical device manufacturers navigate regulatory requirements in Saudi Arabia and international markets.",
    benefits: [
      {
        title: "International Regulatory Perspective",
        description:
          "Regulatory knowledge covering Saudi Arabia, Canada, and the United States."
      },
      {
        title: "SFDA-Focused Support",
        description:
          "Practical assistance with MDMA applications, classification, and technical documentation."
      },
      {
        title: "Support for International Manufacturers",
        description:
          "Guidance for manufacturers preparing to enter the Saudi medical device market."
      },
      {
        title: "Personalized Regulatory Guidance",
        description:
          "Direct communication and project-specific support throughout the regulatory process."
      }
    ],
    ctaTitle: "Planning to Enter the Saudi Medical Device Market?",
    ctaDescription:
      "Contact our regulatory affairs team to discuss your products, regulatory pathway, and SFDA submission requirements.",
    contact: "Contact HealthUnion Global"
  },
  ar: {
    eyebrow: "هيلث يونيون جلوبال | المملكة العربية السعودية",
    title: "خدمات تسجيل الأجهزة الطبية والاستشارات التنظيمية لدى الهيئة العامة للغذاء والدواء السعودية",
    introduction:
      "تقدم هيلث يونيون جلوبال الدعم لمصنعي وموردي الأجهزة الطبية في استيفاء المتطلبات التنظيمية للهيئة العامة للغذاء والدواء، بما في ذلك طلبات الإذن بالتسويق (MDMA)، والملفات الفنية، والامتثال التنظيمي.",
    assessment: "اطلب تقييماً تنظيمياً",
    servicesTitle: "خدماتنا التنظيمية لدى الهيئة العامة للغذاء والدواء",
    learnMore: "اعرف المزيد",
    services: [
      {
        name: "الإذن بتسويق الأجهزة الطبية (MDMA)",
        path: "sfda-medical-device-registration-mdma"
      },
      {
        name: "تصنيف الأجهزة الطبية ووضع الاستراتيجية التنظيمية",
        path: "sfda-medical-device-classification"
      },
      {
        name: "إعداد ومراجعة الملفات الفنية للأجهزة الطبية",
        path: "sfda-technical-file-gap-assessment"
      },
      {
        name: "التنسيق لخدمات الممثل المعتمد في السعودية",
path: "saudi-authorized-representative"
      },
      {
        name: "دعم الامتثال التنظيمي ومتطلبات التوثيق",
        path: "sfda-medical-device-compliance"
      },
      {
        name: "تجديد أذونات التسويق ودعم طلبات التسجيل",
        path: "sfda-mdma-renewal"
      }
    ],
    whyTitle: "لماذا تختار هيلث يونيون جلوبال؟",
    whyIntro:
      "هيلث يونيون جلوبال شركة استشارات تنظيمية مقرها كندا، تساعد مصنعي الأجهزة الطبية في التعامل مع المتطلبات التنظيمية في المملكة العربية السعودية والأسواق الدولية.",
    benefits: [
      {
        title: "خبرة تنظيمية متعددة الأسواق",
        description:
          "معرفة بالمتطلبات التنظيمية في السعودية وكندا والولايات المتحدة."
      },
      {
        title: "دعم متخصص في متطلبات الهيئة",
        description:
          "مساعدة عملية في طلبات الإذن بالتسويق وتصنيف الأجهزة الطبية وإعداد الوثائق الفنية."
      },
      {
        title: "دعم المصنعين الدوليين",
        description:
          "إرشاد المصنعين الراغبين في دخول سوق الأجهزة الطبية السعودي."
      },
      {
        title: "استشارات تنظيمية مخصصة",
        description:
          "تواصل مباشر ودعم يتناسب مع احتياجات كل مشروع خلال الإجراءات التنظيمية."
      }
    ],
    ctaTitle: "هل تخطط لدخول سوق الأجهزة الطبية السعودي؟",
    ctaDescription:
      "تواصل مع فريق الشؤون التنظيمية لدينا لمناقشة منتجاتك والمسار التنظيمي ومتطلبات تقديم الطلبات إلى الهيئة.",
    contact: "تواصل مع هيلث يونيون جلوبال"
  }
};

export default function SaudiArabia() {
  const { lang } = useParams();
  useSeo("saudiArabia");
  const language = lang === "ar" ? "ar" : "en";
  const t = content[language];

  return (
    <main className="min-h-screen bg-white" dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="bg-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-300">
            {t.eyebrow}
          </p>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            {t.title}
          </h1>

          <p className="mb-8 max-w-3xl text-lg text-slate-200">
            {t.introduction}
          </p>

          <a
            href={`/${language}/contact`}
            className="inline-block rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            {t.assessment}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          {t.servicesTitle}
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {t.services.map((service) => (
            <a
              key={service.name}
              href={`/${language}/${service.path}`}
              className="block rounded-xl border border-slate-200 p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-800">
                {service.name}
              </h3>
              <p className="mt-3 text-sm font-medium text-teal-700">
                {t.learnMore} →
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-3xl font-bold text-slate-900">
            {t.whyTitle}
          </h2>

          <p className="mb-8 text-lg text-slate-600">
            {t.whyIntro}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {t.benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 p-6 shadow-sm"
              >
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">
          {t.ctaTitle}
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-slate-600">
          {t.ctaDescription}
        </p>

        <a
          href={`/${language}/contact`}
          className="inline-block rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-800"
        >
          {t.contact}
        </a>
      </section>
    </main>
  );
}
