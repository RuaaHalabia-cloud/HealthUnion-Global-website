
import React from "react";

export default function SaudiArabia() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-slate-900 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal-300">
            HealthUnion Global | Saudi Arabia
          </p>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            SFDA Medical Device Registration & Regulatory
            Affairs Services in Saudi Arabia
          </h1>

          <p className="mb-8 max-w-3xl text-lg text-slate-200">
            HealthUnion Global supports medical device
            manufacturers and suppliers navigating SFDA
            regulatory requirements, including MDMA
            applications, technical documentation, and
            regulatory compliance.
          </p>

          <a
            href="/en/contact"
            className="inline-block rounded-lg bg-teal-500 px-6 py-3 font-semibold text-white hover:bg-teal-600"
          >
            Request a Regulatory Assessment
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-bold text-slate-900">
          Our SFDA Regulatory Services
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          
{[
  {
    name: "SFDA Medical Device Marketing Authorization (MDMA)",
    link: "/en/sfda-medical-device-registration-mdma"
  },
  {
    name: "Medical Device Classification & Regulatory Strategy",
    link: "/en/contact"
  },
  {
    name: "Technical File Preparation and Review",
    link: "/en/sfda-technical-file-gap-assessment"
  },
  {
    name: "Saudi Authorized Representative Coordination",
    link: "/en/contact"
  },
  {
    name: "SFDA Compliance & Documentation Support",
    link: "/en/saudi-medical-device-distributor-regulatory-support"
  },
  {
    name: "MDMA Renewal and Application Support",
    link: "/en/contact"
  }
].map((service) => (
  <a
    key={service.name}
    href={service.link}
    className="block rounded-xl border border-slate-200 p-6 shadow-sm transition hover:border-teal-500 hover:shadow-md"
  >
    <h3 className="text-lg font-semibold text-slate-800">
      {service.name}
    </h3>
    <p className="mt-3 text-sm font-medium text-teal-700">
      Learn More →
    </p>
  </a>
))}

        </div>
      </section>

      
<section className="bg-white px-6 py-16">
  <div className="mx-auto max-w-5xl">
    <h2 className="mb-6 text-3xl font-bold text-slate-900">
      Why Choose HealthUnion Global?
    </h2>

    <p className="mb-8 text-lg text-slate-600">
      HealthUnion Global is a Canadian-based regulatory
      affairs consultancy helping medical device
      manufacturers navigate regulatory requirements
      in Saudi Arabia and international markets.
    </p>

    <div className="grid gap-6 md:grid-cols-2">
      {[
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
      ].map((item) => (
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
          Planning to Enter the Saudi Medical Device Market?
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-slate-600">
          Contact our regulatory affairs team to discuss
          your products, regulatory pathway, and SFDA
          submission requirements.
        </p>

        <a
          href="/en/contact"
          className="inline-block rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Contact HealthUnion Global
        </a>
      </section>
    </main>
  );
}
