import { motion } from 'framer-motion';
import Tilt3D from '@/components/reactbits/Tilt3D';
import ClipReveal from '@/components/reactbits/ClipReveal';

const ShowcaseSection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <ClipReveal direction="up" duration={1.2}>
          <Tilt3D intensity={5} className="group">
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/[0.04]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-card">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/40" />
                </div>
                <div className="ml-4 flex-1 flex items-center gap-3">
                  <div className="h-6 px-3 rounded-md bg-muted flex items-center">
                    <span className="text-[10px] font-mono text-muted-foreground">product-launch</span>
                  </div>
                  <div className="hidden md:flex items-center gap-2 ml-auto">
                    {['Kanban', 'List', 'Table'].map((v, i) => (
                      <div
                        key={v}
                        className={`h-6 px-2.5 rounded-md flex items-center text-[10px] font-mono ${
                          i === 0 ? 'bg-primary/10 text-primary' : 'text-muted-foreground/50'
                        }`}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Board content — staggered card entrance */}
              <div className="p-5 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {[
                    { name: 'Backlog', hue: 220, count: 3 },
                    { name: 'In Design', hue: 270, count: 2 },
                    { name: 'Building', hue: 200, count: 4 },
                    { name: 'Shipped', hue: 142, count: 2 },
                  ].map((col, ci) => (
                    <div key={col.name} className="space-y-2.5">
                      <div className="flex items-center gap-2 px-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: `hsl(${col.hue} 65% 52%)` }}
                        />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {col.name}
                        </span>
                        <span className="text-[9px] text-muted-foreground/30 ml-auto font-mono">{col.count}</span>
                      </div>
                      {Array.from({ length: col.count }).map((_, ti) => (
                        <motion.div
                          key={ti}
                          className="rounded-lg bg-background border border-border p-3 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] transition-all duration-300"
                          initial={{ opacity: 0, y: 20, rotateX: -10 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.3 + ci * 0.12 + ti * 0.06,
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div
                            className="h-2 rounded bg-muted-foreground/12 mb-2"
                            style={{ width: `${50 + Math.random() * 40}%` }}
                          />
                          <div
                            className="h-1.5 rounded bg-muted-foreground/6"
                            style={{ width: `${30 + Math.random() * 50}%` }}
                          />
                          <div className="flex items-center justify-between mt-3">
                            <div
                              className="h-[4px] w-6 rounded-full"
                              style={{
                                background: `hsl(${[220, 340, 30, 160, 270][(ti + col.hue) % 5]} 55% 55% / 0.4)`,
                              }}
                            />
                            <div className="w-4 h-4 rounded-full bg-muted border border-border" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating customization card */}
              <motion.div
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 rounded-xl border border-border bg-card/95 backdrop-blur-sm p-4 shadow-2xl max-w-[200px]"
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Your palette
                </p>
                <div className="flex gap-1.5 mb-3">
                  {[220, 270, 340, 30, 142].map((h) => (
                    <motion.div
                      key={h}
                      className="w-6 h-6 rounded-lg ring-1 ring-border"
                      style={{ background: `hsl(${h} 65% 52%)` }}
                      whileHover={{ scale: 1.3, y: -4 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    />
                  ))}
                </div>
                <div className="h-px bg-border mb-3" />
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground">Font</p>
                  <p className="text-[11px] font-semibold">Space Grotesk</p>
                </div>
              </motion.div>
            </div>
          </Tilt3D>
        </ClipReveal>
      </div>
    </section>
  );
};

export default ShowcaseSection;
