import { motion } from 'framer-motion';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

const clipPaths = {
  up: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0 0 0 0)' },
  down: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0 0)' },
  left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0 0 0)' },
  right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0 0)' },
};

export default function ClipReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
}: ClipRevealProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const paths = clipPaths[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: paths.hidden, opacity: 0.3 }}
      animate={inView ? { clipPath: paths.visible, opacity: 1 } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
