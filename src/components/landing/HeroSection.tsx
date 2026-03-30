import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Aurora from '@/components/reactbits/Aurora';
import LetterPullUp from '@/components/reactbits/LetterPullUp';
import GradientText from '@/components/reactbits/GradientText';
import TextScramble from '@/components/reactbits/TextScramble';
import Magnetic from '@/components/reactbits/Magnetic';
import ClipReveal from '@/components/reactbits/ClipReveal';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-6 overflow-hidden">
      {/* Aurora WebGL background */}
      <div className="absolute inset-0 opacity-30">
        <Aurora
          colorStops={['#3A5CFF', '#7B61FF', '#2ECFFF']}
          amplitude={1.2}
          blend={0.6}
          speed={0.4}
        />
      </div>

      {/* Fine dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Overline with scramble effect */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease }}
        >
          <div className="h-px w-16 bg-primary" />
          <TextScramble
            text="TASK MANAGEMENT, REIMAGINED"
            className="text-[11px] tracking-[0.35em] text-muted-foreground"
            speed={25}
            trigger="mount"
          />
        </motion.div>

        {/* Main headline with LetterPullUp */}
        <div className="max-w-5xl">
          <LetterPullUp
            text="Craft your"
            className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
          />
          <div className="flex items-baseline gap-4 mt-2">
            <LetterPullUp
              text="perfect"
              className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
              delay={0.3}
            />
            <GradientText
              colors={['#3A5CFF', '#7B61FF', '#2ECFFF', '#3A5CFF']}
              animationSpeed={6}
              className="text-[clamp(3rem,8vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
            >
              workspace.
            </GradientText>
          </div>
        </div>

        {/* Sub content with clip reveals */}
        <div className="mt-16 grid md:grid-cols-[1fr_auto] gap-16 items-end">
          <ClipReveal direction="left" delay={0.8}>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Every color, every font, every status column, every field.
              TaskFlow doesn't ask you to adapt. It adapts to you.
            </p>
          </ClipReveal>

          <ClipReveal direction="right" delay={1}>
            <div className="flex items-center gap-3">
              <Magnetic strength={0.2}>
                <Button size="lg" asChild className="h-14 px-10 text-sm tracking-wide rounded-full">
                  <Link to="/signup">
                    Start building free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="h-14 px-8 text-sm tracking-wide rounded-full border-border/50"
                >
                  <a href="#features">Explore</a>
                </Button>
              </Magnetic>
            </div>
          </ClipReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <motion.div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-muted-foreground/50"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
