import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Layout, Palette, CheckCircle2, Layers, Sparkles, Zap, Shield, Star } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }),
};

const features = [
  { icon: Palette, title: 'Fully Customizable', desc: 'Change every color, font, layout, and density. Make it truly yours.' },
  { icon: Layout, title: 'Flexible Views', desc: 'Kanban boards, lists, or tables — switch views per project instantly.' },
  { icon: Layers, title: 'Custom Statuses', desc: "Create your own columns. To Do, In Progress, QA, Review — you decide." },
  { icon: Sparkles, title: 'Custom Fields', desc: 'Add text, number, date fields to tasks. Track what matters to you.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Instant updates, smooth animations. Built for speed and delight.' },
  { icon: Shield, title: 'Private & Secure', desc: 'Your data stays yours. Full privacy with per-user isolation.' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Designer', text: "Finally a task manager that doesn't force me into someone else's workflow.", stars: 5 },
  { name: 'Marcus Rodriguez', role: 'Engineering Lead', text: "The customization is unreal. Every team member has their own perfect setup.", stars: 5 },
  { name: 'Aiko Tanaka', role: 'Freelance Developer', text: "Clean, fast, and endlessly flexible. Switched from Notion and never looked back.", stars: 5 },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
            Task<span className="text-primary">Flow</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild><Link to="/login">Log in</Link></Button>
            <Button asChild><Link to="/signup">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6">
              Your workflow, your rules
            </span>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
          >
            Task management that{' '}
            <span className="text-primary">adapts to you</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            Customize everything — colors, fonts, layouts, statuses, fields.
            Build the perfect workspace that works exactly how you think.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
            <Button size="lg" asChild className="text-base px-8 h-12">
              <Link to="/signup">Start for free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 h-12">
              <a href="#features">See features</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything is customizable</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No compromises. Every detail of your workspace can be tailored to your exact needs.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50 bg-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Loved by teams everywhere</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 text-sm leading-relaxed">"{t.text}"</p>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.name}</p>
                      <p className="text-muted-foreground text-xs">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Simple pricing</h2>
            <p className="text-muted-foreground text-lg">Start free, upgrade when you need more.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <Card className="h-full">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-1">Free</h3>
                  <p className="text-muted-foreground text-sm mb-6">Perfect to get started</p>
                  <p className="text-4xl font-bold text-foreground mb-6">$0<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-3 mb-8">
                    {['Up to 5 projects', 'Unlimited tasks', 'Full customization', 'All view modes'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" asChild><Link to="/signup">Get Started</Link></Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <Card className="h-full border-primary/30 shadow-lg shadow-primary/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">Popular</div>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-1">Pro</h3>
                  <p className="text-muted-foreground text-sm mb-6">For power users</p>
                  <p className="text-4xl font-bold text-foreground mb-6">$9<span className="text-lg font-normal text-muted-foreground">/mo</span></p>
                  <ul className="space-y-3 mb-8">
                    {['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team sharing (soon)'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild><Link to="/signup">Upgrade to Pro</Link></Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to build your perfect workspace?</h2>
            <p className="text-muted-foreground text-lg mb-8">Join thousands of people who've made task management truly their own.</p>
            <Button size="lg" asChild className="text-base px-8 h-12">
              <Link to="/signup">Get started — it's free <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 TaskFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
