import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderKanban, CheckCircle2, Clock, CalendarDays, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow, isToday, parseISO } from 'date-fns';

const fadeIn = { hidden: { opacity: 0, y: 15 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) };

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

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
      <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={0}>
        <h1 className="text-3xl font-bold text-foreground">{greeting()}, {user?.displayName?.split(' ')[0]}!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your projects.</p>
      </motion.div>

      {/* Stats */}
      {wc.statsVisible && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Projects', value: stats.totalProjects, icon: FolderKanban, color: 'text-primary' },
            { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-primary' },
            { label: 'Completed', value: stats.completedTasks, icon: CheckCircle2, color: 'text-primary' },
            { label: 'Due Today', value: stats.dueToday, icon: CalendarDays, color: 'text-primary' },
          ].map((s, i) => (
            <motion.div key={s.label} initial="hidden" animate="visible" variants={fadeIn} custom={i + 1}>
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        {wc.recentProjectsVisible && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={5}>
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base font-semibold">Recent Projects</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/projects">View all <ArrowRight className="ml-1 h-3 w-3" /></Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentProjects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm mb-3">No projects yet</p>
                    <Button size="sm" asChild><Link to="/projects"><Plus className="mr-1 h-3 w-3" /> Create project</Link></Button>
                  </div>
                ) : (
                  recentProjects.map(p => (
                    <Link
                      key={p.id}
                      to={`/projects/${p.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `hsl(${p.color} / 0.15)`, color: `hsl(${p.color})` }}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{tasks.filter(t => t.projectId === p.id).length} tasks</p>
                      </div>
                    </Link>
                  ))
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Upcoming Tasks */}
        {wc.upcomingTasksVisible && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn} custom={6}>
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {upcomingTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">No upcoming tasks</p>
                  </div>
                ) : (
                  upcomingTasks.map(t => {
                    const project = projects.find(p => p.id === t.projectId);
                    return (
                      <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project ? `hsl(${project.color})` : 'hsl(var(--muted-foreground))' }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{t.title}</p>
                          <p className="text-xs text-muted-foreground">{project?.name}</p>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {t.dueDate && formatDistanceToNow(parseISO(t.dueDate), { addSuffix: true })}
                        </span>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
