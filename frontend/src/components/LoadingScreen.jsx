import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  const getStatusText = () => {
    if (progress < 30) return "Initializing systems...";
    if (progress < 60) return "Loading AI models...";
    if (progress < 90) return "Preparing dashboard...";
    return "Ready!";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="text-center text-white">
        {/* Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl font-bold mb-2 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          ThermoSense
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base opacity-85 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Intelligent Classroom Climate Control
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-72 mx-auto mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-white rounded-full transition-all duration-50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium opacity-90">{progress}%</span>
        </motion.div>

        {/* Status Text */}
        <motion.div
          className="text-sm opacity-75 min-h-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {getStatusText()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
