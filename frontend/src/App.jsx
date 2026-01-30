import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";

// Import Components
import {
  LoadingScreen,
  Header,
  CameraCard,
  ParametersCard,
  ResultsSection,
  Footer,
} from "./components";

// Import Utils
import { API_URL } from "./utils";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Legend, Tooltip);

// ============================================
// Main App Component
// ============================================
function App() {
  const [form, setForm] = useState({ initial_temp: 0, outside_temp: 0, students: 0, simulation_time: 0 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [detectedStudents, setDetectedStudents] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const webcamRef = useRef(null);

  // Fetch initial student count
  useEffect(() => {
    const fetchInitialCount = async () => {
      try {
        const res = await fetch(`${API_URL}/`);
        const data = await res.json();
        if (data.current_students > 0) {
          setForm((prev) => ({ ...prev, students: data.current_students }));
          setDetectedStudents(data.current_students);
        }
      } catch (error) {
        console.error("Error fetching initial count:", error);
      }
    };
    fetchInitialCount();
  }, []);

  // Apply theme to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Load saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme !== 'light');
  }, []);

  const updateManualStudents = async (count) => {
    try {
      await fetch(`${API_URL}/update_students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ students: count }),
      });
      setDetectedStudents(count);
    } catch (error) {
      console.error("Error updating manual count:", error);
    }
  };

  const runSimulation = async () => {
    if (form.initial_temp === 0 || form.outside_temp === 0 || form.simulation_time === 0) {
      toast.error("Fill the required credentials", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
      toast.success("Simulation completed successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
    } catch (error) {
      toast.error("Error running simulation: " + error.message, {
        position: "top-right",
        autoClose: 4000,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const detectFaces = async () => {
    if (!webcamRef.current) return;
    setDetecting(true);
    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        toast.error("Failed to capture image", {
          position: "top-right",
          autoClose: 3000,
          theme: darkMode ? "dark" : "light",
        });
        return;
      }
      const res = await fetch(`${API_URL}/detect_faces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageSrc }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error("Detection error: " + data.error, {
          position: "top-right",
          autoClose: 3000,
          theme: darkMode ? "dark" : "light",
        });
      } else {
        setForm({ ...form, students: data.faces });
        setDetectedStudents(data.faces);
        updateManualStudents(data.faces);
        toast.success(`Detected ${data.faces} faces! Student count updated.`, {
          position: "top-right",
          autoClose: 3000,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      toast.error("Error detecting faces: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setDetecting(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          padding: 20,
          font: { size: 12, family: "'Inter', sans-serif", weight: "500" },
          color: darkMode ? "#94a3b8" : "#64748b",
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
        padding: 16,
        titleFont: { size: 14, weight: "600", family: "'Inter', sans-serif" },
        bodyFont: { size: 13, family: "'Inter', sans-serif" },
        titleColor: darkMode ? "#f1f5f9" : "#0f172a",
        bodyColor: darkMode ? "#cbd5e1" : "#475569",
        borderColor: darkMode ? "rgba(99, 102, 241, 0.3)" : "rgba(14, 165, 233, 0.3)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          title: (ctx) => `Time: ${ctx[0].label} minutes`,
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}°C`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (minutes)",
          font: { size: 12, weight: "600", family: "'Inter', sans-serif" },
          color: darkMode ? "#64748b" : "#475569",
        },
        grid: { color: darkMode ? "rgba(148, 163, 184, 0.08)" : "rgba(148, 163, 184, 0.2)", drawBorder: false },
        ticks: {
          maxTicksLimit: 10,
          font: { size: 11, family: "'Inter', sans-serif" },
          color: darkMode ? "#64748b" : "#475569",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
          font: { size: 12, weight: "600", family: "'Inter', sans-serif" },
          color: darkMode ? "#64748b" : "#475569",
        },
        grid: { color: darkMode ? "rgba(148, 163, 184, 0.08)" : "rgba(148, 163, 184, 0.2)", drawBorder: false },
        ticks: {
          font: { size: 11, family: "'Inter', sans-serif" },
          color: darkMode ? "#64748b" : "#475569",
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <>
      <ToastContainer />
      <AnimatePresence mode="wait">
        {appLoading ? (
          <LoadingScreen key="loading" onComplete={() => setAppLoading(false)} />
        ) : (
          <motion.div
            className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors"
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls Section */}
              <section className="lg:col-span-1 space-y-6">
                <CameraCard
                  showWebcam={showWebcam}
                  setShowWebcam={setShowWebcam}
                  detecting={detecting}
                  detectFaces={detectFaces}
                  detectedStudents={detectedStudents}
                  webcamRef={webcamRef}
                />
                <ParametersCard
                  form={form}
                  setForm={setForm}
                  loading={loading}
                  runSimulation={runSimulation}
                  updateManualStudents={updateManualStudents}
                />
              </section>

              {/* Results Section */}
              <section className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  <ResultsSection result={result} darkMode={darkMode} chartOptions={chartOptions} />
                </AnimatePresence>
              </section>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
