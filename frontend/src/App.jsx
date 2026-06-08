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
import CheckBasedFinance from "./pages/services/CheckBasedFinance";
import ProfessionalLoan from "./pages/services/ProfessionalLoan";
import LoanAgainstProperty from "./pages/services/LoanAgainstProperty";
import CarRefinance from "./pages/services/CarRefinance";
import WorkingCapital from "./pages/services/WorkingCapital";
import BankGuarantee from "./pages/services/BankGuarantee";
import LetterOfCredit from "./pages/services/LetterOfCredit";
import PackingCredit from "./pages/services/PackingCredit";
import MachineryPurchase from "./pages/services/MachineryPurchase";
import MedicalEquipment from "./pages/services/MedicalEquipment";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        
        {/* Service Detail Routes */}
        <Route path="/services/private-finance" element={<PrivateFinance />} />
        <Route path="/services/business-loans" element={<BusinessLoan />} />
        <Route path="/services/check-based-finance" element={<CheckBasedFinance />} />
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
    </Routes>
  );
}

export default App;