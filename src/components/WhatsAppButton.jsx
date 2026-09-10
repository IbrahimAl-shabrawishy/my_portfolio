import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function WhatsAppButton() {
  const { isRtl, t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = "201004799817";
  const defaultMsg = t.whatsappWidget.messageText;
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div
      className={`fixed bottom-6 z-40 flex items-center gap-3 ${
        isRtl ? "left-6 flex-row-reverse" : "right-6 flex-row"
      }`}
    >
      {/* Tooltip Popup */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="relative px-4 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-semibold shadow-xl flex items-center gap-2 border border-emerald-400/30"
          >
            <span>{t.whatsappWidget.tooltip}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-0.5 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={12} />
            </button>
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rotate-45 ${
                isRtl ? "-left-1" : "-right-1"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group w-14 h-14 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 border border-emerald-300/40"
      >
        {/* Glow Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />

        {/* WhatsApp Icon SVG */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </motion.a>
    </div>
  );
}
