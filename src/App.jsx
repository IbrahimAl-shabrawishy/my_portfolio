import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function PortfolioContent() {
  const [loaded, setLoaded] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // Ultra-fast initialization for optimal performance
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-400 ${
        isDark ? "bg-[#0a0a0f] text-white" : "bg-[#f8f9fd] text-slate-900"
      }`}
    >
      <div className="noise-overlay" />
      <Loader done={loaded} />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
