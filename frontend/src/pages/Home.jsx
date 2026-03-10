import { ShieldCheck, Handshake, Briefcase, Clock } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CountUp from "react-countup";
import {
  Building2,
  Factory,
  Landmark,
  HandCoins,
  FileCheck
} from "lucide-react";
import {
  Send,
  Search,
  FileCheck2,
  Wallet
} from "lucide-react";
function Home() {
  return (
    <section className="bg-softwhite">
      <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            Financial Solutions That <span className="block text-gold mt-3">
            Drive Business Growth
            </span>
            
          </h1>

          <p className="mt-8 text-lg text-gray-500 max-w-xl leading-relaxed">
            Golden Globe Enterprises delivers structured funding solutions,
            business loans, and financial expertise tailored to help your
            organization grow with confidence and clarity.
          </p>

          <div className="mt-10 flex gap-6">
            <button className="bg-gold text-black px-7 py-3 font-semibold rounded-md hover:opacity-90 transition">
              Apply for Funding
            </button>

            <button className="border border-gray-400 text-primary px-7 py-3 font-semibold rounded-md hover:border-gold hover:text-gold transition">
              Explore Services
            </button>
          </div>
        </div>

        {/* Right Accent Panel */}
        <div className="hidden md:flex justify-center">
  <div className="w-[420px] h-[320px] rounded-2xl bg-gradient-to-br from-gold/10 via-white to-gold/5 border border-gold/20 shadow-lg"></div>
</div>
      </div>
      {/* Why Choose Us Section */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-8">

    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-primary">
        Why Choose
        <span className="text-gold"> Golden Globe Enterprises</span>
      </h2>
      <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
        We combine financial expertise, structured processes, and tailored
        funding solutions to support your business growth with confidence.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

  {/* Featured Card */}
  <div className="relative p-8 rounded-xl border border-gold bg-white shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
    <Handshake className="w-8 h-8 text-gold mb-4" />
    <h3 className="text-lg font-semibold text-primary mb-3">
      Tailored Financial Solutions
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Customized funding plans designed to match your specific
      business requirements and growth strategy.
    </p>
  </div>

  <div className="p-8 border border-gray-200 rounded-xl bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
    <ShieldCheck className="w-8 h-8 text-gold mb-4" />
    <h3 className="text-lg font-semibold text-primary mb-3">
      Transparent Process
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Clear documentation and structured evaluation without hidden
      conditions throughout the funding process.
    </p>
  </div>

  <div className="p-8 border border-gray-200 rounded-xl bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
    <Briefcase className="w-8 h-8 text-gold mb-4" />
    <h3 className="text-lg font-semibold text-primary mb-3">
      Professional Guidance
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Experienced financial consultation to help you make informed
      and strategic funding decisions.
    </p>
  </div>

  <div className="p-8 border border-gray-200 rounded-xl bg-white transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
    <Clock className="w-8 h-8 text-gold mb-4" />
    <h3 className="text-lg font-semibold text-primary mb-3">
      Timely Disbursement
    </h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Efficient approval and reliable fund disbursement aligned
      with your business timelines.
    </p>
  </div>

</div>
  </div>
</section>
{/* Services Section */}
<section className="py-28 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-8">

    {/* Header */}
    <div className="text-center mb-20">
  <h2 className="text-4xl md:text-5xl font-bold text-primary">
    Funding Your <span className="text-gold">Ambition</span>
  </h2>
  <p className="mt-5 text-gray-500 max-w-2xl mx-auto">
    Strategic capital solutions designed to empower businesses at
    every stage of growth and expansion.
  </p>
</div>

    {/* Services Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

  {/* Featured Service */}
  <div className="relative p-8 bg-white rounded-2xl border border-gold shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl">

    <span className="absolute top-4 right-4 text-xs bg-gold text-black px-3 py-1 rounded-full font-semibold">
      Most Popular
    </span>

    <Building2 className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Business Loans
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Flexible repayment options</li>
      <li>• Competitive interest rates</li>
      <li>• Fast approval process</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>


  {/* Cheque Finance */}
  <div className="p-8 bg-white rounded-2xl border border-gray-200 transition duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-xl">

    <FileCheck className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Cheque Based Finance
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Flexible structuring</li>
      <li>• Short-term liquidity support</li>
      <li>• Transparent documentation</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>


  {/* Loan Against Property */}
  <div className="p-8 bg-white rounded-2xl border border-gray-200 transition duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-xl">

    <Landmark className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Loan Against Property
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Higher funding limits</li>
      <li>• Asset-backed security</li>
      <li>• Competitive tenure options</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>


  {/* Machinery Loan */}
  <div className="p-8 bg-white rounded-2xl border border-gray-200 transition duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-xl">

    <Factory className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Industrial Machinery Loans
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Equipment financing support</li>
      <li>• Expansion-driven structuring</li>
      <li>• Quick processing timelines</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>


  {/* Professional Loans */}
  <div className="p-8 bg-white rounded-2xl border border-gray-200 transition duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-xl">

    <Briefcase className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Professional Loans
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Designed for professionals</li>
      <li>• Minimal documentation</li>
      <li>• Growth-oriented funding</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>


  {/* Private Finance */}
  <div className="p-8 bg-white rounded-2xl border border-gray-200 transition duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-xl">

    <HandCoins className="w-10 h-10 text-gold mb-5" />

    <h3 className="text-xl font-semibold text-primary mb-4">
      Private Finance
    </h3>

    <ul className="text-gray-500 text-sm space-y-2 mb-6">
      <li>• Flexible private structuring</li>
      <li>• Fast-track approvals</li>
      <li>• Customized solutions</li>
    </ul>

    <button className="text-gold font-semibold hover:underline">
      Learn More →
    </button>
  </div>

</div>
<div className="text-center mt-20">
  <button className="bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-black transition">
    Not sure which is right for you? Enquire now
  </button>
</div>
  </div>
</section>
{/* Process Section */}
<section className="relative py-24 bg-gradient-to-b from-[#0f0f0f] via-[#111111] to-black text-white overflow-hidden">

  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-bold">
      Simple & Structured <span className="text-gold">Process</span>
    </h2>

    <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
      A transparent approach designed to deliver clarity, confidence,
      and timely execution at every stage.
    </p>

    {/* Timeline Line */}
    <div className="relative mt-20">
      <div className="absolute top-10 left-0 right-0 h-[2px] 
                      bg-gradient-to-r from-transparent via-gold to-transparent 
                      opacity-30 hidden md:block"></div>

      <div className="grid md:grid-cols-4 gap-12">

        {/* STEP 01 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center 
                          w-20 h-20 rounded-full bg-gold 
                          shadow-[0_0_25px_rgba(212,175,55,0.35)]">

            <span className="absolute -top-2 -right-2 
                             bg-black text-gold text-xs font-bold 
                             px-2 py-0.5 rounded-full border border-gold">
              01
            </span>

            <svg xmlns="http://www.w3.org/2000/svg"
                 className="w-6 h-6 text-black"
                 fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 10l18-7-7 18-2-8-9-3z" />
            </svg>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            Submit Enquiry
          </h3>

          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
            Submit your details in under 2 minutes to begin your funding journey.
            <span className="block text-xs text-gray-500 mt-2">
              No credit impact for initial enquiry.
            </span>
          </p>
        </div>

        {/* STEP 02 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center 
                          w-20 h-20 rounded-full bg-gold 
                          shadow-[0_0_25px_rgba(212,175,55,0.35)]">

            <span className="absolute -top-2 -right-2 
                             bg-black text-gold text-xs font-bold 
                             px-2 py-0.5 rounded-full border border-gold">
              02
            </span>

            <svg xmlns="http://www.w3.org/2000/svg"
                 className="w-6 h-6 text-black"
                 fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 16l4-4 4 4M4 20h16M4 4h16" />
            </svg>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            Financial Assessment
          </h3>

          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
            Our experts analyze your profile to structure the most cost-effective solution.
          </p>
        </div>

        {/* STEP 03 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center 
                          w-20 h-20 rounded-full bg-gold 
                          shadow-[0_0_25px_rgba(212,175,55,0.35)]">

            <span className="absolute -top-2 -right-2 
                             bg-black text-gold text-xs font-bold 
                             px-2 py-0.5 rounded-full border border-gold">
              03
            </span>

            <svg xmlns="http://www.w3.org/2000/svg"
                 className="w-6 h-6 text-black"
                 fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M9 12h6m2 8H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6v8a2 2 0 01-2 2z" />
            </svg>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            Approval & Documentation
          </h3>

          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
            Direct path to approval with clear documentation and structured evaluation.
          </p>
        </div>

        {/* STEP 04 */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center 
                          w-20 h-20 rounded-full bg-gold 
                          shadow-[0_0_25px_rgba(212,175,55,0.35)]">

            <span className="absolute -top-2 -right-2 
                             bg-black text-gold text-xs font-bold 
                             px-2 py-0.5 rounded-full border border-gold">
              04
            </span>

            <svg xmlns="http://www.w3.org/2000/svg"
                 className="w-6 h-6 text-black"
                 fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17 9V7a4 4 0 00-8 0v2M5 9h14l-1 10H6L5 9z" />
            </svg>
          </div>

          <h3 className="mt-6 text-lg font-semibold">
            Fund Disbursement
          </h3>

          <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-xs">
            Get your capital delivered quickly once approved —
            funds typically available within 24–48 hours.
          </p>
        </div>

      </div>
    </div>

    {/* CTA */}
    <div className="mt-20">
      <button className="bg-gold text-black font-semibold 
                         px-10 py-4 rounded-lg
                         hover:-translate-y-1 transition duration-300
                         shadow-[0_8px_25px_rgba(212,175,55,0.35)]">
        Ready to Take Step 01?
      </button>
    </div>

  </div>
</section>


<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-black">
      Proven <span className="text-gold">Performance</span>
    </h2>

    <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
      Delivering structured capital solutions backed by measurable impact and long-term partnerships.
    </p>

    {/* Stats Grid */}
    <div className="mt-20 grid md:grid-cols-4 gap-8">

      {/* Stat Card */}
      <div className="p-8 border border-gray-100 rounded-xl 
                      hover:-translate-y-1 transition duration-300 
                      hover:shadow-lg">

        <div className="text-gold text-4xl font-extrabold">
          ₹<CountUp end={500} duration={2} />+ Cr
        </div>

        <p className="mt-4 text-gray-700 font-medium">
          Funding Successfully Disbursed
        </p>
      </div>

      {/* Stat Card */}
      <div className="p-8 border border-gray-100 rounded-xl 
                      hover:-translate-y-1 transition duration-300 
                      hover:shadow-lg">

        <div className="text-gold text-4xl font-extrabold">
          <CountUp end={2000} duration={2} />+
        </div>

        <p className="mt-4 text-gray-700 font-medium">
          Enterprises Supported
        </p>
      </div>

      {/* Stat Card */}
      <div className="p-8 border border-gray-100 rounded-xl 
                      hover:-translate-y-1 transition duration-300 
                      hover:shadow-lg">

        <div className="text-gold text-4xl font-extrabold">
          <CountUp end={98} duration={2} />%
        </div>

        <p className="mt-4 text-gray-700 font-medium">
          Positive Client Feedback
        </p>
      </div>

      {/* Stat Card */}
      <div className="p-8 border border-gray-100 rounded-xl 
                      hover:-translate-y-1 transition duration-300 
                      hover:shadow-lg">

        <div className="text-gold text-3xl font-extrabold">
          24 – 48 Hrs
        </div>

        <p className="mt-4 text-gray-700 font-medium">
          Industry-Leading Turnaround
        </p>
      </div>

    </div>

  </div>
</section>
<section className="py-28 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-black">
      What Our <span className="text-gold">Clients Say</span>
    </h2>

    <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
      Businesses across industries trust Golden Globe Enterprises
      for structured funding solutions and reliable financial guidance.
    </p>

    <div className="mt-16 relative">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 4500 }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        className="testimonial-swiper"
      >

        {/* CARD */}
        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Golden Globe Enterprises structured the funding we needed
              to expand our manufacturing unit and secure a major supply contract.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Rajesh Kumar
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                🏭 Manufacturing Business Owner
              </p>
            </div>

          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              The team helped us secure funding quickly to expand our
              retail operations across multiple locations.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Meera Sharma
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                🛍 Retail Business Owner
              </p>
            </div>

          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Their fast approval helped us secure equipment financing
              for our construction projects without delays.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Arjun Patel
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                🏗 Construction Contractor
              </p>
            </div>

          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Professional guidance and structured solutions helped us
              scale our logistics operations significantly.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Vikram Singh
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                🚚 Logistics Entrepreneur
              </p>
            </div>

          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Transparent communication and flexible financing options
              made a huge difference to our trading business.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Karan Mehta
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                📦 Trading Company Owner
              </p>
            </div>

          </div>
        </SwiperSlide>


        <SwiperSlide>
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-xl transition relative">

            <div className="absolute top-4 left-5 text-gold text-5xl opacity-20">
              “
            </div>

            <img
              src="https://via.placeholder.com/90"
              alt="client"
              className="w-16 h-16 rounded-full mx-auto mb-5 object-cover"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Their financial team helped us secure capital quickly
              to expand our healthcare clinic operations.
            </p>

            <div className="mt-6">
              <p className="font-semibold text-black flex items-center justify-center gap-2">
                Dr. Ananya Rao
                <span className="text-green-600 text-xs">✔ Verified Client</span>
              </p>

              <p className="text-gray-500 text-sm flex items-center justify-center gap-2 mt-1">
                🏥 Healthcare Entrepreneur
              </p>
            </div>

          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  </div>
</section>
<section className="py-28 bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-black text-white">

  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
      Ready to Structure Your
      <span className="text-gold"> Business Growth?</span>
    </h2>

    <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
      Connect with our financial specialists to explore the right
      funding solutions tailored to your business needs.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">

      <button className="bg-gold text-black font-semibold px-8 py-4 rounded-lg
                         hover:-translate-y-1 transition duration-300
                         shadow-[0_10px_25px_rgba(212,175,55,0.35)]">

        Speak to a Funding Specialist

      </button>

      <button className="border border-gold text-gold px-8 py-4 rounded-lg
                         hover:bg-gold hover:text-black transition duration-300">

        Submit Enquiry

      </button>

    </div>

  </div>

</section>
<section className="bg-[#0f0f0f] text-gray-300 pt-20 pb-10">

  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

    {/* CONTACT INFO */}
    <div>
      <h3 className="text-2xl font-semibold text-gold mb-6">
        Contact Us
      </h3>

      {/* Phone */}
      <div className="mb-6">
        <p className="flex items-center gap-2 text-gold font-medium mb-2">
          📞 Phone
        </p>

        <p>
          <a href="tel:+919841098167" className="hover:text-gold transition">
            +91 98410 98167
          </a>
        </p>

        <p>
          <a href="tel:+918248512428" className="hover:text-gold transition">
            +91 82485 12428
          </a>
        </p>
      </div>

      {/* Email */}
      <div className="mb-6">
        <p className="flex items-center gap-2 text-gold font-medium mb-2">
          ✉ Email
        </p>

        <p>
          <a
            href="mailto:tridentcapitalservices@gmail.com"
            className="hover:text-gold transition"
          >
            tridentcapitalservices@gmail.com
          </a>
        </p>
      </div>

      {/* Address */}
      <div>
        <p className="flex items-center gap-2 text-gold font-medium mb-2">
          📍 Address
        </p>

        <p className="leading-relaxed">
          No 6/7, Near CSI Ewart School,<br />
          Santham Colony, Anna Nagar West Extension,<br />
          Chennai – 600101, Tamil Nadu
        </p>
      </div>
    </div>

    {/* COMPANY ABOUT */}
    <div>
      <h3 className="text-2xl font-semibold text-gold mb-6">
        Golden Globe Enterprises
      </h3>

      <p className="leading-relaxed text-gray-400">
        Golden Globe Enterprises provides structured financial solutions
        and strategic capital support for businesses across industries.
        Since 2020, we have focused on delivering transparent funding
        guidance, reliable turnaround times, and tailored financial
        strategies designed to support sustainable business growth.
      </p>

      <p className="mt-4 text-gray-400">
        Our approach combines financial expertise with a deep understanding
        of business needs to help organizations access capital confidently
        and efficiently.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h3 className="text-2xl font-semibold text-gold mb-6">
        Quick Links
      </h3>

      <ul className="space-y-3">

        <li>
          <a href="/" className="hover:text-gold transition">
            Home
          </a>
        </li>

        <li>
          <a href="/about" className="hover:text-gold transition">
            About Us
          </a>
        </li>

        <li>
          <a href="/services" className="hover:text-gold transition">
            Services
          </a>
        </li>

        <li>
          <a href="/blog" className="hover:text-gold transition">
            Blog
          </a>
        </li>

        <li>
          <a href="/contact" className="hover:text-gold transition">
            Contact
          </a>
        </li>

      </ul>
    </div>

  </div>


  {/* BOTTOM BAR */}
  <div className="border-t border-gray-800 mt-16 pt-6 text-center text-sm text-gray-500">

    <p>
      © 2020 – 2026 Golden Globe Enterprises. All Rights Reserved.
    </p>

    <div className="mt-2 space-x-4">
      <a href="#" className="hover:text-gold transition">
        Privacy Policy
      </a>

      <a href="#" className="hover:text-gold transition">
        Terms & Conditions
      </a>
    </div>

  </div>

</section>
  </section>
  );
 
}
 export default Home;