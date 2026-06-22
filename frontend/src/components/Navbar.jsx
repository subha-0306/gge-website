import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black text-white border-b border-white/10 shadow-sm z-50 sticky top-0">
      <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 sm:gap-4 text-white group shrink-0"
        >
          <img 
            src="/logo-icon.png" 
            alt="GGE Logo" 
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-[74px] md:h-[74px] object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col justify-center">
            <span className="text-lg sm:text-xl md:text-[26px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#cca740] to-[#b59235] leading-none">
              Golden Globe Enterprises
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] md:text-[10.5px] tracking-[0.16em] text-[#cca740]/85 font-semibold uppercase leading-none mt-1 sm:mt-1.5 transition-colors duration-300 group-hover:text-[#cca740]">
              Finance That Fits Your Goal
            </span>
          </div>
        </Link>

        {/* Navigation Links — Desktop */}
        <div className="hidden md:flex space-x-12 text-[15.5px] uppercase tracking-wider font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative group"
            >
              <span
                className={`transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-[#cca740]"
                    : "text-gray-300 group-hover:text-[#cca740]"
                }`}
              >
                {link.name}
              </span>

              <span
                className={`absolute left-0 -bottom-3.5 h-[2px] bg-[#cca740] transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2.5 text-gray-300 hover:text-white transition-colors focus:outline-none -mr-1"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown — Full-screen overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[calc(var(--nav-height,64px))] bg-black/98 backdrop-blur-xl z-[999] animate-fade-in overflow-y-auto">
          <div className="flex flex-col px-6 py-6 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold uppercase tracking-wider py-4 px-3 border-b border-white/5 transition-all duration-200 flex items-center justify-between ${
                  location.pathname === link.path 
                    ? "text-[#cca740] bg-[#cca740]/5" 
                    : "text-gray-300 hover:text-[#cca740] hover:bg-white/5"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span>{link.name}</span>
                {location.pathname === link.path && (
                  <span className="w-2 h-2 rounded-full bg-[#cca740]" />
                )}
              </Link>
            ))}

            {/* Quick contact in mobile menu */}
            <div className="pt-6 mt-4 border-t border-white/10">
              <a
                href="tel:+919843693697"
                className="flex items-center gap-3 text-gray-400 hover:text-[#cca740] py-3 px-3 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-sm font-semibold">+91 98436 93697</span>
              </a>
              <a
                href={`https://wa.me/919843693697?text=Hi%20Golden%20Globe%2C%20I%20need%20funding%20help.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-lg transition-transform hover:scale-[1.02]"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.709 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CSS variable for nav height used by the overlay */}
      <style>{`
        nav { --nav-height: 64px; }
        @media (min-width: 768px) { nav { --nav-height: 82px; } }
      `}</style>
    </nav>
  );
}

export default Navbar;