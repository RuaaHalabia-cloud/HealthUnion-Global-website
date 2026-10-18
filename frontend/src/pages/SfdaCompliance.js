
import React from "react";
import { useParams } from "react-router-dom";

const content = {
  en: {
    eyebrow: "HealthUnion Global | Saudi Arabia",
    title: "SFDA Medical Device Compliance & Documentation Support",
    intro:
      "Regulatory consulting services helping medical device manufacturers and suppliers prepare documentation, address compliance requirements, and maintain regulatory readiness in Saudi Arabia.",
    button: "Request a Compliance Assessment",
    overviewTitle: "Navigating SFDA Regulatory Compliance",
    overview:
      "Medical device regulatory compliance involves more than obtaining a marketing authorization. Manufacturers and other relevant economic operators must understand applicable documentation, labeling, quality management, and post-market obligations throughout the product lifecycle.",
    servicesTitle: "Our SFDA Compliance Support Services",
    services: [
      {
        title: "Regulatory Documentation Review",
        description:
          "Review available regulatory documentation for completeness, consistency, and alignment with relevant SFDA requirements."
      },
      {
        title: "Technical File Gap Assessment",
        description:
          "Identify gaps in technical documentation, intended-use information, risk management records, and supporting evidence."
      },
      {
        title: "Labeling and IFU Compliance",
        description:
          "Review device labels, instructions for use, and product information against applicable Saudi regulatory requirements."
      },
      {
        title: "Quality Management System Guidance",
        description:
          "Provide guidance on relevant quality management requirements and ISO 13485 documentation."
      },
      {
        title: "Post-Market Compliance Support",
        description:
          "Assist with regulatory processes related to complaints, vigilance, corrective actions, and post-market obligations."
      },
      {
        title: "Regulatory Change Assessment",
        description:
          "Evaluate changes affecting authorized devices, manufacturers, or regulatory documentation to identify appropriate compliance actions."
      }
    ],
    processTitle: "Our Compliance Support Process",
    steps: [
      "Understand your products and regulatory objectives",
      "Review the applicable SFDA requirements",
      "Assess existing documentation and compliance gaps",
      "Recommend corrective actions and documentation updates",
      "Support implementation and regulatory follow-up"
    ],
    note:
      "Applicable obligations vary according to device characteristics, authorization status, and the manufacturer's or economic operator's regulatory role. HealthUnion Global provides consultancy and documentation support; regulatory decisions remain subject to the SFDA.",
    ctaTitle: "Need Support with SFDA Compliance?",
    ctaText:
      "Contact HealthUnion Global to discuss your device documentation, compliance gaps, and regulatory support needs.",
    contact: "Request a Regulatory Consultation"
  },
  ar: {
    eyebrow: "هيلث يونيون جلوبال | المملكة العربية السعودية",
    title: "خدمات الامتثال التنظيمي والوثائق الفنية للأجهزة الطبية لدى الهيئة العامة للغذاء والدواء",
    intro:
      "نقدم خدمات الاستشارات التنظيمية لمصنعي وموردي الأجهزة الطبية لدعم إعداد الوثائق واستيفاء المتطلبات التنظيمية والمحافظة على الجاهزية للامتثال في المملكة العربية السعودية.",
    button: "اطلب تقييماً للامتثال التنظيمي",
    overviewTitle: "الامتثال للمتطلبات التنظيمية للأجهزة الطبية",
    overview:
      "لا يقتصر الامتثال التنظيمي للأجهزة الطبية على الحصول على إذن التسويق، بل يشمل أيضاً المتطلبات المتعلقة بالوثائق الفنية والملصقات ونظام إدارة الجودة والالتزامات التنظيمية بعد التسويق، وفقاً للمتطلبات المنطبقة على كل جهة ودورها في سلسلة الإمداد.",
    servicesTitle: "خدماتنا لدعم الامتثال التنظيمي",
    services: [
      {
        title: "مراجعة الوثائق التنظيمية",
        description:
          "مراجعة الوثائق التنظيمية المتوفرة للتحقق من اكتمالها واتساقها ومدى توافقها مع المتطلبات ذات الصلة لدى الهيئة."
      },
      {
        title: "تقييم الفجوات في الملفات الفنية",
        description:
          "تحديد الفجوات في الوثائق الفنية والغرض المقصود من الاستخدام وسجلات إدارة المخاطر والأدلة الداعمة."
      },
      {
        title: "مراجعة الملصقات وتعليمات الاستخدام",
        description:
          "مراجعة ملصقات الأجهزة الطبية وتعليمات الاستخدام ومعلومات المنتج وفقاً للمتطلبات التنظيمية السعودية المنطبقة."
      },
      {
        title: "الإرشاد بشأن نظام إدارة الجودة",
        description:
          "تقديم الإرشاد بشأن متطلبات نظام إدارة الجودة ذات الصلة ووثائق المواصفة ISO 13485."
      },
      {
        title: "دعم الامتثال بعد التسويق",
        description:
          "المساعدة في الإجراءات التنظيمية المتعلقة بالشكاوى والإبلاغ عن الحوادث والإجراءات التصحيحية والالتزامات بعد التسويق."
      },
      {
        title: "تقييم التغييرات التنظيمية",
        description:
          "تقييم التغييرات المتعلقة بالأجهزة المصرح بتسويقها أو المصنعين أو الوثائق التنظيمية لتحديد الإجراءات المناسبة."
      }
    ],
    processTitle: "مراحل دعم الامتثال التنظيمي",
    steps: [
      "فهم المنتجات والأهداف التنظيمية",
      "مراجعة متطلبات الهيئة المنطبقة",
      "تقييم الوثائق الحالية وفجوات الامتثال",
      "اقتراح الإجراءات التصحيحية وتحديثات الوثائق",
      "دعم التنفيذ والمتابعة التنظيمية"
    ],
    note:
      "تختلف الالتزامات التنظيمية بحسب خصائص الجهاز وحالة إذن التسويق ودور المصنع أو الجهة المعنية في سلسلة الإمداد. تقدم هيلث يونيون جلوبال خدمات الاستشارات ودعم الوثائق، وتبقى القرارات التنظيمية خاضعة للهيئة العامة للغذاء والدواء.",
    ctaTitle: "هل تحتاج إلى دعم الامتثال التنظيمي للأجهزة الطبية؟",
    ctaText:
      "تواصل مع هيلث يونيون جلوبال لمناقشة الوثائق الفنية وفجوات الامتثال واحتياجاتك التنظيمية.",
    contact: "اطلب استشارة تنظيمية"
  }
};

export default function SfdaCompliance() {
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
            href={`/${language}/contact?service=sfda_compliance`}
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
          href={`/${language}/contact?service=sfda_compliance`}
          className="inline-block rounded-lg bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600"
        >
          {t.contact}
        </a>
      </section>
    </main>
  );
}
