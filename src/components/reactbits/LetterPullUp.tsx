import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface LetterPullUpProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function LetterPullUp({ text, className = '', delay = 0 }: LetterPullUpProps) {
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
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex overflow-hidden mr-[0.25em]">
          {word.split('').map((letter, li) => {
            const index = words.slice(0, wi).join('').length + li;
            return (
              <motion.span
                key={`${wi}-${li}`}
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: delay + index * 0.025,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
}
