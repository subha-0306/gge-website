import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

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


function About() {
  const mousePos = useMouseTracking();
  return (
    <div>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[350px] flex items-end overflow-hidden bg-[#0a0a0a]">
               
        <img
          src="/about-bg.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{
            transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px) scale(1.1)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/40 md:bg-gradient-to-r md:from-[#0a0a0a] md:via-[#0a0a0a]/80 md:to-transparent z-20" />
        
        {/* Subtle geometric pattern */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-screen z-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(212,175,55,0.15) 40px), repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(212,175,55,0.15) 40px)",
          }}
        />

        <div className="relative z-30 max-w-7xl mx-auto px-8 pb-14 pt-28 w-full text-left flex flex-col items-start">
          <p className="flex items-center gap-2 text-sm mb-6 font-medium text-gray-400">
            <a href="/" className="hover:text-[#d4af37] transition-colors">Home</a>
            <ChevronRight size={14} />
            <span className="text-white">About Us</span>
          </p>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black bg-[#d4af37] px-4 py-1.5 mb-5 rounded-sm">
            Our Story
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{ 
              fontFamily: "'Playfair Display', Georgia, serif",
              transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            About <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Golden Globe Enterprises
            </span>
          </h1>
          <p
            className="mt-2 text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed font-medium"
            style={{ 
              fontFamily: "'Lato', Helvetica, sans-serif",
              transform: `translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            Delivering structured financial solutions and strategic capital
            support to businesses since 2011.
          </p>
        </div>
      </section>



      {/* COMPANY OVERVIEW */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold">
              Who <span className="text-gold">We Are</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Golden Globe Enterprises is a financial solutions provider
              focused on helping businesses access structured capital with
              transparency and efficiency.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Since 2011, we have worked closely with entrepreneurs,
              professionals, and growing enterprises to structure funding
              solutions that align with their operational and expansion
              goals.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Our approach combines financial expertise, strong lending
              partnerships, and a deep understanding of business needs to
              deliver reliable funding solutions across industries.
            </p>
          </div>

          <div className="bg-gray-100 h-[300px] rounded-xl flex items-center justify-center text-gray-400">
            Company Image Placeholder
          </div>

        </div>
      </section>



      {/* MISSION VISION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-xl border hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-gold">Our Mission</h3>

            <p className="mt-4 text-gray-600">
              To empower businesses with structured financial solutions that
              support sustainable growth and long-term stability.
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl border hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold text-gold">Our Vision</h3>

            <p className="mt-4 text-gray-600">
              To become a trusted financial partner for businesses seeking
              transparent funding guidance and reliable capital access.
            </p>
          </div>

        </div>
      </section>



      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Why Choose <span className="text-gold">Golden Globe</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">
                Transparent Structuring
              </h4>
              <p className="mt-3 text-gray-600 text-sm">
                Clear documentation and honest financial structuring.
              </p>
            </div>

            <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">
                Fast Approvals
              </h4>
              <p className="mt-3 text-gray-600 text-sm">
                Efficient approval processes designed to move quickly.
              </p>
            </div>

            <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">
                Tailored Solutions
              </h4>
              <p className="mt-3 text-gray-600 text-sm">
                Customized financial structures based on business needs.
              </p>
            </div>

            <div className="p-6 border rounded-xl text-center hover:shadow-lg transition">
              <h4 className="font-semibold text-lg">
                Industry Expertise
              </h4>
              <p className="mt-3 text-gray-600 text-sm">
                Experienced financial consultation for growing businesses.
              </p>
            </div>

          </div>
        </div>
      </section>



      {/* LEADERSHIP */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center">
            Leadership <span className="text-gold">Team</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mt-16">

            <div className="bg-white p-10 rounded-xl border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>

              <h4 className="text-xl font-semibold">
                Prabhu
              </h4>

              <p className="text-gold">Founder & Managing Director</p>

              <p className="mt-4 text-gray-600 text-sm">
                With over a decade of experience in financial structuring
                and business funding, he leads Golden Globe Enterprises
                with a vision to simplify capital access for growing
                businesses.
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl border text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>

              <h4 className="text-xl font-semibold">
                Nalini P
              </h4>

              <p className="text-gold">Head of Operations</p>

              <p className="mt-4 text-gray-600 text-sm">
                Oversees client coordination and financial structuring
                processes to ensure every funding journey remains
                transparent, efficient, and reliable.
              </p>
            </div>

          </div>
        </div>
      </section>
      <section className="relative py-18 md:py-20 text-white overflow-hidden bg-[#05070f]">

        {/* subtle gradient depth */}
        <div className="absolute inset-0 
  bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.06),transparent_40%),
      radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.06),transparent_40%)]" />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.025] 
  bg-[linear-gradient(to_right,white_1px,transparent_1px),
      linear-gradient(to_bottom,white_1px,transparent_1px)]
  bg-[size:44px_44px]" />

        {/* watermark (reduced interference) */}
        <div className="absolute inset-0 flex items-center justify-center 
  text-[180px] md:text-[240px] font-extrabold tracking-[0.1em]
  text-white/[0.065] select-none pointer-events-none">
          GGE
        </div>

        <div className="relative max-w-xl mx-auto px-6 text-center">

          {/* HEADLINE */}
          <h2 className="text-[2.2rem] md:text-[3rem] font-extrabold 
    leading-[1.2] tracking-tight">

            <span className="block text-white/90">
              Fuel Your Vision with
            </span>

            <span className="block mt-2 
      bg-gradient-to-r from-[#d4af37] to-[#f8e08c]
      bg-clip-text text-transparent">
              Strategic Capital
            </span>

          </h2>

          {/* SUBTEXT */}
          <p className="mt-6 text-gray-400 text-[15px] leading-[1.7] max-w-md mx-auto">
            Connect with our specialists for a no-obligation consultation and discover
            funding solutions tailored to your timeline and business needs.
          </p>

          {/* CTA GROUP */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            <button className="px-8 py-3.5 rounded-lg font-semibold text-black
      bg-gradient-to-r from-[#d4af37] to-[#f8e08c]
      shadow-[0_8px_24px_rgba(212,175,55,0.35)]
      transition-all duration-300
      hover:-translate-y-[2px] hover:shadow-[0_12px_35px_rgba(212,175,55,0.5)]
      active:scale-[0.96]">
              Speak to a Funding Specialist
            </button>

            <button className="px-8 py-3.5 rounded-lg font-medium
      border border-[#d4af37]/40 text-[#d4af37]
      transition-all duration-300
      hover:bg-[#d4af37] hover:text-black">
              Submit Enquiry
            </button>

          </div>

        </div>

      </section>
    </div>
  );
}

export default About;