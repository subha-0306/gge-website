import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BarChart3, 
  LogOut, 
  Menu, 
  X, 
  Shield, 
  FileText, 
  Bell, 
  CheckCheck
} from "lucide-react";
import { initSocket, disconnectSocket } from "../services/socket";
import { getNotifications, markAsRead, markAllAsRead } from "../services/api";
import ToastNotification from "../components/ToastNotification";

export default function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState("GGE Admin");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ── Fetch Notifications ──
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      if (res.success) {
        setNotifications(res.data);
        // Count unread
        const unread = res.data.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    const adminObjStr = localStorage.getItem("gge_admin");
    if (adminObjStr) {
      try {
        const adminObj = JSON.parse(adminObjStr);
        if (adminObj && adminObj.name) {
          setAdminName(adminObj.name);
        }
      } catch (err) {
        console.error("Error parsing admin data:", err);
      }
    }

    fetchNotifications();

    // ── Setup Socket.IO connection ──
    const socket = initSocket();
    if (socket) {
      // Listen for real-time lead notification
      socket.on("new_notification", (newNotification) => {
        // Prepend new notification to state
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
        setUnreadCount(count => count + 1);
        // Trigger toast alert
        setActiveToast(newNotification);
      });
    }

    // Closer for click-outside dropdown
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      disconnectSocket();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("gge_token");
    localStorage.removeItem("gge_admin");
    disconnectSocket();
    navigate("/admin/login");
  };

  const handleNotificationClick = async (notif) => {
    setNotificationDropdownOpen(false);
    
    // Mark as read in DB if it's unread
    if (!notif.isRead) {
      try {
        const res = await markAsRead(notif._id);
        if (res.success) {
          setNotifications(notifications.map(n => n._id === notif._id ? { ...n, isRead: true } : n));
          setUnreadCount(count => Math.max(0, count - 1));
        }
      } catch (err) {
        console.error("Error marking notification read:", err);
      }
    }

    // Direct to lead details page
    const leadId = notif.enquiryId?._id || notif.enquiryId;
    if (leadId) {
      navigate(`/admin/leads/${leadId}`);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const res = await markAllAsRead();
      if (res.success) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error("Error marking all read:", err);
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans overflow-hidden">
      
      {/* ── Floating Real-time Toast Portal ── */}
      {activeToast && (
        <ToastNotification
          toast={activeToast}
          onClose={() => setActiveToast(null)}
          onView={(leadId) => navigate(`/admin/leads/${leadId}`)}
        />
      )}

      {/* ── Sidebar for desktop ── */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E5E7EB] flex-shrink-0">
        {/* Brand Header */}
        <div className="h-20 flex items-center px-6 border-b border-[#E5E7EB] gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center">
            <Shield className="text-[#D4AF37] w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-md tracking-wider text-[#1A1A1A]">GGE CRM</h1>
            <p className="text-[10px] text-[#D4AF37] font-medium uppercase tracking-widest">Portal Admin</p>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/25"
                    : "text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Admin Account */}
        <div className="p-4 border-t border-[#E5E7EB] bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-semibold text-sm">
              {adminName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#1A1A1A] truncate">{adminName}</p>
              <p className="text-[9px] text-[#6B7280] truncate">System Manager</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-all duration-150"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-[#E5E7EB] bg-white shadow-sm z-10">
          {/* Left: Mobile Menu Toggle / Page Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-[#1A1A1A] tracking-wide">
              {location.pathname === "/admin/dashboard" && "Lead Management Dashboard"}
              {location.pathname === "/admin/analytics" && "Business Analytics"}
              {location.pathname.startsWith("/admin/leads/") && "Lead Detailed View"}
            </h2>
          </div>

          {/* Right: Quick actions / View site */}
          <div className="flex items-center gap-4">
            
            {/* Visit site link */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white text-xs font-semibold transition-all duration-150"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Visit Main Site</span>
            </Link>

            {/* ── NOTIFICATIONS DROPDOWN CENTER ── */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                aria-label="Notification Center"
              >
                <Bell className="w-5.5 h-5.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 min-w-5 h-5 flex items-center justify-center bg-[#D4AF37] text-white text-[9px] font-black rounded-full px-1 border border-white shadow-md animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown Box Overlay */}
              {notificationDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl overflow-hidden z-50 text-[#1A1A1A] font-sans animate-slide-in">
                  <div className="px-4 py-3 border-b border-[#E5E7EB] flex items-center justify-between bg-gray-50">
                    <span className="text-xs font-bold text-[#D4AF37] tracking-wide uppercase">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="inline-flex items-center gap-1 text-[9px] font-bold text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        <CheckCheck className="w-3 h-3 text-[#D4AF37]" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-4 text-left cursor-pointer transition-colors ${
                            notif.isRead 
                              ? "bg-transparent hover:bg-gray-50" 
                              : "bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 border-l-4 border-l-[#D4AF37]"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className={`text-xs font-bold ${notif.isRead ? "text-gray-600" : "text-[#1A1A1A]"}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[8px] text-gray-400 font-mono">
                              {new Date(notif.createdAt).toLocaleDateString("en-IN", {
                                month: "short",
                                day: "2-digit"
                              })}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-gray-400">
                        No alerts or notifications recorded.
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 bg-gray-50 border-t border-[#E5E7EB] text-center">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setNotificationDropdownOpen(false)}
                      className="text-[10px] font-bold text-[#D4AF37] hover:text-[#D4AF37]/80 uppercase tracking-wider block"
                    >
                      Go to Dashboard Console
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs text-gray-500 font-medium">Logged in as:</span>
              <span className="text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-2.5 py-1 rounded-md">
                {adminName}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Pages Render Outlet */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F8F9FA]">
          <Outlet />
        </main>
      </div>

      {/* ── Mobile Sidebar Slide-over drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/50 backdrop-blur-sm">
          {/* Overlay click closer */}
          <div className="absolute inset-0" onClick={() => setMobileMenuOpen(false)} />

          <aside className="relative flex flex-col w-64 bg-white border-r border-[#E5E7EB] h-full max-w-xs animate-slide-in">
            {/* Close Button */}
            <div className="absolute top-5 right-5">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Brand */}
            <div className="h-20 flex items-center px-6 border-b border-[#E5E7EB] gap-3">
              <Shield className="text-[#D4AF37] w-5 h-5" />
              <div>
                <h1 className="font-bold text-md tracking-wider text-[#1A1A1A]">GGE CRM</h1>
                <p className="text-[10px] text-[#D4AF37] font-medium uppercase tracking-widest">Portal Admin</p>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/25"
                        : "text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <FileText className="w-5 h-5" />
                <span>Visit Main Site</span>
              </Link>
            </nav>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-[#E5E7EB] bg-gray-50/50">
              <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-semibold text-sm">
                  {adminName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-[#1A1A1A] truncate">{adminName}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium transition-all duration-150"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
