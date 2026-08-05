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
import { Toaster } from "@/components/ui/sonner";

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
          <Route path="privacy" element={<Privacy />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
