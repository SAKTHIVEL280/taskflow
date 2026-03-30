import { useEffect, useRef, useState } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleChars?: string;
  trigger?: 'mount' | 'inview';
}

export default function TextScramble({
  text,
  className = '',
  speed = 30,
  scrambleChars = '!<>-_\\/[]{}—=+*^?#________',
  trigger = 'inview',
}: TextScrambleProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (trigger === 'mount') {
      setStarted(true);
      return;
    }
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!started) return;

    let frame = 0;
    const totalFrames = text.length * 2;

    const tick = () => {
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * text.length);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < revealed) {
          result += text[i];
        } else {
          result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }

      setDisplay(result);
      frame++;

      if (frame <= totalFrames) {
        setTimeout(tick, speed);
      } else {
        setDisplay(text);
      }
    };

    tick();
  }, [started, text, speed, scrambleChars]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {started ? display : '\u00A0'.repeat(text.length)}
    </span>
  );
}
