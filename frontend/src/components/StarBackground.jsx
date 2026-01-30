import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const StarBackground = ({ darkMode }) => {
  const containerRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.5 + 0.2,
    }));
    setStars(newStars);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      onMouseMove={handleMouseMove}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          animate={{
            x: mousePos.x * star.speed * 30,
            y: mousePos.y * star.speed * 30,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            background: darkMode
              ? `radial-gradient(circle, rgba(255,255,255,${star.opacity}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(14,165,233,${star.opacity}) 0%, transparent 70%)`,
            boxShadow: darkMode
              ? `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`
              : `0 0 ${star.size * 2}px rgba(14,165,233,${star.opacity * 0.5})`,
          }}
        />
      ))}
      {/* Shooting Stars */}
      <div className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-[shooting_3s_ease-in-out_infinite] top-1/4 left-1/4" />
      <div className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-[shooting_4s_ease-in-out_infinite_1s] top-1/3 left-1/2" />
      <div className="absolute w-1 h-1 bg-white rounded-full opacity-0 animate-[shooting_5s_ease-in-out_infinite_2s] top-1/2 left-3/4" />
    </div>
  );
};

export default StarBackground;
