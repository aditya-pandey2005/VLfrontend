import { motion } from "framer-motion";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <motion.header
      className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 transition-colors"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-sky-500"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            ThermoSense
          </h1>
          <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
            Smart Climate Control
          </span>
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hidden sm:block">
            System Active
          </span>
        </div>

        {/* Theme Toggle */}
        <motion.button
          className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:border-sky-300 dark:hover:border-sky-600 hover:text-sky-500 transition-colors"
          onClick={() => setDarkMode(!darkMode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
