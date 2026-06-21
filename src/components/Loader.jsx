import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[200] bg-[#0a0a0f] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl font-black mb-8"
          >
            <span className="text-gradient">IS</span>
            <span className="text-white/10">.</span>
          </motion.div>

          {/* Loading bar */}
          <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full loader-bar" />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-xs text-white/20 mt-6"
          >
            Loading portfolio...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
