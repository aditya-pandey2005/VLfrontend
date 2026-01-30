// API Configuration
export const API_URL = import.meta.env.API_URL || "https://thermosense.onrender.com";

export const formLabels = {
  initial_temp: "Initial Temperature",
  outside_temp: "Outside Temperature",
  students: "Number of Students",
  simulation_time: "Simulation Duration",
};

export const formUnits = {
  initial_temp: "°C",
  outside_temp: "°C",
  students: "people",
  simulation_time: "min",
};

export const metricColors = {
  blue: "border-l-sky-500",
  orange: "border-l-orange-500",
  purple: "border-l-purple-500",
  green: "border-l-emerald-500",
  red: "border-l-red-500",
};
