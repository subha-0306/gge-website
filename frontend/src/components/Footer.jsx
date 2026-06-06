import { Phone, Mail, MapPin, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const PHONE_PRIMARY   = { display: "+91 75500 14333", tel: "+917550014333" };
const PHONE_SECONDARY = { display: "+91 98410 98167", tel: "+919841098167" };
const EMAIL_PRIMARY   = "tridentcapitalservices@gmail.com";
const EMAIL_SECONDARY = "naliniprabhu2017@gmail.com";
const WHATSAPP_NUM    = "917550014333";

const SERVICES = [
  "Private Finance",
  "Business Loans",
  "Cheque Based Finance",
  "Loan Against Property",
  "Machinery Loans",
  "Professional Loans",
];

const QUICK_LINKS = [
  { label: "Home",       path: "/" },
  { label: "About Us",   path: "/about" },
  { label: "Services",   path: "/services" },
  { label: "Blog",       path: "/blog" },
  { label: "Contact Us", path: "/contact" },
];

export default function Footer() {
  return (
    <>
      {/* ─ Separator ─ */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }} />

      <footer className="footer-root">
        {/* Ambient glow */}
        <div className="footer-glow" />
        {/* Grid texture */}
        <div className="footer-grid" />

        <div className="footer-inner">

          {/* ─── Column 1: Brand ─── */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src="/logo-icon.png" alt="GGE Logo" className="footer-logo-img" />
              <div>
                <p className="footer-brand-name">Golden Globe</p>
                <p className="footer-brand-sub">Enterprises</p>
              </div>
            </div>
            <p className="footer-brand-desc">
              Structured financial solutions and strategic capital support
              for businesses across industries. Transparent, fast, and
              tailored — since 2011.
            </p>
            {/* Trust badges */}
            <div className="footer-trust">
              {["₹1000+ Cr Disbursed", "2000+ Businesses", "48 Hr Approval"].map((t) => (
                <span key={t} className="footer-trust-badge">{t}</span>
              ))}
            </div>
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Golden%20Globe%2C%20I%20need%20funding%20help.`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa-btn"
            >
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.49 2.027 7.8L0 32l8.437-2.01A15.94 15.94 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.894 22.322c-.33.927-1.94 1.77-2.66 1.883-.68.108-1.54.153-2.486-.157a22.83 22.83 0 01-2.25-.832C13.1 21.8 10.64 19.1 10.3 18.67c-.34-.43-2.77-3.68-2.77-7.02 0-3.34 1.75-4.97 2.37-5.65.62-.68 1.35-.85 1.8-.85.45 0 .9.004 1.29.024.415.02.97-.158 1.52 1.16.57 1.35 1.94 4.69 2.11 5.03.17.34.28.74.055 1.19-.226.45-.34.73-.676 1.12-.337.4-.71.893-.676 1.35.34.453 1.52 2.01 3.26 3.26 2.24 1.58 4.13 2.07 4.72 2.3.59.227.93.19 1.27-.113.34-.3 1.46-1.7 1.85-2.29.39-.59.79-.49 1.33-.3.54.19 3.42 1.61 4.01 1.9.59.29.98.43 1.12.67.145.24.145 1.39-.183 2.32z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* ─── Column 2: Services ─── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-list">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link to="/services" className="footer-link">
                    <ArrowRight size={11} className="footer-link-arrow" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Column 3: Quick Links ─── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-list">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.path} className="footer-link">
                    <ArrowRight size={11} className="footer-link-arrow" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Business Hours mini card */}
            <div className="footer-hours-card">
              <p className="footer-hours-title">Business Hours</p>
              <p className="footer-hours-row">Mon – Fri &nbsp; 9 AM – 7 PM</p>
              <p className="footer-hours-row">Saturday &nbsp; 9 AM – 2 PM</p>
              <p className="footer-hours-closed">Sunday — Closed</p>
            </div>
          </div>

          {/* ─── Column 4: Contact ─── */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-list">

              {/* Phone primary */}
              <a href={`tel:${PHONE_PRIMARY.tel}`} className="footer-contact-item">
                <div className="fc-icon"><Phone size={15} strokeWidth={1.6} /></div>
                <div>
                  <span className="fc-tag">Primary</span>
                  <span className="fc-value">{PHONE_PRIMARY.display}</span>
                </div>
              </a>

              {/* Phone secondary */}
              <a href={`tel:${PHONE_SECONDARY.tel}`} className="footer-contact-item">
                <div className="fc-icon"><Phone size={15} strokeWidth={1.6} /></div>
                <div>
                  <span className="fc-tag">Support</span>
                  <span className="fc-value">{PHONE_SECONDARY.display}</span>
                </div>
              </a>

              {/* Email primary */}
              <a href={`mailto:${EMAIL_PRIMARY}`} className="footer-contact-item">
                <div className="fc-icon"><Mail size={15} strokeWidth={1.6} /></div>
                <div>
                  <span className="fc-tag">General</span>
                  <span className="fc-value fc-email">{EMAIL_PRIMARY}</span>
                </div>
              </a>

              {/* Email secondary */}
              <a href={`mailto:${EMAIL_SECONDARY}`} className="footer-contact-item">
                <div className="fc-icon"><Mail size={15} strokeWidth={1.6} /></div>
                <div>
                  <span className="fc-tag">Alternate</span>
                  <span className="fc-value fc-email">{EMAIL_SECONDARY}</span>
                </div>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/maps?q=CSI+Ewart+School+Anna+Nagar+West+Extension+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
              >
                <div className="fc-icon"><MapPin size={15} strokeWidth={1.6} /></div>
                <div>
                  <span className="fc-tag">Office</span>
                  <span className="fc-value">
                    No 6/7, Near CSI Ewart School,<br />
                    Santham Colony, Anna Nagar West Ext.,<br />
                    Chennai – 600101, Tamil Nadu
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ─ Bottom Bar ─ */}
        <div className="footer-bottom-sep" />
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2011 – 2026 Golden Globe Enterprises. All Rights Reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy Policy</a>
            <span className="footer-dot">·</span>
            <a href="#" className="footer-bottom-link">Terms of Service</a>
            <span className="footer-dot">·</span>
            <a href="/contact" className="footer-bottom-link">Contact</a>
          </div>
          <p className="footer-made">
            Made with <Heart size={11} style={{ color: "#d4af37", display: "inline", verticalAlign: "middle" }} /> in Chennai
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .footer-root {
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #06080f 0%, #0a0c15 40%, #07090e 100%);
          padding: 5rem 0 0;
          font-family: 'Outfit', sans-serif;
        }
        .footer-glow {
          position: absolute; pointer-events: none; z-index: 0;
          top: -100px; left: -100px; width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%);
        }
        .footer-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
          background-image:
            repeating-linear-gradient(0deg,transparent,transparent 49px,rgba(212,175,55,0.8) 50px),
            repeating-linear-gradient(90deg,transparent,transparent 49px,rgba(212,175,55,0.8) 50px);
        }
        .footer-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 2.5rem 3.5rem;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
          gap: 3rem;
        }
        @media (min-width: 1101px) {
          .footer-inner {
            gap: 0;
          }
          .footer-brand {
            padding-right: 2.5rem;
          }
          .footer-col {
            border-left: 1px solid rgba(212,175,55,0.08);
            padding-left: 2.5rem;
          }
        }
        @media (max-width: 1100px) {
          .footer-inner { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .footer-inner { grid-template-columns: 1fr; gap: 2rem; padding: 0 1.5rem 2.5rem; }
        }

        /* ─ Brand column ─ */
        .footer-logo-row {
          display: flex; align-items: center; gap: 12px; margin-bottom: 1.25rem;
        }
        .footer-logo-img { width: 48px; height: 48px; object-fit: contain; }
        .footer-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; font-weight: 700;
          background: linear-gradient(135deg, #d4af37, #f0d060, #b59235);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1.2;
        }
        .footer-brand-sub {
          font-size: 0.85rem; font-weight: 500; color: rgba(212,175,55,0.6);
          letter-spacing: 0.12em; text-transform: uppercase;
        }
        .footer-brand-desc {
          font-size: 0.95rem; color: rgba(255,255,255,0.45);
          line-height: 1.8; margin-bottom: 1.5rem;
        }
        .footer-trust { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.5rem; }
        .footer-trust-badge {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em;
          color: #d4af37; border: 1px solid rgba(212,175,55,0.25);
          background: rgba(212,175,55,0.06); padding: 4px 10px; border-radius: 4px;
        }
        .footer-wa-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 8px;
          background: #25D366; color: #fff;
          font-size: 0.95rem; font-weight: 700; text-decoration: none;
          box-shadow: 0 4px 16px rgba(37,211,102,0.3);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .footer-wa-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(37,211,102,0.45), 0 0 12px rgba(37,211,102,0.2);
        }

        /* ─ Generic column ─ */
        .footer-col { }
        .footer-col-title {
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #d4af37;
          margin-bottom: 1.5rem; padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .footer-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .footer-link {
          display: flex; align-items: center; gap: 7px;
          font-size: 1rem; color: rgba(255,255,255,0.5);
          text-decoration: none; padding: 5px 0;
          transition: all 0.25s;
        }
        .footer-link-arrow { color: rgba(212,175,55,0.4); transition: all 0.25s; flex-shrink: 0; }
        .footer-link:hover { color: #d4af37; padding-left: 4px; }
        .footer-link:hover .footer-link-arrow { color: #d4af37; }

        /* Business hours mini */
        .footer-hours-card {
          margin-top: 1.5rem; padding: 1rem 1.1rem;
          background: rgba(212,175,55,0.05);
          border: 1px solid rgba(212,175,55,0.15); border-radius: 8px;
        }
        .footer-hours-title {
          font-size: 0.8rem; font-weight: 700; letter-spacing: 0.15em;
          text-transform: uppercase; color: #d4af37; margin-bottom: 0.6rem;
        }
        .footer-hours-row {
          font-size: 0.95rem; color: rgba(255,255,255,0.55); margin-bottom: 3px;
        }
        .footer-hours-closed {
          font-size: 0.95rem; color: rgba(255,255,255,0.25); margin-top: 4px;
        }

        /* ─ Contact items ─ */
        .footer-contact-list { display: flex; flex-direction: column; gap: 12px; }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 10px;
          text-decoration: none; padding: 10px 12px; border-radius: 8px;
          border: 1px solid transparent;
          transition: all 0.3s;
        }
        .footer-contact-item:hover {
          background: rgba(212,175,55,0.05);
          border-color: rgba(212,175,55,0.15);
        }
        .fc-icon {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          background: rgba(212,175,55,0.08);
          border: 1px solid rgba(212,175,55,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #d4af37; margin-top: 2px;
          transition: background 0.3s;
        }
        .footer-contact-item:hover .fc-icon { background: rgba(212,175,55,0.15); }
        .fc-tag {
          display: block; font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(212,175,55,0.6); margin-bottom: 2px;
        }
        .fc-value {
          display: block; font-size: 0.95rem; font-weight: 500;
          color: rgba(255,255,255,0.7); line-height: 1.5;
          transition: color 0.2s;
        }
        .fc-email { font-size: 0.9rem; word-break: break-all; }
        .footer-contact-item:hover .fc-value { color: #d4af37; }

        /* ─ Bottom bar ─ */
        .footer-bottom-sep {
          position: relative; z-index: 1;
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 0 2.5rem;
        }
        .footer-bottom {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 1.5rem 2.5rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 0.85rem; color: rgba(255,255,255,0.3); }
        .footer-bottom-links { display: flex; align-items: center; gap: 10px; }
        .footer-bottom-link {
          font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.35);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-bottom-link:hover { color: #d4af37; }
        .footer-dot { color: rgba(255,255,255,0.2); font-size: 0.85rem; }
        .footer-made { font-size: 0.85rem; color: rgba(255,255,255,0.25); }

        @media (max-width: 768px) {
          .footer-bottom { flex-direction: column; text-align: center; gap: 8px; }
          .footer-bottom-sep { margin: 0 1.5rem; }
        }
      `}</style>
    </>
  );
}
