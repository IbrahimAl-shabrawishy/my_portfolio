import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const { t, isRtl } = useLanguage();
  const { isDark } = useTheme();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const phone = "201004799817";
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(t.whatsappWidget.messageText)}`;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]" style={{background:"linear-gradient(to right,transparent,rgba(200,169,110,0.2),transparent)"}} />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{background:"rgba(200,169,110,0.04)",filter:"blur(100px)"}} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Label */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex items-center gap-4 mb-4">
          <span className="text-gold text-sm font-mono">{t.contact.sectionNum}</span>
          <span className={`text-sm font-mono ${isDark ? "text-white/30" : "text-slate-400"}`}>{t.contact.sectionLabel}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/20 to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h2 initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
          className={`text-3xl md:text-5xl font-extrabold mb-4 ${isDark ? "text-white" : "text-slate-900"}`} style={{fontFamily:"'Syne',sans-serif"}}>
          {t.contact.headingMain} <span className="text-gradient">{t.contact.headingGrad}</span>
        </motion.h2>
        
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{delay:0.2}} className={`mb-16 max-w-xl ${isDark ? "text-white/40" : "text-slate-500"}`}>
          {t.contact.subtitle}
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Side: Contact Cards */}
          <motion.div initial={{ opacity:0, x: isRtl ? 40 : -40 }} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2}}
            className="lg:col-span-2 space-y-5">
            
            {/* WhatsApp Highlight Box */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="block rounded-2xl p-5 border bg-gradient-to-r from-emerald-600/15 via-emerald-500/10 to-transparent border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-300 shadow-lg shadow-emerald-500/5 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-emerald-400 text-sm">{t.contact.whatsappLabel}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="font-mono text-xs font-bold text-emerald-500 tracking-wider mb-1" dir="ltr">
                    +20 100 479 9817
                  </p>
                  <p className="text-xs text-emerald-400/80 font-medium">
                    {t.contact.whatsappFastNote}
                  </p>
                </div>
              </div>
            </motion.a>

            {/* Email Card */}
            <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold font-mono mb-1">{t.contact.emailLabel}</p>
                <a href={`mailto:${t.contact.emailVal}`} className={`hover:text-gold transition-colors text-sm font-medium break-all ${
                  isDark ? "text-white/70" : "text-slate-700"
                }`}>
                  {t.contact.emailVal}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-gold" />
              </div>
              <div>
                <p className="text-xs text-gold font-mono mb-1">{t.contact.locationLabel}</p>
                <p className={`text-sm font-medium ${isDark ? "text-white/70" : "text-slate-700"}`}>
                  {t.contact.locationVal}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-xs text-gold font-mono mb-4">{t.contact.connectLabel}</p>
              <div className="flex gap-3">
                {[
                  { Icon: GithubIcon, href:"https://github.com/IbrahimAl-shabrawishy", label:"GitHub" },
                  { Icon: LinkedinIcon, href:"https://www.linkedin.com/in/ibrahim-al-shabrawishy-00a8331b8/", label:"LinkedIn" },
                  { Icon: Mail, href:"mailto:ibrahimelshabrawishy123321@gmail.com", label:"Email" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isDark
                        ? "bg-white/5 border border-white/10 text-white/50 hover:text-gold"
                        : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-amber-700"
                    }`}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="glass-gold rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="font-bold text-gold text-sm" style={{fontFamily:"'Syne',sans-serif"}}>
                  {t.contact.availableHire}
                </span>
              </div>
              <p className={`text-xs ${isDark ? "text-white/50" : "text-slate-600"}`}>
                {t.contact.availableDesc}
              </p>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div initial={{ opacity:0, x: isRtl ? -40 : 40 }} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3}} className="lg:col-span-3">
            {sent ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <CheckCircle size={56} className="text-emerald-400 mb-6" />
                <h3 className="text-2xl font-bold mb-3" style={{fontFamily:"'Syne',sans-serif"}}>
                  {t.contact.form.sentTitle}
                </h3>
                <p className={`mb-8 max-w-sm ${isDark ? "text-white/50" : "text-slate-600"}`}>
                  {t.contact.form.sentDesc}
                </p>
                <button onClick={() => setSent(false)}
                  className="px-6 py-3 rounded-full font-bold text-sm text-gold glass-gold hover:opacity-80 transition-all"
                  style={{fontFamily:"'Syne',sans-serif"}}>
                  {t.contact.form.sendAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gold font-mono block mb-2">{t.contact.form.nameLabel}</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder={t.contact.form.namePlaceholder}
                      className={`w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 ${
                        isDark ? "bg-white/5 border border-white/10 text-white" : "bg-slate-50 border border-slate-300 text-slate-900"
                      }`}
                      onFocus={e=>{e.target.style.borderColor="#c8a96e"}}
                      onBlur={e=>{e.target.style.borderColor=""}}/>
                  </div>
                  <div>
                    <label className="text-xs text-gold font-mono block mb-2">{t.contact.form.emailLabel}</label>
                    <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder={t.contact.form.emailPlaceholder}
                      className={`w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 ${
                        isDark ? "bg-white/5 border border-white/10 text-white" : "bg-slate-50 border border-slate-300 text-slate-900"
                      }`}
                      onFocus={e=>{e.target.style.borderColor="#c8a96e"}}
                      onBlur={e=>{e.target.style.borderColor=""}}/>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gold font-mono block mb-2">{t.contact.form.messageLabel}</label>
                  <textarea name="message" required rows={6} value={form.message} onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    className={`w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 resize-none ${
                      isDark ? "bg-white/5 border border-white/10 text-white" : "bg-slate-50 border border-slate-300 text-slate-900"
                    }`}
                    onFocus={e=>{e.target.style.borderColor="#c8a96e"}}
                    onBlur={e=>{e.target.style.borderColor=""}}/>
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 text-[#0a0a0f] font-bold rounded-xl transition-all duration-300 disabled:opacity-60 shadow-lg shadow-gold/20"
                  style={{fontFamily:"'Syne',sans-serif",background:"linear-gradient(135deg,#c8a96e,#a8893e)"}}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />{t.contact.form.sending}</>
                  ) : (
                    <><Send size={16} />{t.contact.form.submitBtn}</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
