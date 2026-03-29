import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { FolderKanban, CheckCircle2, Clock, CalendarDays, ArrowRight, ArrowUpRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, isToday, parseISO } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const { projects, tasks, statuses } = useData();
  const { settings } = useTheme();
  const wc = settings.widgetConfig;

  const stats = useMemo(() => {
    const doneStatuses = statuses.filter(s => s.name.toLowerCase() === 'done').map(s => s.id);
    const completedTasks = tasks.filter(t => doneStatuses.includes(t.statusId));
    const dueTodayTasks = tasks.filter(t => t.dueDate && isToday(parseISO(t.dueDate)) && !doneStatuses.includes(t.statusId));
    const inProgress = tasks.filter(t => !doneStatuses.includes(t.statusId));
    return {
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      dueToday: dueTodayTasks.length,
      inProgress: inProgress.length,
    };
  }, [projects, tasks, statuses]);

  const recentProjects = projects.slice().sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);
  const upcomingTasks = tasks.filter(t => t.dueDate).sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime()).slice(0, 5);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const statCards = [
    { label: 'Projects', value: stats.totalProjects, icon: FolderKanban, accent: 'hsl(var(--primary))' },
    { label: 'Active', value: stats.inProgress, icon: Clock, accent: 'hsl(38 92% 50%)' },
    { label: 'Completed', value: stats.completedTasks, icon: CheckCircle2, accent: 'hsl(142 76% 36%)' },
    { label: 'Due today', value: stats.dueToday, icon: CalendarDays, accent: 'hsl(0 84% 60%)' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {greeting()}, {user?.displayName?.split(' ')[0]}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">Here is your workspace overview.</p>
      </motion.div>

      {/* Stats */}
      {wc.statsVisible && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
            >
              <div className="border border-border/50 rounded-xl bg-card p-4 group hover:border-border transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.accent}10` }}>
                    <s.icon className="h-4 w-4" style={{ color: s.accent }} />
                  </div>
                </div>
                <p className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">{s.value}</p>
                <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Projects */}
        {wc.recentProjectsVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
          >
            <div className="border border-border/50 rounded-xl bg-card">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                <h2 className="text-[13px] font-semibold text-foreground">Recent projects</h2>
                <Button variant="ghost" size="sm" asChild className="h-7 text-[12px] text-muted-foreground hover:text-foreground -mr-2">
                  <Link to="/projects">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </div>
              <div className="p-2">
                {recentProjects.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Layers className="h-6 w-6 text-muted-foreground/30 mb-2" />
                    <p className="text-xs text-muted-foreground">No projects yet</p>
                  </div>
                ) : (
                  recentProjects.map(p => {
                    const taskCount = tasks.filter(t => t.projectId === p.id).length;
                    return (
                      <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/50 transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                          style={{ background: `hsl(${p.color} / 0.12)`, color: `hsl(${p.color})` }}>
                          {p.icon || p.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{taskCount} task{taskCount !== 1 ? 's' : ''}</p>
                        </div>
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors" />
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Upcoming Tasks */}
        {wc.upcomingTasksVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="border border-border/50 rounded-xl bg-card">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                <h2 className="text-[13px] font-semibold text-foreground">Upcoming tasks</h2>
              </div>
              <div className="p-2">
                {upcomingTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <CalendarDays className="h-6 w-6 text-muted-foreground/30 mb-2" />
                    <p className="text-xs text-muted-foreground">No upcoming tasks</p>
                  </div>
                ) : (
                  upcomingTasks.map(t => {
                    const project = projects.find(p => p.id === t.projectId);
                    return (
                      <div key={t.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: project ? `hsl(${project.color})` : 'hsl(var(--muted-foreground))' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-foreground truncate">{t.title}</p>
                          <p className="text-[10px] text-muted-foreground">{project?.name}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 tabular-nums">
                          {t.dueDate && formatDistanceToNow(parseISO(t.dueDate), { addSuffix: true })}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
