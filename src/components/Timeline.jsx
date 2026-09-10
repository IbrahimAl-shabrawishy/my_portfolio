import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Timeline() {
  const [ref, inView] = useInView(0.1);
  const { t, isRtl } = useLanguage();
  const { isDark } = useTheme();

  const items = t.timeline.items;

  return (
    <section id="timeline" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-4"
        >
          <span className="font-mono text-gold text-sm">{t.timeline.sectionNum}</span>
          <span className={`font-mono text-sm ${isDark ? "text-white/30" : "text-slate-400"}`}>
            {t.timeline.sectionLabel}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className={`font-display text-3xl md:text-5xl font-extrabold mb-4 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {t.timeline.headingMain} <span className="text-gradient">{t.timeline.headingGrad}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className={`mb-16 ${isDark ? "text-white/40" : "text-slate-500"}`}
        >
          {t.timeline.subtitle}
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent ${
            isRtl ? "right-8" : "left-8"
          }`} />

          <div className="space-y-12">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`relative ${isRtl ? "pr-20" : "pl-20"}`}
              >
                {/* Node Icon */}
                <div
                  className={`absolute top-0 w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg ${
                    isRtl ? "right-0" : "left-0"
                  }`}
                  style={{
                    background: item.type === "work" ? "rgba(200,169,110,0.12)" : "rgba(96,165,250,0.12)",
                    borderColor: item.type === "work" ? "rgba(200,169,110,0.3)" : "rgba(96,165,250,0.3)",
                  }}
                >
                  {item.type === "work" ? (
                    <Briefcase size={20} className="text-gold" />
                  ) : (
                    <GraduationCap size={20} className="text-blue-400" />
                  )}
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-6 hover:border-gold/30 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-lg group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className={`text-sm ${isDark ? "text-white/40" : "text-slate-500"}`}>
                        {item.place}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs px-3 py-1.5 rounded-full font-semibold"
                      style={{
                        background: item.type === "work" ? "rgba(200,169,110,0.15)" : "rgba(96,165,250,0.15)",
                        color: item.type === "work" ? "#c8a96e" : "#3b82f6",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-slate-600"}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
