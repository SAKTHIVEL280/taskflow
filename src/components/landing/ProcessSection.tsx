import LetterPullUp from '@/components/reactbits/LetterPullUp';
import TextScramble from '@/components/reactbits/TextScramble';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const ProcessSection = () => {
  const steps = [
    {
      num: '01',
      title: 'Create',
      desc: 'Start a project. Define your statuses, pick your colors, set up custom fields. 30 seconds.',
      visual: (
        <div className="flex flex-wrap gap-2 mt-8">
          {['Backlog', 'In Progress', 'Review', 'Done'].map((s, i) => (
            <motion.div
              key={s}
              className="px-3 py-1.5 rounded-md bg-muted border border-border text-[10px] font-mono text-muted-foreground"
              whileHover={{ scale: 1.08, borderColor: 'hsl(var(--primary))' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, ease }}
            >
              {s}
            </motion.div>
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
            {[220, 160, 340, 30, 270].map((h, i) => (
              <motion.div
                key={h}
                className="w-8 h-8 rounded-lg ring-1 ring-border cursor-pointer"
                style={{ background: `hsl(${h} 65% 52%)` }}
                whileHover={{ scale: 1.25, y: -6, rotate: 5 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 400, damping: 15 }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {['Inter', 'Grotesk', 'DM Sans'].map((f, i) => (
              <motion.div
                key={f}
                className="px-2.5 py-1 rounded-md bg-muted border border-border text-[10px] font-mono text-muted-foreground"
                whileHover={{ y: -2, borderColor: 'hsl(var(--primary))' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                {f}
              </motion.div>
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
            <motion.div
              key={v}
              className={`px-3 py-2.5 rounded-md border text-[10px] font-mono text-center cursor-pointer ${
                i === 0 ? 'border-primary/30 bg-primary/5 text-primary' : 'border-border bg-muted text-muted-foreground'
              }`}
              whileHover={{ y: -3, scale: 1.04 }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, ease }}
            >
              {v}
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="how" className="py-32 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-5">
          <motion.div
            className="h-px bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          />
          <TextScramble
            text="HOW IT WORKS"
            className="text-[11px] tracking-[0.3em] text-muted-foreground"
            speed={30}
          />
        </div>

        <LetterPullUp
          text="Three moves. Fully yours."
          className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-[1] mb-20"
        />

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.15, duration: 0.8, ease }}
            >
              <div className="bg-background p-8 md:p-10 flex flex-col h-full group hover:bg-muted/30 transition-colors duration-500">
                <motion.span
                  className="text-xs font-mono text-primary/50 mb-6 block"
                  whileHover={{ x: 4 }}
                >
                  {step.num}
                </motion.span>
                <h3 className="text-3xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{step.desc}</p>
                {step.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
