import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Code2, Layers, Zap, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const cardIcons = [Code2, Layers, Zap, Heart];
const cardColors = ["#c8a96e", "#61dafb", "#10b981", "#f43f5e"];

export default function About() {
  const [ref, inView] = useInView(0.15);
  const { t, isRtl } = useLanguage();
  const { isDark } = useTheme();

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
          <span className="font-mono text-gold text-sm">{t.about.sectionNum}</span>
          <span className={`font-mono text-sm ${isDark ? "text-white/30" : "text-slate-400"}`}>
            {t.about.sectionLabel}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`font-display text-3xl md:text-5xl font-bold mb-6 leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {t.about.headingLine1}
              <span className="text-gradient block">{t.about.headingLine2}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`text-base md:text-lg leading-relaxed mb-6 ${
                isDark ? "text-white/70" : "text-slate-700"
              }`}
            >
              {t.about.bio1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className={`leading-relaxed mb-8 ${
                isDark ? "text-white/40" : "text-slate-500"
              }`}
            >
              {t.about.bio2}
            </motion.p>

            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: t.about.facts.location, value: t.about.facts.locationVal },
                { label: t.about.facts.specialty, value: t.about.facts.specialtyVal },
                { label: t.about.facts.experience, value: t.about.facts.experienceVal },
                { label: t.about.facts.status, value: t.about.facts.statusVal },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4">
                  <div className="font-mono text-xs text-gold mb-1">{item.label}</div>
                  <div className="font-display font-semibold text-sm">{item.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.cards.map((card, i) => {
              const Icon = cardIcons[i % cardIcons.length];
              const color = cardColors[i % cardColors.length];
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card rounded-2xl p-6 group cursor-default"
                  style={{ borderColor: `${color}30` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}18` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h3 className="font-display font-bold mb-2 text-sm">{card.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-white/40" : "text-slate-500"}`}>
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
