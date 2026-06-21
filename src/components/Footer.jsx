import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t py-12" style={{borderColor:"rgba(255,255,255,0.05)"}}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-lg" style={{fontFamily:"'Syne',sans-serif"}}>
          <span style={{background:"linear-gradient(135deg,#e8c98e,#c8a96e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Ibrahim</span>
          <span style={{color:"rgba(255,255,255,0.15)"}}>.</span>
        </div>
        <p className="text-white/25 text-sm flex items-center gap-1.5" style={{fontFamily:"'JetBrains Mono',monospace"}}>
          © {year} · Made with ❤️ by Ibrahim Al-Shabrawishy
        </p>
        <div className="flex items-center gap-3">
          {[
            { Icon: GithubIcon, href:"https://github.com/IbrahimAl-shabrawishy" },
            { Icon: LinkedinIcon, href:"https://www.linkedin.com/in/ibrahim-al-shabrawishy-00a8331b8/" },
            { Icon: Mail, href:"mailto:ibrahimalshabrawishy@gmail.com" },
          ].map(({ Icon, href }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.1, y:-2 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/30 hover:text-yellow-400 transition-colors"
              style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)"}}>
              <Icon size={14} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
