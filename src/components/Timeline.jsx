import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { timeline } from "../data/portfolioData";
import { Briefcase, GraduationCap } from "lucide-react";

export default function Timeline() {
  const [ref, inView] = useInView(0.1);

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
          <span className="font-mono text-gold text-sm">04.</span>
          <span className="font-mono text-white/30 text-sm">my_journey</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Experience &amp; <span className="text-gradient">Education</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 mb-16"
        >
          The path that shaped me as a developer.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="relative pl-20"
              >
                {/* Icon node */}
                <div
                  className="absolute left-0 top-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: item.type === "work" ? "rgba(200,169,110,0.1)" : "rgba(96,165,250,0.1)",
                    border: `1px solid ${item.type === "work" ? "rgba(200,169,110,0.2)" : "rgba(96,165,250,0.2)"}`,
                  }}
                >
                  {item.type === "work" ? (
                    <Briefcase size={20} className="text-gold" />
                  ) : (
                    <GraduationCap size={20} className="text-blue-400" />
                  )}
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-6 hover:border-gold/15 transition-all duration-300 group">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-white/90 text-lg group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-sm">{item.place}</p>
                    </div>
                    <span
                      className="font-mono text-xs px-3 py-1.5 rounded-full"
                      style={{
                        background: item.type === "work" ? "rgba(200,169,110,0.1)" : "rgba(96,165,250,0.1)",
                        color: item.type === "work" ? "#c8a96e" : "#60a5fa",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
