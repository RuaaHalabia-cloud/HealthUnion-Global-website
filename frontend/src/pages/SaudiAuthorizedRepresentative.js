
import React from "react";
import { useParams } from "react-router-dom";
import useSeo from "@/hooks/useSeo";

const content = {
  en: {
    eyebrow: "HealthUnion Global | Saudi Arabia",
    title: "Saudi Authorized Representative Services for Medical Device Manufacturers",
    intro:
      "Support for international medical device manufacturers navigating Saudi Arabia's Authorized Representative requirements and SFDA regulatory processes.",
    button: "Discuss Your AR Requirements",
    overviewTitle: "Authorized Representation in Saudi Arabia",
    overview:
      "Medical device manufacturers established outside Saudi Arabia generally require an appropriately licensed Authorized Representative to represent them before the Saudi Food and Drug Authority (SFDA), in accordance with applicable requirements.",
    servicesTitle: "How We Support Manufacturers",
    services: [
      {
        title: "AR Requirements Assessment",
        description:
          "Review your manufacturer's regulatory needs and applicable Saudi representation requirements."
      },
      {
        title: "AR Arrangement Coordination",
        description:
          "Support the establishment of an appropriate representation arrangement with an eligible Saudi Authorized Representative."
      },
      {
        title: "SFDA Documentation Support",
        description:
          "Assist with regulatory documents, manufacturer information, and preparation for relevant SFDA procedures."
      },
      {
        title: "Ongoing Regulatory Coordination",
        description:
          "Provide project-specific support for regulatory communication, authorization activities, and compliance follow-up."
      }
    ],
    processTitle: "Our Approach",
    steps: [
      "Review manufacturer and product information",
      "Identify relevant Saudi regulatory requirements",
      "Coordinate the appropriate AR arrangement",
      "Support documentation and regulatory activities"
    ],
    note:
      "HealthUnion Global provides regulatory consultancy and coordination services. Any formal Saudi Authorized Representative appointment must be established with an appropriately licensed entity, subject to applicable SFDA requirements.",
    ctaTitle: "Need Authorized Representative Support in Saudi Arabia?",
    ctaText:
      "Contact HealthUnion Global to discuss your products and Saudi market entry requirements.",
    contact: "Request a Consultation"
  },
  ar: {
    eyebrow: "هيلث يونيون جلوبال | المملكة العربية السعودية",
    title: "خدمات الممثل المعتمد في السعودية لمصنعي الأجهزة الطبية",
    intro:
      "نساعد مصنعي الأجهزة الطبية الدوليين في فهم متطلبات الممثل المعتمد في المملكة العربية السعودية والإجراءات التنظيمية لدى الهيئة العامة للغذاء والدواء.",
    button: "ناقش متطلبات الممثل المعتمد",
    overviewTitle: "التمثيل المعتمد للأجهزة الطبية في السعودية",
    overview:
      "يُطلب عموماً من مصنعي الأجهزة الطبية الموجودين خارج المملكة العربية السعودية تعيين ممثل معتمد مرخص وفقاً للمتطلبات المعمول بها لدى الهيئة العامة للغذاء والدواء.",
    servicesTitle: "كيف ندعم مصنعي الأجهزة الطبية؟",
    services: [
      {
        title: "تقييم متطلبات الممثل المعتمد",
        description:
          "مراجعة احتياجات المصنع والمتطلبات التنظيمية ذات الصلة بالتمثيل المعتمد في السعودية."
      },
      {
        title: "تنسيق ترتيبات الممثل المعتمد",
        description:
          "المساعدة في ترتيب العلاقة مع ممثل معتمد سعودي مؤهل ومرخص وفقاً للمتطلبات المعمول بها."
      },
      {
        title: "دعم الوثائق التنظيمية",
        description:
          "المساعدة في إعداد ومراجعة المستندات التنظيمية وبيانات المصنع والمتطلبات المرتبطة بإجراءات الهيئة."
      },
      {
        title: "المتابعة والتنسيق التنظيمي",
        description:
          "تقديم الدعم في التواصل التنظيمي وإجراءات الأذونات والمتابعة المتعلقة بالامتثال."
      }
    ],
    processTitle: "آلية العمل",
    steps: [
      "مراجعة معلومات المصنع والمنتجات",
      "تحديد المتطلبات التنظيمية السعودية",
      "تنسيق ترتيبات الممثل المعتمد المناسب",
      "دعم الوثائق والإجراءات التنظيمية"
    ],
    note:
      "تقدم هيلث يونيون جلوبال خدمات الاستشارات والتنسيق التنظيمي. ويجب أن يتم التعيين الرسمي للممثل المعتمد من خلال جهة مرخصة ومؤهلة، وفقاً لمتطلبات الهيئة العامة للغذاء والدواء.",
    ctaTitle: "هل تحتاج إلى خدمات الممثل المعتمد في السعودية؟",
    ctaText:
      "تواصل مع هيلث يونيون جلوبال لمناقشة منتجاتك ومتطلبات دخول السوق السعودي.",
    contact: "اطلب استشارة"
  }
};

export default function SaudiAuthorizedRepresentative() {
  const { lang } = useParams();
  useSeo("saudiAuthorizedRepresentative");
  const language = lang === "ar" ? "ar" : "en";
  const t = content[language];

  return (
    <main
      className="min-h-screen bg-white"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <section className="bg-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold text-teal-300">
            {t.eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            {t.title}
          </h1>
          <p className="mb-8 max-w-3xl text-lg text-slate-200">
            {t.intro}
          </p>
          <a
            
href={`/${language}/contact?service=sfda_authorized_representative`}
            className="inline-block rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            {t.button}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-6 text-3xl font-bold text-slate-900">
          {t.overviewTitle}
        </h2>
        <p className="text-lg leading-8 text-slate-600">
          {t.overview}
        </p>
      </section>

      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            {t.servicesTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {t.services.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-slate-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          {t.processTitle}
        </h2>
        <ol className="space-y-4">
          {t.steps.map((step, index) => (
            <li
              key={step}
              className="flex items-start gap-4 rounded-lg border border-slate-200 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-600 font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-slate-700">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-8 rounded-lg bg-slate-100 p-5 text-sm leading-7 text-slate-600">
          {t.note}
        </p>
      </section>

      <section className="bg-slate-900 px-6 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">
          {t.ctaTitle}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-slate-200">
          {t.ctaText}
        </p>
        <a
          
href={`/${language}/contact?service=sfda_authorized_representative`}
          className="inline-block rounded-lg bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600"
        >
          {t.contact}
        </a>
      </section>
    </main>
  );
}
