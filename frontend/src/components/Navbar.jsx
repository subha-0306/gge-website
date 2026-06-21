import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black text-white border-b border-white/10 shadow-sm z-50 relative">
      <div className="relative max-w-[90rem] mx-auto px-6 md:px-12 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 text-white group"
        >
          <img 
            src="/logo-icon.png" 
            alt="GGE Logo" 
            className="w-14 h-14 md:w-[74px] md:h-[74px] object-contain transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl md:text-[26px] font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#cca740] to-[#b59235] leading-none">
              Golden Globe Enterprises
            </span>
            <span className="text-[8.5px] md:text-[10.5px] tracking-[0.16em] text-[#cca740]/85 font-semibold uppercase leading-none mt-1.5 transition-colors duration-300 group-hover:text-[#cca740]">
              Finance That Fits Your Goal
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
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
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 py-4 px-6 flex flex-col space-y-4 absolute top-full left-0 w-full z-40 shadow-xl select-none animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-bold uppercase tracking-wider py-1 border-b border-white/5 transition-colors duration-200 ${
                location.pathname === link.path ? "text-[#cca740]" : "text-gray-300 hover:text-[#cca740]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;