// Chart.js Configuration
export const getChartOptions = (darkMode) => ({
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
      ticks: { maxTicksLimit: 10, font: { size: 11, family: "'Inter', sans-serif" }, color: darkMode ? "#64748b" : "#475569" },
    },
    y: {
      title: {
        display: true,
        text: "Temperature (°C)",
        font: { size: 12, weight: "600", family: "'Inter', sans-serif" },
        color: darkMode ? "#64748b" : "#475569",
      },
      grid: { color: darkMode ? "rgba(148, 163, 184, 0.08)" : "rgba(148, 163, 184, 0.2)", drawBorder: false },
      ticks: { font: { size: 11, family: "'Inter', sans-serif" }, color: darkMode ? "#64748b" : "#475569", callback: (value) => `${value}°C` },
    },
  },
});

export const getChartData = (result, darkMode) => ({
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
});
