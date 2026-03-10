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
    <nav className="bg-[#151515] text-white border-b border-gold/30 shadow-lg shadow-black/20">

  {/* Edge Gold Tint */}
 

  <div className="relative max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-wide text-gold"
        >
          Golden Globe Enterprises
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-10 text-sm uppercase tracking-wider">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative group"
            >
              <span
                className={`transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-white group-hover:text-gold"
                }`}
              >
                {link.name}
              </span>

              <span
                className={`absolute left-0 -bottom-2 h-[2px] bg-gold transition-all duration-300 ${
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