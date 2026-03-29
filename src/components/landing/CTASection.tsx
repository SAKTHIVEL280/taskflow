import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(var(--primary) / 0.02) 50%, transparent 100%)',
            }}
          />
          <div className="absolute inset-0 border border-primary/10 rounded-2xl" />

          <div className="relative p-12 md:p-20 flex flex-col items-center text-center">
            <motion.h2
              className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.95] mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease }}
            >
              Your workspace.
              <br />
              <span className="text-muted-foreground/40 font-extralight">Your rules.</span>
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-base mb-10 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, ease }}
            >
              Free to start. No credit card. No setup friction.
              Just you and your perfect workflow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, ease }}
            >
              <Button size="lg" asChild className="h-13 px-10 text-sm tracking-wide">
                <Link to="/signup">
                  Start building now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
