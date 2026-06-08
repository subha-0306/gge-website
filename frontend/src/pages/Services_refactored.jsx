// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  Percent,
  Building2,
  Factory,
  Briefcase,
  Handshake,
  CreditCard,
  Home,
  Scale,
  Wallet,
  ArrowRight,
  Check,
  UserCheck,
  Network,
  Globe,
  Lightbulb,
  FileSearch,
  Landmark,
  BadgeCheck,
  PiggyBank,
  Repeat,
  ArrowLeftRight,

  ChevronDown,
  Megaphone,
  Calculator,
  Calculator as CalculatorIcon,

  CarFront,
  LandPlot,
  Truck,
  Stethoscope,
  Navigation,
} from "lucide-react";

function useMouseTracking() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePos;
}

function useInViewOnce() {
  const reduce = useReducedMotion();
  return useMemo(() => ({ once: true, amount: reduce ? 0 : 0.2 }), [reduce]);
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function FadeUp({ children, delay = 0, className = "" }) {
  const inView = useInViewOnce();
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  const inView = useInViewOnce();
  return (
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={inView}
        transition={{ duration: 0.45 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-[#BF953F]/20 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#BF953F] shadow-[0_0_18px_rgba(191,149,63,0.7)]" />
        <span className="text-xs md:text-sm font-semibold tracking-wide text-[#111111]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>{eyebrow}</span>
      </motion.div>

      <FadeUp className="mt-5">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.2' }}>
          {title}
        </h2>
      </FadeUp>

      {description ? (
        <FadeUp delay={0.08} className="mt-4 text-sm md:text-base text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>
          {description}
        </FadeUp>
      ) : null}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur shadow-[0_18px_60px_rgba(191,149,63,0.08)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(1200px_circle_at_10%_0%,rgba(17,17,17,0.05),transparent_40%),radial-gradient(900px_circle_at_100%_10%,rgba(191,149,63,0.1),transparent_42%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function StatCounter({ value, suffix = "+", label }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduce]);

  const displayValue = reduce ? value : display;

  return (
    <div className="flex flex-col gap-1">
      <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
        {displayValue}
        <span className="text-[#BF953F]">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>{label}</div>
    </div>
  );
}

function FundingEstimator({ onCta }) {
  const [amount, setAmount] = useState(2000000);
  const [rate, setRate] = useState(14.5);
  const [months, setMonths] = useState(18);

  const P = Math.max(0, Number(amount) || 0);
  const annualRate = Math.max(0, Number(rate) || 0);
  const n = Math.max(0, Number(months) || 0);
  const r = annualRate > 0 ? annualRate / 12 / 100 : 0;

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    let _emi = 0;
    let _totalInterest = 0;
    let _totalPayment = 0;

    if (P > 0 && n > 0) {
      if (r > 0) {
        _emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      } else {
        _emi = P / n;
      }
      _totalPayment = _emi * n;
      _totalInterest = _totalPayment - P;
    }

    return {
      emi: _emi,
      totalInterest: _totalInterest,
      totalPayment: _totalPayment,
    };
  }, [P, r, n]);

  const format = (num) =>
    Number.isFinite(num)
      ? num.toLocaleString("en-IN", { maximumFractionDigits: 0 })
      : "0";

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2">
        <GlassCard className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BF953F]/25 bg-[#111111]/5">
                <CalculatorIcon size={16} className="text-[#111111]" />
                <span className="text-xs md:text-sm font-semibold text-[#111111]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Funding Estimator</span>
              </div>
              <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Estimate your EMI</h3>
              <p className="mt-2 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>
                Enter your requirement and see a premium estimate for planning.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#4A4A4A]">Loan Amount (₹)</label>
              <input
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm outline-none focus:border-[#BF953F] focus:ring-2 focus:ring-[#BF953F]/20"
                type="number"
                value={amount}
                min={0}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Interest Rate (%)</label>
                <input
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm outline-none focus:border-[#BF953F] focus:ring-2 focus:ring-[#BF953F]/20"
                  type="number"
                  step="0.1"
                  value={rate}
                  min={0}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Tenure (Months)</label>
                <input
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm outline-none focus:border-[#BF953F] focus:ring-2 focus:ring-[#BF953F]/20"
                  type="number"
                  value={months}
                  min={1}
                  onChange={(e) => setMonths(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-[#111111]/10 bg-[#111111]/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#BF953F]/25 flex items-center justify-center shadow-sm">
                    <Zap className="text-[#111111]" size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Quick estimate</div>
                    <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Updates instantly</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Indicative EMI</div>
                  <div className="text-xl font-extrabold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    ₹ {format(emi)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onCta}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#111111] text-white px-5 py-3 text-sm font-bold shadow-[0_12px_30px_rgba(191,149,63,0.15)] hover:shadow-[0_18px_45px_rgba(191,149,63,0.25)] transition"
            >
              Enquire for best rates
              <ArrowRight size={16} />
            </button>
          </div>
        </GlassCard>
      </div>

      <div className="lg:col-span-3">
        <GlassCard className="p-6 md:p-8 h-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Projected details</h3>
              <p className="mt-2 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>
                A structured view of expected repayment cost.
              </p>
            </div>
            <div className="hidden sm:block w-12 h-12 rounded-2xl bg-white/70 border border-[#BF953F]/25 flex items-center justify-center">
              <Percent className="text-[#111111]" size={22} />
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
              <div className="text-xs font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Monthly EMI</div>
              <div className="mt-2 text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>₹ {format(emi)}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
              <div className="text-xs font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Total Interest</div>
              <div className="mt-2 text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>₹ {format(totalInterest)}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-4">
              <div className="text-xs font-semibold text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>Total Payment</div>
              <div className="mt-2 text-2xl font-extrabold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>₹ {format(totalPayment)}</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#111111]/10 bg-[#111111]/5 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#BF953F]/25 flex items-center justify-center shadow-sm">
                <ShieldCheck className="text-[#111111]" size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Transparent, structured processing</div>
                <div className="text-xs md:text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>
                  Final eligibility and pricing are confirmed after documentation review.
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Services() {
  const mousePos = useMouseTracking();

  const [leadState, setLeadState] = useState({ name: "", phone: "" });

  const handleEnquire = () => {
    setLeadState({ name: "", phone: "" });
    const el = document.getElementById("cta-enquire");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const services = useMemo(
    () => [
      {
        key: "business-loans",
        title: "Business Loans",
        desc: "Funding solutions through Banks and NBFCs with structured underwriting.",
        icon: Building2,
      },
      {
        key: "cheque",
        title: "Check Based Finance",
        desc: "Funding against banking transactions and cheque flows to support cash continuity.",
        icon: CreditCard,
      },
      {
        key: "professional",
        title: "Professional Loans",
        desc: "Specialized financing for professionals to expand practice and operations.",
        icon: Briefcase,
      },
      {
        key: "lap",
        title: "Loan Against Property",
        desc: "Residential & commercial asset-backed funding with tailored repayment structures.",
        icon: Home,
      },
      {
        key: "car-refinance",
        title: "Car Refinance",
        desc: "Unlock liquidity on your vehicle asset with fast processing and flexible repayment.",
        icon: CarFront,
        bullets: [
          "Up to 200% of IDV funding",
          "Fast processing",
          "48-hour approval",
        ],
        featured: true,
      },
      {
        key: "working-capital",
        title: "Working Capital Solutions",
        desc: "Overdraft, cash credit, CGTMSE and trade-related funding to keep growth moving.",
        icon: Wallet,
        bullets: ["Overdraft", "Cash Credit", "CGTMSE", "Trade-related funding"],
      },
      {
        key: "bg",
        title: "Bank Guarantee",
        desc: "Strengthen contract execution with reliable issuance and compliance-focused processing.",
        icon: ShieldCheck,
      },
      {
        key: "lc",
        title: "Letter of Credit",
        desc: "Support trade flows with structured LC arrangements for timely procurement.",
        icon: Globe,
      },
      {
        key: "packing",
        title: "Packing Credit",
        desc: "Bridge short-term export requirements with disciplined credit structuring.",
        icon: Truck,
      },
      {
        key: "machinery",
        title: "Machinery Purchase Finance",
        desc: "Finance equipment upgrades that improve capacity, productivity and cash efficiency.",
        icon: Factory,
      },
      {
        key: "medical",
        title: "Medical Equipment Finance",
        desc: "Asset-backed funding for diagnostic and medical machinery with faster turnaround.",
        icon: Stethoscope,
      },
    ],
    []
  );

  return (
    <div>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[350px] flex items-end overflow-hidden bg-gray-100">
        
        <img
          src="/services-bg.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{
            transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Subtle geometric pattern (No Gradient Overlay) */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-multiply z-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(0,0,0,0.1) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(0,0,0,0.1) 40px)",
          }}
        />

        <div className="relative z-30 max-w-7xl mx-auto px-8 pb-14 pt-28 w-full text-left flex flex-col items-start drop-shadow-lg">
          <p className="flex items-center gap-2 text-sm mb-6 font-medium text-gray-300 drop-shadow-sm">
            <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
            <ChevronRight size={14} />
            <span className="text-white font-semibold">Services</span>
          </p>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black bg-[#d4af37] px-4 py-1.5 mb-5 rounded-sm shadow-md">
            What We Do
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md"
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif",
              transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            Strategic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#D4AF37] drop-shadow-md">
              Financial Solutions
            </span>
          </h1>
          <p
            className="mt-2 text-sm md:text-base text-gray-200 max-w-2xl leading-relaxed font-medium drop-shadow-md"
            style={{ 
              fontFamily: "'Inter', 'Montserrat', sans-serif",
              lineHeight: '1.7',
              transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            Tailored funding solutions designed to empower businesses at every stage of growth.
          </p>
        </div>
      </section>

      {/* SECTION 1: PREMIUM SERVICES OVERVIEW */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-white to-[#F7FAFF]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Premium funding clarity"
            title={
              <>
                Services built for <span className="text-[#BF953F]">fast decisions</span>
              </>
            }
            description="A corporate, trust-led approach to financing—structured reviews, clear communication, and lender-aligned solutions."
          />

          <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7">
              <GlassCard className="p-6 md:p-8 h-full">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#BF953F]/25 bg-white/60">
                      <Sparkles size={16} className="text-[#BF953F]" />
                      <span className="text-xs md:text-sm font-semibold text-[#111111]">What you get</span>
                    </div>
                    <h3 className="mt-4 text-xl md:text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Trust-first, decision-fast processing</h3>
                    <p className="mt-3 text-sm md:text-base text-[#4A4A4A] max-w-xl" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>
                      From eligibility checks to documentation review, we help you present the right story—so lenders can move with confidence.
                    </p>
                  </div>
                  <div className="hidden md:flex w-14 h-14 rounded-2xl bg-white border border-[#BF953F]/25 items-center justify-center shadow-sm">
                    <ShieldCheck className="text-[#111111]" size={26} />
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-5">
                  <div className="rounded-2xl border border-gray-200 bg-white/60 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#111111]/5 border border-[#111111]/10 flex items-center justify-center">
                        <Zap className="text-[#111111]" size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Fast approvals</div>
                        <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Speed with discipline</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Quick checks, structured documents, and proactive lender follow-ups.</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white/60 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#111111]/5 border border-[#111111]/10 flex items-center justify-center">
                        <TrendingUp className="text-[#111111]" size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Funding solutions</div>
                        <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Designed for growth</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Multiple structures matched to cash flow patterns and asset profiles.</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white/60 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#111111]/5 border border-[#111111]/10 flex items-center justify-center">
                        <UserCheck className="text-[#111111]" size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Business support</div>
                        <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Guided documentation</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>We help you prepare, validate, and submit with minimal friction.</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white/60 p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#111111]/5 border border-[#111111]/10 flex items-center justify-center">
                        <Network className="text-[#111111]" size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Industry expertise</div>
                        <div className="text-xs text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Lender-aligned approach</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>We structure your requirement with underwriting in mind.</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="lg:col-span-5">
              <GlassCard className="p-6 md:p-8 h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#111111]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Trust indicators</h3>
                    <p className="mt-2 text-sm text-[#4A4A4A]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>Premium standards that reduce ambiguity.</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/70 border border-[#BF953F]/25 flex items-center justify-center shadow-sm">
                    <BadgeCheck className="text-[#BF953F]" size={24} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-5">
                  <StatCounter value={48} suffix="h" label="Initial checks" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} />
                  <StatCounter value={24} suffix="-48h" label="Approval focus" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} />
                  <StatCounter value={150} suffix="+" label="Structured submissions" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} />
                  <StatCounter value={12} suffix="mo" label="Typical planning" style={{ fontFamily: "'Playfair Display', Georgia, serif" }} />
                </div>

                <div className="mt-7 space-y-3">
                  {["Clear lender-ready documentation", "Structured underwriting narrative", "Proactive follow-up", "Transparent next steps"].map((t, idx) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: idx * 0.04 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-2xl border border-[#BF953F]/20 bg-white/70 flex items-center justify-center">
                        <Check className="text-[#BF953F]" size={18} />
                      </div>
                      <div className="text-sm font-semibold text-[#111111]" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>{t}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-[#111111] text-white p-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                      <Lightbulb size={20} className="text-[#BF953F]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Need a tailored solution?</div>
                      <div className="text-xs md:text-sm text-white/80 mt-1" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif", lineHeight: '1.7' }}>We match your requirement with the right credit structure.</div>
                      <button
                        onClick={handleEnquire}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#111111] bg-[#BF953F] px-4 py-2 rounded-xl hover:opacity-95 transition"
                      >
                        Talk to our team
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2-8 CONTINUES... */}
    </div>
  );
}

export default Services;