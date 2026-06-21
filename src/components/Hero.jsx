import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowDown, Download, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const TITLES = [
  "Frontend Developer",
  "React.js Specialist",
  "UI/UX Enthusiast",
  "JavaScript Developer",
];

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 60 }, () => ({
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
        ctx.fillStyle = `rgba(200,169,110,${p.opacity})`;
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
  }, []);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const current = TITLES[titleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          70,
        );
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setTitleIdx((i) => (i + 1) % TITLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIdx]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ParticleField />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(200,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/10 border border-yellow-600/20 backdrop-blur rounded-full text-sm font-mono text-yellow-400 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Available for opportunities
          </motion.div>

          <h1
            className="font-display font-bold leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg,#e8c98e,#c8a96e,#a8893e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              Ibrahim <br /> Al-Shabrawishy
            </span>
          </h1>

          <div className="h-10 flex items-center gap-2 mb-6">
            <span
              className="text-lg md:text-xl text-white/50"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {displayed}
              <span className="text-yellow-400 animate-pulse">|</span>
            </span>
          </div>

          <p className="text-white/50 text-lg leading-relaxed max-w-lg mb-10">
            Crafting modern, high-performance web experiences with React.js.
            Specializing in clean architecture, beautiful interfaces, and
            seamless user interactions.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 px-7 py-3.5 text-[#0a0a0f] font-bold rounded-full transition-all duration-300"
              style={{
                fontFamily: "'Syne',sans-serif",
                background: "linear-gradient(135deg,#c8a96e,#a8893e)",
                boxShadow: "0 0 0 rgba(200,169,110,0)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(200,169,110,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 rgba(200,169,110,0)")
              }
            >
              <ExternalLink size={16} /> View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-7 py-3.5 bg-white/5 backdrop-blur border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Contact Me
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/assets/Ibrahim_Al-Shabrawishy_CV.pdf"
              download="Ibrahim_Al-Shabrawishy_CV.pdf"
              className="flex items-center gap-2 px-5 py-3.5 text-white/40 hover:text-yellow-400 transition-colors text-sm"
            >
              <Download size={15} /> Download CV
            </motion.a>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="text-white/20 text-sm"
              style={{ fontFamily: "'JetBrains Mono',monospace" }}
            >
              Find me on
            </span>
            <div className="w-8 h-px bg-white/10" />
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
                href: "mailto:ibrahimalshabrawishy@gmail.com",
                label: "Email",
              },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 bg-white/5 backdrop-blur border border-white/10 rounded-xl flex items-center justify-center text-white/40 hover:text-yellow-400 hover:border-yellow-400/30 transition-all duration-300 hover:scale-110"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-yellow-600/20 spin-slow" />
          <div className="absolute w-[300px] h-[300px] md:w-[380px] md:h-[380px] rounded-full border border-yellow-600/10" />
          <motion.div
            className="relative z-10 w-60 h-60 md:w-72 md:h-72"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden border-2 border-yellow-600/30 bg-gradient-to-b from-yellow-600/10 to-transparent"
              style={{ boxShadow: "0 0 60px rgba(200,169,110,0.2)" }}
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
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#0a0a0f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -left-4 md:-left-8 top-8 bg-yellow-600/10 border border-yellow-600/20 backdrop-blur px-4 py-3 rounded-2xl"
          >
            <div
              className="text-2xl font-bold text-yellow-400"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              7+
            </div>
            <div className="text-xs text-white/50">Projects Built</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="absolute -right-4 md:-right-8 bottom-8 bg-yellow-600/10 border border-yellow-600/20 backdrop-blur px-4 py-3 rounded-2xl"
          >
            <div
              className="text-2xl font-bold text-yellow-400"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              3+
            </div>
            <div className="text-xs text-white/50">Years Learning</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="absolute -right-4 md:-right-8 top-12 bg-white/5 border border-white/10 backdrop-blur px-4 py-3 rounded-2xl"
          >
            <div
              className="text-xs text-yellow-400/60"
              style={{ fontFamily: "'JetBrains Mono',monospace" }}
            >
              {"<React />"}
            </div>
            <div
              className="text-sm font-bold text-white/80"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Specialist
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-yellow-400 transition-colors"
      >
        <span
          className="text-xs"
          style={{ fontFamily: "'JetBrains Mono',monospace" }}
        >
          scroll
        </span>
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
