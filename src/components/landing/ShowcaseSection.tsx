import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

const ShowcaseSection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Interactive board preview */}
        <motion.div
          className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/[0.03]"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-card">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/15" />
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/15" />
            </div>
            <div className="ml-4 flex-1 flex items-center gap-3">
              <div className="h-6 px-3 rounded-md bg-muted flex items-center">
                <span className="text-[10px] font-mono text-muted-foreground">product-launch</span>
              </div>
              <div className="h-px flex-1 bg-border" />
              <span className="text-[10px] font-mono text-muted-foreground/50">Kanban view</span>
            </div>
          </div>

          {/* Board content */}
          <div className="p-6">
            <div className="grid grid-cols-4 gap-4">
              {[
                { name: 'Backlog', color: '220 10% 60%', count: 3 },
                { name: 'In Design', color: '270 70% 55%', count: 2 },
                { name: 'Building', color: '220 70% 50%', count: 4 },
                { name: 'Shipped', color: '142 70% 42%', count: 2 },
              ].map((col, ci) => (
                <div key={col.name} className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${col.color})` }} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {col.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/40 ml-auto">{col.count}</span>
                  </div>
                  {Array.from({ length: col.count }).map((_, ti) => (
                    <motion.div
                      key={ti}
                      className="rounded-lg bg-background border border-border p-3.5 group hover:border-primary/20 transition-colors cursor-default"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.08 + ti * 0.04, ease }}
                    >
                      <div
                        className="h-2 rounded bg-muted-foreground/15 mb-2.5"
                        style={{ width: `${50 + Math.random() * 40}%` }}
                      />
                      <div
                        className="h-1.5 rounded bg-muted-foreground/8"
                        style={{ width: `${30 + Math.random() * 50}%` }}
                      />
                      <div className="flex items-center justify-between mt-3.5">
                        <div className="flex gap-1">
                          <div
                            className="h-[5px] w-7 rounded-full"
                            style={{ background: `hsl(${[220, 340, 30, 160, 270][(ci + ti) % 5]} 60% 55% / 0.5)` }}
                          />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-muted border border-border" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Customization overlay hint */}
          <motion.div
            className="absolute bottom-6 right-6 rounded-xl border border-border bg-card/95 backdrop-blur-sm p-4 shadow-xl max-w-[200px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, ease }}
          >
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Your palette
            </p>
            <div className="flex gap-2 mb-3">
              {[220, 270, 340, 30, 142].map((h) => (
                <div
                  key={h}
                  className="w-7 h-7 rounded-lg ring-1 ring-border transition-transform hover:scale-110 cursor-pointer"
                  style={{ background: `hsl(${h} 65% 52%)` }}
                />
              ))}
            </div>
            <div className="h-px bg-border mb-3" />
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
              Font
            </p>
            <p className="text-xs font-semibold">Space Grotesk</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
