import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Magnetic from '@/components/reactbits/Magnetic';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const LandingNav = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.85]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.3, 0.6]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: `hsl(var(--background))`,
          opacity: bgOpacity,
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
      />
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 relative z-10"
        style={{ borderBottom: '1px solid' }}
      >
        <motion.div style={{ borderColor: useTransform(borderOpacity, (v) => `hsl(var(--border) / ${v})`) }}>
          <Magnetic strength={0.15}>
            <Link to="/" className="text-base font-semibold tracking-tight">
              Task<span className="text-primary">Flow</span>
            </Link>
          </Magnetic>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it works'].map((item) => (
            <a
              key={item}
              href={item === 'Features' ? '#features' : '#how'}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground text-[13px]">
            <Link to="/login">Sign in</Link>
          </Button>
          <Magnetic strength={0.1}>
            <Button size="sm" asChild className="text-[13px] rounded-full px-5">
              <Link to="/signup">
                Get started
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
};

export default LandingNav;
