import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight, ShieldCheck, Eye, Zap, Users,
  Clock, TrendingUp, Award, Star, ArrowRight,
  BadgeCheck, Phone, Building2, Briefcase,
  CheckCircle2, Target, Heart, Lightbulb,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Footer from "../components/Footer";
import CountUp from "react-countup";

/* ─── Animated counter (zero re-renders — react-countup) ─────── */
function AnimCounter({ target, suffix = "", prefix = "", duration = 2 }) {
  return (
    <CountUp
      start={0}
      end={target}
      duration={duration}
      prefix={prefix}
      suffix={suffix}
      separator=""
      enableScrollSpy
      scrollSpyOnce
    />
  );
}


/* ─── Fade variants ───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Data ────────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Rajesh Kumar",  role: "Manufacturing Business Owner", text: "Golden Globe structured the funding we needed to expand our manufacturing unit and secure a major supply contract. The process was seamless." },
  { name: "Meera Sharma",  role: "Retail Business Owner",        text: "The team helped us secure funding quickly to expand retail operations across multiple locations. Highly professional throughout." },
  { name: "Arjun Patel",   role: "Construction Contractor",      text: "Fast approval helped us secure equipment financing for our construction projects without a single delay. Exceptional service." },
  { name: "Vikram Singh",  role: "Logistics Entrepreneur",       text: "Professional guidance and structured solutions helped us scale our logistics operations significantly within months." },
  { name: "Karan Mehta",   role: "Trading Company Owner",        text: "Transparent communication and flexible financing options made a real difference to our trading business expansion." },
  { name: "Dr. Ananya Rao",role: "Healthcare Entrepreneur",      text: "Their financial team helped us secure capital quickly to expand our clinic. Reliable, professional, and efficient." },
];


const TRUST_STATS = [
  { val: 20,   suffix: "+",    label: "Years of Combined Expertise", prefix: "" },
  { val: 2000, suffix: "+",    label: "Businesses Funded",           prefix: "" },
  { val: 2000, suffix: "+ Cr", label: "Total Disbursements",         prefix: "₹" },
  { val: 99,   suffix: "%",    label: "Client Satisfaction",         prefix: "" },
];

/* Bento cards — spans drive the asymmetric layout */
const WHY_CARDS = [
  { icon: Briefcase,   title: "Industry Expertise",       desc: "Two decades of hands-on experience in finance, banking, and business management — offering clients genuine industry insight that goes beyond textbook knowledge.", watermark: "20+",  wide: true  },
  { icon: Users,       title: "Client-First Approach",    desc: "Personalised strategies tailored to your business realities — never a one-size-fits-all template.",                                                                 watermark: "1st",  wide: false },
  { icon: ShieldCheck, title: "Integrity & Transparency", desc: "No hidden terms, no surprises. Every structure is fully explained before you commit to anything.",                                                                    watermark: "#1",   wide: false },
  { icon: Award,       title: "Proven Leadership",        desc: "Our leadership's deep financial knowledge empowers clients to make confident, well-informed decisions — from the very first consultation to final disbursement.",      watermark: "★",    wide: true  },
  { icon: TrendingUp,  title: "Long-Term Partnerships",   desc: "Lasting relationships built on trust, reliability, and consistent results — not one-off transactions.",                                                              watermark: "∞",    wide: false },
  { icon: Star,        title: "Commitment to Excellence", desc: "Quality, innovation, and continuous improvement guide every aspect of our work — ensuring premium outcomes for every client, every time.",                             watermark: "99%",  wide: true  },
];

