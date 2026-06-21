import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); setForm({ name:"", email:"", message:"" }); }, 1500);
  };

  const goldGrad = { background:"linear-gradient(135deg,#e8c98e,#c8a96e,#a8893e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" };
  const glassStyle = { background:"rgba(255,255,255,0.03)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.07)" };
  const glassGoldStyle = { background:"rgba(200,169,110,0.07)",backdropFilter:"blur(16px)",border:"1px solid rgba(200,169,110,0.2)" };

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]" style={{background:"linear-gradient(to right,transparent,rgba(200,169,110,0.2),transparent)"}} />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] rounded-full pointer-events-none" style={{background:"rgba(200,169,110,0.04)",filter:"blur(100px)"}} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} className="flex items-center gap-4 mb-4">
          <span className="text-yellow-400 text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>05.</span>
          <span className="text-white/30 text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>get_in_touch</span>
          <div className="flex-1 h-px" style={{background:"linear-gradient(to right,rgba(200,169,110,0.2),transparent)"}} />
        </motion.div>

        <motion.h2 initial={{ opacity:0, y:40 }} animate={inView?{opacity:1,y:0}:{}} transition={{delay:0.1}}
          className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:"'Syne',sans-serif"}}>
          Let&apos;s <span style={goldGrad}>Work Together</span>
        </motion.h2>
        <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{delay:0.2}} className="text-white/40 mb-16 max-w-xl">
          Have a project in mind or want to discuss opportunities? I'm just one message away.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.2}}
            className="lg:col-span-2 space-y-5">
            {[
              { icon: Mail, label:"Email", value:"ibrahimalshabrawishy@gmail.com", href:"mailto:ibrahimalshabrawishy@gmail.com" },
              { icon: MapPin, label:"Location", value:"Egypt 🇪🇬", href:null },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl p-5 flex items-start gap-4" style={glassStyle}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={glassGoldStyle}>
                  <item.icon size={16} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-xs text-white/30 mb-1" style={{fontFamily:"'JetBrains Mono',monospace"}}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white/70 hover:text-yellow-400 transition-colors text-sm break-all">{item.value}</a>
                  ) : (
                    <p className="text-white/70 text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-5" style={glassStyle}>
              <p className="text-xs text-white/30 mb-4" style={{fontFamily:"'JetBrains Mono',monospace"}}>Connect with me</p>
              <div className="flex gap-3">
                {[
                  { Icon: GithubIcon, href:"https://github.com/IbrahimAl-shabrawishy", label:"GitHub" },
                  { Icon: LinkedinIcon, href:"https://www.linkedin.com/in/ibrahim-al-shabrawishy-00a8331b8/", label:"LinkedIn" },
                  { Icon: Mail, href:"mailto:ibrahimalshabrawishy@gmail.com", label:"Email" },
                ].map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 hover:text-yellow-400 transition-all duration-300"
                    style={glassStyle}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={glassGoldStyle}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="font-semibold text-yellow-400 text-sm" style={{fontFamily:"'Syne',sans-serif"}}>Available for hire</span>
              </div>
              <p className="text-white/40 text-xs">Open to full-time roles and exciting freelance projects.</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3}} className="lg:col-span-3">
            {sent ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                className="rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]" style={glassStyle}>
                <CheckCircle size={56} className="text-green-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3" style={{fontFamily:"'Syne',sans-serif"}}>Message Sent!</h3>
                <p className="text-white/40 mb-8">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)}
                  className="px-6 py-3 rounded-full font-semibold text-sm hover:opacity-80 transition-all text-yellow-400"
                  style={{fontFamily:"'Syne',sans-serif",...glassGoldStyle}}>
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-6" style={glassStyle}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[{n:"name",p:"John Doe",l:"Your Name",t:"text"},{n:"email",p:"john@example.com",l:"Email Address",t:"email"}].map(f=>(
                    <div key={f.n}>
                      <label className="text-xs text-white/30 block mb-2" style={{fontFamily:"'JetBrains Mono',monospace"}}>{f.l}</label>
                      <input type={f.t} name={f.n} required value={form[f.n]} onChange={handleChange} placeholder={f.p}
                        className="w-full px-4 py-3 text-white/80 text-sm rounded-xl outline-none transition-all duration-300"
                        style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}
                        onFocus={e=>{e.target.style.borderColor="rgba(200,169,110,0.3)";e.target.style.background="rgba(200,169,110,0.05)"}}
                        onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.background="rgba(255,255,255,0.05)"}}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-white/30 block mb-2" style={{fontFamily:"'JetBrains Mono',monospace"}}>Message</label>
                  <textarea name="message" required rows={6} value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3 text-white/80 text-sm rounded-xl outline-none transition-all duration-300 resize-none"
                    style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}
                    onFocus={e=>{e.target.style.borderColor="rgba(200,169,110,0.3)";e.target.style.background="rgba(200,169,110,0.05)"}}
                    onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.08)";e.target.style.background="rgba(255,255,255,0.05)"}}/>
                </div>
                <motion.button type="submit" disabled={loading} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 text-[#0a0a0f] font-bold rounded-xl transition-all duration-300 disabled:opacity-60"
                  style={{fontFamily:"'Syne',sans-serif",background:"linear-gradient(135deg,#c8a96e,#a8893e)"}}>
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-[#0a0a0f]/30 border-t-[#0a0a0f] rounded-full animate-spin" />Sending...</>
                  ) : (
                    <><Send size={16} />Send Message</>
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
