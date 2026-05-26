import { useEffect, useState } from "react";
import {
  Phone, Mail, MapPin, Clock, ArrowRight,
  CheckCircle2, ChevronRight, MessageSquare, Send,
  Zap, Shield, Star
} from "lucide-react";
import Footer from "../components/Footer";

/* ── Mouse tracking for parallax hero ── */
function useMouseTracking() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return mousePos;
}

/* ── Scroll-reveal ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("rved"); io.unobserve(e.target); }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Data ── */
const PHONE_PRIMARY   = { display: "+91 75500 14333", tel: "+917550014333" };
const PHONE_SECONDARY = { display: "+91 98410 98167", tel: "+919841098167" };
const EMAIL_PRIMARY   = "tridentcapitalservices@gmail.com";
const EMAIL_SECONDARY = "naliniprabhu2017@gmail.com";
const WHATSAPP_NUM    = "917550014333";

const INFO_CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    accentColor: "#d4af37",
    items: [
      { text: PHONE_PRIMARY.display,   href: `tel:${PHONE_PRIMARY.tel}`,   tag: "Primary" },
      { text: PHONE_SECONDARY.display, href: `tel:${PHONE_SECONDARY.tel}`, tag: "Support" },
    ],
    note: "Mon – Sat  ·  9 AM – 7 PM",
    action: { label: "Tap to Call", href: `tel:${PHONE_PRIMARY.tel}` },
  },
  {
    icon: Mail,
    label: "Email Us",
    accentColor: "#b59235",
    items: [
      { text: EMAIL_PRIMARY,   href: `mailto:${EMAIL_PRIMARY}`,   tag: "General" },
      { text: EMAIL_SECONDARY, href: `mailto:${EMAIL_SECONDARY}`, tag: "Alt" },
    ],
    note: "We reply within 2 business hours",
    action: { label: "Send Email", href: `mailto:${EMAIL_PRIMARY}` },
  },
  {
    icon: MapPin,
    label: "Visit Us",
    accentColor: "#c9a227",
    items: [
      { text: "No 6/7, Near CSI Ewart School," },
      { text: "Santham Colony, Anna Nagar West Extension," },
      { text: "Chennai – 600101, Tamil Nadu" },
    ],
    note: "By prior appointment only",
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/maps?q=CSI+Ewart+School+Anna+Nagar+West+Extension+Chennai",
    },
  },
  {
    icon: Clock,
    label: "Business Hours",
    accentColor: "#a07828",
    items: [
      { text: "Monday – Friday  ·  9:00 AM – 7:00 PM" },
      { text: "Saturday  ·  9:00 AM – 2:00 PM" },
      { text: "Sunday  ·  Closed" },
    ],
    note: "Also closed on public holidays",
    action: null,
  },
];