/* ════════════════════════════════════════════════════════════ */
function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const bgX = useTransform(springX, [-1, 1], [-20, 20]);
  const bgY = useTransform(springY, [-1, 1], [-20, 20]);

  const titleX = useTransform(springX, [-1, 1], [-10, 10]);
  const titleY = useTransform(springY, [-1, 1], [-10, 10]);

  const descX = useTransform(springX, [-1, 1], [-5, 5]);
  const descY = useTransform(springY, [-1, 1], [-5, 5]);

  useEffect(() => {
    const handle = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const containerRef = useRef(null);
  const hubRef = useRef(null);
  const iconRefs = useRef([]);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCoords = () => {
      if (!containerRef.current || !hubRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const hubRect = hubRef.current.getBoundingClientRect();

      const hubX = hubRect.left + hubRect.width / 2 - containerRect.left;
      const hubY = hubRect.top + hubRect.height / 2 - containerRect.top;

      const newCoords = iconRefs.current.map((iconEl) => {
        if (!iconEl) return null;
        const rect = iconEl.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top
        };
      });

      setCoords({ hub: { x: hubX, y: hubY }, icons: newCoords });
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);

    let observer;
    if (containerRef.current && window.ResizeObserver) {
      observer = new ResizeObserver(() => {
        updateCoords();
      });
      observer.observe(containerRef.current);
    }

    const timer = setTimeout(updateCoords, 100);

    return () => {
      window.removeEventListener("resize", updateCoords);
      if (observer) observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="about-page font-sans overflow-x-hidden">

      {/* ══ SVG GRADIENT DEF ══ */}
      <svg width="0" height="0" style={{ position: "absolute", opacity: 0, pointerEvents: "none", zIndex: -1, overflow: "hidden" }}>
        <defs>
          <linearGradient id="goldGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d060" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>
      </svg>

      {/* ══════════════════════ HERO (preserved exactly) ══════════════════════ */}
      <section ref={heroRef} className="relative min-h-[350px] flex items-end overflow-hidden bg-[#0a0a0a]">
        <motion.img
          src="/about-bg.jpeg" alt=""
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{ translateX: bgX, translateY: bgY, scale: 1.1, y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40 md:bg-gradient-to-r md:from-[#0a0a0a] md:via-[#0a0a0a]/80 md:to-transparent z-20" />
        <div className="absolute inset-0 opacity-10 mix-blend-screen z-20"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(212,175,55,0.15) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(212,175,55,0.15) 40px)" }} />
        <div className="relative z-30 max-w-7xl mx-auto px-8 pb-14 pt-28 w-full text-left flex flex-col items-start">
          <p className="flex items-center gap-2 text-sm mb-6 font-medium text-gray-400">
            <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
            <ChevronRight size={14} />
            <span className="text-white">About Us</span>
          </p>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black bg-[#d4af37] px-4 py-1.5 mb-5 rounded-sm">Our Story</span>
          <motion.h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", translateX: titleX, translateY: titleY }}>
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">Golden Globe Enterprises</span>
          </motion.h1>
          <motion.p className="mt-2 text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed font-medium"
            style={{ fontFamily: "'Lato', Helvetica, sans-serif", translateX: descX, translateY: descY }}>
            Delivering structured financial solutions and strategic capital support to businesses since 2011.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════ WHO WE ARE ══════════════════════ */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left — text (redesigned for readability) */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <p className="about-label">Company Overview</p>
              <h2 className="about-heading-dark">
                Who <span className="text-gold">We Are</span>
              </h2>
              <div className="w-14 h-0.5 bg-gold mt-5 mb-8" />

              {/* Intro — large */}
              <p className="text-lg md:text-xl text-gray-900 font-semibold leading-[1.75] mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                A trusted financial partner helping businesses unlock capital — transparently, rapidly, and on their terms.
              </p>

              {/* Body — readable size */}
              <p className="text-base text-gray-600 leading-[1.85] mb-5"
                style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                Since 2011, <strong className="text-gray-900 font-semibold">Golden Globe Enterprises</strong> has worked closely
                with entrepreneurs, professionals, and growing enterprises across Tamil Nadu — structuring funding solutions
                that match operational realities and expansion goals.
              </p>
              <p className="text-base text-gray-600 leading-[1.85] mb-8"
                style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                We combine deep financial expertise, strong lending partnerships, and a genuine understanding of how Indian
                businesses operate to deliver reliable, customised capital across industries and business stages.
              </p>

              {/* Key differentiators */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: CheckCircle2, text: "Expert financial structuring for every business stage" },
                  { icon: CheckCircle2, text: "2000+ businesses funded — ₹2000+ Crore disbursed" },
                  { icon: CheckCircle2, text: "Transparent terms with 24–48 hour disbursement" },
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <pt.icon size={18} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-base text-gray-700 font-medium leading-snug"
                      style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>{pt.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/services"
                  className="flex items-center gap-2 bg-gold text-black font-bold px-7 py-3.5 text-sm hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(212,175,55,0.3)]">
                  Explore Services <ArrowRight size={13} />
                </Link>
                <a href="tel:+919841098167"
                  className="flex items-center gap-2 border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 text-sm hover:border-gold hover:text-gold transition-all duration-300">
                  <Phone size={13} /> Speak to Us
                </a>
              </div>
            </motion.div>

            {/* Right — company image + floating cards */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
              className="relative hidden lg:block">
              <div className="relative">
                <div className="w-full h-[480px] overflow-hidden border border-gold/15">
                  <img src="/about-company.jpg" alt="Golden Globe Enterprises"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.querySelector(".ph").style.display = "flex";
                    }} />
                  <div className="ph hidden flex-col items-center justify-center text-gold/30 absolute inset-0 bg-[#f3f0e8]">
                    <Building2 size={48} strokeWidth={1} />
                    <p className="text-xs mt-3 text-gray-400 tracking-wider uppercase">Company Image</p>
                  </div>
                </div>
                {/* Gold border offset */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
              </div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 bottom-16 bg-[#0f0f0f] border border-gold/25 p-5 shadow-2xl w-52">
                <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Established</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>2011</p>
                <p className="text-xs text-gray-400 mt-1">Serving Tamil Nadu</p>
              </motion.div>

              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 top-12 bg-white border border-gold/20 p-5 shadow-2xl w-48">
                <p className="text-[10px] uppercase tracking-widest text-gold mb-2">Disbursed</p>
                <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>₹2000+ Cr</p>
                <p className="text-xs text-gray-400 mt-1">Across businesses</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ WAVE TRANSITION ══ */}
      <div className="relative bg-white overflow-hidden" style={{ height: 90, marginBottom: -1 }}>
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(248,247,244,0) 100%)" }} />
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 Q240,80 480,45 Q720,10 960,55 Q1200,90 1440,35 L1440,90 L0,90 Z"
            fill="#f8f7f4" />
        </svg>
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 30%, rgba(212,175,55,0.3) 70%, transparent)" }} />
      </div>

      {/* ══════════════════════ MISSION & VISION ══════════════════════ */}
      <section className="pt-10 pb-24 bg-[#f8f7f4] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[200px] font-extrabold text-black/[0.018] select-none pointer-events-none tracking-widest">GGE</div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="about-label">Our Direction</p>
            <h2 className="about-heading-dark">Mission &amp; Vision</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-7">
            {/* Mission — dark */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="mv-card-premium group relative overflow-hidden bg-[#111111] p-10 cursor-default">
                {/* Asymmetric bottom-left glow */}
                <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                  style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(20px)" }} />
                
                {/* Watermark "M" */}
                <div className="absolute -bottom-10 -right-4 font-serif text-[160px] font-extrabold text-[#d4af37]/[0.03] select-none pointer-events-none leading-none z-0">
                  M
                </div>

                {/* Circular Outline with Gold Icon */}
                <div className="w-14 h-14 rounded-full border border-[#d4af37]/40 flex items-center justify-center mb-7 relative z-10 transition-colors duration-300 group-hover:border-[#d4af37]">
                  <Target size={24} className="text-[#d4af37]" strokeWidth={1.5} />
                </div>
                
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-4 relative z-10">Our Mission</p>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Empowering Business Growth Through Capital
                </h3>
                
                {/* Underline transitions width */}
                <div className="w-10 h-0.5 bg-[#d4af37] mb-5 transition-all duration-500 group-hover:w-24 relative z-10" />
                
                <p className="text-gray-400 text-base leading-[1.9] relative z-10" style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                  <span className="text-[18px] text-[#e5c158] font-semibold block mb-2 leading-relaxed">
                    To empower businesses with innovative, reliable, and result-oriented financial solutions.
                  </span>
                  We enhance operational efficiency, foster sustainable growth, and create lasting value — making capital accessible as a tool every business owner can wield with confidence.
                </p>
              </div>
            </motion.div>

            {/* Vision — dark */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div className="mv-card-premium group relative overflow-hidden bg-[#111111] p-10 cursor-default">
                {/* Asymmetric bottom-right glow */}
                <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-35"
                  style={{ background: "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)", filter: "blur(20px)" }} />
                
                {/* Watermark "V" */}
                <div className="absolute -bottom-10 -left-4 font-serif text-[160px] font-extrabold text-[#d4af37]/[0.03] select-none pointer-events-none leading-none z-0">
                  V
                </div>

                {/* Circular Outline with Gold Icon */}
                <div className="w-14 h-14 rounded-full border border-[#d4af37]/40 flex items-center justify-center mb-7 relative z-10 transition-colors duration-300 group-hover:border-[#d4af37]">
                  <Eye size={24} className="text-[#d4af37]" strokeWidth={1.5} />
                </div>
                
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#d4af37] mb-4 relative z-10">Our Vision</p>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  A Trusted Partner for Every Business
                </h3>
                
                {/* Underline transitions width */}
                <div className="w-10 h-0.5 bg-[#d4af37] mb-5 transition-all duration-500 group-hover:w-24 relative z-10" />
                
                <p className="text-gray-400 text-base leading-[1.9] relative z-10" style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                  <span className="text-[18px] text-[#e5c158] font-semibold block mb-2 leading-relaxed">
                    To be a globally recognised business partner known for excellence, integrity, and innovation.
                  </span>
                  We maintain an unwavering commitment to helping organisations achieve their highest potential — ensuring a future where no deserving business is denied the capital it needs to grow.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY CHOOSE — BENTO GRID ══════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-[#FAF8F3]">
        {/* Soft blurred radial glow behind heading */}
        <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[500px] h-[250px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", filter: "blur(24px)", zIndex: 0 }}
        />
        {/* Financial Network SVG radiating from the Golden Globe heading */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.065, zIndex: 0 }}>
          <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            {/* Primary hub: centre of heading ~(720,120) */}
            <line x1="720" y1="120" x2="550" y2="180" stroke="#BF953F" strokeWidth="1.2"/>
            <line x1="720" y1="120" x2="890" y2="180" stroke="#BF953F" strokeWidth="1.2"/>
            <line x1="720" y1="120" x2="720" y2="260" stroke="#BF953F" strokeWidth="1.2"/>
            <line x1="720" y1="120" x2="610" y2="70" stroke="#BF953F" strokeWidth="1"/>
            <line x1="720" y1="120" x2="830" y2="70" stroke="#BF953F" strokeWidth="1"/>
            {/* Secondary nodes — left branch */}
            <line x1="550" y1="180" x2="380" y2="360" stroke="#BF953F" strokeWidth="1"/>
            <line x1="550" y1="180" x2="310" y2="560" stroke="#BF953F" strokeWidth="0.9"/>
            <line x1="380" y1="360" x2="220" y2="500" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="310" y1="560" x2="430" y2="680" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="220" y1="500" x2="180" y2="680" stroke="#BF953F" strokeWidth="0.7"/>
            <line x1="180" y1="680" x2="430" y2="680" stroke="#BF953F" strokeWidth="0.7"/>
            {/* Secondary nodes — right branch */}
            <line x1="890" y1="180" x2="1060" y2="360" stroke="#BF953F" strokeWidth="1"/>
            <line x1="890" y1="180" x2="1130" y2="560" stroke="#BF953F" strokeWidth="0.9"/>
            <line x1="1060" y1="360" x2="1220" y2="500" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="1130" y1="560" x2="1010" y2="680" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="1220" y1="500" x2="1260" y2="680" stroke="#BF953F" strokeWidth="0.7"/>
            <line x1="1260" y1="680" x2="1010" y2="680" stroke="#BF953F" strokeWidth="0.7"/>
            {/* Secondary nodes — centre branch */}
            <line x1="720" y1="260" x2="580" y2="460" stroke="#BF953F" strokeWidth="0.9"/>
            <line x1="720" y1="260" x2="860" y2="460" stroke="#BF953F" strokeWidth="0.9"/>
            <line x1="580" y1="460" x2="720" y2="680" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="860" y1="460" x2="720" y2="680" stroke="#BF953F" strokeWidth="0.8"/>
            {/* Far edges */}
            <line x1="610" y1="70" x2="140" y2="300" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="830" y1="70" x2="1300" y2="300" stroke="#BF953F" strokeWidth="0.8"/>
            <line x1="140" y1="300" x2="220" y2="500" stroke="#BF953F" strokeWidth="0.7"/>
            <line x1="1300" y1="300" x2="1220" y2="500" stroke="#BF953F" strokeWidth="0.7"/>
            {/* Nodes */}
            <circle cx="720" cy="120" r="7" fill="#BF953F"/>
            <circle cx="720" cy="120" r="14" fill="none" stroke="#BF953F" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="550" cy="180" r="4.5" fill="#BF953F"/>
            <circle cx="890" cy="180" r="4.5" fill="#BF953F"/>
            <circle cx="720" cy="260" r="4.5" fill="#BF953F"/>
            <circle cx="610" cy="70" r="3.5" fill="#BF953F"/>
            <circle cx="830" cy="70" r="3.5" fill="#BF953F"/>
            <circle cx="380" cy="360" r="4" fill="#BF953F"/>
            <circle cx="310" cy="560" r="3.5" fill="#BF953F"/>
            <circle cx="220" cy="500" r="4" fill="#BF953F"/>
            <circle cx="180" cy="680" r="3.5" fill="#BF953F"/>
            <circle cx="430" cy="680" r="3.5" fill="#BF953F"/>
            <circle cx="1060" cy="360" r="4" fill="#BF953F"/>
            <circle cx="1130" cy="560" r="3.5" fill="#BF953F"/>
            <circle cx="1220" cy="500" r="4" fill="#BF953F"/>
            <circle cx="1260" cy="680" r="3.5" fill="#BF953F"/>
            <circle cx="1010" cy="680" r="3.5" fill="#BF953F"/>
            <circle cx="580" cy="460" r="4" fill="#BF953F"/>
            <circle cx="860" cy="460" r="4" fill="#BF953F"/>
            <circle cx="720" cy="680" r="4.5" fill="#BF953F"/>
            <circle cx="140" cy="300" r="3.5" fill="#BF953F"/>
            <circle cx="1300" cy="300" r="3.5" fill="#BF953F"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16">
            <p className="about-label">Our Differentiators</p>
            <h2 className="about-heading-dark">
              Why Choose <span className="text-gold">Golden Globe?</span>
            </h2>
            <p className="mt-5 text-gray-700 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Lato', Helvetica, sans-serif", fontSize: "1rem" }}>
              We combine extensive industry experience with a personalised approach — every client receives a strategy
              built around their specific goals, not a template.
            </p>
          </motion.div>

          {/* Bento grid: 3 cols, alternating 2-wide + 1-wide */}
          <div className="bento-grid">
            {WHY_CARDS.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className={`bento-card ${card.wide ? "bento-wide" : "bento-narrow"}`}
              >
                {/* Champagne hover bg layer */}
                <div className="bento-hover-bg" />

                {/* Gold top line */}
                <div className="bento-top-line" />

                {/* Background watermark */}
                <div className="bento-watermark">{card.watermark}</div>

                {/* Content */}
                <div className={`relative z-10 h-full flex ${card.wide ? "gap-8 items-start" : "flex-col"}`}>
                  {/* Icon section */}
                  <div className={`flex-shrink-0 ${card.wide ? "" : "mb-5"}`}>
                    <div className="bento-icon-wrap">
                      <div className="bento-icon-glow" />
                      <card.icon size={22} style={{ stroke: "url(#goldGradIcon)" }} strokeWidth={1.5}
                        className="relative z-10" />
                    </div>
                  </div>

                  {/* Text section */}
                  <div>
                    <h4 className="bento-title">{card.title}</h4>
                    <div className="w-6 h-px bg-gold mb-3 mt-2" />
                    <p className="bento-desc">{card.desc}</p>
                  </div>
                </div>

                {/* Bottom sweep */}
                <div className="bento-bottom-line" />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mt-14">
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-[#0f0f0f] text-white font-semibold px-8 py-4 text-sm hover:bg-gold hover:text-black transition-all duration-300">
              Begin Your Funding Journey <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ LEADERSHIP — PREMIUM ══════════════════════ */}
      <section className="py-16 bg-[#0d0d0d] text-white overflow-hidden relative">
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(212,175,55,0.2) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(212,175,55,0.2) 60px)" }} />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold mb-3">The People Behind the Mission</p>
            <h2 className="about-heading-white">Leadership</h2>
          </motion.div>

          {/* 40 / 60 asymmetric split */}
          <div className="grid lg:grid-cols-[4fr_6fr] gap-14 items-start">

            {/* ─ LEFT: floating profile ─ */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative flex flex-col items-center lg:sticky lg:top-[100px]">

              {/* Wireframe globe bg */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.07 }}>
                <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" className="w-[260px] h-[260px]">
                  <circle cx="130" cy="130" r="120" fill="none" stroke="#d4af37" strokeWidth="0.7"/>
                  <circle cx="130" cy="130" r="80"  fill="none" stroke="#d4af37" strokeWidth="0.5"/>
                  <ellipse cx="130" cy="130" rx="120" ry="48" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
                  <ellipse cx="130" cy="130" rx="120" ry="90" fill="none" stroke="#d4af37" strokeWidth="0.4"/>
                  <line x1="10"  y1="130" x2="250" y2="130" stroke="#d4af37" strokeWidth="0.5"/>
                  <line x1="130" y1="10"  x2="130" y2="250" stroke="#d4af37" strokeWidth="0.5"/>
                </svg>
              </div>

              {/* Soft massive radial glow behind the founder's picture block */}
              <div className="absolute w-[350px] h-[350px] rounded-full pointer-events-none opacity-25 -z-10"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)",
                  filter: "blur(45px)",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />

              {/* Portrait photo with gold gradient border */}
              <div className="relative w-[220px] group/photo">
                <div style={{
                  padding: "2px",
                  background: "linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #b8860b 100%)",
                  borderRadius: "4px",
                }}>
                  <div className="overflow-hidden rounded-[3px] w-full" style={{ aspectRatio: "3/4" }}>
                    <img
                      src="/prabhu-profile.jpg"
                      alt="Prabhu — Founder & MD"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/photo:scale-105"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const el = e.target.parentNode;
                        el.style.background = "rgba(212,175,55,0.08)";
                        el.style.display = "flex";
                        el.style.alignItems = "center";
                        el.style.justifyContent = "center";
                        el.innerHTML = '<span style="color:#d4af37;font-size:3rem;font-weight:700;">P</span>';
                      }}
                    />
                  </div>
                </div>
                {/* Subtle glow under photo */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-8 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.25), transparent 70%)", filter: "blur(6px)" }} />
              </div>

              {/* Name & title */}
              <div className="text-center mt-6 relative z-10">
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Prabhu</h3>
                <p className="text-gold text-sm font-semibold tracking-wide mt-1">Founder &amp; Managing Director</p>
                <p className="text-gray-500 text-xs mt-1 tracking-wider">Golden Globe Enterprises</p>
              </div>

              {/* Stats row — prominent */}
              <div className="flex gap-6 mt-6 relative z-10">
                {[["20+", "Yrs Finance"], ["2000+", "Clients"], ["2001", "Started"]].map(([val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <p className="text-gold text-xl font-bold leading-none"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{val}</p>
                    <p className="text-[10px] text-gray-500 mt-1 leading-tight">{lbl}</p>
                  </div>
                ))}
              </div>

              {/* Pill tags */}
              <div className="flex flex-wrap gap-2 justify-center mt-5 relative z-10">
                {["Private Finance", "Business Lending", "Banking", "Financial Structuring"].map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold rounded-full text-gold px-3 py-1 tracking-wide"
                    style={{ background: "rgba(212,175,55,0.08)" }}>{tag}</span>
                ))}
              </div>
            </motion.div>

            {/* ─ RIGHT: bio + skill badges ─ */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative">
              {/* Radial glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 40%, rgba(191,149,63,0.07) 0%, transparent 65%)" }} />

              <div className="relative z-10">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">Founder's Profile</p>
                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Two Decades of Finance.<br />
                  <span className="text-gold">One Clear Vision.</span>
                </h3>
                <div className="w-10 h-0.5 bg-gold mb-7" />

                {/* Intro — larger */}
                <p className="text-[1.1rem] text-gray-200 leading-[1.8] mb-5 font-medium"
                  style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                  Prabhu is the Founder and Managing Director of Golden Globe Enterprises, bringing over two decades of
                  professional experience in finance, banking, and business management.
                </p>

                {/* Supporting paragraphs — smaller */}
                <p className="text-[0.95rem] text-gray-400 leading-[1.8] mb-4"
                  style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                  Beginning his career in the banking sector in <span className="text-gold font-semibold">2001</span>, he developed deep expertise across financial services,
                  credit assessment, customer relationship management, and strategic planning — gaining rare first-hand insight
                  into why businesses struggle to access capital through traditional channels.
                </p>
                <p className="text-[0.95rem] text-gray-400 leading-[1.8] mb-8"
                  style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                  Under his leadership, Golden Globe Enterprises has built a strong reputation across Chennai and Tamil Nadu
                  for professionalism, integrity, and consistent delivery — with <span className="text-gold font-bold">₹2000+ Crore</span> disbursed to <span className="text-gold font-bold">2000+ businesses</span>.
                </p>

                {/* Borderless skill badges */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Building2,    text: "Banking sector professional since 2001" },
                    { icon: Briefcase,    text: "Credit assessment & risk management" },
                    { icon: TrendingUp,   text: "Strategic financial structuring" },
                    { icon: CheckCircle2, text: "Client-centric leadership philosophy" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 pr-3">
                      <item.icon size={20} className="text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <p className="text-[0.875rem] text-gray-400 leading-[1.6]"
                        style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ COMPANY VALUES (Central Hub & Orbit Layout) ══════════════════════ */}
      <section className="py-24 bg-white relative">
        {/* Soft radial glow behind center hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(191,149,63,0.06) 0%, rgba(255,255,255,0) 70%)",
            zIndex: 0
          }}
        />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          
          {/* Section Header (Centered directly above) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-16 relative z-10">
            <p className="about-label">What We Stand For</p>
            <h2 className="about-heading-dark">Our Core Values</h2>
            <p className="mt-5 text-gray-500 max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Lato', Helvetica, sans-serif", fontSize: "1rem" }}>
              Six principles that govern every client engagement, every financial structure, and every decision we make.
            </p>
          </motion.div>

          {/* Hub & Orbits Layout Container */}
          <div ref={containerRef} className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_200px_1fr] gap-12 lg:gap-8 items-center">
            
            {/* SVG Connecting Lines (desktop only) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
              {/* Lines from Left Column to Center Hub */}
              <line 
                x1={coords?.icons[0]?.x ?? "calc(50% - 100px)"} 
                y1={coords?.icons[0]?.y ?? "7%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />
              <line 
                x1={coords?.icons[1]?.x ?? "calc(50% - 100px)"} 
                y1={coords?.icons[1]?.y ?? "43%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />
              <line 
                x1={coords?.icons[2]?.x ?? "calc(50% - 100px)"} 
                y1={coords?.icons[2]?.y ?? "79%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />

              {/* Lines from Right Column to Center Hub */}
              <line 
                x1={coords?.icons[3]?.x ?? "calc(50% + 100px)"} 
                y1={coords?.icons[3]?.y ?? "7%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />
              <line 
                x1={coords?.icons[4]?.x ?? "calc(50% + 100px)"} 
                y1={coords?.icons[4]?.y ?? "43%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />
              <line 
                x1={coords?.icons[5]?.x ?? "calc(50% + 100px)"} 
                y1={coords?.icons[5]?.y ?? "79%"} 
                x2={coords?.hub?.x ?? "50%"} 
                y2={coords?.hub?.y ?? "50%"} 
                stroke="rgba(191, 149, 63, 0.15)" strokeWidth="1.5" strokeDasharray="4 4" 
              />
            </svg>

            {/* LEFT COLUMN: 3 values - Right-aligned */}
            <div className="flex flex-col gap-4 lg:gap-8 relative z-10 text-right">
              {[
                { icon: ShieldCheck, title: "Integrity", desc: "Absolute honesty, transparency, and deep accountability in every single engagement." },
                { icon: BadgeCheck, title: "Commitment", desc: "Long-term partnership invested in your success from application to final closure." },
                { icon: Star, title: "Reliability", desc: "Consistent, dependable service backed by structured and proven processes." }
              ].map((val, idx) => (
                <motion.div 
                  key={val.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="core-value-card group relative"
                >
                  <div className="flex flex-row-reverse items-start gap-4">
                    {/* Icon directly next to title */}
                    <div 
                      ref={el => iconRefs.current[idx] = el}
                      className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors duration-300">
                      <val.icon size={18} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-gray-900 mb-2 font-serif" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {val.title}
                      </h4>
                      <p className="text-[14px] text-[#555555] leading-[1.85] font-sans" style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CENTER COLUMN: Hub */}
            <div className="flex flex-col justify-center items-center relative z-10 h-72">
              <motion.div 
                ref={hubRef}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-36 h-36 flex items-center justify-center rounded-full hub-logo-container border border-gold/30"
              >
                {/* Outer pulsing glow */}
                <div className="absolute inset-0 rounded-full animate-ping bg-gold/10 opacity-75 pointer-events-none" />
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gold/5 to-gold/15 blur-md pointer-events-none" />
                
                {/* Logo Image */}
                <img 
                  src="/logo-icon.png" 
                  alt="GGE Logo" 
                  className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]" 
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: 3 values - Left-aligned */}
            <div className="flex flex-col gap-4 lg:gap-8 relative z-10 text-left">
              {[
                { icon: Eye, title: "Transparency", desc: "Every financial structure is explained clearly with all terms disclosed upfront." },
                { icon: Heart, title: "Customer Focus", desc: "Your business goals define our strategy and our absolute measure of success." },
                { icon: Zap, title: "Speed of Service", desc: "Capital delivered within 24–48 hours for eligible facilities to match your business demands." }
              ].map((val, idx) => (
                <motion.div 
                  key={val.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="core-value-card group relative"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon directly next to title */}
                    <div 
                      ref={el => iconRefs.current[idx + 3] = el}
                      className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/10 transition-colors duration-300">
                      <val.icon size={18} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[19px] font-bold text-gray-900 mb-2 font-serif" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {val.title}
                      </h4>
                      <p className="text-[14px] text-[#555555] leading-[1.85] font-sans" style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════ TRUST STATS ══════════════════════ */}
      <section className="py-20 bg-[#0f0f0f] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 29px,rgba(212,175,55,0.3) 30px)" }} />
        <div className="absolute left-0 top-0 w-96 h-96 opacity-[0.06]"
          style={{ background: "radial-gradient(circle,#d4af37,transparent)" }} />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-14">
            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-gold mb-3">Proven Performance</p>
            <h2 className="about-heading-white">Trust Built on Numbers</h2>
            <p className="mt-5 text-gray-500 text-base max-w-lg mx-auto leading-relaxed"
              style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
              These metrics define our track record as a financial solutions partner — not words, results.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_STATS.map((stat, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group border border-white/8 p-8 text-center hover:border-gold/30 hover:bg-white/[0.02] transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-3 whitespace-nowrap"
                  style={{ 
                    fontFamily: "'Playfair Display', Georgia, serif", 
                    fontVariantNumeric: "tabular-nums",
                    fontFeatureSettings: "'tnum'"
                  }}>
                  <AnimCounter target={stat.val} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="w-8 h-px bg-gold mx-auto mb-3" />
                <p className="text-gray-400 text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              { icon: Clock,        title: "24–48 Hr Disbursement",       desc: "Capital when your business needs it — for eligible private finance and loan facilities." },
              { icon: Lightbulb,    title: "Expert Financial Guidance",    desc: "Every client receives personalised consultation — not a generic product pitch." },
              { icon: CheckCircle2, title: "Transparent Terms Always",     desc: "No hidden charges, no surprises. Every term disclosed before you commit." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 border border-white/8 p-6 hover:border-gold/20 transition-colors duration-300">
                <div className="w-10 h-10 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={17} style={{ stroke: "url(#goldGradIcon)" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TESTIMONIALS ══════════════════════ */}
      <section className="py-10 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_left,rgba(191,149,63,0.04),transparent_70%)]" />
          <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,rgba(191,149,63,0.04),transparent_70%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-gold/5 via-white/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">Client Stories</p>
            <h2 className="about-heading-dark">Trusted by Businesses</h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm leading-relaxed"
              style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
              From manufacturing to healthcare — businesses across Tamil Nadu rely on Golden Globe for structured funding.
            </p>
          </motion.div>

          <Swiper
            className="testi-cylinder"
            modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor centeredSlides slidesPerView="auto" speed={600}
            coverflowEffect={{ rotate: 35, stretch: 0, depth: 250, modifier: 1, slideShadows: false }}
            loop autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".about-testi-pagination" }}
            navigation={{ nextEl: ".about-testi-next", prevEl: ".about-testi-prev" }}
          >
            {TESTIMONIALS.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testi-card relative bg-[#0a0a0a] border border-white/5 p-6 md:p-8 rounded-2xl h-full flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(184,134,11,0.05)] pointer-events-none" />
                  <Award className="w-8 h-8 text-gold mb-5 opacity-90" />
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 font-serif italic">"{t.text}"</p>
                  <div className="mt-6 pt-5 border-t border-white/10 relative z-10">
                    <p className="text-base font-bold text-white tracking-wide">{t.name}</p>
                    <p className="text-[10px] text-gold mt-1.5 uppercase tracking-[0.15em]">{t.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="about-testi-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/40 text-gold items-center justify-center hover:bg-gold hover:text-black transition-all backdrop-blur-sm shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button className="about-testi-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/40 text-gold items-center justify-center hover:bg-gold hover:text-black transition-all backdrop-blur-sm shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
          <div className="about-testi-pagination mt-4 flex justify-center items-end h-8 relative z-20" />
        </div>
      </section>

      {/* ══════════════════════ CTA — blog2.jpeg BG ══════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src="/cta-about-bg.jpg" alt="" className="w-full h-full object-cover" />
          {/* Dark overlay — keeps text legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Gold grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(to right,rgba(212,175,55,0.4) 1px,transparent 1px),linear-gradient(to bottom,rgba(212,175,55,0.4) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

        {/* GGE watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 text-[14rem] font-extrabold tracking-[0.1em] text-white/[0.03] select-none pointer-events-none">
          GGE
        </div>

        <div className="relative max-w-4xl mx-auto px-8 z-10">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-gold mb-5">Let's Work Together</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Fuel Your Vision<br />
              with{" "}
              <span className="bg-gradient-to-r from-[#d4af37] to-[#f8e08c] bg-clip-text text-transparent">
                Strategic Capital.
              </span>
            </h2>
            <p className="text-gray-300 text-base leading-[1.8] max-w-xl mb-10"
              style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
              Connect with our financial specialists for a no-obligation consultation. Discover funding solutions
              structured precisely for your business timeline and growth objectives.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link to="/contact"
                className="px-9 py-4 font-bold text-black bg-gradient-to-r from-[#d4af37] to-[#f8e08c] shadow-[0_8px_28px_rgba(212,175,55,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(212,175,55,0.6)] text-sm flex items-center gap-2">
                Speak to a Funding Specialist <ArrowRight size={14} />
              </Link>
              <Link to="/services"
                className="px-9 py-4 font-semibold border border-[#d4af37]/50 text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black text-sm flex items-center gap-2">
                Explore Our Services
              </Link>
            </div>

            {/* Mini trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10">
              {["₹2000+ Cr Disbursed", "2000+ Businesses", "99% Satisfaction", "24–48 Hr Approval"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span className="text-xs text-gray-300 font-medium tracking-wide">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ FOOTER ══════════════════════ */}
      <Footer />

      {/* ══════════════════════ STYLES ══════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Lato:wght@300;400;700&display=swap');

        /* ─── Color tokens ─── */
        .about-page .text-gold   { color: #d4af37; }
        .about-page .bg-gold     { background-color: #d4af37; }
        .about-page .border-gold { border-color: #d4af37; }

        /* ─── Typography ─── */
        .about-label {
          font-size: 0.625rem; font-weight: 700;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: #d4af37; margin-bottom: 1rem;
          font-family: 'Lato', Helvetica, sans-serif;
          display: block;
        }
        .about-heading-dark {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700; color: #111;
          line-height: 1.1; letter-spacing: -0.02em;
        }
        .about-heading-white {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700; color: #fff;
          line-height: 1.1; letter-spacing: -0.02em;
        }

        /* ─── Utility overrides ─── */
        .border-white\/8  { border-color: rgba(255,255,255,0.08); }
        .border-gold\/25  { border-color: rgba(212,175,55,0.25); }
        .border-gold\/15  { border-color: rgba(212,175,55,0.15); }
        .border-gold\/20  { border-color: rgba(212,175,55,0.20); }
        .bg-gold\/10      { background-color: rgba(212,175,55,0.10); }
        .bg-white\/\[0\.02\] { background-color: rgba(255,255,255,0.02); }

        /* ─── Mission/Vision Premium Card ─── */
        .mv-card-premium {
          position: relative;
          border-radius: 8px;
          background: #111111;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
          z-index: 1;
        }
        .mv-card-premium::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 1px;
          background: linear-gradient(to bottom, #BF953F, transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
          z-index: 2;
        }
        .mv-card-premium:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
        }

        /* ─── Pulse animation for Hub Logo ─── */
        @keyframes pulse-gold {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { transform: scale(1.04); box-shadow: 0 0 25px 12px rgba(212, 175, 55, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        .hub-logo-container {
          animation: pulse-gold 3s infinite ease-in-out;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
        }

        /* ─── Bento grid ─── */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .bento-grid { grid-template-columns: 1fr; }
          .bento-wide, .bento-narrow { grid-column: span 1 !important; }
        }
        .bento-wide   { grid-column: span 2; }
        .bento-narrow { grid-column: span 1; }

        .bento-card {
          position: relative;
          padding: 2rem;
          background: #ffffff;
          border: 1px solid rgba(191, 149, 63, 0.15);
          overflow: hidden;
          min-height: 210px;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: default;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }
        .bento-card:hover {
          transform: translateY(-8px) translateZ(0);
          box-shadow: 0 20px 40px rgba(191, 149, 63, 0.08), 0 1px 3px rgba(0, 0, 0, 0.02);
          border-color: rgba(191, 149, 63, 0.45);
        }
        .bento-card:hover .bento-hover-bg { opacity: 1; }
        .bento-card:hover .bento-top-line  { width: 100%; }
        .bento-card:hover .bento-bottom-line { width: 100%; }
        .bento-card:hover .bento-icon-glow { opacity: 1; transform: scale(1.6); }

        .bento-hover-bg {
          position: absolute; inset: 0;
          background: #FAF6E9;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 0;
        }
        .bento-top-line {
          position: absolute; top: 0; left: 0;
          height: 2px; width: 0;
          background: linear-gradient(90deg, #d4af37, #f0d060);
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
          z-index: 2;
        }
        .bento-bottom-line {
          position: absolute; bottom: 0; left: 0;
          height: 1.5px; width: 0;
          background: linear-gradient(90deg, #d4af37, transparent);
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
          z-index: 2;
        }
        .bento-watermark {
          position: absolute; bottom: 12px; right: 20px;
          font-size: 5rem; font-weight: 900;
          color: rgba(212,175,55,0.06);
          pointer-events: none; user-select: none;
          line-height: 1;
          font-family: 'Playfair Display', Georgia, serif;
          z-index: 0;
        }
        .bento-icon-wrap {
          position: relative; width: 48px; height: 48px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(212,175,55,0.08);
          border-radius: 2px;
          border: 1px solid rgba(212,175,55,0.15);
        }
        .bento-icon-glow {
          position: absolute; inset: 0; border-radius: 2px;
          background: radial-gradient(circle, rgba(212,175,55,0.45) 0%, transparent 70%);
          filter: blur(8px);
          opacity: 0; transform: scale(1);
          transition: opacity 0.4s ease, transform 0.4s ease;
          pointer-events: none;
        }
        .bento-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.3rem; font-weight: 700;
          color: #111; letter-spacing: -0.01em;
          line-height: 1.3;
        }
        .bento-desc {
          font-family: 'Lato', Helvetica, sans-serif;
          font-size: 1.05rem; color: #333;
          line-height: 1.75;
        }

        /* ─── Testimonials cylinder ─── */
        .testi-cylinder { padding: 0 0 28px 0; perspective: 1200px; }
        .testi-cylinder .swiper-slide { width: 320px; filter: blur(4px); opacity: 0.4; }
        .testi-cylinder .swiper-slide-active { filter: blur(0); opacity: 1; }

        @keyframes shimmer-flash {
          0%   { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%)  skewX(-20deg); }
        }
        .testi-cylinder .swiper-slide-active .testi-card::after {
          content: ''; position: absolute;
          top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.15), transparent);
          animation: shimmer-flash 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
          pointer-events: none;
        }
        .about-testi-pagination .swiper-pagination-bullet {
          background: #d4af37; opacity: 0.25; width: 6px; height: 6px;
          transition: all 0.4s ease; margin: 0 6px !important;
        }
        .about-testi-pagination .swiper-pagination-bullet-active {
          opacity: 1; transform: scale(1.8) translateY(-3px);
          box-shadow: 0 0 10px rgba(212,175,55,0.6);
        }
        @media (max-width: 768px) {
          .testi-cylinder .swiper-slide { width: 280px; }
        }
        .swiper-button-prev, .swiper-button-next { display: none !important; }
      `}</style>
    </div>
  );
}

export default About;