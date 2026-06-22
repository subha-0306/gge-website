import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  Plus, 
  Minus, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import Footer from "../../components/Footer";

// Subtle background particles component
function DetailBackgroundParticles({ light = false }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate static random positions on load to avoid hydration issues
    const items = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid overlay */}
      <div className={`absolute inset-0 ${light ? 'opacity-[0.015] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]' : 'opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]'} bg-[size:40px_40px]`} />
      
      {/* Drifting gradient orbs (no animate-pulse per request) */}
      <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#BF953F] ${light ? 'opacity-[0.025]' : 'opacity-[0.05]'} rounded-full blur-[120px]`} />
      <div className={`absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-600 ${light ? 'opacity-[0.015]' : 'opacity-[0.03]'} rounded-full blur-[150px]`} />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${light ? 'bg-[#BF953F]/20' : 'bg-white/20'}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Reusable FAQ Accordion Item
function FAQItem({ faq, isOpen, toggleOpen, light = false }) {
  return (
    <div className={`border-b ${light ? 'border-gray-200' : 'border-white/10'} py-4 last:border-b-0`}>
      <button
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between text-left py-2 font-medium ${light ? 'text-gray-900 hover:text-[#BF953F]' : 'text-white hover:text-[#BF953F]'} transition-colors focus:outline-none`}
      >
        <span className="text-base md:text-lg flex items-start gap-3">
          <HelpCircle size={20} className="text-[#BF953F] shrink-0 mt-1" />
          <span>{faq.question}</span>
        </span>
        <span className={`ml-4 p-1 rounded-full ${light ? 'bg-gray-100 border border-gray-200 text-gray-700' : 'bg-white/5 border border-white/10 text-white'} flex items-center justify-center shrink-0`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className={`mt-2 pl-8 text-sm md:text-base ${light ? 'text-gray-650' : 'text-gray-300'} leading-relaxed max-w-4xl`}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServiceDetailTemplate({ service }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", notes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [service.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://gge-oisn.onrender.com/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          phoneNumber: formData.phone,
          email: formData.email,
          message: formData.notes,
          serviceType: service.title || "Other / General Enquiry",
          source: `Service Page - ${service.title}`,
        }),
      });

      let data = {};
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json().catch(() => ({}));
      } else {
        const text = await res.text().catch(() => "");
        data = { message: text || `Server error (${res.status})` };
      }

      if (!res.ok) {
        throw new Error(
          data.errors?.map((err) => err.message).join(", ") ||
          data.message ||
          "Something went wrong. Please try again."
        );
      }

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", notes: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
  };

  return (
    <div className="services-detail-page bg-white text-gray-900 min-h-screen font-sans selection:bg-[#BF953F] selection:text-black overflow-x-hidden">
      
      {/* ══ DEDICATED HEADER & BREADCRUMBS - IMAGE HERO ══ */}
      <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/5">
        {/* Background image */}
        <img
          src="/service-hero-bg.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Multi-layer dark overlay for text legibility */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Gold accent glow — top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#BF953F]/10 blur-[120px] rounded-full pointer-events-none z-[3]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Back button */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-white/70 hover:text-[#BF953F] transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Services
          </Link>

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/50 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-white/30" />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} className="text-white/30" />
            <span className="text-[#D4AF37] font-semibold">{service.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 border border-white/15 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]/90">GGE Capital Solutions</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.1] drop-shadow-lg"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {service.title}
            </h1>

            <p className="text-base md:text-lg text-white/75 leading-relaxed font-light max-w-2xl drop-shadow">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ══ QUICK HIGHLIGHTS (GLOWING PANEL) ══ */}
      {service.meta?.highlights && (
        <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0C172A] to-[#0A1220] p-6 md:p-8 shadow-[0_24px_50px_rgba(0,0,0,0.4)] backdrop-blur">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(400px_circle_at_10%_20%,rgba(191,149,63,0.1),transparent_40%)] pointer-events-none" />
            <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.meta.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#BF953F]/10 border border-[#BF953F]/20 flex items-center justify-center text-[#BF953F] shrink-0 group-hover:bg-[#BF953F] group-hover:text-black transition-all duration-300">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-gray-200 tracking-wide">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ OVERVIEW & FEATURES (WHITE LIGHT THEME) ══ */}
      <section className="py-20 md:py-28 bg-white relative">
        <DetailBackgroundParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Rich Overview */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Solution Overview</span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#111111] mt-2 mb-6 font-serif">
                  A structured look at our financial model
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light mb-6">
                  {service.overview}
                </p>
              </div>

              {/* Benefits Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#BF953F] tracking-wide uppercase">Core Advantages</h3>
                <div className="grid sm:grid-cols-1 gap-4">
                  {service.benefits.map((benefit, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 p-5 rounded-2xl bg-[#f8f7f4]/60 border border-gray-200/80 hover:border-[#BF953F]/40 hover:bg-[#FAF8F3]/40 transition-all shadow-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                      </span>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Features Showcase - White Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="relative rounded-3xl border border-gray-200 bg-white p-6 md:p-8 overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 w-24 h-24 bg-[#BF953F]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-[#BF953F]">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-bold font-serif text-gray-900">Service Parameters</h3>
                </div>

                <div className="space-y-6">
                  {service.features.map((feat, idx) => {
                    const [title, desc] = feat.split(":");
                    return (
                      <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <h4 className="text-sm md:text-base font-bold text-gray-900 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                          {title}
                        </h4>
                        {desc && <p className="text-xs md:text-sm text-gray-650 mt-1.5 leading-relaxed">{desc.trim()}</p>}
                      </div>
                    );
                  })}
                </div>

                {/* Eligibility Checkbox layout */}
                {service.eligibility && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F] mb-4">Minimum Eligibility</h4>
                    <ul className="space-y-3">
                      {service.eligibility.map((el, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700 leading-relaxed">
                          <CheckCircle2 size={16} className="text-[#BF953F] shrink-0 mt-0.5" />
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="py-14 bg-[#0d0d0d] relative border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#BF953F]">The Blueprint</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
              Process Timeline
            </h2>
          </div>


          {/* Cards grid — no connector line */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.howItWorks.map((step, idx) => {
              const isActive = activeStep === idx;
              const stepNum = String(step.step || idx + 1).padStart(2, "0");
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="relative rounded-xl border cursor-pointer overflow-hidden group"
                  style={{
                    border: isActive ? "1px solid rgba(191,149,63,0.45)" : "1px solid rgba(255,255,255,0.07)",
                    background: "#111111",
                    transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                    boxShadow: isActive ? "0 8px 32px rgba(191,149,63,0.08)" : "none",
                  }}
                >
                  {/* Gold shimmer that slides across on hover */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(191,149,63,0.08) 50%, transparent 70%)",
                      transform: isActive ? "translateX(0%)" : "translateX(-100%)",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  />

                  {/* Top gold accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{
                      background: isActive
                        ? "linear-gradient(90deg, #BF953F, #D4AF37, transparent)"
                        : "transparent",
                      transition: "background 0.4s ease",
                    }}
                  />

                  <div className="relative z-10 p-5">
                    {/* Badge row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-[13px] font-bold text-[#BF953F] border border-[#BF953F]/20 shrink-0"
                        style={{
                          background: "#0d0d0d",
                          fontFamily: "'Inter', sans-serif",
                          transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                          boxShadow: isActive ? "0 0 14px rgba(191,149,63,0.2)" : "none",
                          transform: isActive ? "scale(1.08)" : "scale(1)",
                        }}
                      >
                        {stepNum}
                      </div>
                      <span
                        className="text-[9px] uppercase tracking-[0.22em] font-semibold"
                        style={{
                          color: isActive ? "#BF953F" : "rgba(255,255,255,0.25)",
                          transition: "color 0.35s ease",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Stage {stepNum}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-[14.5px] font-semibold text-white mb-2 leading-snug"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[12.5px] leading-[1.6]"
                      style={{
                        color: isActive ? "#9A9A9A" : "#5A5A5A",
                        transition: "color 0.35s ease",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ INTERACTIVE FAQ SECTION (ACCORDION - LIGHT THEME) ══ */}
      <section className="py-20 md:py-28 bg-[#f8f7f4] relative">
        <DetailBackgroundParticles light={true} />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Frictionless Support</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-2 font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-gray-650 mt-3">
              Clear answers to help you navigate our financial solutions.
            </p>
          </div>

          <div className="rounded-[2rem] border border-gray-200 bg-white p-6 md:p-10 shadow-lg">
            <div className="divide-y divide-gray-250">
              {service.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={activeFaq === index}
                  toggleOpen={() => setActiveFaq(activeFaq === index ? null : index)}
                  light={true}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 text-center rounded-2xl bg-[#BF953F]/10 border border-[#BF953F]/20 p-6">
            <h4 className="text-base font-bold text-gray-900 font-serif">Have more specific questions regarding {service.title}?</h4>
            <p className="text-xs md:text-sm text-gray-600 mt-1">Our advisory desk is available for direct calls from 10:00 AM to 6:30 PM.</p>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US & RELATED SERVICES (LIGHT CREAM THEME) ══ */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Why Choose Us */}
            <div className="md:col-span-7">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Why GGE</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1 mb-4 font-serif">Commitment to Structured Underwriting</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                {service.whyChooseUs}
              </p>
            </div>

            {/* Related Services Links */}
            <div className="md:col-span-5 rounded-2xl bg-[#f8f7f4] border border-gray-200 shadow-sm p-6">
              <h4 className="text-xs uppercase tracking-widest font-extrabold text-gray-500 mb-4">Related Solutions</h4>
              <div className="space-y-3">
                {service.relatedServices.map((slug) => {
                  const label = slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <Link
                      key={slug}
                      to={`/services/${slug}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#BF953F]/10 border border-gray-200 hover:border-[#BF953F]/20 text-sm font-semibold transition-all group shadow-sm"
                    >
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{label}</span>
                      <ArrowRight size={16} className="text-gray-400 group-hover:text-[#BF953F] group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ELEGANT BOTTOM CONVERSION CTA - STAYS DARK FOR PREMIUM CONTRAST ══ */}
      <section className="py-20 md:py-28 bg-[#050B14] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#BF953F] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-[#0D1625] via-[#080E18] to-[#0D1625] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            
            {/* Dynamic geometric circle ornament */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-[#BF953F]/5 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: CTA Context */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-xs font-bold text-[#BF953F] uppercase tracking-wider">
                  <ShieldCheck size={14} className="mt-0.5" />
                  Premium Advisory Desk
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif">
                  Initiate Your Custom Funding Request Today
                </h2>
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                  Our credit advisory team evaluates your transaction values, asset collateral, or operational turnover immediately. We provide a customized preliminary letter of intent within 24 hours of documentation audit.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <a
                    href="tel:+919843693697"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black px-6 py-3.5 text-sm font-extrabold hover:bg-opacity-95 shadow-[0_12px_24px_rgba(191,149,63,0.15)] transition"
                  >
                    <Phone size={16} />
                    Call Advisory Desk
                  </a>
                  <a
                    href="mailto:ggenterprises.fin@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 text-sm font-extrabold border border-white/10 transition"
                  >
                    <Mail size={16} />
                    Email Credentials
                  </a>
                </div>
              </div>

              {/* Right Column: Mini Form */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-[#050B14]/80 p-6 md:p-8 backdrop-blur shadow-xl relative">
                  
                  <h3 className="text-lg font-bold text-white mb-2 font-serif">Enquire Securely</h3>
                  <p className="text-xs text-gray-400 mb-5 leading-normal">
                    Enter details below for immediate response from our dedicated director.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Funding Requirement details</label>
                      <textarea
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder={`Details regarding your ${service.title} requirement...`}
                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black py-3 text-xs md:text-sm font-extrabold hover:bg-opacity-90 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Secure File</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p className="text-red-400 text-xs text-center mt-2">
                        {submitError}
                      </p>
                    )}

                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#0B1423] rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-[#BF953F]/30"
                        >
                          <CheckCircle2 size={40} className="text-[#BF953F] mb-3" />
                          <h4 className="text-base font-bold text-white">Transmission Successful</h4>
                          <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
                            Your secure request file has been routed to our direct credit desk. A relationship director will call you shortly.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER RENDER ══ */}
      <Footer />
    </div>
  );
}
