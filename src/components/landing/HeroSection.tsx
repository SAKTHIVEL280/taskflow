import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid lines — subtle architectural feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[40%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-foreground" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-foreground" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        {/* Overline with animated line */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease }}
        >
          <div className="h-px w-12 bg-primary" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
            Rethink how you work
          </span>
        </motion.div>

        {/* Main headline — massive, typographic-forward */}
        <div className="relative">
          <motion.h1
            className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.88] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            <span className="block">Craft your</span>
            <span className="block mt-1">
              <span className="relative inline-block">
                workflow
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.9 }}
                />
              </span>
              <span className="text-muted-foreground/30 font-light italic ml-4">—</span>
            </span>
            <span className="block text-muted-foreground/40 font-extralight mt-1">
              not the other way around.
            </span>
          </motion.h1>
        </div>

        {/* Sub-content row */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          <p className="text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed">
            A task manager that bends to your taste.
            Every status, color, font, and field — yours to define.
            No compromises.
          </p>

          <div className="flex items-center gap-3">
            <Button size="lg" asChild className="h-13 px-8 text-sm tracking-wide">
              <Link to="/signup">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-13 px-8 text-sm tracking-wide">
              <a href="#features">See what's possible</a>
            </Button>
          </div>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          className="mt-20 pt-8 border-t border-border grid grid-cols-3 gap-8 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.75 }}
        >
          {[
            { value: '6', label: 'Font families' },
            { value: 'Infinite', label: 'Accent colors' },
            { value: '3', label: 'View modes' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/40">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-muted-foreground/20"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
