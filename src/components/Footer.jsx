import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const phone = "201004799817";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(t.whatsappWidget.messageText)}`;

  return (
    <footer className={`relative border-t py-12 ${
      isDark ? "border-white/5 bg-[#07070b]" : "border-slate-200 bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-bold text-xl flex items-center gap-1" style={{fontFamily:"'Syne',sans-serif"}}>
          <span className="text-gradient font-black">Ibrahim</span>
          <span className={isDark ? "text-white/20" : "text-slate-400"}>.</span>
        </div>
        <p className={`text-xs md:text-sm font-mono text-center flex items-center gap-1.5 ${
          isDark ? "text-white/40" : "text-slate-500"
        }`}>
          © {year} · {t.footer.copyright}
        </p>
        <div className="flex items-center gap-3">
          {[
            { Icon: GithubIcon, href:"https://github.com/IbrahimAl-shabrawishy", label:"GitHub" },
            { Icon: LinkedinIcon, href:"https://www.linkedin.com/in/ibrahim-al-shabrawishy-00a8331b8/", label:"LinkedIn" },
            { Icon: MessageCircle, href: whatsappUrl, label:"WhatsApp" },
            { Icon: Mail, href:"mailto:ibrahimelshabrawishy123321@gmail.com", label:"Email" },
          ].map(({ Icon, href, label }, i) => (
            <motion.a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              whileHover={{ scale:1.1, y:-2 }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                isDark
                  ? "bg-white/5 border border-white/10 text-white/40 hover:text-gold"
                  : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-amber-700"
              }`}>
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
