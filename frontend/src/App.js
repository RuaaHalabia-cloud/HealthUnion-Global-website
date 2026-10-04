import "@/App.css";
import "@/i18n";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import SfdaMdma from "@/pages/SfdaMdma";
import Terms from "@/pages/Terms";
import { Toaster } from "@/components/ui/sonner";
import SfdaReliance from "@/pages/SfdaReliance";
import SfdaTechnicalFile from "@/pages/SfdaTechnicalFile";
import SfdaDistributorSupport from "@/pages/SfdaDistributorSupport";

function App() {
  const stored = typeof window !== "undefined" ? localStorage.getItem("hu_lang") : null;
  const defaultLang = stored === "ar" ? "ar" : "en";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="insights" element={<Insights />} />
          <Route path="insights/:slug" element={<InsightDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="sfda-medical-device-registration-mdma" element={<SfdaMdma />} />
          <Route path="sfda-mds-g30-reliance-assessment" element={<SfdaReliance />} />
          <Route path="sfda-technical-file-gap-assessment" element={<SfdaTechnicalFile />} />
          <Route path="saudi-medical-device-distributor-regulatory-support" element={<SfdaDistributorSupport />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
