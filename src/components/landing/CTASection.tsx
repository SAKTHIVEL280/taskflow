import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Magnetic from '@/components/reactbits/Magnetic';
import GradientText from '@/components/reactbits/GradientText';
import ScrollReveal from '@/components/reactbits/ScrollReveal';

const CTASection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal from={{ opacity: 0, y: 50, scale: 0.97 }} duration={1}>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, hsl(var(--primary) / 0.03) 40%, transparent 100%)',
              }}
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

              <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.95] mb-6">
                Your workspace.
                <br />
                <span className="text-muted-foreground/30 font-extralight">Your rules.</span>
              </h2>
              <p className="text-muted-foreground text-base mb-12 max-w-md leading-relaxed">
                Free to start. No credit card. No friction.
                Just you and your perfect workflow.
              </p>
              <Magnetic strength={0.15}>
                <Button size="lg" asChild className="h-14 px-12 text-sm tracking-wide rounded-full">
                  <Link to="/signup">
                    Start building now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
