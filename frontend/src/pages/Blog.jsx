import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag, ChevronRight, Search } from "lucide-react";
import { ARTICLES } from "./blogData";

function useReveal(dep1, dep2) {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("rved"); io.unobserve(e.target); }
        }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep1, dep2]);
}

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


const ALL_CATEGORIES = ["All", ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

const featured = ARTICLES.find((a) => a.featured);
const rest = ARTICLES.filter((a) => !a.featured);

/* ════════════════════════════════════════════════════════════ */
function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  useReveal(activeCategory, searchQuery);
  const mousePos = useMouseTracking();

  const sourceArticles = (activeCategory === "All" && !searchQuery) ? rest : ARTICLES;
  const filtered = sourceArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[350px] flex items-end overflow-hidden bg-[#0a0a0a]">

        <img
          src="/blog-bg.jpeg"
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
            <span className="text-white">Blog</span>
          </p>
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black bg-[#d4af37] px-4 py-1.5 mb-5 rounded-sm">
            Insights & Guidance
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              transform: `translateX(${mousePos.x * 10}px) translateY(${mousePos.y * 10}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            Financial Insights for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f0d060]">
              Growing Businesses
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
            Practical guidance on private finance, business loans, and capital strategy — written for Indian business owners.
          </p>
        </div>
      </section>

      {/* ══ FEATURED ARTICLE ══ */}
      {featured && (
        <section className="bg-[#f8f7f4] py-16">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-8 rv">
              Featured Article
            </p>

            <Link to={`/blog/${featured.slug}`} className="group block rv">
              <div className="flex flex-col md:flex-row gap-0 border border-gray-200 overflow-hidden hover:border-gold/40 hover:shadow-2xl transition-all duration-500">
                {/* Image */}
                <div className="relative bg-[#0f0f0f] h-64 md:h-auto md:w-1/2 md:min-h-[360px] overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={featured.coverPlaceholder}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-[#d4af37] text-black text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 shadow-md">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6 sm:p-8 md:p-12 flex flex-col justify-center md:w-1/2">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold border border-gold/30 px-3 py-1">
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock size={11} /> {featured.readTime}
                    </span>
                    <span className="text-xs text-gray-400">{featured.date}</span>
                  </div>

                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-snug md:leading-tight group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {featured.title}
                  </h2>

                  <div className="w-10 h-0.5 bg-gold mt-4 mb-4 md:mt-5 md:mb-5" />

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 md:mb-8">{featured.excerpt}</p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all duration-300">
                    Read Full Article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ══ FILTER + SEARCH BAR ══ */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-gold text-black"
                    : "bg-gray-50 text-gray-500 hover:text-gold hover:bg-gray-100"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-200 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gold transition-colors duration-200 w-52"
            />
          </div>
        </div>
      </section>

      {/* ══ ARTICLE GRID ══ */}
      <section className="py-16 bg-[#f8f7f4]">
        <div className="max-w-7xl mx-auto px-8">

          {filtered.length === 0 ? (
            <div className="text-center py-20 rv">
              <p className="text-gray-400 text-sm">No articles found for your search.</p>
              <button
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-4 text-gold text-xs underline underline-offset-4 hover:opacity-70"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((article, i) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="rv group bg-white border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-xl transition-all duration-400 flex flex-col"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative bg-[#0f0f0f] h-48 overflow-hidden flex items-center justify-center flex-shrink-0">
                    <img
                      src={article.coverPlaceholder}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    {/* Category chip */}
                    <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-widest text-black bg-gold px-3 py-1">
                      {article.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock size={10} /> {article.readTime}
                      </span>
                      <span className="text-[10px] text-gray-300">·</span>
                      <span className="text-[10px] text-gray-400">{article.date}</span>
                    </div>

                    <h3
                      className="text-base font-bold text-gray-900 leading-snug mb-3 group-hover:text-gold transition-colors duration-300 flex-1"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {article.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gold mt-auto group-hover:gap-2.5 transition-all duration-300">
                      Read Article <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-[#0f0f0f] py-14">
        <div className="max-w-5xl mx-auto px-8 text-center rv">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-3">Ready to Take Action?</p>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Speak to a Funding Specialist Today.
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
            Insights are valuable — but a direct conversation costs nothing and can unlock the right funding path for your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gold text-black font-semibold px-7 py-3.5 text-sm hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Get in Touch <ArrowRight size={13} />
            </Link>
            <Link
              to="/services"
              className="border border-gold/40 text-gold font-semibold px-7 py-3.5 text-sm hover:bg-gold hover:text-black transition-all duration-300 inline-flex items-center gap-2"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400&display=swap');

        .rv   { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
        .rved { opacity: 1; transform: translateY(0); }
        .text-gold   { color: #d4af37; }
        .bg-gold     { background-color: #d4af37; }
        .border-gold { border-color: #d4af37; }
        .focus\\:border-gold:focus { border-color: #d4af37; }
        .hover\\:text-gold:hover  { color: #d4af37; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .transition-all.duration-400 { transition-duration: 400ms; }
        .transition-all.duration-600 { transition-duration: 600ms; }
      `}</style>
    </>
  );
}

export default Blog;