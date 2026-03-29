import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Star, Trash2, Edit2, LayoutGrid, List, ArrowUpRight, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { formatDistanceToNow, parseISO } from 'date-fns';

const COLORS = [
  '220 70% 50%', '142 76% 36%', '38 92% 50%', '0 84% 60%',
  '280 65% 55%', '200 80% 50%', '340 75% 55%', '170 60% 40%',
  '45 93% 47%', '262 83% 58%',
];

const GLYPHS = ['A', 'B', 'C', 'D', 'F', 'G', 'K', 'M', 'N', 'P', 'R', 'S'];

const Projects = () => {
  const { projects, tasks, statuses, addProject, updateProject, deleteProject } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sorted = useMemo(() =>
    [...projects].sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
      return a.position - b.position;
    }),
    [projects]
  );

  const getProjectStats = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const doneStatuses = statuses.filter(s => s.projectId === projectId && s.name.toLowerCase() === 'done').map(s => s.id);
    const completed = projectTasks.filter(t => doneStatuses.includes(t.statusId)).length;
    return { total: projectTasks.length, completed };
  };

  const openCreate = () => { setEditId(null); setName(''); setDescription(''); setColor(COLORS[Math.floor(Math.random() * COLORS.length)]); setIcon(''); setDialogOpen(true); };
  const openEdit = (p: typeof projects[0]) => { setEditId(p.id); setName(p.name); setDescription(p.description); setColor(p.color); setIcon(p.icon); setDialogOpen(true); };

  const handleSave = () => {
    if (!name.trim()) { toast.error('Name is required'); return; }
    const finalIcon = icon || name.charAt(0).toUpperCase();
    if (editId) {
      updateProject(editId, { name, description, color, icon: finalIcon });
      toast.success('Project updated');
    } else {
      addProject({ name, description, color, icon: finalIcon, isFavorite: false, viewMode: 'kanban' });
      toast.success('Project created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { deleteProject(id); toast.success('Project deleted'); };
  const toggleFavorite = (id: string, current: boolean) => { updateProject(id, { isFavorite: !current }); };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {projects.length} project{projects.length !== 1 ? 's' : ''} &middot; {tasks.length} total tasks
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-accent/50 rounded-md p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate} size="sm" className="h-8 gap-1.5 text-[13px]">
                <Plus className="h-3.5 w-3.5" /> New project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base">{editId ? 'Edit project' : 'Create project'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-5 pt-2">
                {/* Preview monogram */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold tracking-tight transition-all"
                    style={{ background: `hsl(${color} / 0.12)`, color: `hsl(${color})` }}>
                    {icon || name.charAt(0).toUpperCase() || 'P'}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs text-muted-foreground">Project name</Label>
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Product Redesign" className="h-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Description</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief context about this project" rows={2} className="resize-none" />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Monogram</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {GLYPHS.map(g => (
                      <button key={g} onClick={() => setIcon(g)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold transition-all ${icon === g ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80'}`}
                      >{g}</button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setColor(c)}
                        className={`w-7 h-7 rounded-full transition-all ${color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'}`}
                        style={{ background: `hsl(${c})` }}
                      />
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full h-9 text-[13px]">{editId ? 'Save changes' : 'Create project'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Empty state */}
      {sorted.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-5">
            <Layers className="h-7 w-7 text-muted-foreground/50" />
          </div>
          <h3 className="text-base font-medium text-foreground mb-1">No projects yet</h3>
          <p className="text-sm text-muted-foreground mb-5 text-center max-w-xs">
            Create your first project and start organizing your work.
          </p>
          <Button onClick={openCreate} size="sm" className="h-8 gap-1.5 text-[13px]">
            <Plus className="h-3.5 w-3.5" /> Create project
          </Button>
        </motion.div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {sorted.map((p, i) => {
              const stats = getProjectStats(p.id);
              const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.02, duration: 0.25 }}
                  layout
                >
                  <Link to={`/projects/${p.id}`} className="group block">
                    <div className="relative border border-border/50 rounded-xl bg-card hover:border-border transition-all duration-200 hover:shadow-[0_2px_12px_-4px_hsl(var(--foreground)/0.08)]">
                      {/* Color accent line */}
                      <div className="absolute top-0 left-4 right-4 h-[2px] rounded-b opacity-60 group-hover:opacity-100 transition-opacity"
                        style={{ background: `hsl(${p.color})` }} />

                      <div className="p-4 pt-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold tracking-tight"
                            style={{ background: `hsl(${p.color} / 0.1)`, color: `hsl(${p.color})` }}>
                            {p.icon || p.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex items-center gap-0.5" onClick={e => e.preventDefault()}>
                            <button
                              onClick={() => toggleFavorite(p.id, p.isFavorite)}
                              className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
                            >
                              <Star className={`h-3.5 w-3.5 ${p.isFavorite ? 'fill-primary text-primary opacity-100' : 'text-muted-foreground'}`} />
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-accent transition-all">
                                  <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-36">
                                <DropdownMenuItem onClick={() => openEdit(p)} className="text-[13px]">
                                  <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive text-[13px]" onClick={() => handleDelete(p.id)}>
                                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        <h3 className="text-sm font-semibold text-foreground mb-0.5 truncate">{p.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-4">{p.description || 'No description'}</p>

                        {/* Progress bar */}
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 bg-accent rounded-full h-[3px] overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `hsl(${p.color})` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            />
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground tabular-nums min-w-[32px] text-right">
                            {stats.completed}/{stats.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        /* List View */
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {sorted.map((p, i) => {
              const stats = getProjectStats(p.id);
              const pct = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.02, duration: 0.2 }}
                  layout
                >
                  <Link to={`/projects/${p.id}`} className="group block">
                    <div className="flex items-center gap-4 px-4 py-3 rounded-lg border border-transparent hover:border-border/50 hover:bg-card transition-all duration-150">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `hsl(${p.color} / 0.1)`, color: `hsl(${p.color})` }}>
                        {p.icon || p.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-medium text-foreground truncate">{p.name}</h3>
                        <p className="text-[11px] text-muted-foreground truncate">{p.description || 'No description'}</p>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2 w-28">
                          <div className="flex-1 bg-accent rounded-full h-[3px] overflow-hidden">
                            <div className="h-full rounded-full" style={{ background: `hsl(${p.color})`, width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] font-medium text-muted-foreground tabular-nums">{stats.completed}/{stats.total}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground/60 w-16 text-right tabular-nums">
                          {formatDistanceToNow(parseISO(p.updatedAt), { addSuffix: false })}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5" onClick={e => e.preventDefault()}>
                        <button onClick={() => toggleFavorite(p.id, p.isFavorite)} className="p-1.5 rounded-md hover:bg-accent transition-all">
                          <Star className={`h-3 w-3 ${p.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground/40'}`} />
                        </button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-accent transition-all">
                              <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem onClick={() => openEdit(p)} className="text-[13px]"><Edit2 className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive text-[13px]" onClick={() => handleDelete(p.id)}><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Projects;
