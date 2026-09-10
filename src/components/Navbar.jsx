import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLanguage, isRtl, t } = useLanguage();

  const links = [
    { href: "#hero", label: t.nav.home, id: "hero" },
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#skills", label: t.nav.skills, id: "skills" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#timeline", label: t.nav.timeline, id: "timeline" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "py-3 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl"
              : "py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-md"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#hero");
            }}
            className="font-display font-bold text-xl tracking-tight flex items-center gap-1"
          >
            <span className="text-gradient font-extrabold text-2xl">Ibrahim</span>
            <span className={isDark ? "text-white/30" : "text-slate-400"}>.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  active === link.id
                    ? isDark
                      ? "text-gold"
                      : "text-amber-700 font-bold"
                    : isDark
                    ? "text-white/60 hover:text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className={`absolute inset-0 rounded-lg ${
                      isDark
                        ? "bg-gold/10 border border-gold/20"
                        : "bg-amber-500/10 border border-amber-500/30"
                    }`}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Actions: Theme Toggle + Language Switcher + Hire CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              title={lang === "en" ? "التحويل للغة العربية" : "Switch to English"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white/80 hover:border-gold/40 hover:text-gold"
                  : "bg-slate-100 border border-slate-300 text-slate-700 hover:border-amber-500 hover:text-amber-700"
              }`}
            >
              <Globe size={14} className="text-gold" />
              <span>{lang === "en" ? "العربية" : "EN"}</span>
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className={`p-2 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 text-yellow-400 hover:bg-white/10"
                  : "bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* CTA Hire Me */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                isDark
                  ? "glass-gold text-gold hover:bg-gold/15"
                  : "bg-amber-600 text-white shadow-md hover:bg-amber-700"
              }`}
            >
              {t.nav.hireMe}
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                isDark ? "text-white/70 hover:text-white" : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 backdrop-blur-2xl ${
              isDark ? "bg-[#0a0a0f]/98 text-white" : "bg-white/98 text-slate-900"
            }`}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNav(link.href)}
                className={`font-display text-2xl font-bold transition-colors ${
                  active === link.id
                    ? isDark ? "text-gold" : "text-amber-600"
                    : isDark ? "text-white/60 hover:text-gold" : "text-slate-600 hover:text-amber-600"
                }`}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 mt-6"
            >
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-bold text-sm"
              >
                <Globe size={16} />
                {lang === "en" ? "التحويل للغة العربية" : "Switch to English"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
