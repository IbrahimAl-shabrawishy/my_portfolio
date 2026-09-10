import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/portfolioData";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Projects() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState("all");

  const { t } = useLanguage();
  const { isDark } = useTheme();

  const FILTERS = [
    { key: "all", label: t.projects.filters.all },
    { key: "css", label: t.projects.filters.css },
    { key: "javascript", label: t.projects.filters.javascript },
    { key: "react", label: t.projects.filters.react },
  ];

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]" style={{background:"linear-gradient(to right,transparent,rgba(200,169,110,0.2),transparent)"}} />
      
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Label */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex items-center gap-4 mb-4">
          <span className="text-gold text-sm font-mono">{t.projects.sectionNum}</span>
          <span className={`text-sm font-mono ${isDark ? "text-white/30" : "text-slate-400"}`}>{t.projects.sectionLabel}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h2 initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
          className={`text-3xl md:text-5xl font-extrabold mb-4 ${isDark ? "text-white" : "text-slate-900"}`} style={{fontFamily:"'Syne',sans-serif"}}>
          {t.projects.headingMain} <span className="text-gradient">{t.projects.headingGrad}</span>
        </motion.h2>
        
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{delay:0.2}} className={`mb-10 max-w-xl ${isDark ? "text-white/40" : "text-slate-500"}`}>
          {t.projects.subtitle}
        </motion.p>

        {/* Filter Buttons */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.3}} className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActive(f.key)}
              className={`relative px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 ${
                active === f.key
                  ? "text-[#0a0a0f] shadow-lg shadow-gold/20"
                  : isDark
                  ? "text-white/60 bg-white/5 border border-white/10 hover:text-white"
                  : "text-slate-600 bg-slate-100 border border-slate-200 hover:text-slate-900"
              }`}
              style={{
                fontFamily: "'Syne',sans-serif",
                background: active === f.key ? "linear-gradient(135deg,#c8a96e,#a8893e)" : undefined
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const localizedItem = t.projects.projectItems[project.id];
              const projectTitle = localizedItem?.title || project.title;
              const projectDesc = localizedItem?.desc || project.description;

              return (
                <motion.div key={project.id} layout
                  initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
                  exit={{ opacity:0, scale:0.9, y:20 }} transition={{ duration:0.4, delay:i*0.05 }}
                  whileHover={{ y:-8 }}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 glass-card`}
                >
                  {/* Top Header Card Background */}
                  <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-black opacity-10 text-white select-none" style={{fontFamily:"'Syne',sans-serif"}}>
                        {projectTitle.split(" ").map(w=>w[0]).join("")}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold" style={{background:`${project.accent}25`, color:project.accent, border:`1px solid ${project.accent}40`}}>
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4" style={{background:"rgba(10,10,15,0.85)",backdropFilter:"blur(8px)"}}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110" style={{background:"rgba(255,255,255,0.15)"}}>
                        <GithubIcon size={18} />
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo"
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0a0a0f] transition-all hover:scale-110" style={{background:project.accent}}>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 transition-colors group-hover:text-gold" style={{fontFamily:"'Syne',sans-serif"}}>
                      {projectTitle}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-white/50" : "text-slate-600"}`}>
                      {projectDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((techItem) => (
                        <span key={techItem} className={`text-xs px-2 py-0.5 rounded font-mono ${
                          isDark ? "text-white/40 bg-white/5" : "text-slate-500 bg-slate-100"
                        }`}>
                          {techItem}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          isDark ? "text-white/40 hover:text-white" : "text-slate-500 hover:text-slate-900"
                        }`}>
                        <GithubIcon size={13} /> {t.projects.sourceCode}
                      </a>
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-bold transition-colors hover:opacity-80" style={{color:project.accent}}>
                        {t.projects.liveDemo} <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* GitHub link button */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.5}} className="text-center mt-16">
          <a href="https://github.com/IbrahimAl-shabrawishy" target="_blank" rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-300 border ${
              isDark
                ? "bg-white/5 border-white/10 text-white/70 hover:text-white hover:border-gold/40"
                : "bg-white border-slate-300 text-slate-700 shadow-sm hover:text-amber-800 hover:border-amber-400"
            }`}
            style={{fontFamily:"'Syne',sans-serif"}}>
            <GithubIcon size={18} />
            {t.projects.viewGithub}
            <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
