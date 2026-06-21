import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { adminLogin } from "../services/api";
import { Shield, Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (localStorage.getItem("gge_token")) {
      navigate("/admin/dashboard");
    }

    if (searchParams.get("expired")) {
      setError("Your session has expired. Please log in again.");
    }
  }, [navigate, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await adminLogin({ email, password });
      if (res.success && res.data.token) {
        localStorage.setItem("gge_token", res.data.token);
        localStorage.setItem("gge_admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 relative font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-xl backdrop-blur-xl relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center mb-4 shadow-sm shadow-[#D4AF37]/10">
            <Shield className="text-[#D4AF37] w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-wide">GGE CRM Portal</h1>
          <p className="text-sm text-[#6B7280] mt-1">Golden Globe Enterprises Admin Login</p>
        </div>

        {/* Expiry / Error Messages */}
        {error && (
          <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm leading-relaxed">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5 opacity-80" />
              <input
                id="email"
                type="email"
                required
                placeholder="admin@ggenterprises.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block" htmlFor="password">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] w-5 h-5 opacity-80" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-[#D4AF37] text-white font-bold text-sm hover:bg-[#D4AF37]/90 focus:outline-none active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#D4AF37]/20"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Access Admin Panel</span>
            )}
          </button>
        </form>

        {/* Security Disclaimer */}
        <p className="text-[10px] text-gray-400 text-center mt-8 tracking-wide uppercase">
          Authorized personnel only. Activities are monitored and logged.
        </p>

      </div>
    </div>
  );
}
