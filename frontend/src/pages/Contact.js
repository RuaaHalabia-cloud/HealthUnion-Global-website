import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  CheckCircle2,
  Upload,
  FileText,
  X,
  Loader2,
  ShieldCheck,
  Search,
  Clock,
  Lock,
  Globe,
  Mail,
  MapPin,
  Send,
  ArrowRight,
  MessageSquare,
  Building2,
  FileUp,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal, Eyebrow } from "@/components/Reveal";
import useSeo from "@/hooks/useSeo";
import { uploadFile, submitContact } from "@/lib/api";

const MARKETS = ["usa", "canada", "saudi_arabia", "other_gcc"];
const DEVICE_CLASSES = ["class_i", "class_iia", "class_iib", "class_iii"];
const MAX_BYTES = 20 * 1024 * 1024;

const inputCls =
  "h-12 rounded-xl border-[#1E3A8A]/12 bg-[#F8FAFC] focus-visible:bg-white focus-visible:border-[#0D9488] focus-visible:ring-2 focus-visible:ring-[#0D9488]/15";

export default function Contact() {
  useSeo("contact");
  const { lang } = useParams();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    company_name: "",
    contact_email: "",
    contact_phone: "",
    product_category: "",
    device_classification: "",
    target_markets: [],
    message: "",
    consent: false,
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleMarket = (m) => {
    setForm((f) => ({
      ...f,
      target_markets: f.target_markets.includes(m)
        ? f.target_markets.filter((x) => x !== m)
        : [...f.target_markets, m],
    }));
  };

  const handleFile = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".pdf") && f.type !== "application/pdf") {
      toast.error(t("contact.form.errors.fileType"));
      e.target.value = "";
      return;
    }
    if (f.size > MAX_BYTES) {
      toast.error(t("contact.form.errors.fileSize"));
      e.target.value = "";
      return;
    }
    setUploading(true);
    try {
      const res = await uploadFile(f);
      setFile(res);
      toast.success(t("contact.form.uploaded"));
    } catch (err) {
      const msg = err?.response?.data?.detail || t("contact.form.errors.uploadFailed");
      toast.error(msg);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  const removeFile = () => setFile(null);

  const validate = () => {
    const e = {};
    if (!form.company_name.trim()) e.company_name = t("contact.form.errors.required");
    if (!form.contact_email.trim()) {
      e.contact_email = t("contact.form.errors.required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.contact_email.trim())) {
      e.contact_email = t("contact.form.errors.email");
    }
    if (!form.product_category) e.product_category = t("contact.form.errors.required");
    if (!form.message.trim()) e.message = t("contact.form.errors.required");
    if (!form.consent) e.consent = t("contact.form.errors.consent");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const result = await submitContact({ ...form, locale: lang, file_id: file ? file.file_id : null });
      if (result?.email_sent === false) {
        toast.error(t("contact.form.errors.emailDeliveryFailed"));
        return;
      }
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err?.response?.data?.detail || t("contact.form.errors.submitFailed");
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      company_name: "",
      contact_email: "",
      contact_phone: "",
      product_category: "",
      device_classification: "",
      target_markets: [],
      message: "",
      consent: false,
      website: "",
    });
    setFile(null);
    setErrors({});
    setSuccess(false);
  };

  const base = `/${lang}`;
  const stepIcons = [Search, ShieldCheck, Clock];
  const steps = t("contact.sidebar.steps", { returnObjects: true });
  const stepList = Array.isArray(steps) ? steps : [];
  const rawPhones = t("contact.info.phones", { returnObjects: true });
  const phoneList = Array.isArray(rawPhones) ? rawPhones : [];
  const statIcons = [Clock, Globe, Lock, FileUp];
  const stats = t("contact.stats", { returnObjects: true });
  const statList = Array.isArray(stats) ? stats : [];

  return (
    <div data-testid="contact-page">
      {/* HERO (light, editorial) */}
      <section className="relative overflow-hidden border-b border-[#1E3A8A]/10 bg-gradient-to-b from-[#EEF2F6] to-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D9488]/10 blur-3xl" />
        <div className="relative hu-container pt-16 pb-10 sm:pt-20">
          <div className="max-w-3xl hu-fade-up">
            <Eyebrow>{t("contact.hero.eyebrow")}</Eyebrow>
            <h1 className="hu-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0A2240] sm:text-5xl lg:text-6xl">
              {t("contact.hero.title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#0A2240]/70">
              {t("contact.hero.subtitle")}
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {statList.map((s, i) => {
              const Icon = statIcons[i] || Clock;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-[#1E3A8A]/10 bg-white/80 p-4 backdrop-blur-sm transition-colors hover:border-[#0D9488]/30"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1E3A8A]/10 bg-[#0D9488]/8 text-[#0D9488]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="hu-display mt-3 text-xl font-bold text-[#0A2240]">{s.value}</div>
                  <div className="mt-0.5 text-xs text-[#0A2240]/55">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="bg-white py-14 sm:py-16">
        <div className="hu-container">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* LEFT, form */}
            <div className="lg:col-span-7">
              {success ? (
                <Reveal>
                  <div
                    data-testid="intake-success-message"
                    className="rounded-2xl border border-[#10B981]/30 bg-[#F0FDF4] p-8 text-center sm:p-12"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/12 text-[#10B981]">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold text-[#0A2240]">{t("contact.success.title")}</h2>
                    <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#0A2240]/70">
                      {t("contact.success.message")}
                    </p>
                    <button
                      onClick={resetForm}
                      className="mt-6 inline-flex items-center rounded-xl border border-[#1E3A8A]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0A2240] transition-colors hover:border-[#0D9488]"
                    >
                      {t("contact.success.again")}
                    </button>
                  </div>
                </Reveal>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#0A2240]">{t("contact.form.title")}</h2>
                  <p className="mt-2 text-[#0A2240]/65">{t("contact.form.subtitle")}</p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        padding: 0,
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0,0,0,0)",
                        whiteSpace: "nowrap",
                        border: 0,
                      }}
                    >
                      <label>
                        Website
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={(e) => set("website", e.target.value)}
                        />
                      </label>
                    </div>

                    {/* Company */}
                    <div>
                      <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.company")} *</Label>
                      <div className="relative mt-2">
                        <Building2 className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A2240]/40" />
                        <Input
                          data-testid="intake-company-input"
                          value={form.company_name}
                          onChange={(e) => set("company_name", e.target.value)}
                          placeholder={t("contact.form.companyPlaceholder")}
                          className={`ps-11 ${inputCls}`}
                        />
                      </div>
                      {errors.company_name && <p className="mt-1.5 text-sm text-[#B91C1C]">{errors.company_name}</p>}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.email")} *</Label>
                        <div className="relative mt-2">
                          <Mail className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A2240]/40" />
                          <Input
                            data-testid="intake-email-input"
                            type="email"
                            value={form.contact_email}
                            onChange={(e) => set("contact_email", e.target.value)}
                            placeholder={t("contact.form.emailPlaceholder")}
                            className={`ps-11 ${inputCls}`}
                          />
                        </div>
                        {errors.contact_email && <p className="mt-1.5 text-sm text-[#B91C1C]">{errors.contact_email}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.phone")}</Label>
                        <div className="relative mt-2">
                          <Phone className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A2240]/40" />
                          <Input
                            data-testid="intake-phone-input"
                            type="tel"
                            value={form.contact_phone}
                            onChange={(e) => set("contact_phone", e.target.value)}
                            placeholder={t("contact.form.phonePlaceholder")}
                            className={`ps-11 ${inputCls}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Category + Class */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.productCategory")} *</Label>
                        <Select value={form.product_category} onValueChange={(v) => set("product_category", v)}>
                          <SelectTrigger data-testid="intake-product-category-select" className={`mt-2 ${inputCls}`}>
                            <SelectValue placeholder={t("contact.form.productCategoryPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medical_device">{t("contact.form.options.medical_device")}</SelectItem>
                            <SelectItem value="cosmetics">{t("contact.form.options.cosmetics")}</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.product_category && <p className="mt-1.5 text-sm text-[#B91C1C]">{errors.product_category}</p>}
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.deviceClass")}</Label>
                        <Select value={form.device_classification} onValueChange={(v) => set("device_classification", v)}>
                          <SelectTrigger data-testid="intake-device-classification-select" className={`mt-2 ${inputCls}`}>
                            <SelectValue placeholder={t("contact.form.deviceClassPlaceholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            {DEVICE_CLASSES.map((c) => (
                              <SelectItem key={c} value={c}>{t(`contact.form.options.${c}`)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Markets */}
                    <div>
                      <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.markets")}</Label>
                      <div data-testid="intake-target-markets-checkbox-group" className="mt-3 grid grid-cols-2 gap-3">
                        {MARKETS.map((m) => (
                          <label
                            key={m}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3.5 transition-colors ${
                              form.target_markets.includes(m)
                                ? "border-[#0D9488] bg-[#0D9488]/5"
                                : "border-[#1E3A8A]/12 bg-white hover:bg-[#F8FAFC]"
                            }`}
                          >
                            <Checkbox
                              data-testid={`intake-market-${m}`}
                              checked={form.target_markets.includes(m)}
                              onCheckedChange={() => toggleMarket(m)}
                            />
                            <span className="text-sm text-[#0A2240]">{t(`contact.form.options.${m}`)}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.message")} *</Label>
                      <div className="relative mt-2">
                        <MessageSquare className="pointer-events-none absolute start-3.5 top-4 h-4 w-4 text-[#0A2240]/40" />
                        <Textarea
                          data-testid="intake-message-textarea"
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          placeholder={t("contact.form.messagePlaceholder")}
                          rows={5}
                          className={`ps-11 pt-3.5 ${inputCls.replace("h-12 ", "")}`}
                        />
                      </div>
                      {errors.message && <p className="mt-1.5 text-sm text-[#B91C1C]">{errors.message}</p>}
                    </div>

                    {/* File upload */}
                    <div>
                      <Label className="text-sm font-medium text-[#0A2240]">{t("contact.form.upload")}</Label>
                      <p className="mt-1 text-xs text-[#0A2240]/60">{t("contact.form.uploadHint")}</p>
                      <input
                        ref={fileInputRef}
                        data-testid="intake-pdf-upload-input"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={handleFile}
                        className="hidden"
                      />
                      {!file ? (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current && fileInputRef.current.click()}
                          disabled={uploading}
                          data-testid="intake-pdf-upload-button"
                          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#0D9488]/40 bg-[#0D9488]/5 py-5 text-sm font-medium text-[#0D9488] transition-colors hover:bg-[#0D9488]/10 disabled:opacity-60"
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {t("contact.form.uploading")}
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              {t("contact.form.uploadButton")}
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-[#10B981]/30 bg-[#10B981]/5 p-3.5">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <FileText className="h-5 w-5 shrink-0 text-[#0D9488]" />
                            <span className="truncate text-sm text-[#0A2240]">{file.original_filename}</span>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            data-testid="intake-remove-file-button"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#0A2240]/60 hover:text-[#B91C1C]"
                          >
                            <X className="h-4 w-4" />
                            {t("contact.form.removeFile")}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Consent */}
                    <div>
                      <label className="flex cursor-pointer items-start gap-3">
                        <Checkbox
                          data-testid="intake-consent-checkbox"
                          checked={form.consent}
                          onCheckedChange={(v) => set("consent", v === true)}
                          className="mt-0.5"
                        />
                        <span className="text-xs leading-relaxed text-[#0A2240]/75">{t("contact.form.consent")}</span>
                      </label>
                      {errors.consent && <p className="mt-1.5 text-sm text-[#B91C1C]">{errors.consent}</p>}
                    </div>

                    <Button
                      type="submit"
                      data-testid="intake-submit-button"
                      disabled={submitting}
                      className="group h-12 w-full rounded-xl bg-[#0D9488] font-semibold text-white hover:bg-[#10B981]"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="me-2 h-4 w-4 animate-spin" />
                          {t("contact.form.submitting")}
                        </>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" />
                          {t("contact.form.submit")}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl-flip" />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* RIGHT, info */}
            <div className="space-y-5 lg:col-span-5">
              {/* What happens next */}
              <div className="rounded-2xl border border-[#1E3A8A]/10 bg-[#F8FAFC] p-6 sm:p-7">
                <h3 className="text-lg font-bold text-[#0A2240]">{t("contact.sidebar.title")}</h3>
                <ol className="mt-5 space-y-5">
                  {stepList.map((s, i) => {
                    const Icon = stepIcons[i] || Search;
                    return (
                      <li key={s.title} className="flex gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#0A2240]">{s.title}</h4>
                          <p className="mt-1 text-sm leading-relaxed text-[#0A2240]/65">{s.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Other ways */}
              <div>
                <h3 className="text-lg font-bold text-[#0A2240]">{t("contact.info.title")}</h3>
                <p className="mt-1 text-sm text-[#0A2240]/65">{t("contact.info.subtitle")}</p>
                <div className="mt-4 space-y-3">
                  <a
                    href={`mailto:${t("contact.info.email")}`}
                    className="group flex items-center gap-4 rounded-2xl border border-[#1E3A8A]/10 bg-white p-4 transition-colors hover:border-[#0D9488]/30"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#0A2240]">{t("contact.info.emailLabel")}</div>
                      <div className="truncate text-sm text-[#0A2240]/65">{t("contact.info.email")}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#1E3A8A]/30 transition-all group-hover:translate-x-1 group-hover:text-[#0D9488] rtl-flip" />
                  </a>
                  {phoneList.map((ph) => (
                    <a
                      key={ph.tel}
                      href={`tel:${ph.tel}`}
                      className="group flex items-center gap-4 rounded-2xl border border-[#1E3A8A]/10 bg-white p-4 transition-colors hover:border-[#0D9488]/30"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0D9488]/10 text-[#0D9488]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-[#0A2240]">
                          {t("contact.info.phonesLabel")} · {ph.label}
                        </div>
                        <div className="hu-mono text-sm text-[#0A2240]/65" dir="ltr">{ph.display}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#1E3A8A]/30 transition-all group-hover:translate-x-1 group-hover:text-[#0D9488] rtl-flip" />
                    </a>
                  ))}
                  <div className="flex items-center gap-4 rounded-2xl border border-[#1E3A8A]/10 bg-white p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1E3A8A]/8 text-[#1E3A8A]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-[#0A2240]">{t("contact.info.locationLabel")}</div>
                      <div className="text-sm text-[#0A2240]/65">{t("contact.info.location")}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secure note */}
              <div className="flex items-start gap-2.5 rounded-2xl border border-[#0D9488]/20 bg-[#0D9488]/5 p-4">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#0D9488]" />
                <p className="text-xs leading-relaxed text-[#0A2240]/75">{t("contact.sidebar.secureNote")}</p>
              </div>

              {/* Privacy note */}
              <p className="px-1 text-[11px] leading-relaxed text-[#0A2240]/50">
                {t("contact.info.privacyNote")}{" "}
                <Link to={`${base}/privacy`} className="font-medium text-[#1E3A8A] hover:underline">
                  {t("contact.info.privacyLink")}
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ASSURANCE BAND */}
      <section className="border-t border-[#1E3A8A]/10 bg-[#F8FAFC] py-14">
        <div className="hu-container">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 text-[#0D9488]">
                <ShieldCheck className="h-5 w-5" />
                <span className="hu-mono text-[11px] uppercase tracking-[0.18em]">{t("contact.assurance.title")}</span>
              </div>
              <p className="mt-3 text-base leading-relaxed text-[#0A2240]/75">{t("contact.assurance.text")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Array.isArray(t("footer.marketsList", { returnObjects: true }))
                ? t("footer.marketsList", { returnObjects: true })
                : []
              ).map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-[#1E3A8A]/15 bg-white px-3.5 py-1.5 text-xs font-medium text-[#0A2240]/70"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
