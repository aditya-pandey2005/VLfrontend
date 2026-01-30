import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-6 text-center border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © ThermoSense — Intelligent Classroom Climate Control Made by team- AITIANS
      </p>
    </motion.footer>
  );
};

export default Footer;
