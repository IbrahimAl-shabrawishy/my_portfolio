import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Code2, Layers, Zap, Heart } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "I write readable, maintainable code following best practices and modern standards.",
    color: "#c8a96e",
  },
  {
    icon: Layers,
    title: "Component Design",
    desc: "Building reusable, scalable component architectures in React.js.",
    color: "#61dafb",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Optimizing for speed, accessibility, and seamless user experience.",
    color: "#10b981",
  },
  {
    icon: Heart,
    title: "Passion",
    desc: "Genuinely love frontend development — constantly learning and growing.",
    color: "#f43f5e",
  },
];

export default function About() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="font-mono text-gold text-sm">01.</span>
          <span className="font-mono text-white/30 text-sm">about_me</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left – Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Turning ideas into
              <span className="text-gradient block">digital reality</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-6"
            >
              I'm <strong className="text-white/80">Ibrahim Al-Shabrawishy</strong>, a Frontend Developer
              from Egypt, specializing in building fast, beautiful, and accessible web applications
              with React.js and modern JavaScript.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/40 leading-relaxed mb-8"
            >
              My journey started with a deep curiosity for how things work on the web. From writing
              my first line of HTML to architecting full React applications — every step has been
              driven by passion and a relentless drive to improve. I focus on creating experiences
              that are not just functional, but genuinely delightful to use.
            </motion.p>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Location", value: "Egypt 🇪🇬" },
                { label: "Specialty", value: "React.js" },
                { label: "Experience", value: "3+ Years" },
                { label: "Status", value: "Open to Work ✅" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-4">
                  <div className="font-mono text-xs text-gold/60 mb-1">{item.label}</div>
                  <div className="font-display font-semibold text-white/80 text-sm">{item.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – Cards */}
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 group cursor-default"
                style={{ borderColor: `${card.color}20` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${card.color}15` }}
                >
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="font-display font-bold text-white/90 mb-2 text-sm">{card.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
