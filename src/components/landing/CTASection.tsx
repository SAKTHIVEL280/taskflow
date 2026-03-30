import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Magnetic from '@/components/reactbits/Magnetic';
import GradientText from '@/components/reactbits/GradientText';
import LetterPullUp from '@/components/reactbits/LetterPullUp';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(135deg, hsl(220 70% 50% / 0.08) 0%, transparent 60%)',
                  'linear-gradient(225deg, hsl(270 70% 50% / 0.08) 0%, transparent 60%)',
                  'linear-gradient(315deg, hsl(200 70% 50% / 0.08) 0%, transparent 60%)',
                  'linear-gradient(135deg, hsl(220 70% 50% / 0.08) 0%, transparent 60%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 border border-primary/10 rounded-3xl" />

            <div className="relative p-12 md:p-24 flex flex-col items-center text-center">
              <GradientText
                colors={['#3A5CFF', '#7B61FF', '#2ECFFF', '#3A5CFF']}
                animationSpeed={5}
                className="text-[11px] font-mono tracking-[0.4em] uppercase mb-8 block"
              >
                Ready when you are
              </GradientText>

              <LetterPullUp
                text="Your workspace."
                className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.95] mb-2 justify-center"
              />
              <motion.span
                className="text-4xl md:text-6xl font-extralight tracking-[-0.03em] leading-[0.95] text-muted-foreground/30 block mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease }}
              >
                Your rules.
              </motion.span>

              <motion.p
                className="text-muted-foreground text-base mb-12 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.7, ease }}
              >
                Free to start. No credit card. No friction.
                Just you and your perfect workflow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <Magnetic strength={0.15}>
                  <Button size="lg" asChild className="h-14 px-12 text-sm tracking-wide rounded-full">
                    <Link to="/signup">
                      Start building now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
