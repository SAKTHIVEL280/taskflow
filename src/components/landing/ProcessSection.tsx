import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const steps = [
  {
    num: '01',
    title: 'Create',
    desc: 'Start a project. Define your statuses, pick your colors, set up custom fields. 30 seconds.',
    visual: (
      <div className="flex gap-2 mt-6">
        {['Backlog', 'In Progress', 'Review', 'Done'].map((s, i) => (
          <div key={s} className="px-3 py-1.5 rounded-md bg-muted border border-border text-[10px] font-mono">
            {s}
          </div>
        ))}
      </div>
    ),
  },
  {
    num: '02',
    title: 'Customize',
    desc: 'Make it unmistakably yours. Accent color, typography, density, dark mode. It all updates live.',
    visual: (
      <div className="mt-6 space-y-3">
        <div className="flex gap-2">
          {[220, 160, 340, 30, 270].map((h) => (
            <div key={h} className="w-8 h-8 rounded-lg" style={{ background: `hsl(${h} 65% 52%)` }} />
          ))}
        </div>
        <div className="flex gap-2">
          {['Inter', 'Space Grotesk', 'DM Sans'].map((f) => (
            <div key={f} className="px-2.5 py-1 rounded-md bg-muted border border-border text-[10px] font-mono">
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
    desc: 'Switch views. Add tasks. Break them into subtasks. Tag with labels. Iterate. Ship.',
    visual: (
      <div className="mt-6 grid grid-cols-3 gap-2">
        {['Kanban', 'List', 'Table'].map((v) => (
          <div
            key={v}
            className="px-3 py-2 rounded-md border border-border bg-muted text-[10px] font-mono text-center"
          >
            {v}
          </div>
        ))}
      </div>
    ),
  },
];

const ProcessSection = () => {
  return (
    <section className="py-32 px-6 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-12 bg-primary" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
            How it works
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[0.95] mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease }}
        >
          Three moves.
          <br />
          <span className="text-muted-foreground/40 font-extralight">Fully yours.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="bg-background p-8 md:p-10 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, ease }}
            >
              <span className="text-xs font-mono text-primary/60 mb-6">{step.num}</span>
              <h3 className="text-3xl font-bold tracking-tight mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.desc}</p>
              {step.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
