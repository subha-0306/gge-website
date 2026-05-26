import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Building2,
  Factory,
  Briefcase,
  Handshake,
  TrendingUp,
  Home,
  ChevronRight
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
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePos;
}

function CalculatorInputs({ amount, setAmount, rate, setRate, tenure, setTenure }) {
  return (
    <div className="space-y-6">

      <div>
        <label className="text-sm text-gray-600">Loan Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Interest Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Tenure (Months)</label>
        <input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

    </div>
  );
}

function CalculatorResult({ amount, rate, tenure }) {

  const P = parseFloat(amount) || 0;
  const r = parseFloat(rate) / 12 / 100 || 0;
  const n = parseFloat(tenure) || 0;

  let emi = 0;
  let total = 0;
  let interest = 0;

  if (P > 0 && n > 0) {
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }
    total = emi * n;
    interest = total - P;
  }

  return (
    <div className="bg-gray-50 p-8 rounded-xl">

      <h3 className="text-xl font-semibold mb-6">
        Results
      </h3>

      <div className="space-y-4 text-gray-700">

        <p>
          EMI: <span className="text-gold font-semibold">₹ {emi ? emi.toFixed(0) : 0}</span>
        </p>

        <p>
          Total Interest: <span className="text-gold font-semibold">₹ {interest ? interest.toFixed(0) : 0}</span>
        </p>

        <p>
          Total Payment: <span className="text-gold font-semibold">₹ {total ? total.toFixed(0) : 0}</span>
        </p>

      </div>

    </div>
  );
}
function Services() {
  const mousePos = useMouseTracking();
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300 drop-shadow-md">
              Financial Solutions
            </span>
          </h1>
          <p
            className="mt-2 text-sm md:text-base text-gray-200 max-w-2xl leading-relaxed font-medium drop-shadow-md"
            style={{ 
              fontFamily: "'Lato', Helvetica, sans-serif",
              transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            Tailored funding solutions designed to empower businesses at every stage of growth.
          </p>
        </div>
      </section>



      {/* SERVICES GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Our <span className="text-gold">Services</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-16">

            {/* Card 1*/}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl border border-gray-200 bg-white 
  hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <Building2 size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Business Loans
              </h3>

              <p className="mt-3 text-gray-600">
                Structured funding solutions for business growth and expansion.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>✔ Flexible repayment</li>
                <li>✔ Fast approvals</li>
                <li>✔ Competitive structuring</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>
            </motion.div>


            {/* Card 2*/}
            <motion.div className="group relative p-8 rounded-xl border border-gray-200 bg-white 
hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <Factory size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Industrial Machinery Loans
              </h3>

              <p className="mt-3 text-gray-600">
                Financing solutions to support equipment purchases
                and industrial expansion.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Equipment financing</li>
                <li>• Expansion capital</li>
                <li>• Flexible tenure</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>
            </motion.div>


            {/* Card 3*/}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl border border-gray-200 bg-white 
  hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <Briefcase size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Professional Loans
              </h3>

              <p className="mt-3 text-gray-600">
                Customized financial support for professionals
                seeking to expand their practice or operations.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Designed for professionals</li>
                <li>• Minimal documentation</li>
                <li>• Competitive structuring</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>

            </motion.div>


            {/* Card 4*/}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl border border-gray-200 bg-white 
  hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <Handshake size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Private Finance
              </h3>

              <p className="mt-3 text-gray-600">
                Flexible private funding solutions tailored for
                businesses requiring alternative capital options.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Flexible structuring</li>
                <li>• Faster approvals</li>
                <li>• Customized terms</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>

            </motion.div>


            {/* Card 5*/}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl border border-gray-200 bg-white 
  hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <TrendingUp size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Working Capital Finance
              </h3>

              <p className="mt-3 text-gray-600">
                Ensure smooth operations with working capital
                solutions designed for growing businesses.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Operational liquidity</li>
                <li>• Short-term financing</li>
                <li>• Flexible repayment</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>

            </motion.div>


            {/* Card 6*/}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-xl border border-gray-200 bg-white 
  hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >

              <div className="absolute inset-0 rounded-xl border border-transparent 
  group-hover:border-gold opacity-30"></div>

              <div className="text-gold mb-5 group-hover:scale-110 transition">
                <Home size={32} />
              </div>

              <h3 className="text-xl font-semibold">
                Property-backed Loans
              </h3>

              <p className="mt-3 text-gray-600">
                Secure funding against property assets with
                structured repayment solutions.
              </p>

              <ul className="mt-4 text-sm text-gray-600 space-y-1">
                <li>• Asset-backed funding</li>
                <li>• Competitive structuring</li>
                <li>• Flexible terms</li>
              </ul>

              <div className="mt-5 text-gold flex items-center gap-1 group-hover:gap-2 transition">
                Learn More →
              </div>

            </motion.div>

          </div>

        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Loan <span className="text-gold">Calculator</span>
          </h2>

          <p className="text-center text-gray-600 mt-4">
            Estimate your monthly payments and plan your financing better.
          </p>

          <div className="mt-16 bg-white p-10 rounded-xl shadow-lg grid md:grid-cols-2 gap-10">

            {/* INPUTS */}
            <CalculatorInputs
              amount={amount}
              setAmount={setAmount}
              rate={rate}
              setRate={setRate}
              tenure={tenure}
              setTenure={setTenure}
            />

            {/* RESULTS */}
            <CalculatorResult
              amount={amount}
              rate={rate}
              tenure={tenure}
            />

          </div>

        </div>
      </section>

    </div>
  );
}

export default Services;