import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";
import { useInView } from "../hooks/useInView";
import { projects } from "../data/portfolioData";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "css", label: "HTML & CSS" },
  { key: "javascript", label: "JavaScript" },
  { key: "react", label: "React.js" },
];

export default function Projects() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]" style={{background:"linear-gradient(to right,transparent,rgba(200,169,110,0.2),transparent)"}} />
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex items-center gap-4 mb-4">
          <span className="text-yellow-400 text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>03.</span>
          <span className="text-white/30 text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>featured_work</span>
          <div className="flex-1 h-px" style={{background:"linear-gradient(to right,rgba(200,169,110,0.2),transparent)"}} />
        </motion.div>

        <motion.h2 initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
          className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:"'Syne',sans-serif"}}>
          Selected <span style={{background:"linear-gradient(135deg,#e8c98e,#c8a96e,#a8893e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Projects</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{delay:0.2}} className="text-white/40 mb-10 max-w-xl">
          A curated collection of work showcasing skills across different technologies.
        </motion.p>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.3}} className="flex flex-wrap gap-2 mb-12">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActive(f.key)}
              className="relative px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
              style={{fontFamily:"'Syne',sans-serif", color: active===f.key ? "#0a0a0f" : "rgba(255,255,255,0.5)", background: active===f.key ? "linear-gradient(135deg,#c8a96e,#a8893e)" : "rgba(255,255,255,0.05)", border:"1px solid",borderColor: active===f.key ? "transparent" : "rgba(255,255,255,0.08)"}}>
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity:0, scale:0.9, y:20 }} animate={{ opacity:1, scale:1, y:0 }}
                exit={{ opacity:0, scale:0.9, y:20 }} transition={{ duration:0.4, delay:i*0.06 }}
                whileHover={{ y:-8 }}
                className="group relative rounded-2xl overflow-hidden border transition-all duration-500"
                style={{background:"rgba(255,255,255,0.03)",borderColor:"rgba(255,255,255,0.05)","--hover-border":"rgba(200,169,110,0.2)"}}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(200,169,110,0.2)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.05)"}>
                {/* Gradient top */}
                <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black opacity-10 text-white select-none" style={{fontFamily:"'Syne',sans-serif"}}>
                      {project.title.split(" ").map(w=>w[0]).join("")}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{fontFamily:"'JetBrains Mono',monospace", background:`${project.accent}20`, color:project.accent, border:`1px solid ${project.accent}30`}}>
                      {project.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4" style={{background:"rgba(10,10,15,0.85)",backdropFilter:"blur(8px)"}}>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all" style={{background:"rgba(255,255,255,0.1)"}}>
                      <GithubIcon size={16} />
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0a0a0f] transition-all" style={{background:project.accent}}>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-white/90 text-lg mb-2 transition-colors" style={{fontFamily:"'Syne',sans-serif"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#c8a96e"} onMouseLeave={e=>e.currentTarget.style.color=""}>
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded text-white/30" style={{fontFamily:"'JetBrains Mono',monospace",background:"rgba(255,255,255,0.05)"}}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/30 hover:text-white text-xs transition-colors">
                      <GithubIcon size={13} /> Source Code
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80" style={{color:project.accent}}>
                      Live Demo <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.6}} className="text-center mt-16">
          <a href="https://github.com/IbrahimAl-shabrawishy" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 text-white/60 hover:text-white"
            style={{fontFamily:"'Syne',sans-serif",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)"}}>
            <GithubIcon size={18} />
            View all projects on GitHub
            <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
