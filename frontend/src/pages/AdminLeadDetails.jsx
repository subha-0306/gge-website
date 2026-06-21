import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  getEnquiry, 
  updateStatus, 
  updatePriority, 
  addNote, 
  editNote,
  deleteNote,
  deleteEnquiry,
  updateFollowUp
} from "../services/api";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Layers,
  Settings,
  PlusCircle,
  Trash2,
  AlertTriangle,
  History,
  Building,
  MapPin,
  IndianRupee,
  Clock,
  CheckCircle,
  Copy,
  Check,
  Edit2,
  X
} from "lucide-react";

export default function AdminLeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ── States ──
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [updating, setUpdating] = useState(false);
  
  // Notes Edit States
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");

  // Follow-Up States
  const [followUpDate, setFollowUpDate] = useState("");

  // Copy states
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Delete modal
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchLeadDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getEnquiry(id);
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      console.error("Error fetching lead:", err);
      setError(err.message || "Failed to load lead details. It might have been deleted.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  // Sync follow-up input
  useEffect(() => {
    if (lead && lead.nextFollowUp?.date) {
      const dt = new Date(lead.nextFollowUp.date);
      const tzOffset = dt.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(dt.getTime() - tzOffset)).toISOString().slice(0, 16);
      setFollowUpDate(localISOTime);
    } else {
      setFollowUpDate("");
    }
  }, [lead]);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      const res = await updateStatus(id, newStatus);
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityUpdate = async (newPriority) => {
    try {
      setUpdating(true);
      const res = await updatePriority(id, newPriority);
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      alert("Error updating priority: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    try {
      setUpdating(true);
      const res = await addNote(id, newNoteText);
      if (res.success) {
        setLead(res.data);
        setNewNoteText("");
      }
    } catch (err) {
      alert("Error saving note: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleEditNoteSave = async (noteId) => {
    if (!editNoteText.trim()) return;
    try {
      setUpdating(true);
      const res = await editNote(id, noteId, editNoteText);
      if (res.success) {
        setLead(res.data);
        setEditingNoteId(null);
        setEditNoteText("");
      }
    } catch (err) {
      alert("Error updating note: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteNoteClick = async (noteId) => {
    if (!window.confirm("Are you sure you want to permanently delete this staff note?")) return;
    try {
      setUpdating(true);
      const res = await deleteNote(id, noteId);
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      alert("Error deleting note: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleFollowUpSave = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await updateFollowUp(id, { date: followUpDate || null });
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      alert("Error saving follow-up date: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleFollowUpComplete = async () => {
    try {
      setUpdating(true);
      const targetState = !lead.nextFollowUp?.completed;
      const res = await updateFollowUp(id, { completed: targetState });
      if (res.success) {
        setLead(res.data);
      }
    } catch (err) {
      alert("Error updating follow-up status: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      const res = await deleteEnquiry(id);
      if (res.success) {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Error deleting lead: " + err.message);
      setDeleting(false);
    }
  };

  const handleCopy = (text, isPhone) => {
    navigator.clipboard.writeText(text);
    if (isPhone) {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  // Status Badge Styling Maps
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

  const getMilestoneSteps = (currentStatus) => {
    const baseSteps = ["New", "Contacted", "Documents Pending", "Processing"];
    if (currentStatus === "Rejected") {
      return [...baseSteps, "Rejected"];
    } else if (currentStatus === "Closed") {
      return [...baseSteps, "Closed"];
    } else {
      return [...baseSteps, "Approved"];
    }
  };

  const getTimelineItems = () => {
    if (!lead) return [];
    
    const items = [];
    
    // 1. Initial creation item
    items.push({
      type: "created",
      title: "Lead Created",
      description: `Lead originally submitted via ${lead.source || "Website"}`,
      time: new Date(lead.createdAt),
      iconColor: "text-blue-500 bg-blue-50 border-blue-100",
    });

    // 2. Status History (Permanent Timeline)
    if (lead.statusHistory) {
      lead.statusHistory.forEach((sh) => {
        items.push({
          type: "status",
          title: `Status Changed: ${sh.status}`,
          description: `Updated by ${sh.updatedBy || "Staff Member"}`,
          time: new Date(sh.changedAt),
          iconColor: "text-indigo-500 bg-indigo-50 border-indigo-100",
        });
      });
    }

    // 3. Chronological manual notes
    if (lead.notes) {
      lead.notes.forEach((note) => {
        if (note.createdBy !== "System") {
          items.push({
            type: "note",
            title: `Note by ${note.createdBy}`,
            description: note.text,
            time: new Date(note.createdAt),
            iconColor: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
          });
        }
      });
    }

    // Sort timeline items reverse chronological
    return items.sort((a, b) => b.time - a.time);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 min-h-screen text-gray-600 bg-[#F8F9FA]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]" />
        <span className="text-sm text-gray-500">Loading lead history...</span>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 min-h-screen bg-[#F8F9FA] text-[#1A1A1A] text-center px-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-bold">Error Displaying Details</h3>
        <p className="text-xs text-gray-500 max-w-sm">{error || "Requested lead record does not exist."}</p>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold text-xs rounded-xl transition-colors mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    );
  }

  const timelineItems = getTimelineItems();
  const pipelineSteps = getMilestoneSteps(lead.status);
  const currentStepIndex = pipelineSteps.indexOf(lead.status);

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-[#1A1A1A]">
      
      {/* ── BACK BUTTON HEADER ── */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
          <span>Back to Lead Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Lead ID:</span>
          <code className="text-xs text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/10 px-2 py-0.5 rounded">{lead._id}</code>
        </div>
      </div>

      {/* ── STATUS MILESTONE PROGRESSION PIPELINE ── */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">Workflow Progress</h4>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {pipelineSteps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            return (
              <div key={idx} className="flex-1 w-full flex items-center gap-2 relative">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold transition-all ${
                    isCompleted 
                      ? "bg-green-500 border-green-500 text-white" 
                      : (isActive ? "bg-[#D4AF37] border-[#D4AF37] text-white ring-4 ring-[#D4AF37]/10" : "bg-white border-gray-200 text-gray-400")
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    isActive ? "text-[#D4AF37]" : (isCompleted ? "text-green-600" : "text-gray-400")
                  }`}>
                    {step}
                  </span>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <div className={`hidden md:block flex-1 h-[2px] mx-4 transition-colors ${
                    idx < currentStepIndex ? "bg-green-200" : "bg-gray-100"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── LEAD MAIN CARD GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* LEFT & CENTER: Details card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm relative overflow-hidden">
            
            {/* Name + Title Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-xl font-extrabold">
                  {lead.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] tracking-wide">{lead.fullName}</h3>
                  <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Registered on {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusBadges[lead.status]}`}>
                  {lead.status}
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-widest ${priorityBadges[lead.priority]}`}>
                  {lead.priority || "Medium"}
                </span>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-500 font-semibold mr-2">Quick Actions:</span>
              <a
                href={`tel:${lead.phoneNumber}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-[#D4AF37]/10"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shadow-indigo-50"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Contact Information</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-gray-400 block uppercase text-[9px] font-bold">Phone</span>
                      <div className="flex items-center gap-2">
                        <a href={`tel:${lead.phoneNumber}`} className="hover:text-[#D4AF37] transition-colors font-semibold">
                          {lead.phoneNumber}
                        </a>
                        <button
                          onClick={() => handleCopy(lead.phoneNumber, true)}
                          className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-all"
                          title="Copy phone number"
                        >
                          {copiedPhone ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <span className="text-gray-400 block uppercase text-[9px] font-bold">Email</span>
                      <div className="flex items-center gap-2">
                        <a href={`mailto:${lead.email}`} className="hover:text-[#D4AF37] transition-colors font-semibold truncate block max-w-[180px]">
                          {lead.email}
                        </a>
                        <button
                          onClick={() => handleCopy(lead.email, false)}
                          className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-all"
                          title="Copy email address"
                        >
                          {copiedEmail ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {lead.city && (
                    <div className="flex items-center gap-3 text-xs text-gray-700">
                      <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] font-bold">Location / City</span>
                        <span className="font-semibold text-gray-800">{lead.city}</span>
                      </div>
                    </div>
                  )}

                  {lead.companyName && (
                    <div className="flex items-center gap-3 text-xs text-gray-700">
                      <Building className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] font-bold">Company Name</span>
                        <span className="font-semibold text-gray-800">{lead.companyName}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Loan & Service Details</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <Layers className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 block uppercase text-[9px] font-bold">Service Requested</span>
                      <span className="font-bold text-gray-800">{lead.serviceType}</span>
                    </div>
                  </div>

                  {lead.loanAmount && (
                    <div className="flex items-center gap-3 text-xs text-gray-700">
                      <IndianRupee className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] font-bold">Required Loan Amount</span>
                        <span className="font-extrabold text-gray-800">₹{lead.loanAmount.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  {lead.monthlyIncome && (
                    <div className="flex items-center gap-3 text-xs text-gray-700">
                      <IndianRupee className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <div>
                        <span className="text-gray-400 block uppercase text-[9px] font-bold">Monthly Net Income</span>
                        <span className="font-bold text-gray-800">₹{lead.monthlyIncome.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <div>
                      <span className="text-gray-400 block uppercase text-[9px] font-bold">Lead Source</span>
                      <span className="font-semibold text-gray-800">{lead.source || "Website"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Description Section */}
            {lead.message && (
              <div className="mt-8 space-y-2">
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Customer Requirement Message</h4>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed shadow-sm">
                  {lead.message}
                </div>
              </div>
            )}

          </div>

          {/* Internal Notes System Panel */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-6">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest border-b border-gray-100 pb-3">
              Staff Notes Logs ({lead.notes?.filter(n => n.createdBy !== "System").length || 0})
            </h4>

            {/* Display list of staff notes chronologically */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {lead.notes && lead.notes.filter(n => n.createdBy !== "System").length > 0 ? (
                lead.notes.filter(n => n.createdBy !== "System").map((note) => (
                  <div key={note._id} className="p-4 bg-gray-50 border border-[#E5E7EB] rounded-xl text-xs space-y-2 relative shadow-sm group">
                    <div className="flex justify-between items-center text-gray-500 font-bold">
                      <span className="text-gray-700 font-extrabold">{note.createdBy}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px]">
                          {new Date(note.createdAt).toLocaleString("en-IN")}
                        </span>
                        
                        {/* Note Edit & Delete Controls */}
                        {editingNoteId !== note._id && (
                          <div className="hidden group-hover:flex items-center gap-1.5 transition-all">
                            <button
                              onClick={() => {
                                setEditingNoteId(note._id);
                                setEditNoteText(note.text);
                              }}
                              className="text-gray-400 hover:text-[#D4AF37] p-0.5"
                              title="Edit Note"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteNoteClick(note._id)}
                              className="text-gray-400 hover:text-red-500 p-0.5"
                              title="Delete Note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingNoteId === note._id ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          rows={2}
                          value={editNoteText}
                          onChange={(e) => setEditNoteText(e.target.value)}
                          className="w-full bg-white border border-[#E5E7EB] rounded-lg p-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteId(null);
                              setEditNoteText("");
                            }}
                            className="p-1 px-2 border border-gray-200 text-gray-500 rounded text-[10px] font-bold bg-white"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditNoteSave(note._id)}
                            className="p-1 px-2 bg-[#D4AF37] text-white rounded text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{note.text}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 border border-dashed border-gray-200 rounded-xl text-xs text-gray-400">
                  No staff notes logged.
                </div>
              )}
            </div>

            {/* Add Staff Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3 pt-2">
              <textarea
                disabled={updating}
                rows={3}
                required
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Enter details about call status, doc collections, client requests etc..."
                className="w-full bg-white border border-[#E5E7EB] rounded-xl p-4 text-xs placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
              />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase">
                  IST Timestamps auto-generated
                </span>
                <button
                  type="submit"
                  disabled={updating || !newNoteText.trim()}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:opacity-40 disabled:hover:bg-[#D4AF37] text-white font-bold text-xs rounded-xl shadow-sm shadow-[#D4AF37]/15 transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT PANEL: Workflow management & timeline */}
        <div className="space-y-6">
          
          {/* Status & Priority manager */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Workflow Administration</span>
            </h4>

            {/* Status Manager */}
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lead Stage</label>
              <select
                disabled={updating}
                value={lead.status}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] px-3 py-3 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
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

            {/* Priority Manager */}
            <div className="space-y-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Lead Priority</label>
              <select
                disabled={updating}
                value={lead.priority || "Medium"}
                onChange={(e) => handlePriorityUpdate(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] px-3 py-3 text-xs font-semibold focus:outline-none focus:border-[#D4AF37] disabled:opacity-50"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => setDeleteOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Lead Record</span>
              </button>
            </div>
          </div>

          {/* Follow-Up Scheduler Widget */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest pb-3 border-b border-gray-100">
              Follow-Up Planner
            </h4>
            <form onSubmit={handleFollowUpSave} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Follow-up Date & Time</label>
                <input
                  type="datetime-local"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#D4AF37] text-gray-800 font-semibold"
                />
              </div>
              <button
                type="submit"
                disabled={updating}
                className="w-full py-2 bg-[#D4AF37] text-white hover:bg-[#D4AF37]/90 font-bold text-xs rounded-lg transition-colors shadow-sm shadow-[#D4AF37]/15"
              >
                Schedule Follow-up
              </button>
            </form>
            {lead.nextFollowUp?.date && (
              <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Status:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    lead.nextFollowUp.completed ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-800"
                  }`}>
                    {lead.nextFollowUp.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleFollowUpComplete}
                  disabled={updating}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all border ${
                    lead.nextFollowUp.completed
                      ? "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  }`}
                >
                  {lead.nextFollowUp.completed ? "Reopen Scheduled Follow-up" : "Mark as Completed"}
                </button>
              </div>
            )}
          </div>

          {/* Activity Timeline (Permanent Auditing logs) */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2 pb-3 border-b border-gray-100">
              <History className="w-4 h-4" />
              <span>Activity History Logs</span>
            </h4>

            {/* Timeline scroll container */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-200 max-h-[360px] overflow-y-auto pr-1">
              {timelineItems.map((item, idx) => (
                <div key={idx} className="relative group text-xs">
                  {/* Timeline point dot */}
                  <div className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full border bg-white z-10 flex items-center justify-center ${
                    item.type === "created" 
                      ? "border-blue-500 bg-blue-50 text-blue-500" 
                      : (item.type === "status" ? "border-indigo-500 bg-indigo-50 text-indigo-500" : "border-[#D4AF37] bg-[#D4AF37]/5 text-[#D4AF37]")
                  }`} />
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-gray-800">{item.title}</span>
                      <span className="text-[9px] text-gray-400 font-mono">
                        {item.time.toLocaleDateString("en-IN", {
                          month: "2-digit",
                          day: "2-digit",
                        })} {item.time.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        })}
                      </span>
                    </div>
                    <p className="text-gray-500 font-semibold leading-normal whitespace-pre-wrap">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ── DELETE MODAL ── */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-2xl relative text-[#1A1A1A]">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#1A1A1A]">Permanently Delete Lead?</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Are you sure you want to delete lead <strong className="text-gray-900">{lead.fullName}</strong>? 
                  This will immediately terminate this customer file, deleting all note logs, timelines, and schedules.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full mt-4">
                <button
                  onClick={() => setDeleteOpen(false)}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-red-200"
                >
                  {deleting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-b-transparent rounded-full animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete Record</span>
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
