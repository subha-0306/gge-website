// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Zap,
  Percent,
  Building2,
  Factory,
  Briefcase,
  Handshake,
  CreditCard,
  Home as HomeIcon,
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
  CarFront,
  LandPlot,
  Truck,
  Stethoscope,
  Navigation,
} from "lucide-react";
import Footer from "../components/Footer";

// Mouse tracking hook for the Hero parallax
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

// Particle System for Premium Background Effects
function ServicesParticles({ light = false }) {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Stably generate positions on the client side to avoid hydration mismatches
    const items = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 5,
    }));
    setDots(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid overlay */}
      <div className={`absolute inset-0 ${light ? 'opacity-[0.015] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]' : 'opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]'} bg-[size:50px_50px]`} />

      {/* Moving ambient gradient orbs (no animate-pulse per request) */}
      <div className={`absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-[#BF953F] ${light ? 'opacity-[0.025]' : 'opacity-[0.04]'} rounded-full blur-[140px]`} />
      <div className={`absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600 ${light ? 'opacity-[0.015]' : 'opacity-[0.03]'} rounded-full blur-[160px]`} />

      {/* Floating micro-particles */}
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className={`absolute rounded-full ${light ? 'bg-[#BF953F]/20' : 'bg-white/20'}`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [0, -120, 0],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Premium Calculator Component
function InteractiveFundingCalculator() {
  const [amount, setAmount] = useState(25000000); // 2.5 Crores default
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(12.5);

  const P = Number(amount);
  const n = Number(months);
  const r = (Number(rate) / 12) / 100;

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

    return { emi: _emi, totalInterest: _totalInterest, totalPayment: _totalPayment };
  }, [P, r, n]);

  const formatCurrency = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} L`;
    }
    return `₹ ${val.toLocaleString("en-IN")}`;
  };

  const formatRaw = (val) => val.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <div className="rounded-[2.5rem] border border-gray-200 bg-white p-6 md:p-10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#BF953F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Sliders Input */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#BF953F] shadow-sm">
              <Calculator size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-gray-900">Dynamic Funding Estimator</h3>
              <p className="text-xs text-gray-500">Configure parameters for a customized financial scenario.</p>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Target Capital Requirement (₹)</span>
              <span className="font-bold text-[#BF953F]">{amount ? formatCurrency(amount) : "₹ 0"}</span>
            </div>
            <input
              type="number"
              value={amount === 0 ? "" : amount}
              onChange={(e) => {
                const val = e.target.value;
                setAmount(val === "" ? "" : Number(val));
              }}
              className="w-full rounded-xl bg-gray-50/50 border border-gray-200 text-gray-900 px-4 py-3 text-sm font-bold outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition shadow-sm"
              placeholder="e.g. 25000000"
              min="0"
            />
          </div>

          {/* Tenure Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Preferred Tenure (Months)</span>
              <span className="font-bold text-[#BF953F]">{months ? `${months} Months` : ""}</span>
            </div>
            <input
              type="number"
              value={months === 0 ? "" : months}
              onChange={(e) => {
                const val = e.target.value;
                setMonths(val === "" ? "" : Number(val));
              }}
              className="w-full rounded-xl bg-gray-50/50 border border-gray-200 text-gray-900 px-4 py-3 text-sm font-bold outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition shadow-sm"
              placeholder="e.g. 12"
              min="1"
            />
          </div>

          {/* Rate Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Indicative Interest Rate (% p.a.)</span>
              <span className="font-bold text-[#BF953F]">{rate ? `${rate}% p.a.` : ""}</span>
            </div>
            <input
              type="number"
              step="0.1"
              value={rate === 0 ? "" : rate}
              onChange={(e) => {
                const val = e.target.value;
                setRate(val === "" ? "" : Number(val));
              }}
              className="w-full rounded-xl bg-gray-50/50 border border-gray-200 text-gray-900 px-4 py-3 text-sm font-bold outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition shadow-sm"
              placeholder="e.g. 12.5"
              min="0"
            />
          </div>
        </div>

        {/* Results Visualizer */}
        <div className="lg:col-span-5 rounded-3xl border border-gray-200 bg-gray-50/50 p-6 md:p-8 space-y-6 relative">
          <div className="text-center pb-4 border-b border-gray-200">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-gray-500">Monthly Commitment</span>
            <div className="text-3xl md:text-4xl font-extrabold text-[#BF953F] mt-1 font-serif">
              ₹ {formatRaw(emi)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total Interest</span>
              <div className="text-lg font-bold text-gray-900 mt-1">₹ {formatRaw(totalInterest)}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Total Repayment</span>
              <div className="text-lg font-bold text-gray-900 mt-1">₹ {formatRaw(totalPayment)}</div>
            </div>
          </div>

          {/* Visual ratio bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>Principal: {totalPayment > 0 ? ((P / totalPayment) * 100).toFixed(0) : 0}%</span>
              <span>Interest: {totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(0) : 0}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden flex">
              <div className="bg-[#BF953F]" style={{ width: `${totalPayment > 0 ? (P / totalPayment) * 100 : 0}%` }} />
              <div className="bg-[#BF953F]/40" style={{ width: `${totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0}%` }} />
            </div>
          </div>

          <a
            href="#cta-enquire"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black py-3 text-sm font-extrabold hover:bg-opacity-95 shadow-[0_4px_12px_rgba(191,149,63,0.2)] transition"
          >
            Submit for Advisory File Review
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const mousePos = useMouseTracking();
  const [leadState, setLeadState] = useState({ name: "", phone: "", email: "", notes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredSlug, setHoveredSlug] = useState(null);

  const handleEnquire = () => {
    const el = document.getElementById("cta-enquire");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "https://gge-oisn.onrender.com/api"}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadState.name,
          phoneNumber: leadState.phone,
          email: leadState.email,
          message: leadState.notes,
          source: "Services Page",
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
      setLeadState({ name: "", phone: "", email: "", notes: "" });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Other services data mapping to dedicated details pages
  const otherServicesList = useMemo(
    () => [
      {
        slug: "business-loans",
        title: "Business Loans",
        desc: "Funding solutions structured through Tier-1 banks and NBFC networks with expert balance-sheet representation.",
        icon: Building2,
        highlight: "Collaborations with 20+ Lenders",
      },
      {
        slug: "cheque-based-finance",
        title: "Cheque Based Finance",
        desc: "Secure short-term operating capital against clearing cycles, purchase orders, and merchant transactions.",
        icon: CreditCard,
        highlight: "Clearance-led approvals",
      },
      {
        slug: "professional-loans",
        title: "Professional Loans",
        desc: "Dedicated unsecured lines of credit for doctors, CAs, lawyers, and consulting firms at preferential rates.",
        icon: Briefcase,
        highlight: "Collateral-free limits",
      },
      {
        slug: "loan-against-property",
        title: "Loan Against Property",
        desc: "Maximize real estate value by unlocking substantial multi-million liquidity with extended repayment tenures.",
        icon: HomeIcon,
        highlight: "LTV up to 75% of asset val",
      },
      {
        slug: "car-refinance",
        title: "Car Refinance",
        desc: "Unlock equity on premium personal or corporate vehicle assets with rapid hypothecation processing.",
        icon: CarFront,
        bullets: ["Up to 200% IDV Funding", "Fast Approval", "48 Hour Processing"],
        highlight: "IDV values up to 200%",
      },
      {
        slug: "working-capital-solutions",
        title: "Working Capital Solutions",
        desc: "Overdraft lines, cash credit facilities, and CGTMSE loans designed to smooth operating cash conversion.",
        icon: Wallet,
        highlight: "OD, CC, and CGTMSE lines",
      },
      {
        slug: "bank-guarantee",
        title: "Bank Guarantee",
        desc: "Assure performance and payment securities with swift SFMS transmission from top public/private banks.",
        icon: ShieldCheck,
        highlight: "Performance and Financial BGs",
      },
      {
        slug: "letter-of-credit",
        title: "Letter of Credit",
        desc: "Facilitate global and domestic supply flows through sight or usance LCs that build instant supplier trust.",
        icon: Globe,
        highlight: "Import & domestic shipping limits",
      },
      {
        slug: "packing-credit",
        title: "Packing Credit",
        desc: "Pre-shipment financing in local or foreign currency (PCFC) to fund global export contracts and inventory prep.",
        icon: Truck,
        highlight: "FC PCFC hedging options",
      },
      {
        slug: "machinery-purchase-finance",
        title: "Machinery Purchase Finance",
        desc: "Acquire industrial capital equipment using asset hypothecation frameworks that preserve operating margins.",
        icon: Factory,
        highlight: "LTV up to 80-90% on machinery",
      },
      {
        slug: "medical-equipment-finance",
        title: "Medical Equipment Finance",
        desc: "Specialized diagnostics and hospital equipment leasing models with custom scanning volume mappings.",
        icon: Stethoscope,
        highlight: "Hospital capex term loans",
      },
    ],
    []
  );

  return (
    <div className="services-page font-sans bg-white selection:bg-[#BF953F] selection:text-black overflow-x-hidden">

      {/* ══ HERO (DO NOT MODIFY structure/positioning) ══ */}
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
              fontFamily: "'Playfair Display', Georgia, serif"
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
              lineHeight: '1.7'
            }}
          >
            Tailored funding solutions designed to empower businesses at every stage of growth.
          </p>
        </div>
      </section>

      {/* ══ REDESIGNED AREA START (CONTRAST LIGHT THEME & LAYERED LAYOUTS) ══ */}

      {/* SECTION 1: STATS & OVERVIEW PANEL */}
      <section className="py-10 md:py-14 bg-white relative group/statssec hover:bg-[#FDFBF5] transition-colors duration-500" style={{ boxShadow: 'inset 0 0 0 0 rgba(191,149,63,0)' }} onMouseEnter={e => e.currentTarget.style.boxShadow = 'inset 0 0 80px 0 rgba(191,149,63,0.07)'} onMouseLeave={e => e.currentTarget.style.boxShadow = 'inset 0 0 0 0 rgba(191,149,63,0)'}>
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-[#111111] leading-tight">
              Building Momentum Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#D4AF37]">Smart Financing</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 mt-3 leading-relaxed font-light">
              We structure corporate lending and private debt portfolios to bypass operational delays, allowing high-growth firms to proceed with certainty.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { label: "Aggregate Placed Volume", val: 750, suffix: " Cr+" },
              { label: "Decisions within", val: 24, suffix: " Hours" },
              { label: "Financial Institutions", val: 35, suffix: "+" },
              { label: "Client Retainment", val: 98, suffix: "%" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="p-6 rounded-3xl border border-gray-200/80 bg-white hover:border-[#BF953F]/40 transition-colors text-center shadow-sm hover:shadow-md"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-[#BF953F] font-serif">
                  <CountUp end={stat.val} duration={2} enableScrollSpy scrollSpyOnce />
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: FEATURED PRIVATE FINANCE (HERO SERVICE - BENTO GRID LAYOUT) */}
      <section className="py-20 bg-[#f8f7f4] border-t border-gray-200/60 relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#BF953F]">Flagship Service</span>
            <h2 className="text-3xl md:text-[2.6rem] font-bold text-[#111111] mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Private Finance
            </h2>
            <p className="text-base text-gray-500 mt-3 leading-loose font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
              GGE's premier credit solution for time-sensitive, high-liquidity requirements — structured without bureau dependencies.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">

            {/* Main Dark Card */}
            <div className="lg:col-span-7 flex flex-col rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#0a0a0a] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#BF953F]/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-6 flex-grow">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-[11px] font-bold text-[#BF953F] uppercase tracking-widest w-fit">
                  <Sparkles size={13} />
                  Private Debt · GGE Direct
                </div>

                <h3 className="text-[1.75rem] md:text-[2.1rem] font-bold text-white leading-snug" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Rapid Capital Access for<br />High-Growth Businesses
                </h3>

                <p className="text-[15px] text-gray-300 leading-loose font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                  GGE's private finance desk evaluates collateral strength, business cash flows, and transaction viability to fast-track disbursals — entirely independent of standard bureau timelines. Designed for promoters, MSMEs, and corporates who need capital now.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { title: "Emergency Funding", desc: "Immediate liquidity to sustain operations during critical cash flow gaps." },
                    { title: "Bridge Financing", desc: "Short-term capital to bridge acquisitions before long-term facilities activate." },
                    { title: "Trade & Procurement", desc: "Finance bulk purchases and inventory at favorable cash terms." },
                    { title: "Asset-Backed Capital", desc: "Unlock funds against real estate or business assets, swiftly processed." },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl bg-white/[0.05] border border-white/[0.07] p-4 space-y-2">
                      <h4 className="text-[13px] font-semibold text-white flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F] shrink-0" />
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-gray-400 leading-relaxed pl-3.5 font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[12px] text-gray-500 font-light">GGE Underwriting Desk · Direct Evaluation</span>
                <Link
                  to="/services/private-finance"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black px-6 py-3 text-sm font-bold hover:bg-opacity-90 transition"
                >
                  Explore Private Finance
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Feature Card */}
            <div className="lg:col-span-5 flex flex-col gap-5 rounded-[2rem] border border-gray-200/80 bg-white p-8 shadow-xl">
              <h4 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Why Businesses Choose GGE</h4>

              <div className="flex flex-col gap-2.5">
                {[
                  "No CIBIL Score Dependency",
                  "Approval Decision in 24–48 Hours",
                  "Tenure: 3 to 15 Months",
                  "Non-Bureau Processing Route",
                  "Flexible Repayment Structures",
                  "Same-Week Operational Disbursal",
                  "Minimal Documentation Required",
                ].map((item, idx) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#faf9f6] border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#BF953F]/15 flex items-center justify-center text-[#BF953F] shrink-0">
                      <Check size={13} />
                    </div>
                    <span className="text-[13.5px] text-gray-700 font-normal leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto rounded-xl bg-[#BF953F]/10 border border-[#BF953F]/20 p-5 text-center">
                <div className="text-sm font-semibold text-[#BF953F]">Need Capital Urgently?</div>
                <p className="text-[12px] text-gray-500 mt-1.5 leading-relaxed font-light">Our desk reviews your submission within 2 hours and responds with a structured proposal.</p>
                <button
                  onClick={handleEnquire}
                  className="mt-4 w-full py-2.5 text-sm font-bold bg-[#BF953F] hover:bg-opacity-90 transition rounded-lg text-black"
                >
                  Initiate Secure Request
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: OTHER SERVICES SHOWCASE */}
      <section className="py-24 bg-white relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Solutions Showcase</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-1 font-serif">
              Structured Credit Portfolios
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
              We coordinate custom facilities backed by top public, private, and non-banking partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherServicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 3) * 0.075,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col justify-between rounded-2xl border bg-white p-6 relative overflow-hidden"
                  style={{
                    boxShadow: "0 4px 24px rgba(180,140,30,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                    borderColor: "rgba(212,175,55,0.2)",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s",
                  }}
                  onMouseEnter={e => {
                    setHoveredSlug(service.slug);
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(180,140,30,0.18), 0 2px 8px rgba(0,0,0,0.06)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
                  }}
                  onMouseLeave={e => {
                    setHoveredSlug(null);
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(180,140,30,0.08), 0 1px 4px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.2)";
                  }}
                >
                  {/* Top Bar Gradient Animation */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-20" />

                  {/* Gold Sweep Animation */}
                  <div 
                    className="absolute pointer-events-none top-[-60%] left-[-60%] w-1/2 h-[220%] bg-gradient-to-r from-transparent via-[#d4af37]/12 to-transparent transition-transform duration-[600ms] ease-out z-20"
                    style={{
                      transform: hoveredSlug === service.slug 
                        ? 'rotate(25deg) translateX(350%)' 
                        : 'rotate(25deg) translateX(-100%)',
                    }}
                  />

                  {/* Giant per-card watermark icon — ultra-muted */}
                  <div className="absolute -right-3 -top-3 pointer-events-none z-0 text-[#BF953F] opacity-[0.025] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-500">
                    <Icon size={110} strokeWidth={0.4} />
                  </div>

                  {/* ── Top block: icon + title + desc ── */}
                  <div className="relative z-10 space-y-3">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: hoveredSlug === service.slug 
                          ? "linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.1))"
                          : "linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))",
                        border: "1px solid rgba(212,175,55,0.2)",
                        transform: hoveredSlug === service.slug ? "scale(1.1) rotate(4deg)" : "none",
                        color: hoveredSlug === service.slug ? "#BF953F" : "#4B5563"
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <h3
                      className="text-[18px] font-bold text-[#111111] leading-snug"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {service.title}
                    </h3>

                    <p 
                      className="text-[14.5px] text-gray-600 leading-[1.6] font-normal"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {service.desc}
                    </p>

                    {/* Optional bullets */}
                    {service.bullets && (
                      <div className="space-y-1.5 pt-1">
                        {service.bullets.map((b) => (
                          <div 
                            key={b} 
                            className="flex items-center gap-2 text-[13.5px] text-gray-600 font-medium"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F] shrink-0" />
                            {b}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Bottom block: eyebrow + link — always anchored to bottom ── */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span
                      className="text-[10px] uppercase font-bold text-[#BF953F]/70 group-hover:text-[#BF953F] transition-colors duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "0.15em" }}
                    >
                      {service.highlight}
                    </span>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-700 group-hover:text-[#BF953F] transition-colors duration-300"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Learn More
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300"
                        style={{ 
                          transform: hoveredSlug === service.slug ? "translateX(5px)" : "translateX(0)",
                          color: hoveredSlug === service.slug ? "#BF953F" : "inherit"
                        }}
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>


        </div>
      </section>

      {/* SECTION 4: FUNDING JOURNEY (TIMELINE JOURNEY) - STAYS DARK FOR DRAMATIC CONTRAST */}
      <section className="py-16 bg-[#111111] relative">
        <ServicesParticles light={false} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-10">
            <span 
              className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#BF953F]"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Execution Flow
            </span>
            <h2 
              className="text-2xl md:text-3xl font-bold text-white mt-1.5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Structured Path to Funding
            </h2>
            <p 
              className="text-[14px] text-gray-400 mt-2.5 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              We minimize coordination loops to ensure your file transitions efficiently from audit to disbursal.
            </p>
          </div>

          <div className="relative">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {[
                { step: 1, title: "Consultation", desc: "Evaluate credit capacity, verify asset parameters, and match with the optimal lending mechanism." },
                { step: 2, title: "Documentation", desc: "Compile tax returns, bank statements, and credentials without unnecessary bureau forms." },
                { step: 3, title: "Assessment", desc: "Our underwriting coordinators perform structured audits to clear credit checkpoints." },
                { step: 4, title: "Approval", desc: "Receive transparent credit offers and sanction terms from matched partners." },
                { step: 5, title: "Disbursal", desc: "Prompt coordination for direct credit release, ensuring operations runway is funded." },
              ].map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onMouseEnter={() => setActiveStep(idx)}
                    className={`relative rounded-2xl border p-5 transition-all cursor-pointer z-10 ${isActive
                        ? "border-[#BF953F]/60 shadow-[0_10px_30px_rgba(191,149,63,0.08)] opacity-100"
                        : "border-white/5 opacity-60 hover:opacity-100"
                      }`}
                    style={{
                      background: isActive
                        ? "radial-gradient(circle at center, rgba(191,149,63,0.08) 0%, rgba(17,17,17,0.95) 100%)"
                        : "rgba(255,255,255,0.01)",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                      transitionDuration: "500ms"
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span 
                        className={`w-10 h-10 rounded-xl bg-[#BF953F]/10 border border-[#BF953F]/20 flex items-center justify-center text-sm font-bold text-[#BF953F] transform transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        0{step.step}
                      </span>
                      <span 
                        className="text-[10px] tracking-widest uppercase font-bold text-gray-500"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Stage
                      </span>
                    </div>

                    <h3 
                      className="text-[17px] font-semibold text-white mb-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-[13px] text-gray-400 leading-relaxed font-normal"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: DYNAMIC CALCULATOR */}
      <section className="py-24 bg-[#FAF8F3] relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Interactive Analysis</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-1 font-serif">
              Evaluate Repayment Metrics
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
              Configure parameters to estimate monthly interest rates and overall cost of borrowing.
            </p>
          </div>

          <InteractiveFundingCalculator />
        </div>
      </section>


      {/* SECTION 7: ELEGANT SINGLE CTA STRATEGY - LIGHT THEME WITH BACKGROUND IMAGE */}
      <section id="cta-enquire" className="py-24 relative overflow-hidden bg-white">
        {/* Background image & light blur overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/blog3.jpeg" 
            alt="Advisory Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="rounded-[2.5rem] border border-gray-200/80 bg-white/75 p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden backdrop-blur-md">

            {/* Background geometric design - lightened */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-gray-900/5 pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full border border-[#BF953F]/10 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center">

              {/* Left Column: Context */}
              <div className="lg:col-span-7 space-y-6">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BF953F]/15 border border-[#BF953F]/35 text-xs font-bold text-[#B38728] uppercase tracking-wider"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <ShieldCheck size={14} className="mt-0.5" />
                  Premium Advisory Panel
                </div>

                <h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight font-serif"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Discuss Your Credit Portfolio
                </h2>

                <p 
                  className="text-sm md:text-base text-gray-600 leading-relaxed font-normal"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Speak directly with an expert credit director to evaluate transaction sizes, balance sheet parameters, or private debt allocations. We ensure speed, confidentiality, and structured execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <a
                    href="tel:+919843693697"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black px-6 py-3.5 text-sm font-extrabold hover:bg-opacity-95 shadow-[0_12px_24px_rgba(191,149,63,0.15)] transition"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Call Advisory Desk
                  </a>
                  <a
                    href="mailto:ggenterprises.fin@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/80 hover:bg-gray-100 text-gray-900 px-6 py-3.5 text-sm font-extrabold border border-gray-300 shadow-sm transition"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Email Business Proposal
                  </a>
                </div>
              </div>

              {/* Right Column: Secure Form */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-gray-200/80 bg-white/95 p-6 md:p-8 shadow-xl relative backdrop-blur-sm">

                  <h3 
                    className="text-lg font-bold text-gray-900 mb-2 font-serif"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Secure Inquiry
                  </h3>
                  <p 
                    className="text-xs text-gray-500 mb-5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Submit secure details for direct underwriting response.
                  </p>

                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <div>
                      <label 
                        className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        FullName
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={leadState.name}
                        onChange={(e) => setLeadState((s) => ({ ...s, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label 
                          className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={leadState.phone}
                          onChange={(e) => setLeadState((s) => ({ ...s, phone: e.target.value }))}
                          placeholder="+91 99999 99999"
                          className="w-full rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={leadState.email}
                          onChange={(e) => setLeadState((s) => ({ ...s, email: e.target.value }))}
                          placeholder="partner@company.com"
                          className="w-full rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label 
                        className="block text-[10px] uppercase font-bold text-gray-500 mb-1.5 tracking-wider"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        Inquiry Notes
                      </label>
                      <textarea
                        name="notes"
                        rows="3"
                        value={leadState.notes}
                        onChange={(e) => setLeadState((s) => ({ ...s, notes: e.target.value }))}
                        placeholder="Detail your requirements here..."
                        className="w-full rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition resize-none"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black py-3 text-xs md:text-sm font-extrabold hover:bg-opacity-90 shadow-[0_4px_12px_rgba(191,149,63,0.15)] transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
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
                          <span>Transmit Request File</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    {submitError && (
                      <p className="text-red-500 text-xs text-center mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {submitError}
                      </p>
                    )}

                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-[#BF953F]/35 z-20 shadow-lg"
                        >
                          <CheckCircle2 size={40} className="text-[#BF953F] mb-3" />
                          <h4 
                            className="text-base font-bold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            Transmission Completed
                          </h4>
                          <p 
                            className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                          >
                            Your secure inquiry has been logged. Our corporate relationship director will call you shortly.
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

      {/* ══ FOOTER ══ */}
      <Footer />
    </div>
  );
}

export default Services;
