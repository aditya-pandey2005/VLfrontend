import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import { animations } from "../utils";

const CameraCard = ({
  showWebcam,
  setShowWebcam,
  detecting,
  detectFaces,
  detectedStudents,
  webcamRef,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 shadow-lg transition-colors"
      variants={animations.fadeInLeft}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Face Detection
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
            showWebcam
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
              : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
          }`}
        >
          {showWebcam ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Camera Section */}
      <div className="mb-4">
        <AnimatePresence mode="wait">
          {showWebcam ? (
            <motion.div
              className="relative rounded-xl overflow-hidden bg-slate-900"
              key="webcam"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ width: 400, height: 300, facingMode: "user" }}
                className="w-full rounded-xl"
              />
              
              <div className="absolute inset-0 border-2 border-sky-500 rounded-xl pointer-events-none">
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-scan" />
              </div>
              {/* Detect Button */}
              <motion.button
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2.5 bg-sky-500/90 hover:bg-sky-500 backdrop-blur-sm text-white font-semibold rounded-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                onClick={detectFaces}
                disabled={detecting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {detecting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Detect Faces"
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center justify-center py-12 px-6 bg-slate-100 dark:bg-slate-700/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600"
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-slate-400 dark:text-slate-500 mb-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enable camera to detect students
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Button */}
      <motion.button
        className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          showWebcam
            ? "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/25 text-white"
            : "bg-gradient-to-r from-sky-500 to-sky-600 hover:shadow-lg hover:shadow-sky-500/25 text-white"
        }`}
        onClick={() => setShowWebcam(!showWebcam)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {showWebcam ? "Disable Camera" : "Enable Camera"}
      </motion.button>

      {/* Detected Count */}
      <div className="flex items-center justify-between mt-4 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Detected Students
        </span>
        <motion.span
          className="text-2xl font-bold text-sky-500"
          key={detectedStudents}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {detectedStudents}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default CameraCard;
