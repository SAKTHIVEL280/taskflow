import ScrollReveal from '@/components/reactbits/ScrollReveal';
import BlurText from '@/components/reactbits/BlurText';

const ProcessSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Create',
      desc: 'Start a project. Define your statuses, pick your colors, set up custom fields. 30 seconds.',
      visual: (
        <div className="flex flex-wrap gap-2 mt-8">
          {['Backlog', 'In Progress', 'Review', 'Done'].map((s) => (
            <div key={s} className="px-3 py-1.5 rounded-md bg-muted border border-border text-[10px] font-mono text-muted-foreground">
              {s}
            </div>
          ))}
        </div>
      ),
    },
    {
      num: '02',
      title: 'Customize',
      desc: 'Make it unmistakably yours. Accent color, typography, density, dark mode. All live.',
      visual: (
        <div className="mt-8 space-y-3">
          <div className="flex gap-2">
            {[220, 160, 340, 30, 270].map((h) => (
              <div key={h} className="w-8 h-8 rounded-lg ring-1 ring-border" style={{ background: `hsl(${h} 65% 52%)` }} />
            ))}
          </div>
          <div className="flex gap-2">
            {['Inter', 'Grotesk', 'DM Sans'].map((f) => (
              <div key={f} className="px-2.5 py-1 rounded-md bg-muted border border-border text-[10px] font-mono text-muted-foreground">
                {f}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Work',
      desc: 'Switch views. Add tasks. Break them into subtasks. Tag with labels. Ship relentlessly.',
      visual: (
        <div className="mt-8 grid grid-cols-3 gap-2">
          {['Kanban', 'List', 'Table'].map((v, i) => (
            <div
              key={v}
              className={`px-3 py-2.5 rounded-md border text-[10px] font-mono text-center ${
                i === 0 ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-muted text-muted-foreground'
              }`}
            >
              {v}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="how" className="py-32 px-6 relative">
      {/* Subtle gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-12 bg-primary" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
            How it works
          </span>
        </div>

        <BlurText
          text="Three moves. Fully yours."
          className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] mb-20"
          delay={80}
          animateBy="words"
          direction="bottom"
        />

        <ScrollReveal stagger={0.15}>
          <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {steps.map((step) => (
              <div key={step.num} className="bg-background p-8 md:p-10 flex flex-col">
                <span className="text-xs font-mono text-primary/50 mb-6">{step.num}</span>
                <h3 className="text-3xl font-bold tracking-tight mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.desc}</p>
                {step.visual}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
