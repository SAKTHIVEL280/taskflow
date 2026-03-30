import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

export default function Tilt3D({ children, className = '', intensity = 10, glare = true }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setTransform({
      rotateX: (0.5 - y) * intensity,
      rotateY: (x - 0.5) * intensity,
    });
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={transform}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
