import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Service Detail Pages Imports
import PrivateFinance from "./pages/services/PrivateFinance";
import BusinessLoan from "./pages/services/BusinessLoan";
import ChequeBasedFinance from "./pages/services/ChequeBasedFinance";
import ProfessionalLoan from "./pages/services/ProfessionalLoan";
import LoanAgainstProperty from "./pages/services/LoanAgainstProperty";
import CarRefinance from "./pages/services/CarRefinance";
import WorkingCapital from "./pages/services/WorkingCapital";
import BankGuarantee from "./pages/services/BankGuarantee";
import LetterOfCredit from "./pages/services/LetterOfCredit";
import PackingCredit from "./pages/services/PackingCredit";
import MachineryPurchase from "./pages/services/MachineryPurchase";
import MedicalEquipment from "./pages/services/MedicalEquipment";

// Admin Dashboard Components Imports
import AdminGuard from "./components/AdminGuard";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeadDetails from "./pages/AdminLeadDetails";
import AdminAnalytics from "./pages/AdminAnalytics";

function App() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      const startTransition = () => {
        preloader.classList.add("fade-out");
        document.body.classList.remove("preloader-active");
        
        // Completely remove preloader interaction and visibility after transition finishes
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      };

      // Set a minimum visible duration for the premium reveal animation (e.g. 800ms)
      const minDisplayTime = 800;
      const timer = setTimeout(startTransition, minDisplayTime);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Routes>
      {/* Frontend Client-Facing Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        
        {/* Service Detail Routes */}
        <Route path="/services/private-finance" element={<PrivateFinance />} />
        <Route path="/services/business-loans" element={<BusinessLoan />} />
        <Route path="/services/cheque-based-finance" element={<ChequeBasedFinance />} />
        <Route path="/services/professional-loans" element={<ProfessionalLoan />} />
        <Route path="/services/loan-against-property" element={<LoanAgainstProperty />} />
        <Route path="/services/car-refinance" element={<CarRefinance />} />
        <Route path="/services/working-capital-solutions" element={<WorkingCapital />} />
        <Route path="/services/bank-guarantee" element={<BankGuarantee />} />
        <Route path="/services/letter-of-credit" element={<LetterOfCredit />} />
        <Route path="/services/packing-credit" element={<PackingCredit />} />
        <Route path="/services/machinery-purchase-finance" element={<MachineryPurchase />} />
        <Route path="/services/medical-equipment-finance" element={<MedicalEquipment />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Route>

      {/* Admin Dashboard Public Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Dashboard Protected Console */}
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/leads/:id" element={<AdminLeadDetails />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;