import { useEffect } from "react";
import { X, Bell, ArrowRight } from "lucide-react";

export default function ToastNotification({ toast, onClose, onView }) {
  useEffect(() => {
    // Automatically close the toast after 6 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!toast) return null;

  return (
    <div className="fixed top-6 right-6 z-50 w-full max-w-sm bg-white border border-[#E5E7EB] border-l-4 border-l-[#D4AF37] rounded-xl shadow-2xl p-4 animate-slide-in text-[#1A1A1A] font-sans">
      <div className="flex gap-3">
        {/* Glowing notification icon */}
        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center flex-shrink-0 animate-pulse">
          <Bell className="text-[#D4AF37] w-5 h-5" />
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
              {toast.type === "follow_up" ? "Follow-Up Reminder" : "New CRM Enquiry"}
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h4 className="text-sm font-bold text-[#1A1A1A] mt-1 truncate">{toast.title}</h4>
          <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{toast.message}</p>

          {/* Quick buttons */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E5E7EB]">
            <button
              onClick={() => {
                onView(toast.enquiryId?._id || toast.enquiryId);
                onClose();
              }}
              className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#D4AF37] hover:bg-[#D4AF37]/90 px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-[#D4AF37]/15"
            >
              <span>Verify Lead</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={onClose}
              className="text-[10px] font-semibold text-gray-500 hover:text-gray-800 px-3 py-1.5 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
