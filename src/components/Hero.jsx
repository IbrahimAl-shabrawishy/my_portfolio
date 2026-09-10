import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, Download, ExternalLink, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

function ParticleField({ isDark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(200,169,110,${p.opacity})`
          : `rgba(180,132,40,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

export default function Hero() {
  const { t, isRtl } = useLanguage();
  const { isDark } = useTheme();

  const titles = t.hero.titles;
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  const phone = "201004799817";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(t.whatsappWidget.messageText)}`;

  useEffect(() => {
    let timeout;
    const current = titles[titleIdx] || titles[0];
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          60
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setTitleIdx((i) => (i + 1) % titles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIdx, titles]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <ParticleField isDark={isDark} />
      
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left / Main text */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-8 border ${
              isDark
                ? "bg-yellow-600/10 border-yellow-600/20 text-yellow-400"
                : "bg-amber-100 border-amber-300 text-amber-900 font-bold"
            }`}
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {t.hero.badge}
          </motion.div>

          <h1
            className="font-display font-extrabold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
            }}
          >
            <span className="text-adaptive-subtle text-lg block font-normal font-mono mb-1">
              {t.hero.greeting}
            </span>
            <span className="text-gradient block">
              {t.hero.name}
            </span>
          </h1>

          <div className="h-10 flex items-center gap-2 mb-6" dir="auto">
            <span
              className={`text-lg md:text-xl font-mono ${
                isDark ? "text-white/60" : "text-slate-700"
              }`}
            >
              {displayed}
              <span className="text-yellow-500 animate-pulse font-bold inline-block mx-1">|</span>
            </span>
          </div>

          <p className={`text-lg leading-relaxed max-w-lg mb-10 ${
            isDark ? "text-white/50" : "text-slate-600"
          }`}>
            {t.hero.desc}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3.5 mb-10">
            {/* View Projects */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 px-6 py-3.5 text-[#0a0a0f] font-bold rounded-full transition-all duration-300 shadow-lg shadow-gold/20"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(135deg, #c8a96e, #a8893e)",
              }}
            >
              <ExternalLink size={16} /> {t.hero.viewProjects}
            </motion.button>

            {/* WhatsApp Direct CTA */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-600/20 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <MessageCircle size={17} />
              {t.hero.chatWhatsapp}
            </motion.a>

            {/* Contact Me */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  : "bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {t.hero.contactMe}
            </motion.button>

            {/* Download CV */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/assets/Ibrahim_Al-Shabrawishy_CV.pdf"
              download="Ibrahim_Al-Shabrawishy_CV.pdf"
              className={`flex items-center gap-2 px-4 py-3.5 text-xs font-mono transition-colors ${
                isDark ? "text-white/40 hover:text-yellow-400" : "text-slate-500 hover:text-amber-700"
              }`}
            >
              <Download size={15} /> {t.hero.downloadCv}
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span
              className={`text-xs font-mono ${
                isDark ? "text-white/30" : "text-slate-400"
              }`}
            >
              {t.hero.findMe}
            </span>
            <div className={`w-8 h-px ${isDark ? "bg-white/10" : "bg-slate-300"}`} />
            {[
              {
                Icon: GithubIcon,
                href: "https://github.com/IbrahimAl-shabrawishy",
                label: "GitHub",
              },
              {
                Icon: LinkedinIcon,
                href: "https://www.linkedin.com/in/ibrahim-al-shabrawishy-00a8331b8/",
                label: "LinkedIn",
              },
              {
                Icon: Mail,
                href: "mailto:ibrahimelshabrawishy123321@gmail.com",
                label: "Email",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white/50 hover:text-yellow-400 hover:border-yellow-400/30"
                    : "bg-white border border-slate-200 text-slate-600 shadow-sm hover:text-amber-600 hover:border-amber-400"
                }`}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right / Avatar & Stats */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-yellow-600/20 spin-slow" />
          <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-yellow-600/10" />
          
          <motion.div
            className="relative z-10 w-60 h-60 md:w-72 md:h-72"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className={`w-full h-full rounded-full overflow-hidden border-2 border-yellow-600/30 shadow-2xl ${
                isDark ? "bg-gradient-to-b from-yellow-600/10 to-transparent" : "bg-gradient-to-b from-amber-50 to-white"
              }`}
              style={{ boxShadow: "0 0 60px rgba(200,169,110,0.25)" }}
            >
              <img
                src="/assets/images/a9b96478-adc2-49a6-9093-536d3de59b0c-modified.png"
                alt="Ibrahim Al-Shabrawishy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center"><span style="font-family:'Syne',sans-serif;font-size:4rem;font-weight:900;background:linear-gradient(135deg,#e8c98e,#c8a96e);-webkit-background-clip:text;-webkit-text-fill-color:transparent">IS</span></div>`;
                }}
              />
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#ffffff"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className={`absolute -left-4 md:-left-8 top-8 px-4 py-3 rounded-2xl border ${
              isDark
                ? "bg-yellow-600/10 border-yellow-600/20 backdrop-blur"
                : "bg-white border-slate-200 shadow-md text-slate-800"
            }`}
          >
            <div
              className="text-2xl font-extrabold text-gold font-mono"
              dir="ltr"
            >
              7+
            </div>
            <div className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
              {t.hero.stats.projects}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className={`absolute -right-4 md:-right-8 bottom-8 px-4 py-3 rounded-2xl border ${
              isDark
                ? "bg-yellow-600/10 border-yellow-600/20 backdrop-blur"
                : "bg-white border-slate-200 shadow-md text-slate-800"
            }`}
          >
            <div
              className="text-2xl font-extrabold text-gold font-mono"
              dir="ltr"
            >
              3+
            </div>
            <div className={`text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>
              {t.hero.stats.experience}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className={`absolute -right-4 md:-right-8 top-12 px-4 py-3 rounded-2xl border ${
              isDark
                ? "bg-white/5 border-white/10 backdrop-blur"
                : "bg-white border-slate-200 shadow-md text-slate-800"
            }`}
          >
            <div
              className="text-xs text-gold font-mono"
            >
              {"<React />"}
            </div>
            <div
              className={`text-sm font-bold ${isDark ? "text-white/90" : "text-slate-800"}`}
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {t.hero.stats.specialist}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-colors ${
          isDark ? "text-white/30 hover:text-gold" : "text-slate-400 hover:text-amber-600"
        }`}
      >
        <span className="text-xs font-mono">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
