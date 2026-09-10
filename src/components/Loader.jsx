import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Loader({ done }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className={`fixed inset-0 z-[200] flex flex-col items-center justify-center ${
            isDark ? "bg-[#0a0a0f] text-white" : "bg-white text-slate-900"
          }`}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="font-display text-4xl font-black mb-6"
          >
            <span className="text-gradient font-black tracking-tight">IS</span>
            <span className={isDark ? "text-white/20" : "text-slate-300"}>.</span>
          </motion.div>

          {/* Fast Loading bar */}
          <div className={`w-48 h-[2px] rounded-full overflow-hidden ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}>
            <div className="h-full bg-gradient-to-r from-gold via-yellow-400 to-amber-600 rounded-full loader-bar" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={`font-mono text-xs mt-4 ${
              isDark ? "text-white/40" : "text-slate-500"
            }`}
          >
            {t.loader.loadingText}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
