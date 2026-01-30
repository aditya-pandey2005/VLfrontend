import { motion } from "framer-motion";
import { animations, formLabels, formUnits } from "../utils";

const ParametersCard = ({ form, setForm, loading, runSimulation, updateManualStudents }) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 shadow-lg transition-colors"
      variants={animations.fadeInLeft}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Simulation Parameters
        </h2>
      </div>

      {/* Parameters Grid */}
      <motion.div
        className="grid grid-cols-2 gap-4 mb-4"
        variants={animations.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {Object.keys(form).map((key, index) => (
          <motion.div
            key={key}
            className="flex flex-col gap-1.5"
            variants={animations.fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {formLabels[key]}
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 pr-12 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-base font-semibold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                value={form[key] === 0 ? "" : form[key]}
                placeholder="0"
                onChange={(e) => {
                  const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
                  setForm({ ...form, [key]: newValue });
                  if (key === "students") updateManualStudents(newValue);
                }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                {formUnits[key]}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Run Simulation Button */}
      <motion.button
        className={`w-full py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-70 disabled:cursor-not-allowed transition-all ${
          loading ? "cursor-wait" : ""
        }`}
        onClick={runSimulation}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Running Simulation...
          </>
        ) : (
          "Run Simulation"
        )}
      </motion.button>
    </motion.div>
  );
};

export default ParametersCard;
