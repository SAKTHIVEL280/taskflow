import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Columns3, SlidersHorizontal, Type, Paintbrush, LayoutGrid, TableProperties } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            Task<span className="text-primary">Flow</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Start building <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero — left-aligned, asymmetric */}
      <section className="relative pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          <div>
            <motion.p
              className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease }}
            >
              Your workflow, your rules
            </motion.p>
            <motion.h1
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-8"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.1 }}
            >
              The task manager
              <br />
              you actually
              <br />
              <span className="italic font-light text-primary">design yourself.</span>
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground max-w-md leading-relaxed mb-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              Every color, font, status, field, and layout is yours to define.
              Stop adapting to your tools — make them adapt to you.
            </motion.p>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45, ease }}
            >
              <Button size="lg" asChild className="h-12 px-8 text-base">
                <Link to="/signup">Get started free</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild className="h-12 px-6 text-base text-muted-foreground">
                <a href="#how">How it works <ArrowUpRight className="ml-1.5 h-4 w-4" /></a>
              </Button>
            </motion.div>
          </div>

          {/* Right side — floating UI mockup */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main board mockup */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-2xl shadow-primary/5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-warning/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                  <span className="ml-3 text-xs text-muted-foreground font-mono">my-project</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Backlog', 'In Progress', 'Done'].map((col, ci) => (
                    <div key={col} className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-1">{col}</p>
                      {Array.from({ length: ci === 1 ? 3 : 2 }).map((_, ti) => (
                        <div key={ti} className="rounded-lg bg-background border border-border p-3">
                          <div className="h-2 rounded-full bg-muted-foreground/20 mb-2" style={{ width: `${55 + Math.random() * 35}%` }} />
                          <div className="h-1.5 rounded-full bg-muted-foreground/10" style={{ width: `${40 + Math.random() * 40}%` }} />
                          <div className="flex items-center gap-1.5 mt-3">
                            <div className="h-1.5 w-8 rounded-full" style={{ background: `hsl(${[220, 160, 340, 30, 270][ti % 5]} 70% 55%)` }} />
                            <div className="ml-auto w-4 h-4 rounded-full bg-muted" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-8 rounded-lg border border-border bg-card p-3 shadow-xl w-48">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-2">Accent color</p>
                <div className="flex gap-1.5">
                  {[220, 160, 340, 30, 270, 0].map(h => (
                    <div key={h} className="w-6 h-6 rounded-md cursor-pointer ring-1 ring-border" style={{ background: `hsl(${h} 70% 55%)` }} />
                  ))}
                </div>
              </div>
              {/* Floating font card */}
              <div className="absolute -top-4 -right-6 rounded-lg border border-border bg-card p-3 shadow-xl">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">Font</p>
                <p className="text-sm font-semibold">Space Grotesk</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="py-6 border-y border-border overflow-hidden">
        <motion.div
          className="flex gap-12 whitespace-nowrap text-sm font-mono uppercase tracking-widest text-muted-foreground/50"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="flex gap-12">
              <span>Custom Colors</span><span>·</span>
              <span>Custom Fonts</span><span>·</span>
              <span>Custom Statuses</span><span>·</span>
              <span>Custom Fields</span><span>·</span>
              <span>Kanban / List / Table</span><span>·</span>
              <span>Labels & Tags</span><span>·</span>
              <span>Subtasks</span><span>·</span>
              <span>Dark Mode</span><span>·</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* How it works — editorial 3-step */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-20 max-w-xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease }}
          >
            Three steps to your
            <br />perfect workspace.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-px bg-border rounded-xl overflow-hidden">
            {[
              { num: '01', title: 'Create a project', desc: 'Pick a color, choose your statuses, set up custom fields. Your board, your way.', icon: LayoutGrid },
              { num: '02', title: 'Make it yours', desc: 'Change the accent color, pick a font, adjust density. Every pixel responds to your taste.', icon: Paintbrush },
              { num: '03', title: 'Work your way', desc: 'Switch between Kanban, list, or table views. Add labels, subtasks, due dates — whatever you need.', icon: Columns3 },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="bg-card p-8 md:p-10"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, ease }}
              >
                <span className="text-xs font-mono text-primary mb-6 block">{step.num}</span>
                <step.icon className="h-6 w-6 text-foreground mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento feature grid */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Features
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-16 max-w-lg"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease }}
          >
            Built for people who
            <br />care about details.
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-3">
            {/* Large card */}
            <motion.div
              className="md:col-span-2 md:row-span-2 rounded-xl border border-border bg-card p-8 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ ease }}
            >
              <div>
                <SlidersHorizontal className="h-7 w-7 text-primary mb-6" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold mb-3">Total control over appearance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accent colors, 6 font families, adjustable border radius, three density modes.
                  Dark and light themes. Every setting persists and applies instantly.
                </p>
              </div>
              <div className="mt-8 flex gap-2">
                {[220, 160, 340, 30, 270].map(h => (
                  <div key={h} className="h-10 flex-1 rounded-lg" style={{ background: `hsl(${h} 70% 55%)` }} />
                ))}
              </div>
            </motion.div>

            {/* Small cards */}
            {[
              { icon: Columns3, title: 'Custom statuses', desc: 'Create your own workflow columns with custom names and colors.' },
              { icon: Type, title: 'Custom fields', desc: 'Add text, number, or date fields to tasks per project.' },
              { icon: LayoutGrid, title: 'View modes', desc: 'Kanban board, sortable list, or data table — per project.' },
              { icon: TableProperties, title: 'Labels & subtasks', desc: 'Color-coded tags and nested checklists on every task.' },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 flex flex-col"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, ease }}
              >
                <f.icon className="h-5 w-5 text-primary mb-4" strokeWidth={1.5} />
                <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-width dark band */}
      <section className="mx-6 mb-12">
        <div className="max-w-7xl mx-auto rounded-2xl bg-primary/5 border border-primary/10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Your workspace. Your rules.
            </h2>
            <p className="text-muted-foreground text-lg">Free to start. No credit card required.</p>
          </div>
          <Button size="lg" asChild className="h-12 px-10 text-base shrink-0">
            <Link to="/signup">Start building <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">© 2026 TaskFlow</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
