import LetterPullUp from '@/components/reactbits/LetterPullUp';
import TextScramble from '@/components/reactbits/TextScramble';
import CountUp from '@/components/reactbits/CountUp';
import ClipReveal from '@/components/reactbits/ClipReveal';
import InfiniteMarquee from '@/components/reactbits/InfiniteMarquee';
import { motion } from 'framer-motion';

const FeaturesSection = () => {
  const features = [
    {
      number: '01',
      title: 'Custom statuses',
      description: 'Define your own workflow stages. Name them, color them, reorder them. Your process, encoded.',
      detail: 'Not just To Do and Done',
    },
    {
      number: '02',
      title: 'Total visual control',
      description: 'Accent colors, font families, border radius, density. Every aesthetic decision is yours.',
      detail: '6 fonts, infinite palettes',
    },
    {
      number: '03',
      title: 'Three native views',
      description: 'Kanban boards for visual thinkers. Lists for the focused. Tables for the analytical. Switch freely.',
      detail: 'Kanban / List / Table',
    },
    {
      number: '04',
      title: 'Custom fields',
      description: 'Text, numbers, dates -- attach whatever metadata matters to your tasks. Per project, fully flexible.',
      detail: 'Your data, your schema',
    },
    {
      number: '05',
      title: 'Labels and subtasks',
      description: 'Color-coded tags for instant context. Nested checklists for breaking work down. Both, everywhere.',
      detail: 'Organize at every level',
    },
    {
      number: '06',
      title: 'Dark mode',
      description: 'A carefully tuned dark palette that respects your accent color choices. Not an afterthought.',
      detail: 'Designed, not inverted',
    },
  ];

  const marqueeWords = [
    'Customizable', 'Minimal', 'Powerful', 'Precise', 'Flexible',
    'Intuitive', 'Beautiful', 'Fast', 'Focused', 'Yours',
  ];

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 pb-16 border-b border-border">
          {[
            { to: 6, label: 'Font families' },
            { to: 360, suffix: '+', label: 'Accent colors' },
            { to: 3, label: 'View modes' },
            { to: 100, suffix: '%', label: 'Customizable' },
          ].map((stat, i) => (
            <ClipReveal key={stat.label} direction="up" delay={i * 0.1}>
              <div>
                <CountUp to={stat.to} suffix={stat.suffix} className="text-5xl font-bold tracking-tight block" />
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">{stat.label}</p>
              </div>
            </ClipReveal>
          ))}
        </div>

        {/* Marquee band */}
        <InfiniteMarquee speed={30} className="mb-20 py-4 border-y border-border/30">
          {marqueeWords.map((word) => (
            <span key={word} className="text-3xl md:text-5xl font-bold tracking-tight text-muted-foreground/10 whitespace-nowrap">
              {word}
            </span>
          ))}
        </InfiniteMarquee>

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <motion.div
                className="h-px bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              <TextScramble
                text="CAPABILITIES"
                className="text-[11px] tracking-[0.3em] text-muted-foreground"
                speed={30}
              />
            </div>
            <LetterPullUp
              text="Everything bends to your preference."
              className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05]"
            />
          </div>
          <ClipReveal direction="right" delay={0.3}>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
              Not a template. Not a preset.
              A system that adapts to the way you think and work.
            </p>
          </ClipReveal>
        </div>

        {/* Feature list — hover-driven interactions */}
        <div className="border-t border-border">
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              className="group border-b border-border py-8 md:py-10 grid md:grid-cols-[80px_1fr_1.2fr_180px] gap-4 md:gap-8 items-start md:items-center cursor-default"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 8 }}
            >
              <span className="text-xs font-mono text-primary/50 group-hover:text-primary transition-colors duration-500">
                {feature.number}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 md:text-right group-hover:text-muted-foreground transition-colors duration-500">
                {feature.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
