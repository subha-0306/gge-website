import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  getEnquiries, 
  getStats, 
  updateStatus, 
  updatePriority, 
  addNote, 
  deleteEnquiry, 
  exportCSV,
  updateFollowUp
} from "../services/api";
import { getSocket } from "../services/socket";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  AlertTriangle,
  ArrowUpDown,
  TrendingUp,
  AlertCircle,
  CheckSquare
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // ── States ──
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    todayLeads: 0,
    weekLeads: 0,
    monthLeads: 0,
    approved: 0,
    new: 0,
    followUps: {
      completed: 0,
      pending: 0,
      today: 0,
      overdue: 0,
      upcoming: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination, Filtering & Follow-ups
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [followUpFilter, setFollowUpFilter] = useState(""); // "today", "overdue", "upcoming" or ""
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });

  // Detail Modal / Drawer
  const [selectedLead, setSelectedLead] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [updatingLeadState, setUpdatingLeadState] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");

  // Delete Confirmation Modal
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch Data ──
  const fetchStats = async () => {
    try {
      setStatsLoading(true);
      const res = await getStats();
      if (res.success) {
        // Ensure default followUps metrics are preset to protect layout
        const fetchedStats = res.data;
        if (!fetchedStats.followUps) {
          fetchedStats.followUps = { completed: 0, pending: 0, today: 0, overdue: 0, upcoming: 0 };
        }
        setStats(fetchedStats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getEnquiries({
        page,
        limit: 15,
        search,
        status: statusFilter,
        followUpFilter,
        sort,
      });
      if (res.success) {
        setLeads(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [page, statusFilter, followUpFilter, sort]);

  // Handle Socket.io new enquiry triggers
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("new_enquiry", (data) => {
        const newLead = data.enquiry;
        if (!newLead) return;

        setLeads((prevLeads) => {
          if (prevLeads.some((l) => l._id === newLead._id)) return prevLeads;
          
          if ((!statusFilter || statusFilter === newLead.status) && !followUpFilter) {
            return [newLead, ...prevLeads.slice(0, 14)];
          }
          return prevLeads;
        });

        setStats((prevStats) => {
          const updated = {
            ...prevStats,
            totalLeads: (prevStats.totalLeads || 0) + 1,
            todayLeads: (prevStats.todayLeads || 0) + 1,
            weekLeads: (prevStats.weekLeads || 0) + 1,
            monthLeads: (prevStats.monthLeads || 0) + 1,
          };
          
          const statusKey = newLead.status.toLowerCase().replace(/ /g, "_");
          if (updated[statusKey] !== undefined) {
            updated[statusKey] = (updated[statusKey] || 0) + 1;
          } else if (newLead.status === "New" && updated.new !== undefined) {
            updated.new = (updated.new || 0) + 1;
          }
          return updated;
        });

        setPagination((prevPag) => ({
          ...prevPag,
          total: prevPag.total + 1,
        }));
      });
    }

    return () => {
      if (socket) {
        socket.off("new_enquiry");
      }
    };
  }, [statusFilter, followUpFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  // ── Quick Actions ──
  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingLeadState(true);
      const res = await updateStatus(id, newStatus);
      if (res.success) {
        setLeads(leads.map(lead => lead._id === id ? res.data : lead));
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead(res.data);
        }
        fetchStats();
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdatingLeadState(false);
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      setUpdatingLeadState(true);
      const res = await updatePriority(id, newPriority);
      if (res.success) {
        setLeads(leads.map(lead => lead._id === id ? res.data : lead));
        if (selectedLead && selectedLead._id === id) {
          setSelectedLead(res.data);
        }
      }
    } catch (err) {
      alert("Error updating priority: " + err.message);
    } finally {
      setUpdatingLeadState(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    try {
      setUpdatingLeadState(true);
      const res = await addNote(selectedLead._id, newNoteText);
      if (res.success) {
        setSelectedLead(res.data);
        setLeads(leads.map(lead => lead._id === selectedLead._id ? res.data : lead));
        setNewNoteText("");
      }
    } catch (err) {
      alert("Error adding note: " + err.message);
    } finally {
      setUpdatingLeadState(false);
    }
  };

  // ── Follow-Up Scheduling inside Drawer ──
  const handleFollowUpSave = async (e) => {
    e.preventDefault();
    try {
      setUpdatingLeadState(true);
      const res = await updateFollowUp(selectedLead._id, { date: followUpDate || null });
      if (res.success) {
        setSelectedLead(res.data);
        setLeads(leads.map(lead => lead._id === selectedLead._id ? res.data : lead));
        fetchStats();
      }
    } catch (err) {
      alert("Error saving follow-up date: " + err.message);
    } finally {
      setUpdatingLeadState(false);
    }
  };

  const handleToggleFollowUpComplete = async (leadObj) => {
    try {
      setUpdatingLeadState(true);
      const targetState = !leadObj.nextFollowUp?.completed;
      const res = await updateFollowUp(leadObj._id, { completed: targetState });
      if (res.success) {
        setLeads(leads.map(lead => lead._id === leadObj._id ? res.data : lead));
        if (selectedLead && selectedLead._id === leadObj._id) {
          setSelectedLead(res.data);
        }
        fetchStats();
      }
    } catch (err) {
      alert("Error updating follow-up: " + err.message);
    } finally {
      setUpdatingLeadState(false);
    }
  };

  const handleDeleteLeadClick = (lead) => {
    setLeadToDelete(lead);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    try {
      setDeleting(true);
      const res = await deleteEnquiry(leadToDelete._id);
      if (res.success) {
        setDeleteConfirmOpen(false);
        setLeadToDelete(null);
        if (selectedLead && selectedLead._id === leadToDelete._id) {
          setSelectedLead(null);
        }
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      alert("Error deleting lead: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Dual Export handlers
  const handleExportAll = async () => {
    try {
      await exportCSV({ exportAll: true });
    } catch (err) {
      alert("CSV export failed: " + err.message);
    }
  };

  const handleExportFiltered = async () => {
    try {
      await exportCSV({ status: statusFilter, search, followUpFilter });
    } catch (err) {
      alert("CSV export failed: " + err.message);
    }
  };

  // Follow-up Highlight Calculations
  const getFollowUpStatus = (followUp) => {
    if (!followUp || !followUp.date) return { text: "Not Scheduled", style: "text-gray-400 italic" };
    if (followUp.completed) return { text: "Completed", style: "text-gray-400 line-through text-xs font-semibold bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg inline-flex items-center gap-1" };

    const fDate = new Date(followUp.date);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const dateStr = fDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    if (fDate < todayStart) {
      return { text: dateStr, style: "bg-red-50 text-red-700 border border-red-100 font-semibold px-2.5 py-0.5 rounded-lg text-xs" };
    } else if (fDate >= todayStart && fDate <= todayEnd) {
      return { text: dateStr, style: "bg-amber-50 text-amber-700 border border-amber-100 font-semibold px-2.5 py-0.5 rounded-lg text-xs" };
    } else {
      return { text: dateStr, style: "bg-green-50 text-green-700 border border-green-100 font-semibold px-2.5 py-0.5 rounded-lg text-xs" };
    }
  };

  // Status Badge Color Map - Premium Corporate Pastel Shades
  const statusBadges = {
    "New": "bg-blue-50 text-blue-700 border border-blue-100",
    "Contacted": "bg-indigo-50 text-indigo-700 border border-indigo-100",
    "Documents Pending": "bg-amber-50 text-amber-700 border border-amber-100",
    "Processing": "bg-orange-50 text-orange-700 border border-orange-100",
    "Approved": "bg-green-50 text-green-700 border border-green-100",
    "Rejected": "bg-red-50 text-red-700 border border-red-100",
    "Closed": "bg-gray-50 text-gray-700 border border-gray-100",
  };

  const priorityBadges = {
    "High": "bg-red-50 text-red-700 border border-red-100",
    "Medium": "bg-amber-50 text-amber-700 border border-amber-100",
    "Low": "bg-green-50 text-green-700 border border-green-100",
  };

  const conversionRate = stats.totalLeads > 0 
    ? Math.round((stats.approved / stats.totalLeads) * 100) 
    : 0;

  // Sync date setter state when selectedLead shifts
  useEffect(() => {
    if (selectedLead && selectedLead.nextFollowUp?.date) {
      // Format to datetime-local string format
      const dt = new Date(selectedLead.nextFollowUp.date);
      const tzOffset = dt.getTimezoneOffset() * 60000; // in ms
      const localISOTime = (new Date(dt.getTime() - tzOffset)).toISOString().slice(0, 16);
      setFollowUpDate(localISOTime);
    } else {
      setFollowUpDate("");
    }
  }, [selectedLead]);

  return (
    <div className="space-y-6 text-[#1A1A1A]">
      
      {/* ── TOP ACTION BAR ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E5E7EB] p-4 rounded-xl shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-[#D4AF37] tracking-wider uppercase">Lead Operations</h3>
          <p className="text-xs text-[#6B7280]">Search, filter and export lead lists</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAll}
            className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white rounded-lg text-gray-700 font-semibold text-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export All Leads</span>
          </button>
          <button
            onClick={handleExportFiltered}
            className="inline-flex items-center gap-2 px-3 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-lg font-bold text-xs shadow-sm shadow-[#D4AF37]/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Filtered Leads</span>
          </button>
        </div>
      </div>

      {/* ── STATS METRICS GRID ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Leads */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Total Leads</span>
            <Users className="text-[#D4AF37] w-4 h-4" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {statsLoading ? "..." : stats.totalLeads}
            </h4>
            <span className="text-[10px] text-[#6B7280]">Cumulative submissions</span>
          </div>
        </div>

        {/* Today's Leads */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Today's Leads</span>
            <Calendar className="text-blue-500 w-4 h-4" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {statsLoading ? "..." : stats.todayLeads}
            </h4>
            <span className="text-[10px] text-blue-500 font-semibold">Submitted today</span>
          </div>
        </div>

        {/* This Week's Leads */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Weekly Leads</span>
            <Clock className="text-indigo-500 w-4 h-4" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {statsLoading ? "..." : stats.weekLeads}
            </h4>
            <span className="text-[10px] text-indigo-500 font-semibold">Last 7 days</span>
          </div>
        </div>

        {/* This Month's Leads */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Monthly Leads</span>
            <Clock className="text-purple-500 w-4 h-4" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {statsLoading ? "..." : stats.monthLeads}
            </h4>
            <span className="text-[10px] text-purple-500 font-semibold">Current month</span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col justify-between shadow-sm col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Conversion</span>
            <TrendingUp className="text-green-600 w-4 h-4" />
          </div>
          <div>
            <h4 className="text-2xl font-extrabold text-[#1A1A1A] tracking-tight">
              {statsLoading ? "..." : `${conversionRate}%`}
            </h4>
            <span className="text-[10px] text-green-600 font-semibold">Approved / Total</span>
          </div>
        </div>
      </div>

      {/* ── FOLLOW-UP MANAGEMENT INTERACTIVE WIDGETS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Today's Follow ups */}
        <button
          onClick={() => setFollowUpFilter(followUpFilter === "today" ? "" : "today")}
          className={`flex items-center justify-between p-4 border rounded-xl shadow-sm text-left transition-all ${
            followUpFilter === "today"
              ? "bg-amber-100/60 border-amber-300 ring-2 ring-amber-200"
              : "bg-white border-[#E5E7EB] hover:bg-amber-50/20 hover:border-amber-200"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Today's Follow-Ups</span>
            <h4 className="text-xl font-extrabold text-amber-900">{statsLoading ? "..." : stats.followUps.today}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <CheckSquare className="w-5 h-5" />
          </div>
        </button>

        {/* Overdue Follow ups */}
        <button
          onClick={() => setFollowUpFilter(followUpFilter === "overdue" ? "" : "overdue")}
          className={`flex items-center justify-between p-4 border rounded-xl shadow-sm text-left transition-all ${
            followUpFilter === "overdue"
              ? "bg-red-100/60 border-red-300 ring-2 ring-red-200"
              : "bg-white border-[#E5E7EB] hover:bg-red-50/20 hover:border-red-200"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider">Overdue Follow-Ups</span>
            <h4 className="text-xl font-extrabold text-red-900">{statsLoading ? "..." : stats.followUps.overdue}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertCircle className="w-5 h-5" />
          </div>
        </button>

        {/* Upcoming Follow ups */}
        <button
          onClick={() => setFollowUpFilter(followUpFilter === "upcoming" ? "" : "upcoming")}
          className={`flex items-center justify-between p-4 border rounded-xl shadow-sm text-left transition-all ${
            followUpFilter === "upcoming"
              ? "bg-green-100/60 border-green-300 ring-2 ring-green-200"
              : "bg-white border-[#E5E7EB] hover:bg-green-50/20 hover:border-green-200"
          }`}
        >
          <div className="space-y-1">
            <span className="text-xs font-bold text-green-800 uppercase tracking-wider">Upcoming Follow-Ups</span>
            <h4 className="text-xl font-extrabold text-green-900">{statsLoading ? "..." : stats.followUps.upcoming}</h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Calendar className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* ── LEADS TABLE CONTAINER ── */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        
        {/* Table Search & Filters bar */}
        <div className="p-4 border-b border-[#E5E7EB] flex flex-col lg:flex-row items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name or phone number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-24 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] placeholder-gray-400 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold text-xs rounded-md transition-colors"
              >
                Search
              </button>
            </form>
            
            {followUpFilter && (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-lg px-3 py-1.5 flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-[#D4AF37] capitalize">
                  {followUpFilter} Tasks Active
                </span>
                <button
                  onClick={() => setFollowUpFilter("")}
                  className="font-bold text-gray-400 hover:text-gray-700 hover:scale-110 ml-1"
                  title="Clear follow-up filter"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <Filter className="text-[#D4AF37] w-4 h-4 flex-shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Documents Pending">Documents Pending</option>
                <option value="Processing">Processing</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <ArrowUpDown className="text-[#D4AF37] w-4 h-4 flex-shrink-0" />
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] px-3 py-2 text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="fullName">Name (A-Z)</option>
                <option value="-fullName">Name (Z-A)</option>
                <option value="-loanAmount">Loan Amount (High)</option>
                <option value="loanAmount">Loan Amount (Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lead Table View */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" />
              <span className="text-sm text-gray-500">Loading leads database...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500 px-4 text-center">
              <AlertCircle className="w-10 h-10" />
              <span className="text-sm">{error}</span>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
              <Users className="w-8 h-8 opacity-40" />
              <span className="text-sm font-semibold">No enquiries matched your search filters</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 border-b border-[#E5E7EB] text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Follow-Up</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {leads.map((lead) => {
                  const followUp = getFollowUpStatus(lead.nextFollowUp);
                  return (
                    <tr 
                      key={lead._id}
                      className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors">{lead.fullName}</div>
                          <div className="text-xs text-[#6B7280]">{lead.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-600">
                        {lead.serviceType}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-600">
                        {lead.phoneNumber}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {lead.nextFollowUp && lead.nextFollowUp.date && !lead.nextFollowUp.completed && (
                            <button
                              onClick={() => handleToggleFollowUpComplete(lead)}
                              title="Mark Follow-up as Completed"
                              className="text-gray-300 hover:text-green-600 hover:scale-110 p-0.5 rounded transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <span className={followUp.style}>
                            {followUp.text}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadges[lead.status] || "bg-gray-100 text-gray-600"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${priorityBadges[lead.priority] || "bg-gray-100 text-gray-600"}`}>
                          {lead.priority || "Medium"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`tel:${lead.phoneNumber}`}
                            title="Call Customer"
                            className="p-1.5 bg-gray-50 border border-gray-200 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 rounded text-gray-600 hover:text-[#D4AF37] transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`mailto:${lead.email}`}
                            title="Email Customer"
                            className="p-1.5 bg-gray-50 border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 rounded text-gray-600 hover:text-indigo-600 transition-all"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                          <Link
                            to={`/admin/leads/${lead._id}`}
                            title="View Details Page"
                            className="p-1.5 bg-gray-50 border border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded text-gray-600 hover:text-blue-600 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDeleteLeadClick(lead)}
                            title="Delete Lead"
                            className="p-1.5 bg-gray-50 border border-gray-200 hover:border-red-500 hover:bg-red-50 rounded text-gray-600 hover:text-red-600 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Pagination footer */}
        {!loading && leads.length > 0 && (
          <div className="p-4 border-t border-[#E5E7EB] flex items-center justify-between bg-gray-50/50">
            <span className="text-xs text-gray-500">
              Showing page <strong>{page}</strong> of <strong>{pagination.pages}</strong> ({pagination.total} leads total)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="p-2 border border-gray-200 hover:border-[#D4AF37] disabled:opacity-40 disabled:hover:border-gray-200 text-[#D4AF37] rounded-lg transition-colors bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage(page + 1)}
                className="p-2 border border-gray-200 hover:border-[#D4AF37] disabled:opacity-40 disabled:hover:border-gray-200 text-[#D4AF37] rounded-lg transition-colors bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── LEAD DETAILS SIDE DRAWER / MODAL ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
          {/* Overlay Click Closer */}
          <div className="absolute inset-0" onClick={() => setSelectedLead(null)} />

          <div className="relative w-full max-w-xl bg-white border-l border-[#E5E7EB] h-full flex flex-col shadow-2xl z-10 animate-slide-in overflow-hidden text-[#1A1A1A]">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Lead Details Summary</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{selectedLead.fullName}</h3>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/leads/${selectedLead._id}`}
                  className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-lg font-bold text-xs shadow-sm shadow-[#D4AF37]/25 transition-all"
                >
                  Full Lead view
                </Link>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Drawer Body Scroll Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Information Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 border border-[#E5E7EB] p-4 rounded-xl text-xs">
                <div>
                  <span className="text-gray-400 block uppercase font-bold text-[9px]">Phone Number</span>
                  <a href={`tel:${selectedLead.phoneNumber}`} className="text-gray-900 hover:text-[#D4AF37] font-bold mt-0.5 inline-block">
                    {selectedLead.phoneNumber}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-bold text-[9px]">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-gray-900 hover:text-[#D4AF37] font-bold mt-0.5 inline-block truncate w-full">
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-bold text-[9px]">Service Interest</span>
                  <span className="text-[#D4AF37] font-bold mt-0.5 block">{selectedLead.serviceType}</span>
                </div>
                <div>
                  <span className="text-gray-400 block uppercase font-bold text-[9px]">Source</span>
                  <span className="text-gray-800 font-semibold mt-0.5 block">{selectedLead.source}</span>
                </div>
                {selectedLead.companyName && (
                  <div>
                    <span className="text-gray-400 block uppercase font-bold text-[9px]">Company</span>
                    <span className="text-gray-800 font-semibold mt-0.5 block">{selectedLead.companyName}</span>
                  </div>
                )}
                {selectedLead.city && (
                  <div>
                    <span className="text-gray-400 block uppercase font-bold text-[9px]">City / Location</span>
                    <span className="text-gray-800 font-semibold mt-0.5 block">{selectedLead.city}</span>
                  </div>
                )}
                {selectedLead.loanAmount && (
                  <div>
                    <span className="text-gray-400 block uppercase font-bold text-[9px]">Required Funding</span>
                    <span className="text-[#D4AF37] font-bold mt-0.5 block">
                      ₹{selectedLead.loanAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
                {selectedLead.monthlyIncome && (
                  <div>
                    <span className="text-gray-400 block uppercase font-bold text-[9px]">Monthly Income</span>
                    <span className="text-gray-800 font-bold mt-0.5 block">
                      ₹{selectedLead.monthlyIncome.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}
              </div>

              {/* Message Details */}
              {selectedLead.message && (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Requirement Details</span>
                  <div className="bg-white border border-[#E5E7EB] p-3 rounded-lg text-sm text-gray-700 whitespace-pre-wrap leading-relaxed shadow-sm">
                    {selectedLead.message}
                  </div>
                </div>
              )}

              {/* Workflow Administration */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lead Status</label>
                  <select
                    disabled={updatingLeadState}
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead._id, e.target.value)}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Documents Pending">Documents Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Priority Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lead Priority</label>
                  <select
                    disabled={updatingLeadState}
                    value={selectedLead.priority || "Medium"}
                    onChange={(e) => handlePriorityChange(selectedLead._id, e.target.value)}
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Follow-Up Date Setter */}
              <div className="bg-gray-50 border border-[#E5E7EB] p-4 rounded-xl space-y-3">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Follow-Up Date & Status</span>
                <form onSubmit={handleFollowUpSave} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-1">
                    <label className="text-[9px] text-[#6B7280] block font-semibold">Scheduled Date & Time</label>
                    <input
                      type="datetime-local"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#D4AF37] text-gray-800"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={updatingLeadState}
                    className="px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] font-semibold text-xs rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </form>
                {selectedLead.nextFollowUp?.date && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-gray-500">
                      Follow-up Status: <strong>{selectedLead.nextFollowUp.completed ? "Completed" : "Pending"}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleFollowUpComplete(selectedLead)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        selectedLead.nextFollowUp.completed
                          ? "bg-gray-100 text-gray-600 border border-gray-200"
                          : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                      }`}
                    >
                      {selectedLead.nextFollowUp.completed ? "Reopen task" : "Mark completed"}
                    </button>
                  </div>
                )}
              </div>

              {/* Activity Logs & Notes */}
              <div className="space-y-3">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Activity Logs & Notes</span>
                
                {/* Notes History */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    [...selectedLead.notes].reverse().map((note, idx) => (
                      <div key={note._id || idx} className="p-3 bg-white border border-[#E5E7EB] rounded-lg text-xs leading-relaxed shadow-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-gray-700">{note.createdBy}</span>
                          <span className="text-[9px] text-gray-400 font-mono">
                            {new Date(note.createdAt).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-gray-600 whitespace-pre-wrap">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 bg-gray-50 border border-dashed border-[#E5E7EB] rounded-lg text-xs text-gray-400">
                      No notes recorded. Initial lead created on {new Date(selectedLead.createdAt).toLocaleDateString("en-IN")}.
                    </div>
                  )}
                </div>

                {/* Add new note Form */}
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    disabled={updatingLeadState}
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Enter details about call status, doc collections etc..."
                    className="w-full bg-white border border-[#E5E7EB] rounded-lg text-[#1A1A1A] p-3 text-xs placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={updatingLeadState || !newNoteText.trim()}
                    className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-40 disabled:hover:bg-[#D4AF37] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </form>
              </div>

            </div>

            {/* Drawer Footer actions */}
            <div className="p-6 border-t border-[#E5E7EB] bg-gray-50 flex items-center justify-between gap-4">
              <button
                onClick={() => handleDeleteLeadClick(selectedLead)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Lead</span>
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-white border border-gray-300 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] font-semibold text-xs rounded-lg transition-colors"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xl relative">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Delete Lead Enquiry?</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Are you sure you want to permanently delete lead <strong className="text-gray-900">{leadToDelete?.fullName}</strong>? 
                  This action is irreversible and will purge all notes, follow-up notifications, and logs.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full mt-4">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteLead}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-200"
                >
                  {deleting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-b-transparent rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
