import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

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
    description: 'Text, numbers, dates — attach whatever metadata matters to your tasks. Per project, fully flexible.',
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

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-primary" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
                Capabilities
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.95]">
              Everything bends
              <br />
              <span className="text-muted-foreground/40 font-extralight">to your preference.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
            Not a template. Not a preset.
            A system that adapts to the way you think and work.
          </p>
        </motion.div>

        {/* Feature list — editorial numbered layout */}
        <div className="border-t border-border">
          {features.map((feature, i) => (
            <motion.div
              key={feature.number}
              className="group border-b border-border py-8 md:py-10 grid md:grid-cols-[80px_1fr_1.2fr_180px] gap-4 md:gap-8 items-start md:items-center cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ease }}
            >
              <span className="text-xs font-mono text-primary/60 group-hover:text-primary transition-colors">
                {feature.number}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/50 md:text-right">
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
