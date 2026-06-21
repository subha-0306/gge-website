import { useState, useEffect } from "react";
import { 
  getStats, 
  getMonthlyLeads, 
  getServiceLeads 
} from "../services/api";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  BarChart3,
  Calendar,
  Layers,
  PieChart as PieIcon,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  CheckCircle,
  Clock
} from "lucide-react";

export default function AdminAnalytics() {
  // ── Date Filters States ──
  const [rangeType, setRangeType] = useState("30days"); // "7days", "30days", "90days", "custom"
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ── Data States ──
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Initialize dates based on rangeType
  const initializeDates = (range) => {
    const end = new Date();
    let start = new Date();

    if (range === "7days") {
      start.setDate(end.getDate() - 7);
    } else if (range === "30days") {
      start.setDate(end.getDate() - 30);
    } else if (range === "90days") {
      start.setDate(end.getDate() - 90);
    } else {
      return; // custom doesn't auto-set
    }

    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  // Run on initial load
  useEffect(() => {
    initializeDates("30days");
  }, []);

  const fetchAnalyticsData = async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      setError("");

      const params = { startDate, endDate };
      const [resStats, resMonthly, resService] = await Promise.all([
        getStats(params),
        getMonthlyLeads(params),
        getServiceLeads(params)
      ]);

      if (resStats.success && resMonthly.success && resService.success) {
        setStats(resStats.data);

        // Map trend data
        const formattedMonthly = resMonthly.data.map(item => ({
          name: item.label,
          Leads: item.count
        }));
        setMonthlyData(formattedMonthly);

        // Map service distribution
        const formattedService = resService.data.map(item => ({
          name: item.serviceType || item.service || "Unknown",
          Leads: item.count
        }));
        setServiceData(formattedService);
      }
    } catch (err) {
      console.error("Error fetching analytics data:", err);
      setError("Failed to load analytics. Please ensure your backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when date values change
  useEffect(() => {
    fetchAnalyticsData();
  }, [startDate, endDate]);

  const handleRangeChange = (e) => {
    const val = e.target.value;
    setRangeType(val);
    if (val !== "custom") {
      initializeDates(val);
    }
  };

  // Status Distribution Chart formatting
  const getStatusChartData = () => {
    if (!stats) return [];
    return [
      { name: "New", value: stats.new || 0, color: "#3b82f6" },
      { name: "Contacted", value: stats.contacted || 0, color: "#6366f1" },
      { name: "Doc Pending", value: stats.documents_pending || 0, color: "#f59e0b" },
      { name: "Processing", value: stats.processing || 0, color: "#f97316" },
      { name: "Approved", value: stats.approved || 0, color: "#10b981" },
      { name: "Rejected", value: stats.rejected || 0, color: "#ef4444" },
      { name: "Closed", value: stats.closed || 0, color: "#6b7280" }
    ].filter(item => item.value > 0);
  };

  const statusData = getStatusChartData();

  // Completed vs Pending Follow-Ups Chart formatting
  const getFollowUpChartData = () => {
    if (!stats || !stats.followUps) return [];
    return [
      { name: "Completed", value: stats.followUps.completed || 0, color: "#10b981" },
      { name: "Pending", value: stats.followUps.pending || 0, color: "#f59e0b" }
    ].filter(item => item.value > 0);
  };

  const followUpData = getFollowUpChartData();

  // Tooltip component matching light theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-[#E5E7EB] p-3 rounded-lg shadow-lg text-xs text-gray-800 font-sans">
          {label && <p className="text-gray-400 font-bold mb-1 uppercase tracking-wider">{label}</p>}
          {payload.map((item, idx) => (
            <p key={idx} className="text-[#1A1A1A] font-bold flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              <span>{item.name}: {item.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Rate calculations
  const totalCompletedRejected = stats ? ((stats.approved || 0) + (stats.rejected || 0)) : 0;
  const approvalRate = totalCompletedRejected > 0
    ? Math.round(((stats.approved || 0) / totalCompletedRejected) * 100)
    : 0;

  const convRate = stats && stats.totalLeads > 0
    ? Math.round(((stats.approved || 0) / stats.totalLeads) * 100)
    : 0;

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-[#F8F9FA] min-h-screen text-gray-600 gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" />
        <span className="text-sm text-gray-500">Loading business intelligence reports...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      
      {/* ── TOP ACTION BAR WITH DATE FILTERS ── */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border border-[#E5E7EB] p-4 rounded-xl shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-[#D4AF37] tracking-wider uppercase">Analytics Center</h3>
          <p className="text-xs text-[#6B7280]">Business intelligence and follow-up metrics</p>
        </div>
        
        {/* Date Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="text-[#D4AF37] w-4 h-4" />
            <select
              value={rangeType}
              onChange={handleRangeChange}
              className="bg-white border border-[#E5E7EB] rounded-lg text-xs font-semibold px-3 py-2 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {rangeType === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border border-[#E5E7EB] rounded-lg text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37] text-gray-700"
              />
              <span className="text-xs text-gray-400">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border border-[#E5E7EB] rounded-lg text-xs px-2.5 py-1.5 focus:outline-none focus:border-[#D4AF37] text-gray-700"
              />
            </div>
          )}

          <button
            onClick={fetchAnalyticsData}
            className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-lg font-bold text-xs shadow-sm shadow-[#D4AF37]/15 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-red-100 rounded-2xl text-red-600 text-center px-4 gap-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h3 className="text-lg font-bold">Analytics Unavailable</h3>
          <p className="text-xs text-gray-500 max-w-sm">{error}</p>
          <button
            onClick={fetchAnalyticsData}
            className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
          >
            Retry Fetching
          </button>
        </div>
      )}

      {stats && (
        <>
          {/* ── RATIO CONVERSION CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Conversion Rate</span>
                <h4 className="text-3xl font-extrabold text-gray-900">{convRate}%</h4>
                <p className="text-[9px] text-[#6B7280]">Total approved leads ratio</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Approval Rate</span>
                <h4 className="text-3xl font-extrabold text-gray-900">{approvalRate}%</h4>
                <p className="text-[9px] text-[#6B7280]">Approved vs Rejected ratio</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckSquare className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Follow-Ups Completed</span>
                <h4 className="text-3xl font-extrabold text-gray-900">{stats?.followUps?.completed ?? 0}</h4>
                <p className="text-[9px] text-[#6B7280]">Resolved follow-up files</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Follow-Ups Pending</span>
                <h4 className="text-3xl font-extrabold text-gray-900">{stats?.followUps?.pending ?? 0}</h4>
                <p className="text-[9px] text-[#6B7280]">Unresolved scheduled events</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* ── ANALYTICS CHARTS GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Lead Volume Trend Chart */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between md:col-span-2">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3 justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Lead Volume Trends</span>
                </h4>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">
                  {rangeType === "7days" ? "Daily trend" : "Monthly trend"}
                </span>
              </div>

              <div className="h-72 w-full mt-2">
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6B7280" 
                        style={{ fontSize: "10px", fontWeight: 600 }} 
                      />
                      <YAxis 
                        stroke="#6B7280" 
                        style={{ fontSize: "10px", fontWeight: 600 }}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="Leads" 
                        stroke="#D4AF37" 
                        strokeWidth={2.5} 
                        fillOpacity={1} 
                        fill="url(#colorLeads)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400">
                    No lead trend records found in selected range.
                  </div>
                )}
              </div>
            </div>

            {/* Lead Status Distribution Pie Chart */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3 justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                  <PieIcon className="w-4 h-4" />
                  <span>Lead Stage Ratios</span>
                </h4>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Status Split</span>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-xs text-gray-400 text-center">No active lead status distribution.</div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 pt-3 border-t border-gray-100 mt-2">
                {statusData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed vs Pending Follow-Ups Pie Chart */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3 justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Follow-Up Ratios</span>
                </h4>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Pending vs Done</span>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                {followUpData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={followUpData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {followUpData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-xs text-gray-400 text-center">No scheduled follow-up data.</div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 pt-3 border-t border-gray-100 mt-2">
                {followUpData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Type Bar Chart */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col justify-between md:col-span-2">
              <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3 justify-between">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Product Distribution</span>
                </h4>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">Service distribution</span>
              </div>

              <div className="h-80 w-full mt-2">
                {serviceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceData} margin={{ top: 10, right: 10, left: -25, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6B7280" 
                        style={{ fontSize: "9px", fontWeight: 600 }}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis 
                        stroke="#6B7280" 
                        style={{ fontSize: "10px", fontWeight: 600 }}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="Leads" 
                        fill="#D4AF37" 
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-gray-400">
                    No service distributions logged.
                  </div>
                )}
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
