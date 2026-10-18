
import React from "react";
import { useParams } from "react-router-dom";

const content = {
  en: {
    eyebrow: "HealthUnion Global | Saudi Arabia",
    title: "SFDA Medical Device Classification & Regulatory Strategy",
    intro:
      "Regulatory support for medical device manufacturers seeking to determine the appropriate SFDA risk classification, applicable classification rules, and market authorization pathway.",
    button: "Request a Classification Assessment",
    overviewTitle: "Understanding SFDA Medical Device Classification",
    overview:
      "Medical device classification in Saudi Arabia depends on the intended purpose, device characteristics, duration of use, invasiveness, and applicable SFDA classification rules. A well-supported classification assessment helps manufacturers identify the appropriate regulatory requirements.",
    servicesTitle: "Our Classification & Regulatory Strategy Services",
    services: [
      {
        title: "Medical Device Classification Assessment",
        description:
          "Evaluate the intended purpose, device characteristics, and applicable SFDA risk classification rules."
      },
      {
        title: "Classification Rationale Preparation",
        description:
          "Prepare a documented classification rationale identifying the applicable rules and supporting regulatory justification."
      },
      {
        title: "Product Grouping Assessment",
        description:
          "Assess whether products may qualify for grouping as a family, system, or other permitted grouping under applicable SFDA requirements."
      },
      {
        title: "Regulatory Pathway Assessment",
        description:
          "Identify the applicable regulatory authorization pathway and key documentation requirements."
      },
      {
        title: "Technical Documentation Review",
        description:
          "Review available product documentation to identify classification-related gaps or inconsistencies."
      },
      {
        title: "Multi-Market Regulatory Strategy",
        description:
          "Support manufacturers in understanding relevant differences between Saudi, Canadian, US, and other applicable regulatory requirements."
      }
    ],
    processTitle: "Our Classification Assessment Process",
    steps: [
      "Collect the intended purpose and product information",
      "Review device characteristics and intended duration of use",
      "Evaluate applicable SFDA classification rules",
      "Prepare the classification rationale",
      "Identify the appropriate regulatory pathway and next steps"
    ],
    note:
      "Final classification and authorization requirements depend on the device's intended purpose, applicable SFDA rules, and regulatory assessment. HealthUnion Global provides regulatory consultancy and does not guarantee a particular classification or authorization outcome.",
    ctaTitle: "Not Sure How Your Medical Device Is Classified?",
    ctaText:
      "Contact our regulatory affairs team to discuss your medical device, classification rationale, and Saudi regulatory pathway.",
    contact: "Request a Regulatory Assessment"
  },
  ar: {
    eyebrow: "هيلث يونيون جلوبال | المملكة العربية السعودية",
    title: "خدمات تصنيف الأجهزة الطبية ووضع الاستراتيجية التنظيمية لدى الهيئة العامة للغذاء والدواء",
    intro:
      "نقدم الدعم التنظيمي لمصنعي الأجهزة الطبية لتحديد فئة الخطورة المناسبة وفقاً لمتطلبات الهيئة العامة للغذاء والدواء، وقواعد التصنيف المطبقة، والمسار التنظيمي اللازم للحصول على الإذن بالتسويق.",
    button: "اطلب تقييماً لتصنيف الجهاز الطبي",
    overviewTitle: "فهم متطلبات تصنيف الأجهزة الطبية في السعودية",
    overview:
      "يعتمد تصنيف الأجهزة الطبية في المملكة العربية السعودية على الغرض المقصود من الاستخدام وخصائص الجهاز ومدة الاستخدام ومدى تدخله في الجسم وقواعد التصنيف المعمول بها لدى الهيئة. ويساعد التقييم الموثق للتصنيف على تحديد المتطلبات التنظيمية المناسبة.",
    servicesTitle: "خدماتنا في التصنيف والاستراتيجية التنظيمية",
    services: [
      {
        title: "تقييم تصنيف الأجهزة الطبية",
        description:
          "تقييم الغرض المقصود من الاستخدام وخصائص الجهاز وقواعد تصنيف الخطورة المعمول بها لدى الهيئة."
      },
      {
        title: "إعداد مبررات التصنيف",
        description:
          "إعداد وثيقة توضح فئة الخطورة وقواعد التصنيف المطبقة والمبررات التنظيمية الداعمة."
      },
      {
        title: "تقييم تجميع المنتجات",
        description:
          "تقييم إمكانية تجميع المنتجات ضمن عائلة أو نظام أو مجموعة أخرى مسموح بها وفقاً لمتطلبات الهيئة."
      },
      {
        title: "تحديد المسار التنظيمي",
        description:
          "تحديد المسار المناسب للحصول على الإذن التنظيمي والمتطلبات الأساسية للوثائق."
      },
      {
        title: "مراجعة الوثائق الفنية",
        description:
          "مراجعة الوثائق المتوفرة وتحديد الفجوات أو أوجه عدم الاتساق المتعلقة بالتصنيف."
      },
      {
        title: "الاستراتيجية التنظيمية للأسواق المختلفة",
        description:
          "مساعدة المصنعين في فهم الاختلافات بين المتطلبات التنظيمية في السعودية وكندا والولايات المتحدة والأسواق الأخرى ذات الصلة."
      }
    ],
    processTitle: "مراحل تقييم تصنيف الجهاز الطبي",
    steps: [
      "جمع معلومات المنتج والغرض المقصود من استخدامه",
      "مراجعة خصائص الجهاز ومدة الاستخدام المقصودة",
      "تقييم قواعد التصنيف المعمول بها لدى الهيئة",
      "إعداد مبررات التصنيف",
      "تحديد المسار التنظيمي والخطوات التالية"
    ],
    note:
      "يعتمد التصنيف النهائي ومتطلبات الإذن بالتسويق على الغرض المقصود من استخدام الجهاز وقواعد الهيئة المعمول بها والتقييم التنظيمي. تقدم هيلث يونيون جلوبال خدمات الاستشارات التنظيمية دون ضمان فئة تصنيف محددة أو نتيجة معينة لطلب الإذن.",
    ctaTitle: "هل تحتاج إلى تحديد فئة الخطورة لجهازك الطبي؟",
    ctaText:
      "تواصل مع فريق الشؤون التنظيمية لمناقشة جهازك الطبي ومبررات تصنيفه والمسار التنظيمي المناسب في السعودية.",
    contact: "اطلب تقييماً تنظيمياً"
  }
};

export default function SfdaClassification() {
  const { lang } = useParams();
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
            href={`/${language}/contact?service=sfda_classification`}
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
          href={`/${language}/contact?service=sfda_classification`}
          className="inline-block rounded-lg bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600"
        >
          {t.contact}
        </a>
      </section>
    </main>
  );
}
