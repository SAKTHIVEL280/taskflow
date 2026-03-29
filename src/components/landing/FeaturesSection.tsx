import BlurText from '@/components/reactbits/BlurText';
import CountUp from '@/components/reactbits/CountUp';
import ScrollReveal from '@/components/reactbits/ScrollReveal';

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

  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats bar */}
        <ScrollReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 pb-16 border-b border-border">
          <div>
            <CountUp to={6} className="text-5xl font-bold tracking-tight block" />
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">Font families</p>
          </div>
          <div>
            <span className="text-5xl font-bold tracking-tight block">
              <CountUp to={360} suffix="+" className="inline" />
            </span>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">Accent colors</p>
          </div>
          <div>
            <CountUp to={3} className="text-5xl font-bold tracking-tight block" />
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">View modes</p>
          </div>
          <div>
            <span className="text-5xl font-bold tracking-tight block">
              <CountUp to={100} suffix="%" className="inline" />
            </span>
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-2">Customizable</p>
          </div>
        </ScrollReveal>

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-12 bg-primary" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
                Capabilities
              </span>
            </div>
            <BlurText
              text="Everything bends to your preference."
              className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05]"
              delay={60}
              animateBy="words"
              direction="bottom"
            />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed md:text-right">
            Not a template. Not a preset.
            A system that adapts to the way you think and work.
          </p>
        </div>

        {/* Feature list — editorial numbered layout */}
        <div className="border-t border-border">
          {features.map((feature, i) => (
            <ScrollReveal
              key={feature.number}
              from={{ opacity: 0, y: 30 }}
              delay={i * 0.05}
              duration={0.8}
            >
              <div className="group border-b border-border py-8 md:py-10 grid md:grid-cols-[80px_1fr_1.2fr_180px] gap-4 md:gap-8 items-start md:items-center cursor-default">
                <span className="text-xs font-mono text-primary/50 group-hover:text-primary transition-colors duration-500">
                  {feature.number}
                </span>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 md:text-right">
                  {feature.detail}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
