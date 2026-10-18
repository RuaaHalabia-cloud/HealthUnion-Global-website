
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
            href="/contact"
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
            "SFDA Medical Device Marketing Authorization (MDMA)",
            "Medical Device Classification & Regulatory Strategy",
            "Technical File Preparation and Review",
            "Saudi Authorized Representative Coordination",
            "SFDA Compliance & Documentation Support",
            "MDMA Renewal and Application Support"
          ].map((service) => (
            <div
              key={service}
              className="rounded-xl border border-slate-200 p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-800">
                {service}
              </h3>
            </div>
          ))}
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
          href="/contact"
          className="inline-block rounded-lg bg-slate-900 px-7 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Contact HealthUnion Global
        </a>
      </section>
    </main>
  );
}
