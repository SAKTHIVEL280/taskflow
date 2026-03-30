import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  children,
  speed = 40,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: InfiniteMarqueeProps) {
  const duration = 100 / (speed / 10);

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
    >
      <motion.div
        className={`flex gap-8 w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
