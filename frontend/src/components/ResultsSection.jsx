import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { animations } from "../utils";
import StarBackground from "./StarBackground";

const ResultsSection = ({ result, darkMode, chartOptions }) => {
  if (!result) {
    return (
      <motion.div
        className="relative min-h-[400px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 shadow-lg overflow-hidden"
        key="empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StarBackground darkMode={darkMode} />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center min-h-[350px] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="w-24 h-24 mb-6 text-sky-500"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 7L12 12L2 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No Simulation Data
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">
            Configure parameters and run a simulation to view thermal analysis results.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["AI Face Detection", "Real-time Analysis", "Energy Optimization"].map((feature, i) => (
              <motion.div
                key={i}
                className="px-3 py-1.5 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // results
  const metrics = [
    { value: result.students_detected, label: "Students Detected", color: "border-blue-500" },
    { value: `${result.final_temperature}°C`, label: "Final Temperature", color: "border-orange-500" },
    { value: `${result.ac_on_time} min`, label: "HVAC Active Time", color: "border-purple-500" },
    { value: result.hvac_status_log.at(-1), label: "HVAC Status", color: result.hvac_status_log.at(-1) === 'ON' ? 'border-green-500' : 'border-red-500' },
  ];

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={animations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className={`bg-white dark:bg-slate-800 rounded-xl p-4 border-l-4 ${metric.color} shadow-md`}
            variants={animations.scaleIn}
            transition={{ delay: index * 0.1 }}
          >
            <span className="block text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {metric.value}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 shadow-lg"
        variants={animations.fadeInRight}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Energy Analytics
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Normal AC</span>
            <span className="block text-lg font-bold text-slate-900 dark:text-white">{result.energy_normal_kwh} kWh</span>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Smart HVAC</span>
            <span className="block text-lg font-bold text-emerald-500">{result.energy_smart_kwh} kWh</span>
          </div>
          <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-800">
            <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Energy Saved</span>
            <span className="block text-lg font-bold text-sky-500">{result.energy_saved_kwh} kWh</span>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Cost Savings</span>
            <span className="block text-lg font-bold text-amber-500">₹{result.cost_saved_rs}</span>
          </div>
        </div>
      </motion.div>

      {/* Temperature Chart Card */}
      <motion.div
        className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 shadow-lg"
        variants={animations.fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Temperature Timeline
          </h2>
        </div>
        <div className="h-64">
          <Line
            data={{
              labels: result.temperature_log.map((_, i) => i),
              datasets: [
                {
                  label: "Room Temperature",
                  data: result.temperature_log,
                  borderColor: "#0ea5e9",
                  backgroundColor: darkMode ? "rgba(14, 165, 233, 0.1)" : "rgba(14, 165, 233, 0.15)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointBackgroundColor: "#0ea5e9",
                  pointBorderColor: darkMode ? "#1e293b" : "#ffffff",
                  pointBorderWidth: 2,
                  borderWidth: 2.5,
                },
                {
                  label: "Target (24°C)",
                  data: Array(result.temperature_log.length).fill(24),
                  borderColor: "#10b981",
                  backgroundColor: "transparent",
                  borderDash: [6, 4],
                  borderWidth: 2,
                  pointRadius: 0,
                  fill: false,
                },
              ],
            }}
            options={{
              ...chartOptions,
              scales: {
                ...chartOptions.scales,
                y: {
                  ...chartOptions.scales.y,
                  suggestedMin: Math.min(...result.temperature_log) - 2,
                  suggestedMax: Math.max(...result.temperature_log) + 2,
                },
              },
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsSection;
