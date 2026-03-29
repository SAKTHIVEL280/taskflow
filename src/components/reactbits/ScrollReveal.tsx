import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  from = { opacity: 0, y: 60 },
  duration = 1,
  delay = 0,
  stagger = 0.1,
  scrub = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const ctx = gsap.context(() => {
      const targets = el.children.length > 1 ? Array.from(el.children) : el;

      gsap.fromTo(
        targets,
        { ...from },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotation: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: scrub ? 1 : false,
            once: !scrub,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
