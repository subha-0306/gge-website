import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ChevronRight, Clock, ArrowLeft, Phone, Mail } from "lucide-react";
import { ARTICLES } from "./blogData";

function useReveal() {
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
    }, []);
}

function ContentBlock({ block }) {
    switch (block.type) {
        case "intro":
            return (
                <p className="text-lg md:text-xl text-gray-800 leading-[1.8] border-l-3 border-gold pl-6 mb-10 italic"
                    style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                    {block.text}
                </p>
            );
        case "h2":
            return (
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {block.text}
                </h2>
            );
        case "p":
            return (
                <p className="text-gray-700 text-[15.5px] md:text-[17px] leading-[1.85] mb-6"
                    style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                    {block.text}
                </p>
            );
        case "ul":
            return (
                <ul className="mb-8 space-y-4">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-[15.5px] md:text-[17px] text-gray-700 leading-relaxed"
                            style={{ fontFamily: "'Lato', Helvetica, sans-serif" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            );
        case "table":
            return (
                <div className="mb-10">
                    {/* Mobile View */}
                    <div className="block md:hidden space-y-4">
                        {block.rows.map((row, i) => (
                            <div key={i} className="bg-white border border-gray-150 p-5 shadow-sm">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                                    {block.headers[0]}: <span className="text-gold">{row[0]}</span>
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {row.slice(1).map((cell, j) => (
                                        <div key={j}>
                                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">
                                                {block.headers[j + 1]}
                                            </span>
                                            <span className="text-xs text-gray-600 leading-relaxed font-medium">
                                                {cell}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto border border-gray-150">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#0f0f0f]">
                                    {block.headers.map((h, i) => (
                                        <th key={i} className="text-left text-xs font-bold uppercase tracking-widest text-gold px-6 py-4 whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {block.rows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f5]"}>
                                        {row.map((cell, j) => (
                                            <td key={j} className={`px-6 py-4 text-xs md:text-sm leading-relaxed border-t border-gray-150 ${j === 0 ? "font-semibold text-gray-800" : "text-gray-500"}`}>
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        default:
            return null;
    }
}

/* ════════════════════════════════════════════════════════════ */
function BlogPost() {
    useReveal();
    const { slug } = useParams();
    const navigate = useNavigate();

    const article = ARTICLES.find((a) => a.slug === slug);
    const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8f7f4]">
                <div className="text-center">
                    <p className="text-gold text-5xl font-bold mb-4"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>404</p>
                    <p className="text-gray-500 text-sm mb-6">Article not found.</p>
                    <button onClick={() => navigate("/blog")}
                        className="bg-gold text-black text-sm font-semibold px-6 py-3 hover:opacity-90 transition">
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* ══ HERO ══ */}
            <section className="relative min-h-[380px] flex items-end bg-[#0a0a0a] overflow-hidden">
                <img
                    src={article.coverPlaceholder} alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-65"
                    onError={(e) => (e.target.style.display = "none")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                <div className="relative max-w-7xl mx-auto px-8 pb-14 pt-32 w-full flex flex-col items-start text-left">
                    <div className="max-w-3xl space-y-4">
                        {/* Breadcrumb */}
                        <p
                            className="flex items-center gap-2 text-xs text-gray-200 flex-wrap font-medium"
                        >
                            <a href="/" className="hover:text-gold transition-colors">Home</a>
                            <ChevronRight size={12} />
                            <Link to="/blog" className="hover:text-gold transition-colors">Blog</Link>
                            <ChevronRight size={12} />
                            <span className="text-gold line-clamp-1">{article.title}</span>
                        </p>

                        <div
                            className="flex items-center gap-3 flex-wrap"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-gold px-3 py-1">
                                {article.category}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-gray-200">
                                <Clock size={11} /> {article.readTime}
                            </span>
                            <span className="text-xs text-gray-200">·</span>
                            <span className="text-xs text-gray-200">{article.date}</span>
                        </div>

                        <h1
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg"
                            style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            {article.title}
                        </h1>

                        <p className="text-gray-200 text-sm leading-relaxed font-normal drop-shadow-md"
                            style={{
                                fontFamily: "'Lato', Helvetica, sans-serif",
                            }}>
                            {article.excerpt}
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ CONTENT AREA ══ */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">

                        {/* ─ Article body ─ */}
                        <article className="rv max-w-none">
                            <Link to="/blog"
                                className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gold transition-colors duration-200 mb-10">
                                <ArrowLeft size={13} /> Back to all articles
                            </Link>

                            <div className="prose-golden">
                                {article.content.map((block, i) => (
                                    <ContentBlock key={i} block={block} />
                                ))}
                            </div>

                            {/* Author strip */}
                            <div className="mt-14 pt-8 border-t border-gray-100 flex items-center gap-5">
                                <div className="w-12 h-12 bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                                    <span className="text-gold font-bold text-sm"
                                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>GG</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Golden Globe Enterprises</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Financial solutions specialist based in Chennai, Tamil Nadu. Serving businesses since 2020.
                                    </p>
                                </div>
                            </div>

                            {/* Share / Tags strip */}
                            <div className="mt-6 flex items-center gap-3 flex-wrap">
                                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Filed under:</span>
                                <span className="text-[10px] font-bold border border-gold/30 text-gold px-3 py-1 uppercase tracking-wider">
                                    {article.category}
                                </span>
                            </div>
                        </article>

                        {/* ─ Sidebar ─ */}
                        <aside className="rv space-y-7" style={{ transitionDelay: "100ms" }}>

                            {/* CTA box */}
                            <div className="bg-[#0f0f0f] p-7 border border-white/5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">
                                    Need Funding?
                                </p>
                                <h3 className="text-lg font-bold text-white leading-snug mb-3"
                                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                    Speak to a Specialist Today.
                                </h3>
                                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                                    Our financial consultants are available Monday–Saturday. No commitment required — just a straightforward conversation.
                                </p>
                                <Link to="/contact"
                                    className="flex items-center justify-center gap-2 w-full bg-gold text-black font-semibold py-3 text-sm hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5 mb-3">
                                    Enquire Now <ArrowRight size={13} />
                                </Link>
                                <a href="mailto:ggenterprises.fin@gmail.com"
                                    className="flex items-center justify-center gap-2 w-full border border-white/10 text-white font-semibold py-3 text-sm hover:border-gold hover:text-gold transition-all duration-300">
                                    <Mail size={13} /> ggenterprises.fin@gmail.com
                                </a>
                            </div>

                            {/* Quick links */}
                            <div className="border border-gray-100 p-7">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-5">
                                    Our Services
                                </p>
                                <ul className="space-y-2.5">
                                    {[
                                        ["Private Finance", "/private-finance"],
                                        ["Business Loans", "/services"],
                                        ["Cheque Based Finance", "/services"],
                                        ["Loan Against Property", "/services"],
                                        ["Machinery Loans", "/services"],
                                        ["Professional Loans", "/services"],
                                    ].map(([label, href]) => (
                                        <li key={label}>
                                            <Link to={href}
                                                className="flex items-center justify-between text-xs text-gray-600 hover:text-gold transition-colors duration-200 group py-1 border-b border-gray-50">
                                                {label}
                                                <ChevronRight size={12} className="text-gray-300 group-hover:text-gold transition-colors" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Key info box */}
                            <div className="bg-[#faf9f5] border border-gray-100 p-7">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-5">
                                    Golden Globe At a Glance
                                </p>
                                {[
                                    ["₹500+ Cr", "Total Funding Disbursed"],
                                    ["2,000+", "Businesses Supported"],
                                    ["24–48 Hrs", "Typical Disbursement"],
                                    ["Since 2020", "Serving Tamil Nadu"],
                                ].map(([val, label]) => (
                                    <div key={label} className="flex justify-between items-baseline py-2.5 border-b border-gray-100 last:border-0">
                                        <span className="text-xs text-gray-500">{label}</span>
                                        <span className="text-xs font-bold text-gold">{val}</span>
                                    </div>
                                ))}
                            </div>

                        </aside>
                    </div>
                </div>
            </section>

            {/* ══ RELATED ARTICLES ══ */}
            <section className="py-16 bg-[#f8f7f4]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex items-end justify-between mb-10 rv">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-2">Continue Reading</p>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                Related Articles
                            </h2>
                        </div>
                        <Link to="/blog"
                            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gold hover:gap-3 transition-all duration-300">
                            View All <ArrowRight size={12} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {related.map((rel, i) => (
                            <Link
                                key={rel.slug}
                                to={`/blog/${rel.slug}`}
                                className="rv group bg-white border border-gray-100 overflow-hidden hover:border-gold/30 hover:shadow-lg transition-all duration-400 flex flex-col"
                                style={{ transitionDelay: `${i * 60}ms` }}
                            >
                                <div className="bg-[#0f0f0f] h-40 relative overflow-hidden flex items-center justify-center flex-shrink-0">
                                    <img
                                        src={rel.coverPlaceholder} alt={rel.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                                        onError={(e) => (e.target.style.display = "none")}
                                    />
                                    <span className="absolute bottom-3 left-4 text-[9px] font-bold uppercase tracking-widest text-black bg-gold px-2.5 py-0.5">
                                        {rel.category}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> {rel.readTime}</span>
                                        <span className="text-[10px] text-gray-300">·</span>
                                        <span className="text-[10px] text-gray-400">{rel.date}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-gold transition-colors duration-300 flex-1 mb-4"
                                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                                        {rel.title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gold group-hover:gap-2.5 transition-all duration-300 mt-auto">
                                        Read Article <ArrowRight size={11} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ BOTTOM CTA ══ */}
            <section 
                className="py-12 relative overflow-hidden"
                style={{ 
                    background: "linear-gradient(135deg, #d8b872 0%, #fdf7c3 40%, #d1ae5c 70%, #b38e3a 100%)"
                }}
            >
                <div className="max-w-5xl mx-auto px-8 text-center rv">
                    <h2 className="text-xl md:text-2xl font-bold text-black"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        Ready to Explore Your Funding Options?
                    </h2>
                    <p className="mt-2 text-black/65 text-sm max-w-xl mx-auto">
                        One conversation with our specialists can clarify your options and set your business on a clear funding path.
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact"
                            className="bg-black text-white font-semibold px-7 py-3.5 text-sm hover:bg-[#111] transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2">
                            Contact Us <ArrowRight size={13} />
                        </Link>
                        <a href="mailto:ggenterprises.fin@gmail.com"
                            className="border border-black/25 text-black font-semibold px-7 py-3.5 text-sm hover:bg-black hover:text-white transition-all duration-300 inline-flex items-center gap-2">
                            <Mail size={13} /> ggenterprises.fin@gmail.com
                        </a>
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
        .bg-gold\\/10 { background-color: rgba(212,175,55,0.10); }
        .hover\\:text-gold:hover  { color: #d4af37; }
        .hover\\:border-gold:hover { border-color: #d4af37; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .transition-all.duration-400 { transition-duration: 400ms; }
        .transition-all.duration-600 { transition-duration: 600ms; }
      `}</style>
        </>
    );
}

export default BlogPost;