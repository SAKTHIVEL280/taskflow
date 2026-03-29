import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MoreHorizontal, Star, Trash2, Edit2, LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const COLORS = [
  '220 70% 50%', '142 76% 36%', '38 92% 50%', '0 84% 60%',
  '280 65% 55%', '200 80% 50%', '340 75% 55%', '170 60% 40%',
  '45 93% 47%', '262 83% 58%',
];

const ICONS = ['📋', '🚀', '💡', '🎯', '📊', '🔧', '📱', '🎨', '📦', '⭐', '🏗️', '📝'];

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.03 } }) };

const Projects = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [icon, setIcon] = useState(ICONS[0]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sorted = [...projects].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
    return a.position - b.position;
  });

  const openCreate = () => { setEditId(null); setName(''); setDescription(''); setColor(COLORS[0]); setIcon(ICONS[0]); setDialogOpen(true); };
  const openEdit = (p: typeof projects[0]) => { setEditId(p.id); setName(p.name); setDescription(p.description); setColor(p.color); setIcon(p.icon); setDialogOpen(true); };

  const handleSave = () => {
    if (!name.trim()) { toast.error('Name is required'); return; }
    if (editId) {
      updateProject(editId, { name, description, color, icon });
      toast.success('Project updated');
    } else {
      addProject({ name, description, color, icon, isFavorite: false, viewMode: 'kanban' });
      toast.success('Project created');
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { deleteProject(id); toast.success('Project deleted'); };
  const toggleFavorite = (id: string, current: boolean) => { updateProject(id, { isFavorite: !current }); };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground text-sm">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none" onClick={() => setViewMode('grid')}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none" onClick={() => setViewMode('list')}>
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> New Project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editId ? 'Edit Project' : 'New Project'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="My Project" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this project about?" rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <div className="flex flex-wrap gap-2">
                    {ICONS.map(ic => (
                      <button key={ic} onClick={() => setIcon(ic)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg border transition-all ${icon === ic ? 'border-primary bg-primary/10 scale-110' : 'border-border hover:border-primary/40'}`}
                      >{ic}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full transition-all ${color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'}`}
                        style={{ background: `hsl(${c})` }}
                      />
                    ))}
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full">{editId ? 'Save Changes' : 'Create Project'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No projects yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Create your first project to get started.</p>
          <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" /> Create Project</Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p, i) => (
            <motion.div key={p.id} initial="hidden" animate="visible" variants={fadeIn} custom={i}>
              <Link to={`/projects/${p.id}`}>
                <Card className="border-border/50 hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: `hsl(${p.color} / 0.12)` }}>
                        {p.icon}
                      </div>
                      <div className="flex items-center gap-1" onClick={e => e.preventDefault()}>
                        <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => toggleFavorite(p.id, p.isFavorite)}>
                          <Star className={`h-3.5 w-3.5 ${p.isFavorite ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEdit(p)}><Edit2 className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description || 'No description'}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-full bg-accent rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: '40%', background: `hsl(${p.color})` }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((p, i) => (
            <motion.div key={p.id} initial="hidden" animate="visible" variants={fadeIn} custom={i}>
              <Link to={`/projects/${p.id}`}>
                <Card className="border-border/50 hover:shadow-md hover:border-primary/20 transition-all group">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm" style={{ background: `hsl(${p.color} / 0.12)` }}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{p.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{p.description || 'No description'}</p>
                    </div>
                    <div className="flex items-center gap-1" onClick={e => e.preventDefault()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleFavorite(p.id, p.isFavorite)}>
                        <Star className={`h-3.5 w-3.5 ${p.isFavorite ? 'fill-primary text-primary' : ''}`} />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(p)}><Edit2 className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="h-3.5 w-3.5 mr-2" /> Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
