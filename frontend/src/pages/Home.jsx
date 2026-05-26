import { useEffect, useRef, useCallback, useState } from "react";
import {
  ShieldCheck, Handshake, Briefcase, Clock,
  Building2, Factory, Landmark, HandCoins, FileCheck,
  ChevronDown, Phone, Mail, MapPin, ArrowRight,
  TrendingUp, CheckCircle2, Award, Zap, Globe2,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import CountUp from "react-countup";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import Footer from "../components/Footer";

/* ─── Scroll-reveal hook ──────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Hero slides data ────────────────────────────────────── */
const HERO_SLIDES = [
  {
    tag: "NO CIBIL REQUIRED",
    heading: "வங்கிகளில் Loan",
    sub: "கிடைக்கவில்லையா?",
    body: "Private Finance That Works When Banks Don't. Flexible eligibility, faster processing, and tailored solutions to power your business without the delays of traditional banking.",
    cta1: "Apply Now \u2192",
    cta2: "Talk to an Expert",
    isLightBackground: true,
  },
  {
    tag: "Business Loans",
    heading: "Capital That Moves",
    sub: "As Fast As You Do.",
    body: "Competitive business loans with flexible repayment, minimal paperwork, and a turnaround time that keeps pace with your growth ambitions.",
    cta1: "Apply for a Loan",
    cta2: "View Services",
  },
  {
    isSlide3Custom: true,
    bannerSrc: "/hero-bg-3-new.png"
  },
];

/* ─── Why Choose Us cards ─────────────────────────────────── */
const WHY_CARDS = [
  { icon: Handshake, title: "Tailored Funding", desc: "Solutions custom-structured to match your exact business requirements and growth stage." },
  { icon: ShieldCheck, title: "Transparent Process", desc: "No hidden conditions. Clear documentation and structured evaluation from start to finish." },
  { icon: Briefcase, title: "Expert Guidance", desc: "Experienced financial consultants who help you navigate funding with clarity and confidence." },
  { icon: Clock, title: "24–48 Hr Disbursement", desc: "Industry-leading turnaround — funds reach you when your business needs them most." },
];

/* ─── Services ────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: HandCoins, title: "Private Finance", featured: true,
    desc: "Fast-track private funding with flexible structuring, confidential processing, and zero bureaucratic delays.",
    points: ["Rapid approval & disbursement", "Flexible private structuring", "Confidential & professional"],
  },
  {
    icon: Building2, title: "Business Loans",
    desc: "Structured business loans with competitive rates designed to fuel expansion and operational growth.",
    points: ["Competitive interest rates", "Flexible repayment options", "Fast approval process"],
  },
  {
    icon: FileCheck, title: "Cheque Based Finance",
    desc: "Short-term liquidity solutions backed by cheque-based instruments with transparent documentation.",
    points: ["Flexible structuring", "Short-term liquidity support", "Transparent documentation"],
  },
  {
    icon: Landmark, title: "Loan Against Property",
    desc: "Unlock the value of your assets with higher funding limits and competitive tenure options.",
    points: ["Higher funding limits", "Asset-backed security", "Competitive tenure options"],
  },
  {
    icon: Factory, title: "Machinery Loans",
    desc: "Equipment and machinery financing built around expansion timelines and industrial growth needs.",
    points: ["Equipment financing support", "Expansion-driven structuring", "Quick processing timelines"],
  },
  {
    icon: Briefcase, title: "Professional Loans",
    desc: "Designed for doctors, CAs, architects, and other professionals requiring growth-oriented capital.",
    points: ["Minimal documentation", "Growth-oriented funding", "Tailored for professionals"],
  },
];

/* ─── Process steps ───────────────────────────────────────── */
const STEPS = [
  { num: "01", icon: ArrowRight, title: "Submit Enquiry", desc: "Share your requirements in under 2 minutes to begin your funding journey." },
  { num: "02", icon: TrendingUp, title: "Financial Assessment", desc: "Our experts analyze your profile and structure the most cost-effective solution." },
  { num: "03", icon: CheckCircle2, title: "Approval & Documentation", desc: "Clear documentation and structured evaluation with a direct path to approval." },
  { num: "04", icon: Zap, title: "Fund Disbursement", desc: "Capital delivered swiftly — typically within 24 to 48 hours of approval." },
];

/* ─── Testimonials ────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Rajesh Kumar", role: "Manufacturing Business Owner", text: "Golden Globe structured the funding we needed to expand our manufacturing unit and secure a major supply contract. The process was seamless." },
  { name: "Meera Sharma", role: "Retail Business Owner", text: "The team helped us secure funding quickly to expand retail operations across multiple locations. Highly professional throughout." },
  { name: "Arjun Patel", role: "Construction Contractor", text: "Fast approval helped us secure equipment financing for our construction projects without a single delay. Exceptional service." },
  { name: "Vikram Singh", role: "Logistics Entrepreneur", text: "Professional guidance and structured solutions helped us scale our logistics operations significantly within months." },
  { name: "Karan Mehta", role: "Trading Company Owner", text: "Transparent communication and flexible financing options made a real difference to our trading business expansion." },
  { name: "Dr. Ananya Rao", role: "Healthcare Entrepreneur", text: "Their financial team helped us secure capital quickly to expand our clinic operations. Reliable, professional, and efficient." },
];

/* ════════════════════════════════════════════════════════════ */
/* ─── Why Choose Us Component ──────────────────────────────── */
function WhyChooseUs() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);

  /* ── Gold-dust canvas particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const GOLD = ["rgba(212,175,55,", "rgba(240,208,96,", "rgba(184,150,12,"];

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -(Math.random() * 0.22 + 0.06),
      a: Math.random() * 0.5 + 0.15,
      col: GOLD[Math.floor(Math.random() * 3)],
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + p.a + ")";
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  /* ── Mouse-tracking 3D tilt ── */
  const handleMouseMove = useCallback((e, idx) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) translateZ(14px) scale(1.025)`;
  }, []);

  const handleMouseLeave = useCallback((idx) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)";
  }, []);

  const CARDS = [
    {
      icon: Handshake,
      title: "Tailored Funding",
      desc: "Solutions custom-structured to match your exact business requirements and growth stage — no generic templates, no one-size-fits-all.",
      featured: false,
    },
    {
      icon: ShieldCheck,
      title: "Transparent Process",
      desc: "No hidden conditions. Clear documentation and structured evaluation from the first conversation to final disbursement.",
      featured: true,
    },
    {
      icon: Briefcase,
      title: "Expert Guidance",
      desc: "Experienced financial consultants who help you navigate funding decisions with clarity, strategy, and long-term perspective.",
      featured: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
    >
      {/* ── Canvas gold-dust particles ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* ── Top radial gold glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 relative" style={{ zIndex: 3 }}>

        {/* ── Header ── */}
        <div className="text-center mb-12 reveal">
          <p
            className="uppercase font-bold mb-4 tracking-[0.38em]"
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: "1.1rem",
              letterSpacing: "0.38em",
              color: "#997300", // Deeper gold
              textShadow: "0px 1px 2px rgba(255,255,255,0.9)", // Crisp white separation
            }}
          >
            Why Golden Globe
          </p>
          <h2
            className="font-bold text-black leading-[1.08]"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Built on Trust.{" "}
            <span style={{ filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.8))" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #8a6508 0%, #b88a00 35%, #a67c00 65%, #7a5800 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Driven by Results.
              </span>
            </span>
          </h2>
          <p
            className="mt-6 max-w-lg mx-auto leading-relaxed"
            style={{
              fontSize: "1.05rem",
              fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
              color: "#1a1a1a",
              fontWeight: 500,
              textShadow: "0px 1px 1px rgba(255,255,255,1)",
            }}
          >
            We combine financial expertise, structured processes, and personalised funding
            solutions to support your business with confidence.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: "1100px" }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                transitionDelay: `${i * 90}ms`,
                perspective: "1100px",
              }}
            >
              {/* Gradient border wrapper */}
              <div
                className={`p-[1px] h-full ${card.featured ? "transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]" : ""}`}
                style={{
                  background: card.featured
                    ? "linear-gradient(145deg, #d4af37 0%, #a07810 50%, #3a3020 100%)"
                    : "linear-gradient(145deg, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0.05) 60%, transparent 100%)",
                  borderRadius: "2px",
                }}
              >
                {/* Card inner */}
                <div
                  ref={el => cardRefs.current[i] = el}
                  className="relative h-full cursor-default"
                  style={{
                    background: card.featured ? "#0d0d0d" : "rgba(255,255,255,0.85)",
                    backdropFilter: card.featured ? "none" : "blur(8px)",
                    padding: "2.25rem",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.22s cubic-bezier(0.23,1,0.32,1), box-shadow 0.22s ease",
                    willChange: "transform",
                    boxShadow: card.featured
                      ? "0 12px 48px rgba(212,175,55,0.14), 0 4px 12px rgba(0,0,0,0.3)"
                      : "0 6px 32px rgba(0,0,0,0.07)",
                  }}
                  onMouseMove={e => handleMouseMove(e, i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                >
                  {/* Gold corner accent */}
                  <div
                    className="absolute top-0 left-0 w-12 h-12 pointer-events-none"
                    style={{
                      background: card.featured
                        ? "linear-gradient(135deg, rgba(212,175,55,0.5) 0%, transparent 55%)"
                        : "linear-gradient(135deg, rgba(212,175,55,0.3) 0%, transparent 55%)",
                    }}
                  />

                  {/* Icon with glow */}
                  <div className="relative mb-7 group/icon" style={{ width: 52, height: 52 }}>
                    {/* Radial Bloom Behind Icon */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-60"
                      style={{
                        background: card.featured
                          ? "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.6) 0%, transparent 70%)"
                          : "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.35) 0%, transparent 70%)",
                        filter: "blur(6px)",
                        transform: "scale(1.4)",
                      }}
                    />

                    <div
                      className="relative w-full h-full flex items-center justify-center transition-colors duration-300 group-hover:bg-gold/20"
                      style={{
                        background: card.featured ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.06)",
                        borderRadius: "2px",
                      }}
                    >
                      <card.icon
                        className="transition-colors duration-300 group-hover:text-[#f0d060]"
                        style={{ width: 20, height: 20, color: "#d4af37" }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold mb-3 ${card.featured ? "text-white" : "text-gray-900"}`}
                    style={{
                      fontFamily: "'Playfair Display', 'Georgia', serif",
                      fontSize: "1.3rem",
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Divider */}
                  <div
                    className="mb-5"
                    style={{
                      width: 36,
                      height: 1,
                      background: "linear-gradient(90deg, #d4af37 0%, transparent 100%)",
                    }}
                  />

                  {/* Desc */}
                  <p
                    className={card.featured ? "text-gray-400" : "text-gray-500"}
                    style={{
                      fontSize: "0.9rem",
                      fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
                      lineHeight: "1.8",
                    }}
                  >
                    {card.desc}
                  </p>

                  {/* Bottom gold sweep line */}
                  <div
                    className="why-bottom-line absolute bottom-0 left-0 h-[2px]"
                    style={{ background: "linear-gradient(90deg, #d4af37, #f0d060)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Cormorant+Garamond:wght@500;600&family=Lato:wght@300;400;700&display=swap');

        .why-bottom-line {
          width: 0%;
          transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);
        }
        [class*="why-card"]:hover .why-bottom-line,
        div:hover > div > div > .why-bottom-line {
          width: 100%;
        }

        @keyframes slowBokeh {
          0% { transform: scale(1) translate(0, 0); opacity: 0.15; }
          33% { transform: scale(1.1) translate(30px, -50px); opacity: 0.25; }
          66% { transform: scale(0.9) translate(-20px, 40px); opacity: 0.1; }
          100% { transform: scale(1) translate(0, 0); opacity: 0.15; }
        }
        .bokeh-1 { animation: slowBokeh 15s infinite alternate ease-in-out; }
        .bokeh-2 { animation: slowBokeh 18s infinite alternate-reverse ease-in-out; }
        .bokeh-3 { animation: slowBokeh 20s infinite alternate ease-in-out; }
      `}</style>
    </section>
  );
}

function Home() {
  useReveal();

  const processRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  const magneticRef = useRef(null);
  const handleMagneticMove = (e) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    magneticRef.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const handleMagneticLeave = () => {
    if (magneticRef.current) {
      magneticRef.current.style.transform = `translate(0px, 0px)`;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current) return;
      const rect = processRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress starting slightly lower and finishing much faster
      const start = rect.top - windowHeight * 0.65;
      const end = rect.height * 0.55;
      const progress = Math.max(0, Math.min(1, -start / end));
      setScrollProgress(progress);

      if (progress > 0 && progress < 1) {
        const step = Math.floor(progress * 4);
        setActiveStep(Math.min(3, Math.max(0, step)));
      } else if (progress === 0) {
        setActiveStep(-1);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SVG DEFS FOR ICON GRADIENTS
      ══════════════════════════════════════════════════════ */}
      <svg width="0" height="0" className="absolute hidden">
        <defs>
          <linearGradient id="vibrantGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffdf00" />
            <stop offset="50%" stopColor="#f0d060" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
        </defs>
      </svg>

      {/* ══════════════════════════════════════════════════════
          HERO CAROUSEL
      ══════════════════════════════════════════════════════ */}
      <section className="relative h-[85vh] min-h-[620px] w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={900}
          loop
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".hero-pagination" }}
          navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
          className="h-full w-full"
        >
          {HERO_SLIDES.map((slide, i) => (
            <SwiperSlide key={i} className="relative h-full w-full">
              {/* Background */}
              <div className="absolute inset-0">
                <img
                  src={slide.isSlide3Custom ? slide.bannerSrc : slide.isLightBackground ? "/hero-bg-1-new.png" : `/hero-bg-${i + 1}.jpg`}
                  alt=""
                  className={`h-full w-full object-cover ${slide.isLightBackground ? "bg-[#fcfaf6]" : ""} ${i === 0 ? "opacity-100 object-[center_top]"
                      : i === 1 ? "opacity-100 object-center"
                        : "opacity-100 object-[center_top]"
                    }`}
                  onError={(e) => { e.target.style.display = "none"; e.target.parentElement.style.background = slide.isLightBackground ? "#fcfaf6" : "#0a0a0a"; }}
                />
                {/* Gradient overlay — tailored per slide */}
                {slide.isLightBackground || slide.isSlide3Custom ? null : i === 0 ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  </>
                ) : i === 1 ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/60 to-black/15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                  </>
                )}
              </div>

              {/* Slide content */}
              <div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
                {slide.isSlide3Custom ? (
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-[8%]">
                    {/* The textual content aligned to the right half */}
                    <div className="w-full flex justify-end pb-12 pt-8">
                      <div className="max-w-[550px] flex flex-col items-end text-right relative">
                        
                        {/* Circle Badge */}
                        <div className="absolute -top-12 -left-12 bg-black rounded-full border-4 border-[#d4af37] w-[90px] h-[90px] flex flex-col items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10">
                          <span className="text-[1.3rem] font-bold leading-[1]">NO</span>
                          <span className="text-[1.1rem] font-bold leading-[1]">CIBIL</span>
                          <span className="text-[0.45rem] font-bold tracking-widest mt-1 text-white uppercase">Required</span>
                        </div>

                        {/* Speech Bubble / Banner */}
                        <div className="bg-[#cca740] px-6 py-2.5 rounded text-black font-bold text-lg md:text-xl mb-6 shadow-md inline-block transform -skew-x-6 relative">
                          <div className="transform skew-x-6">
                            வளர்ச்சி தடைபடக் கூடாது,<br/>நிதி கைக்கு வரட்டும்!
                          </div>
                          {/* Triangle tail */}
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#cca740] transform rotate-45 skew-x-6"></div>
                        </div>

                        {/* English Text Content */}
                        <div className="flex flex-col items-end w-full">
                          <span className="text-gray-800 font-bold tracking-[0.15em] uppercase text-sm mb-1">Have a turnover of</span>
                          
                          <div className="flex items-center text-black font-black text-[3rem] md:text-[4rem] leading-none mb-3">
                            <span className="text-[#cca740] mr-3 text-4xl md:text-5xl">₹</span> 25 LAKHS?
                          </div>
                          
                          <span className="text-gray-800 font-bold text-xl md:text-2xl mt-2 mb-2">Get up to</span>
                          
                          <div className="flex items-baseline bg-[#151515] px-6 py-1.5 shadow-xl skew-x-[-8deg] mb-3">
                            <span className="text-[#cca740] font-black text-3xl md:text-4xl mr-2 skew-x-[8deg]">₹</span>
                            <span className="text-[#cca740] font-black text-[3rem] md:text-[4rem] leading-none skew-x-[8deg]">25 CRORES</span>
                          </div>
                          
                          <span className="text-black font-bold text-2xl tracking-wide mb-6">Private Finance</span>
                        </div>

                        {/* Feature Box at Bottom Right */}
                        <div className="border border-[#cca740]/40 bg-[#f8f6ee]/90 px-5 py-3 rounded-xl flex items-center gap-4 max-w-sm shadow-sm backdrop-blur-sm">
                          <div className="bg-white rounded-full p-2 border border-gray-300 shadow-sm shrink-0">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                          </div>
                          <p className="text-[0.85rem] font-semibold text-gray-800 leading-snug text-left">
                            From working capital to business expansion – <span className="text-[#cca740]">we finance it all.</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Apply Now Button Centered Bottom */}
                    <div className="absolute left-1/2 bottom-[8%] -translate-x-1/2 z-20">
                      <button className="bg-[#cca740] text-black font-bold text-sm md:text-base px-10 py-3.5 hover:bg-[#b59235] transition flex items-center gap-2 shadow-2xl rounded shadow-black/20 transform hover:-translate-y-1">
                        APPLY NOW <span className="text-xl leading-none">→</span>
                      </button>
                    </div>
                  </div>
                ) : slide.isLightBackground ? (
                  <div className="max-w-[650px] mt-2">
                    {/* Tag */}
                    {slide.tag && (
                      <span className="inline-block text-[0.7rem] font-bold tracking-[0.15em] uppercase text-[#c19b2e] border border-[#c19b2e] bg-white/50 px-4 py-1 mb-4 hero-tag">
                        {slide.tag}
                      </span>
                    )}

                    {/* Main Tamil Heading */}
                    <h1 className="text-[2.8rem] md:text-[3.2rem] leading-[1.05] font-bold tracking-tight text-gray-900 mb-4 font-sans hero-heading">
                      வங்கிகளில் Loan<br />
                      <span className="text-[#c19b2e]">கிடைக்கவில்லையா?</span>
                    </h1>
                    
                    {/* Divider Line */}
                    <div className="flex items-center mb-4">
                      <div className="h-1 w-12 bg-gray-900"></div>
                      <div className="h-1 w-12 bg-[#c19b2e]"></div>
                    </div>

                    {/* Sub Heading */}
                    <h2 className="text-[2rem] md:text-[2.4rem] leading-[1.1] font-bold tracking-tight text-gray-900 mb-3 font-sans hero-heading" style={{ animationDelay: '100ms' }}>
                      Private Finance<br />
                      <span className="text-[#c19b2e]">That Works</span><br />
                      When Banks <span className="text-[#c19b2e]">Don't.</span>
                    </h2>

                    {/* Body Text */}
                    <p className="text-[1.05rem] font-bold text-gray-900 mb-1 hero-body" style={{ animationDelay: '200ms' }}>
                      Flexible eligibility. Faster processing.
                    </p>
                    <p className="text-[0.95rem] text-gray-800 leading-relaxed max-w-md mb-6 hero-body" style={{ animationDelay: '300ms' }}>
                      Designed to power your business without the delays of traditional banking methods.
                    </p>

                    {/* Icons Row */}
                    <div className="flex flex-wrap gap-5 mb-8 hero-body" style={{ animationDelay: '400ms' }}>
                      {/* Icon 1 */}
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-[#c19b2e] shadow-lg shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <span className="text-[0.6rem] font-bold text-gray-900 uppercase leading-tight tracking-wider">Flexible<br/>Eligibility</span>
                      </div>
                      {/* Icon 2 */}
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-[#c19b2e] shadow-lg shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span className="text-[0.6rem] font-bold text-gray-900 uppercase leading-tight tracking-wider">Faster<br/>Processing</span>
                      </div>
                      {/* Icon 3 */}
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-[#c19b2e] shadow-lg shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path></svg>
                        </div>
                        <span className="text-[0.6rem] font-bold text-gray-900 uppercase leading-tight tracking-wider">Tailored<br/>Solutions</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 hero-ctas" style={{ animationDelay: '500ms' }}>
                      <button className="bg-[#cca740] text-black font-bold text-sm px-7 py-3 hover:bg-[#b59235] transition flex items-center gap-2 shadow-md">
                        APPLY NOW <span className="text-lg leading-none">→</span>
                      </button>
                      <button className="bg-transparent border border-gray-900 text-gray-900 font-bold text-sm px-7 py-3 hover:bg-gray-900 hover:text-white transition flex items-center gap-2">
                        TALK TO AN EXPERT <span className="text-lg leading-none">→</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl">
                    {slide.tag && (
                      <span
                        className="inline-block text-xs font-bold tracking-[0.2em] uppercase border px-4 py-1.5 mb-6 hero-tag text-gold border-gold/40"
                        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.7)" }}
                      >
                        {slide.tag}
                      </span>
                    )}
                    <h1
                      className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] hero-heading text-white"
                      style={{ textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
                    >
                      {slide.heading}
                      <span className="block mt-2 text-gold">{slide.sub}</span>
                    </h1>
                    <p
                      className="mt-6 text-lg leading-relaxed max-w-xl hero-body text-gray-100"
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}
                    >
                      {slide.body}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4 hero-ctas">
                      <button className="bg-gold text-black font-semibold px-8 py-3.5 hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 shadow-lg">
                        {slide.cta1}
                      </button>
                      <button className="border font-semibold px-8 py-3.5 hover:border-gold hover:text-gold transition-all duration-200 backdrop-blur-sm border-white/40 text-white">
                        {slide.cta2}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav buttons */}
        <button className="hero-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 text-white hover:border-gold hover:text-gold transition flex items-center justify-center backdrop-blur-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button className="hero-next absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 border border-white/20 text-white hover:border-gold hover:text-gold transition flex items-center justify-center backdrop-blur-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        </button>

        {/* Pagination dots */}
        <div className="hero-pagination absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50 scroll-bounce">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="bg-gold">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/10">
          {[
            { val: 1000, suffix: "+ Cr", prefix: "₹", label: "Disbursed" },
            { val: 2000, suffix: "+", prefix: "", label: "Enterprises Funded" },
            { val: 100, suffix: "%", prefix: "", label: "Client Satisfaction" },
            { val: 48, suffix: " Hrs", prefix: "", label: "Approval Time" },
          ].map((s, i) => (
            <div key={i} className="py-6 px-6 text-center">
              <div className="text-2xl font-bold text-black">
                {s.prefix}
                <CountUp end={s.val} duration={2} enableScrollSpy scrollSpyOnce />
                {s.suffix}
              </div>
              <div className="text-xs font-medium text-black/60 mt-0.5 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMBINED BACKGROUND SECTION (WHY CHOOSE US + SERVICES)
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/why-bg.png')" }}
      >
        {/* Soft white overlay to ensure dark text remains legible over the image */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none" />
        {/* Subtle Vignette Overlay to draw eyes to the center */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.15) 100%)" }} />

        <div className="relative z-10">
          <WhyChooseUs />

          {/* ══════════════════════════════════════════════════════
              SERVICES
          ══════════════════════════════════════════════════════ */}
          <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Passive Bokeh Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-0 left-10 w-[400px] h-[400px] bg-[#d4af37] rounded-full blur-[120px] bokeh-1" />
              <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#f0d060] rounded-full blur-[140px] bokeh-2" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f9d423] rounded-full blur-[180px] opacity-5 bokeh-3" />
            </div>

            <div className="max-w-4xl mx-auto px-8 relative z-10">
              <div className="text-center mb-12 reveal">
                <p
                  className="uppercase font-bold mb-4 tracking-[0.38em]"
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Georgia', serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.38em",
                    color: "#997300",
                    textShadow: "0px 1px 2px rgba(255,255,255,0.9)",
                  }}
                >
                  Our Services
                </p>
                <h2
                  className="font-bold text-black leading-[1.08]"
                  style={{
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Capital Solutions for{" "}
                  <span style={{ filter: "drop-shadow(0px 1px 1px rgba(255,255,255,0.8))" }}>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #8a6508 0%, #b88a00 35%, #a67c00 65%, #7a5800 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Every Business Need
                    </span>
                  </span>
                </h2>
                <p
                  className="mt-6 max-w-lg mx-auto leading-relaxed"
                  style={{
                    fontSize: "1.05rem",
                    fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
                    color: "#1a1a1a",
                    fontWeight: 500,
                    textShadow: "0px 1px 1px rgba(255,255,255,1)",
                  }}
                >
                  Strategic funding products designed to empower businesses at every stage of growth and expansion.
                </p>
              </div>

              <ScrollStack useWindowScroll={true} itemStackDistance={20} blurAmount={2} itemScale={0.02} itemDistance={20}>
                {SERVICES.map((svc, i) => (
                  <ScrollStackItem key={i}>
                    <div
                      className={`group relative py-7 px-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] cursor-default rounded-3xl w-full
                        ${svc.featured
                          ? "bg-[#0f0f0f] text-white border border-gold/40 shadow-xl"
                          : "bg-white/95 backdrop-blur-sm border border-white/50 shadow-lg hover:border-gold/30"}`}
                    >
                      {svc.featured && (
                        <span className="absolute top-5 right-6 text-[10px] font-bold tracking-widest uppercase bg-gold text-black px-4 py-1.5 rounded-full">
                          Private Finance
                        </span>
                      )}

                      {/* Icon wrapper for gradient hover effect */}
                      <div className="relative w-10 h-10 mb-5 group/icon">
                        {/* Flat gold icon (Default) */}
                        <svc.icon className={`absolute inset-0 w-8 h-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90 ${svc.featured ? "text-gold" : "text-[#d4af37]"}`} strokeWidth={1.5} />
                        {/* Vibrant glowing gradient icon (Hover) */}
                        <svc.icon
                          className="absolute inset-0 w-8 h-8 opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110"
                          strokeWidth={1.5}
                          style={{ stroke: 'url(#vibrantGold)', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))' }}
                        />
                      </div>

                      <h3
                        className={`font-bold mb-3 ${svc.featured ? "text-white" : "text-gray-900"}`}
                        style={{
                          fontFamily: "'Playfair Display', 'Georgia', serif",
                          fontSize: "1.4rem",
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {svc.title}
                      </h3>
                      <p
                        className={`mb-5 ${svc.featured ? "text-gray-400" : "text-gray-600"}`}
                        style={{
                          fontSize: "0.95rem",
                          fontFamily: "'Lato', 'Helvetica Neue', sans-serif",
                          lineHeight: "1.6",
                        }}
                      >
                        {svc.desc}
                      </p>

                      <ul
                        className={`space-y-2 mb-6 ${svc.featured ? "text-gray-300" : "text-gray-700"}`}
                        style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.95rem" }}
                      >
                        {svc.points.map((pt, j) => (
                          <li key={j} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block flex-shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>

                      {/* Learn More button with sliding arrow */}
                      <button className={`flex items-center gap-2 text-sm font-bold transition-colors group/btn ${svc.featured ? "text-gold hover:text-white" : "text-gold hover:text-gray-900"}`}>
                        Learn More <ArrowRight size={16} className="transition-transform duration-300 ease-out group-hover/btn:translate-x-2" />
                      </button>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>

              <div className="text-center mt-16 reveal">
                <button className="bg-[#0f0f0f] text-white px-8 py-3.5 text-sm font-semibold hover:bg-gold hover:text-black transition-all duration-300">
                  Not sure which suits your business? Enquire Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PROCESS — dark bg, timeline
      ══════════════════════════════════════════════════════ */}
      <section ref={processRef} className="relative py-16 text-white overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/bg2.png')",
              backgroundAttachment: "fixed"
            }}
          />
          {/* Gradient Overlay to protect text */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-transparent" />
          <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-8 z-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight">
              Simple. Structured. <span className="text-gold" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", paddingLeft: "0.25rem" }}>Reliable.</span>
            </h2>
            <p className="mt-5 text-gray-400 max-w-xl mx-auto text-[1.05rem] leading-relaxed font-sans">
              A transparent four-step approach delivering clarity, confidence, and timely execution at every stage.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative grid md:grid-cols-4 gap-8 mt-12">
            {/* Liquid Connecting Line - positioned to hit circle centers */}
            <div className="hidden md:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-[2px] bg-white/5 z-0 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold via-[#ffeb73] to-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                style={{
                  width: `${scrollProgress * 100}%`,
                  transition: 'width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              />
            </div>

            {STEPS.map((step, i) => {
              const isPast = scrollProgress > 0 && activeStep >= i;

              return (
                <div
                  key={i}
                  className="reveal flex flex-col items-center text-center z-10"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 transition-colors duration-500
                    ${isPast ? 'text-gold' : 'text-gray-500'}`}>
                    STEP {step.num}
                  </span>

                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 border cursor-default bg-[#0a0a0a]
                      ${isPast
                        ? 'border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'border-white/20'}`}
                  >
                    <step.icon
                      className={`w-6 h-6 transition-colors duration-500 ${isPast ? 'text-gold' : 'text-gray-500'}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className={`text-[1.1rem] font-bold mb-3 transition-colors duration-500 ${isPast ? 'text-white' : 'text-gray-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-[0.95rem] leading-relaxed max-w-[200px] font-sans">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <button className="relative group border border-gold text-gold font-semibold px-10 py-4 text-xs uppercase tracking-[0.15em] overflow-hidden transition-colors hover:text-black">
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10">Start with Step 01 — Submit Enquiry</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS (3D Cylindrical Gallery)
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 bg-[#030303] relative overflow-hidden">
        {/* Ambient Light & Floor Reflection */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_70%)]" />
          {/* Reflective floor */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-gold/5 via-black/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Client Stories</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-sans tracking-tight">
              Trusted by Businesses
            </h2>
            <p className="mt-5 text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              From manufacturing to healthcare — businesses rely on Golden Globe Enterprises for structured funding and reliable financial guidance.
            </p>
          </div>

          <style>{`
            .testi-cylinder { padding: 0px 0 40px 0; perspective: 1200px; }
            .testi-cylinder .swiper-slide {
              width: 380px; /* fixed width for 3D math */
              filter: blur(4px);
              opacity: 0.4;
              /* Do not hardcode transition here, let Swiper manage it for smooth dragging */
            }
            .testi-cylinder .swiper-slide-active {
              filter: blur(0px);
              opacity: 1;
            }
            
            /* Gold Flash Shimmer Animation */
            @keyframes shimmer-flash {
              0% { transform: translateX(-150%) skewX(-20deg); }
              100% { transform: translateX(150%) skewX(-20deg); }
            }
            .testi-cylinder .swiper-slide-active .testi-card::after {
              content: '';
              position: absolute;
              top: 0; left: 0; width: 40%; height: 100%;
              background: linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent);
              animation: shimmer-flash 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              pointer-events: none;
            }

            /* Dynamic Pagination Arc */
            .testi-pagination .swiper-pagination-bullet {
              background: #d4af37;
              opacity: 0.2;
              width: 6px; height: 6px;
              transition: all 0.4s ease;
              margin: 0 6px !important;
            }
            .testi-pagination .swiper-pagination-bullet-active {
              opacity: 1;
              transform: scale(1.8) translateY(-3px);
              box-shadow: 0 0 10px rgba(212,175,55,0.6);
            }

            @media (max-width: 768px) {
              .testi-cylinder .swiper-slide { width: 280px; }
            }
          `}</style>

          <Swiper
            className="testi-cylinder"
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            speed={600} /* Smooth but responsive navigation speed */
            coverflowEffect={{
              rotate: 35,
              stretch: 0,
              depth: 250,
              modifier: 1,
              slideShadows: false,
            }}
            loop
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".testi-pagination" }}
            navigation={{ nextEl: ".testi-next", prevEl: ".testi-prev" }}
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testi-card relative bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-2xl transition-all duration-300 h-full flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  {/* Soft gold inner shadow */}
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(184,134,11,0.05)] pointer-events-none" />

                  <Award className="w-8 h-8 text-gold mb-6 opacity-90" />
                  <p className="text-gray-300 text-[1rem] leading-relaxed flex-1 font-serif italic">"{t.text}"</p>
                  <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                    <p className="text-base font-bold text-white tracking-wide">{t.name}</p>
                    <p className="text-[10px] text-gold mt-1.5 uppercase tracking-[0.15em]">{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Testimonial Nav Buttons */}
          <button className="testi-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 text-gold items-center justify-center hover:bg-gold hover:text-black transition-all backdrop-blur-sm shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="testi-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/50 text-gold items-center justify-center hover:bg-gold hover:text-black transition-all backdrop-blur-sm shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          <div className="testi-pagination mt-4 flex justify-center items-end h-8 relative z-20" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0f0f0f] relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/cta-bg.png" alt="" className="w-full h-full object-cover opacity-70" />
          {/* Subtle radial dark overlay to ensure text is legible without completely hiding the image */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,5,5,0.7)_0%,rgba(5,5,5,0.9)_100%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-8 text-center reveal relative z-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">Get Started Today</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight font-sans tracking-tight">
            {"Ready to Structure Your Business Growth?".split(" ").map((word, i) => (
              <span key={i} className="inline-block stagger-word mr-3" style={{ animationDelay: `${i * 100}ms` }}>
                {word === "Business" || word === "Growth?" ? <span className="text-gold font-serif italic">{word}</span> : word}
              </span>
            ))}
          </h2>
          <p className="mt-8 text-gray-400 max-w-2xl mx-auto text-[1.05rem] leading-relaxed font-sans">
            Connect with our financial specialists to explore the right funding solution tailored to your business — from private finance to structured business loans.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <div
              ref={magneticRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className="transition-transform duration-100 ease-out inline-block"
            >
              <button className="bg-gold text-black font-semibold px-10 py-4 text-xs uppercase tracking-[0.15em] hover:scale-105 hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] relative">
                Speak to a Funding Specialist
              </button>
            </div>
            <button className="border-[1.5px] border-gold text-gold font-semibold px-10 py-4 text-xs uppercase tracking-[0.15em] hover:bg-gold hover:text-black transition-all duration-300 relative group overflow-hidden">
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10">Submit an Enquiry</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <Footer />

      {/* ── Global styles ── */}
      <style>{`
        :root { --gold: #d4af37; }

        /* Scroll-reveal */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .revealed { opacity: 1; transform: translateY(0); }

        /* Hero text animation (targets active slide) */
        .swiper-slide-active .hero-tag { animation: fadeUp 0.5s ease 0.1s both; }
        .swiper-slide-active .hero-heading { animation: fadeUp 0.6s ease 0.25s both; }
        .swiper-slide-active .hero-body { animation: fadeUp 0.6s ease 0.4s both; }
        .swiper-slide-active .hero-ctas { animation: fadeUp 0.6s ease 0.55s both; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Scroll bounce */
        .scroll-bounce { animation: bounce 2s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* Swiper hero pagination */
        .hero-pagination .swiper-pagination-bullet { width: 24px; height: 2px; border-radius: 0; background: rgba(255,255,255,0.35); opacity: 1; transition: all 0.3s; }
        .hero-pagination .swiper-pagination-bullet-active { width: 40px; background: var(--gold); }

        /* Swiper testimonial pagination */
        .testi-pagination .swiper-pagination-bullet { background: #d4af37; opacity: 0.4; }
        .testi-pagination .swiper-pagination-bullet-active { opacity: 1; }

        /* Typography Stagger */
        .revealed .stagger-word { animation: staggerUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .stagger-word { opacity: 0; transform: translateY(30px); }
        @keyframes staggerUp { to { opacity: 1; transform: translateY(0); } }

        /* Sheen Pan */
        @keyframes pan-sheen {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-pan-sheen { animation: pan-sheen 12s linear infinite; }
        
        /* Slow spin */
        .animate-spin-slow { animation: spin 60s linear infinite; }

        /* Override default swiper arrows */
        .swiper-button-prev, .swiper-button-next { display: none; }
      `}</style>
    </>
  );
}

export default Home;