const SCHEDULE = [
  { day: "Monday",    short: "Mon", time: "9:00 AM – 7:00 PM", open: true  },
  { day: "Tuesday",   short: "Tue", time: "9:00 AM – 7:00 PM", open: true  },
  { day: "Wednesday", short: "Wed", time: "9:00 AM – 7:00 PM", open: true  },
  { day: "Thursday",  short: "Thu", time: "9:00 AM – 7:00 PM", open: true  },
  { day: "Friday",    short: "Fri", time: "9:00 AM – 7:00 PM", open: true  },
  { day: "Saturday",  short: "Sat", time: "9:00 AM – 2:00 PM", open: true  },
  { day: "Sunday",    short: "Sun", time: "Closed",              open: false },
];
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* ════════════════════════════════════ */
export default function Contact() {
  useReveal();
  const mousePos = useMouseTracking();
  const today = DAY_NAMES[new Date().getDay()];

  const [form, setForm]           = useState({ name:"", phone:"", email:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState({});
  const [step, setStep]           = useState(1);

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim())  e.name  = "Name is required";
      if (!form.phone.trim()) e.phone = "Phone number is required";
    } else if (step === 2) {
      if (!form.email.trim()) e.email = "Email is required";
    } else {
      if (!form.message.trim()) e.message = "Please describe your requirement";
    }
    return e;
  };

  const next = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (step < 3) setStep(step + 1);
  };
  const prev = () => { if (step > 1) setStep(step - 1); };
  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };
  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: undefined }));
  };

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="contact-hero">
        <img
          src="/contact-bg.jpeg"
          alt=""
          className="contact-hero-img"
          style={{
            transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px) scale(1.1)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="contact-hero-overlay" />
        <div className="contact-hero-grid" />

        <div className="contact-hero-content">
          <p className="contact-breadcrumb">
            <a href="/">Home</a>
            <ChevronRight size={14} />
            <span>Contact Us</span>
          </p>

          <span className="contact-badge">Get in Touch</span>

          <h1
            className="contact-hero-title"
            style={{
              transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Let's Talk About <br />
            <span className="contact-hero-gold">Your Funding Needs.</span>
          </h1>

          <p
            className="contact-hero-sub"
            style={{
              transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            Reach out to our financial specialists for a no-obligation discussion
            about private finance, business loans, and structured funding solutions.
          </p>

          {/* Quick action pills */}
          <div className="contact-hero-pills">
            <a href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Golden%20Globe%20team%2C%20I%20need%20help%20with%20funding.`}
               target="_blank" rel="noopener noreferrer" className="pill-wa">
              <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.437-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.894 22.322c-.33.927-1.94 1.77-2.66 1.883-.68.108-1.54.153-2.486-.157a22.83 22.83 0 01-2.25-.832C13.1 21.8 10.64 19.1 10.3 18.67c-.34-.43-2.77-3.68-2.77-7.02 0-3.34 1.75-4.97 2.37-5.65.62-.68 1.35-.85 1.8-.85.45 0 .9.004 1.29.024.415.02.97-.158 1.52 1.16.57 1.35 1.94 4.69 2.11 5.03.17.34.28.74.055 1.19-.226.45-.34.73-.676 1.12-.337.4-.71.893-.676 1.35.34.453 1.52 2.01 3.26 3.26 2.24 1.58 4.13 2.07 4.72 2.3.59.227.93.19 1.27-.113.34-.3 1.46-1.7 1.85-2.29.39-.59.79-.49 1.33-.3.54.19 3.42 1.61 4.01 1.9.59.29.98.43 1.12.67.145.24.145 1.39-.183 2.32z"/>
              </svg>
              WhatsApp Us
            </a>
            <a href={`tel:${PHONE_PRIMARY.tel}`} className="pill-call">
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* ══ INFO CARDS ══ */}
      <section className="cards-section">
        {/* Shining gold background */}
        <div className="cards-bg-shine" />
        <div className="cards-bg-dots" />

        <div className="cards-wrapper">
          <div className="cards-grid">
            {INFO_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="info-card rv"
                  style={{ transitionDelay: `${idx * 80}ms`, "--accent": card.accentColor }}
                >
                  {/* top gold border animation */}
                  <div className="info-card-top-bar" />

                  <div className="info-card-icon-wrap">
                    <Icon size={26} style={{ color: card.accentColor }} strokeWidth={1.6} />
                  </div>

                  <p className="info-card-label">{card.label}</p>

                  <div className="info-card-items">
                    {card.items.map((item, i) => (
                      <div key={i} className="info-card-row">
                        {item.href ? (
                          <a href={item.href} className="info-card-link">
                            {item.text}
                          </a>
                        ) : (
                          <span className="info-card-text">{item.text}</span>
                        )}
                        {item.tag && (
                          <span className="info-card-tag">{item.tag}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="info-card-note">{card.note}</p>

                  {card.action && (
                    <a href={card.action.href} className="info-card-action">
                      {card.action.label}
                      <ArrowRight size={13} className="info-card-arrow" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FORM + RIGHT PANEL ══ */}
      <section className="form-section">
        <div className="form-section-inner">

          {/* ─ LEFT: Form ─ */}
          <div className="rv form-left">
            <p className="section-eyebrow">Send a Message</p>
            <h2 className="section-heading">
              We'd Love to Hear<br />From You.
            </h2>
            <div className="section-divider" />
            <p className="section-sub">
              Fill in the quick form — 3 simple steps, fully confidential.
              We'll get back to you within 2 hours on business days.
            </p>

            {/* Step Progress */}
            <div className="step-container">
              <div className="step-progress">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="step-item">
                    <div className={`step-circle ${step >= s ? "active" : ""}`}>
                      {step > s ? <CheckCircle2 size={16} /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`step-line ${step > s ? "active" : ""}`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="step-labels">
                <span>Basic Info</span>
                <span>Details</span>
                <span>Message</span>
              </div>
            </div>

            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">
                  <CheckCircle2 size={40} style={{ color: "#d4af37" }} />
                </div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. A specialist will contact you shortly.</p>
              </div>
            ) : (
              <div className="form-body">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="form-step">
                    <h3 className="step-title">Step 1 — Basic Information</h3>
                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="form-label">Full Name <span className="req">*</span></label>
                        <input
                          type="text"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          className={`form-input ${errors.name ? "err" : ""}`}
                        />
                        {errors.name && <p className="form-error">{errors.name}</p>}
                      </div>
                      <div className="form-field">
                        <label className="form-label">Phone Number <span className="req">*</span></label>
                        <input
                          type="tel"
                          placeholder="+91 00000 00000"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          className={`form-input ${errors.phone ? "err" : ""}`}
                        />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="form-step">
                    <h3 className="step-title">Step 2 — Funding Details</h3>
                    <div className="form-field">
                      <label className="form-label">Email Address <span className="req">*</span></label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={`form-input ${errors.email ? "err" : ""}`}
                      />
                      {errors.email && <p className="form-error">{errors.email}</p>}
                    </div>
                    <div className="form-field">
                      <label className="form-label">Service Interested In</label>
                      <select
                        value={form.service}
                        onChange={(e) => set("service", e.target.value)}
                        className="form-input form-select"
                      >
                        <option value="">Select a service</option>
                        <option>Private Finance</option>
                        <option>Business Loans</option>
                        <option>Cheque Based Finance</option>
                        <option>Loan Against Property</option>
                        <option>Industrial Machinery Loans</option>
                        <option>Professional Loans</option>
                        <option>Other / General Enquiry</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="form-step">
                    <h3 className="step-title">Step 3 — Your Requirement</h3>
                    <div className="form-field">
                      <label className="form-label">Describe Your Needs <span className="req">*</span></label>
                      <textarea
                        rows={5}
                        placeholder="Briefly describe your business and funding requirement..."
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        className={`form-input form-textarea ${errors.message ? "err" : ""}`}
                      />
                      {errors.message && <p className="form-error">{errors.message}</p>}
                    </div>
                  </div>
                )}

                <div className="form-nav">
                  {step > 1 && (
                    <button onClick={prev} className="btn-prev">← Back</button>
                  )}
                  {step < 3 ? (
                    <button onClick={next} className="btn-next">
                      Continue <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button onClick={submit} className="btn-next">
                      <Send size={15} /> Send Message
                    </button>
                  )}
                </div>
                <p className="form-disclaimer">
                  🔒 All enquiries are strictly confidential. No spam, ever.
                </p>
              </div>
            )}
          </div>

          {/* ─ RIGHT: Map + Quick Connect ─ */}
          <div className="rv form-right" style={{ transitionDelay: "120ms" }}>
            {/* Map */}
            <div className="map-wrap">
              <iframe
                title="Golden Globe Enterprises Location"
                src="https://maps.google.com/maps?q=CSI%20Ewart%20School,%20Anna%20Nagar%20West%20Extension,%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Connect */}
            <div className="quick-connect">
              <div className="qc-header">
                <Zap size={16} style={{ color: "#d4af37" }} />
                <span className="qc-title">Instant Connect</span>
              </div>
              <p className="qc-sub">
                Skip the form — reach us directly for immediate help.
              </p>

              <div className="qc-links">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Golden%20Globe%20team%2C%20I%20need%20funding%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="qc-link qc-wa"
                >
                  <span className="qc-link-left">
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                      <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.437-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.894 22.322c-.33.927-1.94 1.77-2.66 1.883-.68.108-1.54.153-2.486-.157a22.83 22.83 0 01-2.25-.832C13.1 21.8 10.64 19.1 10.3 18.67c-.34-.43-2.77-3.68-2.77-7.02 0-3.34 1.75-4.97 2.37-5.65.62-.68 1.35-.85 1.8-.85.45 0 .9.004 1.29.024.415.02.97-.158 1.52 1.16.57 1.35 1.94 4.69 2.11 5.03.17.34.28.74.055 1.19-.226.45-.34.73-.676 1.12-.337.4-.71.893-.676 1.35.34.453 1.52 2.01 3.26 3.26 2.24 1.58 4.13 2.07 4.72 2.3.59.227.93.19 1.27-.113.34-.3 1.46-1.7 1.85-2.29.39-.59.79-.49 1.33-.3.54.19 3.42 1.61 4.01 1.9.59.29.98.43 1.12.67.145.24.145 1.39-.183 2.32z"/>
                    </svg>
                    WhatsApp — Priority Support
                  </span>
                  <ArrowRight size={13} className="qc-arrow" />
                </a>

                {/* Calls */}
                {[
                  { label: PHONE_PRIMARY.display,   href: `tel:${PHONE_PRIMARY.tel}`,   sub: "Primary" },
                  { label: PHONE_SECONDARY.display, href: `tel:${PHONE_SECONDARY.tel}`, sub: "Support" },
                ].map((item, i) => (
                  <a key={i} href={item.href} className="qc-link">
                    <span className="qc-link-left">
                      <Phone size={14} style={{ color: "#d4af37" }} />
                      <span>
                        {item.label}
                        <em className="qc-tag">{item.sub}</em>
                      </span>
                    </span>
                    <ArrowRight size={13} className="qc-arrow" />
                  </a>
                ))}

                {/* Emails */}
                {[
                  { label: EMAIL_PRIMARY,   sub: "General" },
                  { label: EMAIL_SECONDARY, sub: "Alternate" },
                ].map((item, i) => (
                  <a key={i} href={`mailto:${item.label}`} className="qc-link">
                    <span className="qc-link-left">
                      <Mail size={14} style={{ color: "#d4af37" }} />
                      <span>
                        <span className="qc-email">{item.label}</span>
                        <em className="qc-tag">{item.sub}</em>
                      </span>
                    </span>
                    <ArrowRight size={13} className="qc-arrow" />
                  </a>
                ))}
              </div>

              <div className="qc-badge">
                <Shield size={14} style={{ color: "#d4af37" }} />
                <span>Average response: <strong>under 2 hours</strong> on business days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BUSINESS HOURS SECTION ══ */}
      <section className="hours-section rv">
        <div className="hours-inner">
          <div className="hours-left">
            <p className="section-eyebrow">Working Hours</p>
            <h2 className="section-heading">When We're <span className="gold-text">Available</span></h2>
            <p className="section-sub">
              We're here six days a week to help you navigate your funding journey.
              Walk-ins welcome Monday to Friday during business hours.
            </p>
            <div className="hours-today-badge">
              <span className="today-dot" />
              <span>
                Today ({today}): <strong>
                  {SCHEDULE.find(s => s.day === today)?.open
                    ? SCHEDULE.find(s => s.day === today)?.time
                    : "Closed"}
                </strong>
              </span>
            </div>
          </div>

          <div className="hours-right">
            {SCHEDULE.map((s) => (
              <div key={s.day} className={`hours-row ${s.day === today ? "today" : ""} ${!s.open ? "closed" : ""}`}>
                <div className="hours-row-left">
                  <span className={`hours-dot-small ${s.day === today ? "active" : ""}`} />
                  <span className="hours-day-name">{s.short}</span>
                  <span className="hours-day-full">{s.day}</span>
                </div>
                <div className="hours-row-right">
                  <span className={`hours-time ${!s.open ? "closed-text" : ""}`}>{s.time}</span>
                  {s.day === today && <span className="today-pill">Today</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="cta-band">
        <div className="cta-band-bg" />
        <div className="cta-band-inner rv">
          <div>
            <p className="cta-eyebrow">Need Funding Fast?</p>
            <h2 className="cta-heading">Speak to a Specialist Today.</h2>
            <p className="cta-sub">Private Finance, Business Loans, and more — structured for you.</p>
          </div>
          <div className="cta-actions">
            <a href={`tel:${PHONE_PRIMARY.tel}`} className="cta-gold">
              <Phone size={15} /> Call Now
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Golden%20Globe%2C%20I%20need%20funding%20help.`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-wa"
            >
              <svg viewBox="0 0 32 32" width="15" height="15" fill="currentColor">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.437-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.894 22.322c-.33.927-1.94 1.77-2.66 1.883-.68.108-1.54.153-2.486-.157a22.83 22.83 0 01-2.25-.832C13.1 21.8 10.64 19.1 10.3 18.67c-.34-.43-2.77-3.68-2.77-7.02 0-3.34 1.75-4.97 2.37-5.65.62-.68 1.35-.85 1.8-.85.45 0 .9.004 1.29.024.415.02.97-.158 1.52 1.16.57 1.35 1.94 4.69 2.11 5.03.17.34.28.74.055 1.19-.226.45-.34.73-.676 1.12-.337.4-.71.893-.676 1.35.34.453 1.52 2.01 3.26 3.26 2.24 1.58 4.13 2.07 4.72 2.3.59.227.93.19 1.27-.113.34-.3 1.46-1.7 1.85-2.29.39-.59.79-.49 1.33-.3.54.19 3.42 1.61 4.01 1.9.59.29.98.43 1.12.67.145.24.145 1.39-.183 2.32z"/>
              </svg>
              WhatsApp
            </a>
            <button onClick={() => window.scrollTo({ top: document.querySelector('.form-section')?.offsetTop || 0, behavior: 'smooth' })} className="cta-outline">
              <Send size={15} /> Send Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* ══ WHATSAPP FLOAT ══ */}
      <a
        href={`https://wa.me/${WHATSAPP_NUM}?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20financial%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.437-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.894 22.322c-.33.927-1.94 1.77-2.66 1.883-.68.108-1.54.153-2.486-.157a22.83 22.83 0 01-2.25-.832C13.1 21.8 10.64 19.1 10.3 18.67c-.34-.43-2.77-3.68-2.77-7.02 0-3.34 1.75-4.97 2.37-5.65.62-.68 1.35-.85 1.8-.85.45 0 .9.004 1.29.024.415.02.97-.158 1.52 1.16.57 1.35 1.94 4.69 2.11 5.03.17.34.28.74.055 1.19-.226.45-.34.73-.676 1.12-.337.4-.71.893-.676 1.35.34.453 1.52 2.01 3.26 3.26 2.24 1.58 4.13 2.07 4.72 2.3.59.227.93.19 1.27-.113.34-.3 1.46-1.7 1.85-2.29.39-.59.79-.49 1.33-.3.54.19 3.42 1.61 4.01 1.9.59.29.98.43 1.12.67.145.24.145 1.39-.183 2.32z"/>
        </svg>
        <span className="wa-tooltip">Chat on WhatsApp</span>
      </a>

      <Footer />

      {/* ── All Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');

        /* ─ Base font ─ */
        body { font-family: 'Outfit', sans-serif; }

        /* ─ Reveal ─ */
        .rv   { opacity: 0; transform: translateY(36px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .rved { opacity: 1; transform: translateY(0); }

        /* ═══════════ HERO ═══════════ */
        .contact-hero {
          position: relative; min-height: 420px;
          display: flex; align-items: flex-end; overflow: hidden;
          background: #05070f;
        }
        .contact-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; z-index: 1;
        }
        .contact-hero-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to right, rgba(5,7,15,0.92) 0%, rgba(5,7,15,0.75) 55%, rgba(5,7,15,0.4) 100%);
        }
        .contact-hero-grid {
          position: absolute; inset: 0; z-index: 3; opacity: 0.06;
          background-image: repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(212,175,55,0.6) 40px),
                            repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(212,175,55,0.6) 40px);
        }
        .contact-hero-content {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto; padding: 7rem 2.5rem 3.5rem;
          width: 100%;
        }

        .contact-breadcrumb {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 500; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem;
        }
        .contact-breadcrumb a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
        .contact-breadcrumb a:hover { color: #d4af37; }
        .contact-breadcrumb span { color: #fff; }
        .contact-badge {
          display: inline-block; font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          background: #d4af37; color: #000; padding: 5px 14px; margin-bottom: 1.25rem;
        }
        .contact-hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700; color: #fff;
          line-height: 1.1; margin-bottom: 1rem;
        }
        .contact-hero-gold {
          background: linear-gradient(135deg, #d4af37, #f0d060, #b59235);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-hero-sub {
          font-size: 1rem; color: rgba(255,255,255,0.65);
          max-width: 560px; line-height: 1.75; margin-bottom: 2rem;
        }
        .contact-hero-pills { display: flex; gap: 12px; flex-wrap: wrap; }
        .pill-wa, .pill-call {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px; border-radius: 4px;
          font-size: 0.82rem; font-weight: 600; text-decoration: none;
          transition: all 0.3s;
        }
        .pill-wa  { background: #25D366; color: #fff; box-shadow: 0 6px 20px rgba(37,211,102,0.35); }
        .pill-wa:hover  { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,211,102,0.5); }
        .pill-call { background: rgba(212,175,55,0.12); border: 1px solid rgba(212,175,55,0.4); color: #d4af37; }
        .pill-call:hover { background: #d4af37; color: #000; transform: translateY(-2px); }

        /* ═══════════ CARDS SECTION ═══════════ */
        .cards-section {
          position: relative; padding: 5rem 0;
          background: linear-gradient(135deg, #fdf9ee 0%, #faf6e4 40%, #f5eecc 70%, #fdf9ee 100%);
          overflow: hidden;
        }
        .cards-bg-shine {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(212,175,55,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(212,175,55,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,235,150,0.10) 0%, transparent 60%);
          pointer-events: none;
        }
        .cards-bg-dots {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.35;
          background-image: radial-gradient(circle, rgba(180,140,30,0.35) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        /* Animated shimmer sweep across section */
        @keyframes shine-sweep {
          0%   { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(200%) rotate(25deg); }
        }
        .cards-section::after {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,230,100,0.18) 50%, transparent 100%);
          animation: shine-sweep 6s ease-in-out infinite;
        }
        .cards-wrapper {
          max-width: 1280px; margin: 0 auto; padding: 0 2.5rem; position: relative; z-index: 1;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        /* ─ Single Info Card ─ */
        .info-card {
          position: relative; overflow: hidden;
          background: #fff;
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 16px;
          padding: 2rem 1.75rem 1.75rem;
          box-shadow: 0 4px 24px rgba(180,140,30,0.08), 0 1px 4px rgba(0,0,0,0.04);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.4s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.3s;
          display: flex; flex-direction: column;
        }
        .info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(180,140,30,0.18), 0 2px 8px rgba(0,0,0,0.06);
          border-color: rgba(212,175,55,0.5);
        }
        .info-card-top-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, #BF953F, #FCF6BA, #B38728, #AA771C);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .info-card:hover .info-card-top-bar { transform: scaleX(1); }

        /* Gold shine sweep on hover */
        .info-card::after {
          content: ''; position: absolute;
          top: -60%; left: -60%; width: 50%; height: 220%;
          background: linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.12) 50%, transparent 60%);
          transform: rotate(25deg) translateX(-100%);
          transition: transform 0.6s ease;
          pointer-events: none;
        }
        .info-card:hover::after { transform: rotate(25deg) translateX(350%); }

        .info-card-icon-wrap {
          width: 52px; height: 52px; border-radius: 12px;
          background: linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06));
          border: 1px solid rgba(212,175,55,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.2rem;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), background 0.3s;
        }
        .info-card:hover .info-card-icon-wrap {
          transform: scale(1.1) rotate(4deg);
          background: linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.1));
        }
        .info-card-label {
          font-family: 'Outfit', sans-serif;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #BF953F; margin-bottom: 0.8rem;
        }
        .info-card-items { flex-grow: 1; margin-bottom: 1rem; }
        .info-card-row {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 0.45rem; flex-wrap: wrap;
        }
        .info-card-link {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem; font-weight: 600; color: #111;
          text-decoration: none; line-height: 1.4;
          transition: color 0.2s;
          word-break: break-word;
        }
        .info-card-link:hover { color: #d4af37; }
        .info-card-text {
          font-family: 'Outfit', sans-serif;
          font-size: 1.02rem; font-weight: 500; color: #374151; line-height: 1.55;
        }
        .info-card-tag {
          display: inline-block; font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: rgba(212,175,55,0.12); color: #BF953F;
          border: 1px solid rgba(212,175,55,0.25);
          padding: 2px 7px; border-radius: 4px; white-space: nowrap;
        }
        .info-card-note {
          font-size: 0.85rem; color: #6b7280; font-weight: 400;
          font-family: 'Outfit', sans-serif; margin-bottom: 1.25rem;
        }
        .info-card-action {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.1em; color: #d4af37; text-decoration: none;
          border-top: 1px solid rgba(212,175,55,0.15); padding-top: 1rem;
          transition: gap 0.3s;
          margin-top: auto;
        }
        .info-card-action:hover { gap: 10px; }
        .info-card-arrow { transition: transform 0.3s; }
        .info-card-action:hover .info-card-arrow { transform: translateX(4px); }

        /* ═══════════ FORM SECTION ═══════════ */
        .form-section { padding: 5rem 0; background: #fff; }
        .form-section-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2.5rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
        }
        @media (max-width: 900px) {
          .form-section-inner { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        .section-eyebrow {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #BF953F; margin-bottom: 0.75rem; display: block;
        }
        .section-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 3.5vw, 2.8rem);
          font-weight: 700; color: #111; line-height: 1.15; margin-bottom: 1rem;
        }
        .section-divider {
          width: 48px; height: 3px;
          background: linear-gradient(90deg, #BF953F, #FCF6BA, #B38728);
          border-radius: 2px; margin-bottom: 1.25rem;
        }
        .section-sub {
          font-size: 1rem; color: #6b7280; line-height: 1.75; margin-bottom: 2rem;
        }
        .gold-text {
          background: linear-gradient(135deg, #BF953F, #d4af37, #AA771C);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        /* Step progress */
        .step-container { max-width: 290px; margin-bottom: 2rem; }
        .step-progress { display: flex; align-items: center; margin-bottom: 0.5rem; }
        .step-item { display: flex; align-items: center; }
        .step-circle {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700;
          background: #f3f4f6; color: #9ca3af;
          border: 2px solid #e5e7eb;
          transition: all 0.4s;
        }
        .step-circle.active {
          background: linear-gradient(135deg, #BF953F, #d4af37);
          color: #000; border-color: transparent;
          box-shadow: 0 4px 14px rgba(191,149,63,0.35);
        }
        .step-line {
          width: 60px; height: 2px; background: #e5e7eb;
          margin: 0 8px; transition: background 0.4s;
        }
        .step-line.active { background: linear-gradient(90deg, #BF953F, #d4af37); }
        .step-labels {
          display: flex; justify-content: space-between;
          font-size: 0.7rem; font-weight: 600; color: #9ca3af;
          text-transform: uppercase; letter-spacing: 0.05em;
          padding: 0 2px;
        }

        /* Form */
        .form-body { margin-top: 1rem; }
        .form-step { margin-bottom: 1.5rem; }
        .step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: #111; margin-bottom: 1.25rem;
        }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 600px) { .form-row-2 { grid-template-columns: 1fr; } }
        .form-field { margin-bottom: 1.1rem; }
        .form-label {
          display: block; font-size: 0.7rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #374151; margin-bottom: 6px;
        }
        .req { color: #d4af37; }
        .form-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid rgba(212,175,55,0.25);
          border-radius: 8px; font-size: 0.9rem; font-family: 'Outfit', sans-serif;
          color: #111; background: #fdfcf8;
          outline: none; transition: all 0.3s;
        }
        .form-input::placeholder { color: #9ca3af; }
        .form-input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 4px rgba(212,175,55,0.12);
          background: #fff;
        }
        .form-input.err { border-color: #fca5a5; }
        .form-textarea { resize: none; }
        .form-select { appearance: none; cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23d4af37' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 14px center;
        }
        .form-error { font-size: 0.7rem; color: #ef4444; margin-top: 4px; }
        .form-nav { display: flex; gap: 12px; align-items: center; padding-top: 0.5rem; }
        .btn-prev {
          padding: 12px 22px; border: 1.5px solid #e5e7eb; border-radius: 8px;
          font-size: 0.85rem; font-weight: 600; color: #374151;
          background: #fff; cursor: pointer; transition: all 0.3s;
        }
        .btn-prev:hover { border-color: #d4af37; color: #d4af37; }
        .btn-next {
          margin-left: auto; display: flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 8px; border: none;
          background: linear-gradient(135deg, #BF953F, #d4af37, #AA771C);
          color: #000; font-size: 0.88rem; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 20px rgba(191,149,63,0.35);
          transition: all 0.3s;
        }
        .btn-next:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(191,149,63,0.45); }
        .form-disclaimer { font-size: 0.72rem; color: #9ca3af; text-align: center; margin-top: 1rem; }
        .form-success {
          text-align: center; padding: 4rem 2rem;
          border: 1px solid rgba(212,175,55,0.25);
          background: #fff;
          box-shadow: 0 10px 40px rgba(212,175,55,0.08);
          border-radius: 16px;
        }
        .form-success-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05));
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.5rem; border: 1px solid rgba(212,175,55,0.2);
        }
        .form-success h3 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: #111; margin-bottom: 0.75rem;
        }
        .form-success p { font-size: 1.05rem; color: #6b7280; line-height: 1.6; max-width: 320px; margin: 0 auto; }

        /* Map */
        .map-wrap {
          width: 100%; height: 300px; border-radius: 14px;
          overflow: hidden; border: 1px solid rgba(212,175,55,0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          margin-bottom: 1.5rem;
        }

        /* Quick Connect */
        .quick-connect {
          background: linear-gradient(135deg, #faf9f0 0%, #f5eecc 100%);
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 14px;
          padding: 1.75rem;
          box-shadow: 0 8px 30px rgba(180,140,30,0.1);
        }
        .qc-header { display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem; }
        .qc-title {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #BF953F;
        }
        .qc-sub { font-size: 0.85rem; color: #6b7280; margin-bottom: 1.25rem; }
        .qc-links { display: flex; flex-direction: column; gap: 10px; }
        .qc-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 13px 16px; border-radius: 8px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(212,175,55,0.2);
          text-decoration: none; color: #1f2937;
          font-size: 0.85rem; font-weight: 600;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .qc-link::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent);
          transition: left 0.5s;
        }
        .qc-link:hover { border-color: #d4af37; color: #d4af37; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,175,55,0.18); }
        .qc-link:hover::before { left: 100%; }
        .qc-wa { background: rgba(37,211,102,0.06); border-color: rgba(37,211,102,0.3); color: #15803d; }
        .qc-wa:hover { background: #25D366; color: #fff; border-color: #25D366; box-shadow: 0 6px 20px rgba(37,211,102,0.3); }
        .qc-link-left { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .qc-email { font-size: 0.75rem; word-break: break-word; display: block; line-height: 1.2; margin-bottom: 2px; }
        .qc-tag {
          font-size: 0.55rem; font-weight: 700; font-style: normal;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: #BF953F; display: block;
        }
        .qc-arrow { color: #d1d5db; transition: transform 0.3s; }
        .qc-link:hover .qc-arrow { transform: translateX(5px); }
        .qc-badge {
          display: flex; align-items: center; gap: 8px;
          margin-top: 1rem; padding: 10px 14px;
          background: rgba(212,175,55,0.08); border: 1px solid rgba(212,175,55,0.2);
          border-radius: 8px; font-size: 0.78rem; color: #374151;
        }
        .qc-badge strong { color: #1a1a1a; }

        /* ═══════════ HOURS SECTION ═══════════ */
        .hours-section { padding: 5rem 0; background: #f8f7f2; }
        .hours-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2.5rem;
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 4rem; align-items: start;
        }
        @media (max-width: 900px) { .hours-inner { grid-template-columns: 1fr; gap: 2.5rem; } }
        .hours-today-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px; border-radius: 50px;
          background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.3);
          font-size: 0.85rem; color: #374151; margin-top: 1.5rem;
        }
        .today-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 4px rgba(34,197,94,0.2);
          animation: pulse-green 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 4px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(34,197,94,0.1); }
        }
        .hours-right { display: flex; flex-direction: column; gap: 4px; }
        .hours-row {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 10px;
          font-size: 0.9rem; transition: all 0.3s;
          position: relative;
        }
        .hours-row:hover { background: rgba(212,175,55,0.06); }
        .hours-row.today { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.25); }
        .hours-row.closed { opacity: 0.55; }
        .hours-row-left { display: flex; align-items: center; gap: 10px; flex: 1; }
        .hours-dot-small {
          width: 8px; height: 8px; border-radius: 50; flex-shrink: 0;
          background: #d1d5db; transition: background 0.3s;
        }
        .hours-dot-small.active { background: #22c55e; }
        .hours-day-name {
          font-weight: 700; font-size: 0.85rem; color: #374151; width: 32px;
        }
        .hours-day-full {
          font-size: 0.88rem; color: #6b7280;
        }
        .hours-row-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .hours-time { font-weight: 600; font-size: 0.88rem; color: #111; }
        .hours-time.closed-text { color: #d1d5db; }
        .today-pill {
          position: relative;
          font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; background: #d4af37; color: #000;
          padding: 3px 8px; border-radius: 4px; white-space: nowrap;
        }

        /* ═══════════ CTA BAND ═══════════ */
        .cta-band { position: relative; padding: 4rem 0; background: #080a12; overflow: hidden; }
        .cta-band-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 50% 80% at 10% 50%, rgba(212,175,55,0.1), transparent 70%),
            radial-gradient(ellipse 40% 60% at 90% 50%, rgba(212,175,55,0.07), transparent 70%);
        }
        .cta-band-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2.5rem;
          display: flex; flex-direction: row; align-items: center;
          justify-content: space-between; gap: 2rem; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .cta-eyebrow {
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #d4af37; margin-bottom: 0.5rem; display: block;
        }
        .cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 700; color: #fff; margin-bottom: 0.5rem;
        }
        .cta-sub { font-size: 0.88rem; color: rgba(255,255,255,0.45); }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
        .cta-gold, .cta-wa, .cta-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; font-size: 0.82rem; font-weight: 700;
          text-decoration: none; border-radius: 6px; transition: all 0.3s;
        }
        .cta-gold {
          background: linear-gradient(135deg, #BF953F, #d4af37, #AA771C);
          color: #000; box-shadow: 0 6px 20px rgba(191,149,63,0.4);
        }
        .cta-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(191,149,63,0.5); }
        .cta-wa { background: #25D366; color: #fff; box-shadow: 0 6px 20px rgba(37,211,102,0.3); }
        .cta-wa:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(37,211,102,0.45); }
        .cta-outline {
          border: 1.5px solid rgba(212,175,55,0.35); color: #d4af37; background: transparent; cursor: pointer;
        }
        .cta-outline:hover { background: #d4af37; color: #000; }

        /* ═══════════ WhatsApp Float ═══════════ */
        .wa-float {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          width: 56px; height: 56px; border-radius: 50%;
          background: #25D366; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 32px rgba(37,211,102,0.5);
          text-decoration: none; transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .wa-float:hover { transform: scale(1.12) translateY(-4px); box-shadow: 0 16px 40px rgba(37,211,102,0.6); }
        .wa-tooltip {
          position: absolute; right: 68px; top: 50%; transform: translateY(-50%);
          background: #111; color: #fff; font-size: 11px; font-weight: 600;
          white-space: nowrap; padding: 7px 14px; border-radius: 6px;
          opacity: 0; pointer-events: none; transition: all 0.3s;
        }
        .wa-float:hover .wa-tooltip { opacity: 1; transform: translateY(-50%) translateX(-6px); }

        @media (max-width: 768px) {
          .contact-hero-content { padding: 6rem 1.5rem 2.5rem; }
          .cards-wrapper { padding: 0 1.5rem; }
          .form-section-inner, .hours-inner { padding: 0 1.5rem; }
          .cta-band-inner { flex-direction: column; text-align: center; }
          .cta-actions { justify-content: center; }
        }
      `}</style>
    </>
  );
}