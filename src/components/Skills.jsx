import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { skills } from "../data/portfolioData";

export default function Skills() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="skills" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="font-mono text-gold text-sm">02.</span>
          <span className="font-mono text-white/30 text-sm">my_skills</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Tech <span className="text-gradient">Arsenal</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/40 mb-16 max-w-xl"
        >
          Tools and technologies I use to bring ideas to life — with proficiency levels earned through real projects.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="glass rounded-2xl p-6 group hover:border-gold/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-display font-semibold text-white/80">{skill.name}</span>
                </div>
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: skill.color }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    boxShadow: `0 0 12px ${skill.color}40`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Tech Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {["Vite", "REST APIs", "Firebase", "Responsive Design", "Accessibility", "npm", "Figma", "VS Code"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 glass rounded-full font-mono text-xs text-white/40 hover:text-gold hover:border-gold/20 transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
