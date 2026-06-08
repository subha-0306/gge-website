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

          {/* Amount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Target Capital Requirement</span>
              <span className="font-bold text-[#BF953F]">{formatCurrency(amount)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#BF953F]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₹ 10,000</span>
              <span>₹ 10 Crores</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Preferred Tenure</span>
              <span className="font-bold text-[#BF953F]">{months} Months</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              step="1"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#BF953F]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>3 Months</span>
              <span>60 Months</span>
            </div>
          </div>

          {/* Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 font-medium">Indicative Interest Rate</span>
              <span className="font-bold text-[#BF953F]">{rate}% p.a.</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#BF953F]"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>8% p.a.</span>
              <span>24% p.a.</span>
            </div>
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
              <span>Principal: {((P / totalPayment) * 100).toFixed(0)}%</span>
              <span>Interest: {((totalInterest / totalPayment) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden flex">
              <div className="bg-[#BF953F]" style={{ width: `${(P / totalPayment) * 100}%` }} />
              <div className="bg-[#BF953F]/40" style={{ width: `${(totalInterest / totalPayment) * 100}%` }} />
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
  const [activeStep, setActiveStep] = useState(0);

  const handleEnquire = () => {
    const el = document.getElementById("cta-enquire");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmitLead = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setLeadState({ name: "", phone: "", email: "", notes: "" });
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
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
        slug: "check-based-finance",
        title: "Check Based Finance",
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

      {/* ══ REDESIGNED AREA START (CONTRAST LIGHT THEME & LAYERED LAYOUTS) ══ */}
      
      {/* SECTION 1: STATS & OVERVIEW PANEL */}
      <section className="py-20 md:py-28 bg-white relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#BF953F]">Institutional Credit Architecture</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-[#111111] leading-tight">
              Strategic Solutions Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF953F] to-[#D4AF37]">Capital Momentum</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-600 mt-4 leading-relaxed font-light">
              We structure corporate lending and private debt portfolios to bypass operational delays, allowing high-growth firms to proceed with certainty.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
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
      <section className="py-24 bg-[#f8f7f4] border-t border-gray-200/60 relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Flagship Allocation</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#111111] mt-1 font-serif">
              Private Finance
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed">
              Our premier credit mechanism, engineered specifically for time-sensitive, high-liquidity situations without bureau dependencies.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Bento Grid: Main Showcase (8 cols) - STAYS DARK for luxury contrast */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#0a0a0a] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#BF953F]/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-xs font-bold text-[#BF953F] uppercase tracking-wider">
                  <Sparkles size={14} />
                  Private Debt Allocation
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold font-serif text-white">
                  High-Value Bridge Funding & Short-Term Liquidity
                </h3>

                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                  Our private finance architecture is inspired by premier platforms like **JP Finance** and **ESGM Private Finance**, completely tailored to fulfill immediate cash flow gaps. We assess collateral asset security and transaction viability to fast-track files without waiting for typical banking approvals.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                      Emergency Funding
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Secure operational runway during sudden cash flow contractions.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                      Bridge Financing
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Smooth out acquisition transactions before long-term facilities close.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                      Business Cash Demands
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Procure raw materials at steep cash discounts from suppliers.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                      Asset Opportunities
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Leverage real estate or equipment equity to fund growth ventures.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400">Direct underwriter evaluation</span>
                <Link
                  to="/services/private-finance"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black px-6 py-3 text-sm font-extrabold hover:bg-opacity-95 transition"
                >
                  Review Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Bento Grid: Prominent Parameters (5 cols) - WHITE glass panel */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.5rem] border border-gray-200/80 bg-white p-8 relative overflow-hidden shadow-xl">
              <div>
                <h4 className="text-lg font-bold font-serif text-gray-900 mb-6">Key Allocations</h4>
                <div className="space-y-4">
                  {[
                    "No CIBIL Score Required",
                    "Approval within 24–48 Hours",
                    "Tenure from 3 Months to 15 Months",
                    "Fast Non-Bureau Processing",
                    "Flexible Repayment Frameworks",
                    "Quick Operational Disbursal",
                    "Simplified Documentation Audit",
                  ].map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-[#f8f7f4]/60 border border-gray-100"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#BF953F]/15 flex items-center justify-center text-[#BF953F] shrink-0">
                        <Check size={16} />
                      </div>
                      <span className="text-sm font-bold text-gray-800">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-[#BF953F]/10 border border-[#BF953F]/20 p-4 text-center">
                <div className="text-xs font-bold text-[#BF953F]">Need Rapid Capital?</div>
                <p className="text-[10px] text-gray-600 mt-1 leading-normal">Our private underwriting desk reviews submissions within 2 hours of receipt.</p>
                <button
                  onClick={handleEnquire}
                  className="mt-3 w-full py-2 text-xs font-bold bg-[#BF953F] hover:bg-opacity-90 transition rounded-lg text-black"
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {otherServicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group flex flex-col justify-between h-full rounded-3xl border border-gray-200/80 bg-white hover:bg-[#FAF8F3]/40 hover:border-[#BF953F] p-6 md:p-8 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(191,149,63,0.08)]"
                >
                  {/* Giant Watermark Icon instead of corner sticker */}
                  <div className="absolute -right-4 -top-4 w-28 h-28 text-[#BF953F] opacity-[0.02] pointer-events-none z-0 transform translate-x-3 -translate-y-3 group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
                    <Icon size={112} strokeWidth={0.5} />
                  </div>
                  
                  <div className="space-y-4 relative z-10 flex-grow">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200/60 flex items-center justify-center text-gray-700 group-hover:text-[#BF953F] group-hover:border-[#BF953F]/30 transition-colors shadow-sm">
                      <Icon size={24} />
                    </div>
                    
                    <h3 className="text-lg font-bold font-serif text-[#111111] tracking-wide">
                      {service.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
                      {service.desc}
                    </p>

                    {/* Specific bullets for selected services */}
                    {service.bullets && (
                      <div className="space-y-1.5 pt-2">
                        {service.bullets.map((b) => (
                          <div key={b} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#BF953F]" />
                            {b}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#BF953F]/80 group-hover:text-[#BF953F] transition-colors">
                      {service.highlight}
                    </span>
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-800 hover:text-[#BF953F] transition-colors"
                    >
                      Learn More
                      <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: FUNDING JOURNEY (TIMELINE JOURNEY) - STAYS DARK FOR DRAMATIC CONTRAST */}
      <section className="py-24 bg-[#111111] relative">
        <ServicesParticles light={false} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Execution Flow</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mt-1 font-serif">
              Structured Path to Funding
            </h2>
            <p className="text-sm md:text-base text-gray-400 mt-3">
              We minimize coordination loops to ensure your file transitions efficiently from audit to disbursal.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Pipeline SVG */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-1 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible">
                <line x1="0%" y1="2" x2="100%" y2="2" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <motion.line 
                  x1="0%" y1="2" x2="100%" y2="2" 
                  stroke="url(#timelineGoldGradient)" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="timelineGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#BF953F" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
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
                    className={`relative rounded-2xl border p-6 transition-all cursor-pointer z-10 ${
                      isActive 
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
                      <span className={`w-10 h-10 rounded-xl bg-[#BF953F]/10 border border-[#BF953F]/20 flex items-center justify-center text-sm font-bold text-[#BF953F] font-serif transform transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`}>
                        0{step.step}
                      </span>
                      <span className="text-[10px] tracking-widest uppercase font-extrabold text-gray-500">Stage</span>
                    </div>
                    
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">{step.desc}</p>
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

      {/* SECTION 6: WHY CLIENTS CHOOSE US (BENTO GRID) */}
      <section className="py-24 bg-white relative">
        <ServicesParticles light={true} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#BF953F]">Core Principles</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mt-1 font-serif">
              Why Clients Choose GGE
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
              Our framework ensures rapid capital deployment, custom interest structures, and absolute alignment with borrower needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento Grid: 1st Card (6 cols) */}
            <div className="lg:col-span-6 rounded-3xl border border-gray-200 bg-white p-8 space-y-4 hover:border-[#BF953F]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#BF953F] shadow-sm">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif text-gray-900">Rapid Financial Processing</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                By maintaining pre-aligned syndication limits and custom assessment software, we cut audit cycles by 70%. Decisions are delivered in 24-48 hours.
              </p>
            </div>

            {/* Bento Grid: 2nd Card (6 cols) - DARK FOR CONTRAST ACCENT */}
            <div className="lg:col-span-6 rounded-3xl border border-[#BF953F]/20 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#0a0a0a] p-8 space-y-4 hover:border-[#BF953F]/40 hover:shadow-2xl transition-all duration-300 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#BF953F]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#BF953F] relative z-10">
                <Network size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif text-white relative z-10">Strong Lender Network</h3>
              <p className="text-sm text-gray-300 leading-relaxed font-light relative z-10">
                Our operations integrate directly with 20+ nationalized public banks, private commercial lenders, and premier boutique NBFC debt funds.
              </p>
            </div>

            {/* Bento Grid: 3rd Card (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-gray-200 bg-white p-8 space-y-4 hover:border-[#BF953F]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#BF953F] shadow-sm">
                <Scale size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif text-gray-900">Customized Solutions</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                We reject boilerplate lending. Every loan is mapped specifically to match debtor cycle realities, capital expenditure projections, and cash flow timings.
              </p>
            </div>

            {/* Bento Grid: 4th Card (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-gray-200 bg-white p-8 space-y-4 hover:border-[#BF953F]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#BF953F] shadow-sm">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif text-gray-900">Funding Expertise</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Our credit desks are managed by seasoned corporate finance directors with decade-long experience in infrastructure project bidding and structured debt.
              </p>
            </div>

            {/* Bento Grid: 5th Card (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl border border-gray-200 bg-white p-8 space-y-4 hover:border-[#BF953F]/40 hover:shadow-md transition-all duration-300 relative overflow-hidden shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/80 flex items-center justify-center text-[#BF953F] shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold font-serif text-gray-900">Transparent Progress</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                No hidden commissions, processing traps, or undisclosed rate revisions. Every sanction matches the exact parameters listed in our initial term-sheet.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: ELEGANT SINGLE CTA STRATEGY - STAYS DARK FOR PREMIUM CONTRAST */}
      <section id="cta-enquire" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#BF953F] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-[#111111] via-[#0a0a0a] to-[#111111] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            
            {/* Background geometric design */}
            <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full border border-[#BF953F]/5 pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Context */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BF953F]/10 border border-[#BF953F]/20 text-xs font-bold text-[#BF953F] uppercase tracking-wider">
                  <ShieldCheck size={14} className="mt-0.5" />
                  Premium Advisory Panel
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
                  Discuss Your Credit Portfolio
                </h2>
                
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light">
                  Speak directly with an expert credit director to evaluate transaction sizes, balance sheet parameters, or private debt allocations. We ensure speed, confidentiality, and structured execution.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 pt-4">
                  <a
                    href="tel:+919999999999"
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black px-6 py-3.5 text-sm font-extrabold hover:bg-opacity-95 shadow-[0_12px_24px_rgba(191,149,63,0.15)] transition"
                  >
                    Call Advisory Desk
                  </a>
                  <a
                    href="mailto:partner@ggefinance.com"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-white px-6 py-3.5 text-sm font-extrabold border border-white/10 transition"
                  >
                    Email Business Proposal
                  </a>
                </div>
              </div>

              {/* Right Column: Secure Form */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a]/80 p-6 md:p-8 backdrop-blur shadow-xl relative">
                  
                  <h3 className="text-lg font-bold text-white mb-2 font-serif">Secure Inquiry</h3>
                  <p className="text-xs text-gray-400 mb-5">
                    Submit secure details for direct underwriting response.
                  </p>

                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">FullName</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={leadState.name}
                        onChange={(e) => setLeadState((s) => ({ ...s, name: e.target.value }))}
                        placeholder="John Doe"
                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={leadState.phone}
                          onChange={(e) => setLeadState((s) => ({ ...s, phone: e.target.value }))}
                          placeholder="+91 99999 99999"
                          className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={leadState.email}
                          onChange={(e) => setLeadState((s) => ({ ...s, email: e.target.value }))}
                          placeholder="partner@company.com"
                          className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">Inquiry Notes</label>
                      <textarea
                        name="notes"
                        rows="3"
                        value={leadState.notes}
                        onChange={(e) => setLeadState((s) => ({ ...s, notes: e.target.value }))}
                        placeholder="Detail your requirements here..."
                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 px-4 py-3 text-xs md:text-sm outline-none focus:border-[#BF953F] focus:ring-1 focus:ring-[#BF953F] transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#BF953F] text-black py-3 text-xs md:text-sm font-extrabold hover:bg-opacity-90 transition"
                    >
                      <span>Transmit Request File</span>
                      <ArrowRight size={16} />
                    </button>

                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#0B1423] rounded-3xl flex flex-col items-center justify-center p-6 text-center border border-[#BF953F]/30"
                        >
                          <CheckCircle2 size={40} className="text-[#BF953F] mb-3" />
                          <h4 className="text-base font-bold text-white">Transmission Completed</h4>
                          <p className="text-xs text-gray-400 mt-2 max-w-xs leading-relaxed">
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
