
import React from "react";
import { useParams } from "react-router-dom";

const content = {
  en: {
    eyebrow: "HealthUnion Global | Saudi Arabia",
    title: "SFDA Medical Device Marketing Authorization (MDMA) Renewal Services",
    intro:
      "Regulatory consultancy and documentation support for medical device manufacturers preparing to renew their Saudi Medical Device Marketing Authorization.",
    button: "Discuss Your MDMA Renewal",
    overviewTitle: "Maintaining Your SFDA Market Authorization",
    overview:
      "Maintaining a valid Medical Device Marketing Authorization is important for continued access to the Saudi medical device market. Renewal requirements and the appropriate regulatory pathway depend on the authorization status, product information, applicable SFDA requirements, and any changes made since the original authorization.",
    servicesTitle: "Our MDMA Renewal Support Services",
    services: [
      {
        title: "Authorization Status Review",
        description:
          "Review the current MDMA, expiry date, authorized products, and regulatory status."
      },
      {
        title: "Documentation Gap Assessment",
        description:
          "Assess available regulatory documentation and identify updates or missing information relevant to the renewal."
      },
      {
        title: "Product and Manufacturer Changes",
        description:
          "Evaluate changes to product information, manufacturing details, labeling, and other authorization particulars to identify the appropriate regulatory actions."
      },
      {
        title: "SFDA Application Preparation",
        description:
          "Assist with preparation and review of the applicable renewal submission and supporting documentation."
      },
      {
        title: "GHAD Submission Coordination",
        description:
          "Provide support with relevant activities through the SFDA GHAD electronic system, working with the appropriate authorized account holder."
      },
      {
        title: "Regulatory Follow-Up",
        description:
          "Support responses to regulatory questions and requests for additional information during the application process."
      }
    ],
    processTitle: "Our Renewal Support Process",
    steps: [
      "Review the current MDMA and its regulatory status",
      "Confirm the applicable SFDA pathway and requirements",
      "Identify required documentation and outstanding gaps",
      "Prepare and coordinate the regulatory submission",
      "Support follow-up until the regulatory process is concluded"
    ],
    note:
      "Renewal eligibility, submission requirements, timing, and acceptance are subject to current SFDA rules and the specific authorization status. Expired authorizations may require a different regulatory approach. HealthUnion Global does not guarantee approval or processing times.",
    ctaTitle: "Does Your SFDA MDMA Need Renewal?",
    ctaText:
      "Contact our regulatory affairs team to review your authorization status and discuss the next steps.",
    contact: "Request an MDMA Renewal Assessment"
  },
  ar: {
    eyebrow: "هيلث يونيون جلوبال | المملكة العربية السعودية",
    title: "خدمات تجديد أذونات تسويق الأجهزة الطبية (MDMA) لدى الهيئة العامة للغذاء والدواء",
    intro:
      "نقدم الاستشارات التنظيمية ودعم الوثائق لمصنعي الأجهزة الطبية الراغبين في تجديد أذونات تسويق أجهزتهم الطبية في المملكة العربية السعودية.",
    button: "ناقش متطلبات تجديد إذن التسويق",
    overviewTitle: "المحافظة على صلاحية إذن تسويق الأجهزة الطبية",
    overview:
      "تُعد المحافظة على سريان إذن تسويق الأجهزة الطبية أمراً مهماً لاستمرار تداولها في السوق السعودي. وتختلف متطلبات التجديد والمسار التنظيمي المناسب بحسب حالة الإذن ومعلومات المنتج والمتطلبات الحالية للهيئة وأي تغييرات أُجريت منذ إصدار الإذن الأصلي.",
    servicesTitle: "خدماتنا لدعم تجديد أذونات التسويق",
    services: [
      {
        title: "مراجعة حالة إذن التسويق",
        description:
          "مراجعة إذن التسويق الحالي وتاريخ انتهائه والمنتجات المشمولة به وحالته التنظيمية."
      },
      {
        title: "تقييم الفجوات في الوثائق",
        description:
          "مراجعة الوثائق التنظيمية المتوفرة وتحديد التحديثات أو المعلومات الناقصة ذات الصلة بالتجديد."
      },
      {
        title: "تقييم التغييرات على المنتج والمصنع",
        description:
          "تقييم التغييرات المتعلقة بالمنتج والمصنع والملصقات والبيانات الأخرى لتحديد الإجراءات التنظيمية المناسبة."
      },
      {
        title: "إعداد طلب التجديد",
        description:
          "المساعدة في إعداد ومراجعة طلب التجديد والمستندات الداعمة وفقاً للمتطلبات المعمول بها."
      },
      {
        title: "التنسيق عبر نظام غد الإلكتروني",
        description:
          "تقديم الدعم في الإجراءات ذات الصلة عبر نظام غد الإلكتروني التابع للهيئة، بالتنسيق مع صاحب الحساب المخول."
      },
      {
        title: "المتابعة التنظيمية",
        description:
          "دعم إعداد الردود على استفسارات الهيئة وطلبات المعلومات الإضافية خلال إجراءات الطلب."
      }
    ],
    processTitle: "مراحل دعم تجديد إذن التسويق",
    steps: [
      "مراجعة إذن التسويق الحالي وحالته التنظيمية",
      "تحديد المسار والمتطلبات المعمول بها لدى الهيئة",
      "تحديد الوثائق المطلوبة والفجوات القائمة",
      "إعداد الطلب والتنسيق لتقديمه",
      "دعم المتابعة حتى انتهاء الإجراءات التنظيمية"
    ],
    note:
      "تخضع أهلية التجديد ومتطلبات التقديم والمدة الزمنية وقبول الطلب للأنظمة والمتطلبات الحالية لدى الهيئة وحالة الإذن المحددة. وقد تتطلب الأذونات المنتهية مساراً تنظيمياً مختلفاً. ولا تضمن هيلث يونيون جلوبال الموافقة أو مدة محددة لإنجاز الطلب.",
    ctaTitle: "هل تحتاج إلى تجديد إذن تسويق جهاز طبي؟",
    ctaText:
      "تواصل مع فريق الشؤون التنظيمية لمراجعة حالة إذن التسويق ومناقشة الخطوات المناسبة.",
    contact: "اطلب تقييماً لتجديد إذن التسويق"
  }
};

export default function SfdaMdmaRenewal() {
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
            href={`/${language}/contact?service=sfda_mdma_renewal`}
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
          href={`/${language}/contact?service=sfda_mdma_renewal`}
          className="inline-block rounded-lg bg-teal-500 px-7 py-3 font-semibold text-white hover:bg-teal-600"
        >
          {t.contact}
        </a>
      </section>
    </main>
  );
}
