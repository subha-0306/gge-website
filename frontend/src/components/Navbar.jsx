import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-black text-white border-b border-white/10 shadow-sm z-50 relative">
      <div className="relative max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-2xl font-semibold tracking-wide text-white"
        >
          <img src="/logo-icon.png" alt="GGE Logo" className="w-12 h-12 md:w-14 md:h-14 object-contain" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#cca740] to-[#b59235]">Golden Globe Enterprises</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10 text-sm uppercase tracking-wider font-semibold">
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
                className={`absolute left-0 -bottom-2 h-[2px] bg-[#cca740] transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;