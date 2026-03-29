import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '@/contexts/DataContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Plus, MoreHorizontal, Trash2, Edit2, ArrowLeft, Columns3, List, Table2,
  Calendar, ChevronRight, Settings2, GripVertical
} from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { Task, ProjectStatus } from '@/types';
import { cn } from '@/lib/utils';

const ProjectBoard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, statuses, tasks, subtasks, labels, updateProject, addStatus, updateStatus, deleteStatus,
    addTask, updateTask, deleteTask, moveTask, addSubtask, updateSubtask, deleteSubtask,
    getTaskLabels, assignLabel, unassignLabel, getProjectPriorities } = useData();
  const { settings } = useTheme();

  const project = projects.find(p => p.id === id);
  const projectStatuses = useMemo(() => statuses.filter(s => s.projectId === id).sort((a, b) => a.position - b.position), [statuses, id]);
  const projectTasks = useMemo(() => tasks.filter(t => t.projectId === id), [tasks, id]);
  const projectLabels = useMemo(() => labels.filter(l => l.projectId === id), [labels, id]);
  const projectPriorities = useMemo(() => getProjectPriorities(id || ''), [id, getProjectPriorities]);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskStatusId, setTaskStatusId] = useState('');
  const [newStatusName, setNewStatusName] = useState('');
  const [newStatusColor, setNewStatusColor] = useState('220 14% 80%');

  if (!project) return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold text-foreground mb-2">Project not found</h2>
      <Button variant="outline" onClick={() => navigate('/projects')}>Back to Projects</Button>
    </div>
  );

  const viewMode = project.viewMode || 'kanban';

  const openCreateTask = (statusId: string) => {
    setEditingTask(null); setTaskTitle(''); setTaskDesc(''); setTaskPriority(projectPriorities[0]?.name || 'Medium');
    setTaskDueDate(''); setTaskStatusId(statusId); setTaskDialogOpen(true);
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task); setTaskTitle(task.title); setTaskDesc(task.description); setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate || ''); setTaskStatusId(task.statusId); setTaskDialogOpen(true);
  };

  const handleSaveTask = () => {
    if (!taskTitle.trim()) { toast.error('Title is required'); return; }
    if (editingTask) {
      updateTask(editingTask.id, { title: taskTitle, description: taskDesc, priority: taskPriority, dueDate: taskDueDate || null, statusId: taskStatusId });
      toast.success('Task updated');
    } else {
      addTask({ projectId: id!, statusId: taskStatusId, title: taskTitle, description: taskDesc, priority: taskPriority, dueDate: taskDueDate || null });
      toast.success('Task created');
    }
    setTaskDialogOpen(false);
  };

  const handleAddStatus = () => {
    if (!newStatusName.trim()) { toast.error('Name required'); return; }
    addStatus({ projectId: id!, name: newStatusName, color: newStatusColor });
    setNewStatusName(''); setStatusDialogOpen(false); toast.success('Column added');
  };

  const getPriorityColor = (p: string) => {
    const found = projectPriorities.find(pr => pr.name === p);
    return found?.color || '220 14% 80%';
  };

  const formatDate = (d: string | null) => {
    if (!d) return null;
    try {
      return settings.dateDisplay === 'relative' ? formatDistanceToNow(parseISO(d), { addSuffix: true }) : format(parseISO(d), 'MMM d');
    } catch { return d; }
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const taskLabelsData = getTaskLabels(task.id);
    const taskSubtasks = subtasks.filter(s => s.taskId === task.id);
    const completedSubs = taskSubtasks.filter(s => s.completed).length;
    return (
      <Card className="border-border/50 hover:shadow-md transition-all cursor-pointer group" onClick={() => openEditTask(task)}>
        <CardContent className="p-3">
          {taskLabelsData.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {taskLabelsData.map(l => (
                <span key={l.id} className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `hsl(${l.color} / 0.15)`, color: `hsl(${l.color})` }}>
                  {l.name}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm font-medium text-foreground mb-1">{task.title}</p>
          {task.description && <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{task.description}</p>}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `hsl(${getPriorityColor(task.priority)} / 0.15)`, color: `hsl(${getPriorityColor(task.priority)})` }}>
                {task.priority}
              </span>
              {taskSubtasks.length > 0 && (
                <span className="text-[10px] text-muted-foreground">{completedSubs}/{taskSubtasks.length}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {task.dueDate && (
                <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                  <Calendar className="h-2.5 w-2.5" /> {formatDate(task.dueDate)}
                </span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {projectStatuses.filter(s => s.id !== task.statusId).map(s => (
                    <DropdownMenuItem key={s.id} onClick={(e) => { e.stopPropagation(); moveTask(task.id, s.id); toast.success(`Moved to ${s.name}`); }}>
                      <ChevronRight className="h-3 w-3 mr-2" /> Move to {s.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem className="text-destructive" onClick={e => { e.stopPropagation(); deleteTask(task.id); toast.success('Deleted'); }}>
                    <Trash2 className="h-3 w-3 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-full mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: `hsl(${project.color} / 0.12)` }}>
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-foreground truncate">{project.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            {(['kanban', 'list', 'table'] as const).map(v => (
              <Button key={v} variant={viewMode === v ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8 rounded-none"
                onClick={() => updateProject(id!, { viewMode: v })}>
                {v === 'kanban' ? <Columns3 className="h-4 w-4" /> : v === 'list' ? <List className="h-4 w-4" /> : <Table2 className="h-4 w-4" />}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setStatusDialogOpen(true)}>
            <Settings2 className="h-3.5 w-3.5 mr-1" /> Columns
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {projectStatuses.map(status => {
            const statusTasks = projectTasks.filter(t => t.statusId === status.id).sort((a, b) => a.position - b.position);
            return (
              <div key={status.id} className="flex-shrink-0 w-72">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: `hsl(${status.color})` }} />
                    <span className="text-sm font-semibold text-foreground">{status.name}</span>
                    <span className="text-xs text-muted-foreground bg-accent px-1.5 py-0.5 rounded-full">{statusTasks.length}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal className="h-3 w-3" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-destructive" onClick={() => { deleteStatus(status.id); toast.success('Column deleted'); }}>
                        <Trash2 className="h-3 w-3 mr-2" /> Delete column
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  {statusTasks.map(t => <TaskCard key={t.id} task={t} />)}
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground border border-dashed border-border hover:border-primary/30" onClick={() => openCreateTask(status.id)}>
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add task
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="flex-shrink-0 w-72">
            <Button variant="ghost" className="w-full h-10 border border-dashed border-border text-muted-foreground hover:border-primary/30" onClick={() => setStatusDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add column
            </Button>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {projectStatuses.map(status => {
            const statusTasks = projectTasks.filter(t => t.statusId === status.id).sort((a, b) => a.position - b.position);
            return (
              <div key={status.id}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: `hsl(${status.color})` }} />
                  <span className="text-sm font-semibold text-foreground">{status.name}</span>
                  <span className="text-xs text-muted-foreground">{statusTasks.length}</span>
                </div>
                <div className="space-y-1">
                  {statusTasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => openEditTask(t)}>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `hsl(${getPriorityColor(t.priority)} / 0.15)`, color: `hsl(${getPriorityColor(t.priority)})` }}>
                        {t.priority}
                      </span>
                      <span className="flex-1 text-sm text-foreground">{t.title}</span>
                      {t.dueDate && <span className="text-xs text-muted-foreground">{formatDate(t.dueDate)}</span>}
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); deleteTask(t.id); }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => openCreateTask(status.id)}>
                    <Plus className="h-3 w-3 mr-1" /> Add task
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-accent/50 text-left">
                <th className="p-3 text-xs font-semibold text-muted-foreground">Task</th>
                <th className="p-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="p-3 text-xs font-semibold text-muted-foreground">Priority</th>
                <th className="p-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                <th className="p-3 text-xs font-semibold text-muted-foreground w-10"></th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.sort((a, b) => a.position - b.position).map(t => {
                const status = projectStatuses.find(s => s.id === t.statusId);
                return (
                  <tr key={t.id} className="border-t border-border hover:bg-accent/30 cursor-pointer transition-colors" onClick={() => openEditTask(t)}>
                    <td className="p-3 text-sm text-foreground">{t.title}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `hsl(${status?.color || '220 14% 80%'} / 0.15)`, color: `hsl(${status?.color || '220 14% 80%'})` }}>
                        {status?.name}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `hsl(${getPriorityColor(t.priority)} / 0.15)`, color: `hsl(${getPriorityColor(t.priority)})` }}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{formatDate(t.dueDate) || '—'}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); deleteTask(t.id); }}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {projectTasks.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">No tasks yet</div>
          )}
        </div>
      )}

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingTask ? 'Edit Task' : 'New Task'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Task title" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder="Add details..." rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={taskStatusId} onValueChange={setTaskStatusId}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                  <SelectContent>
                    {projectPriorities.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Due date</Label>
              <Input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} />
            </div>

            {/* Subtasks for editing */}
            {editingTask && (
              <div className="space-y-2">
                <Label>Subtasks</Label>
                <div className="space-y-1">
                  {subtasks.filter(s => s.taskId === editingTask.id).sort((a, b) => a.position - b.position).map(sub => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <Checkbox checked={sub.completed} onCheckedChange={checked => updateSubtask(sub.id, { completed: !!checked })} />
                      <span className={cn('text-sm flex-1', sub.completed && 'line-through text-muted-foreground')}>{sub.title}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => deleteSubtask(sub.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  ))}
                  <SubtaskInput taskId={editingTask.id} onAdd={addSubtask} />
                </div>
              </div>
            )}

            <Button onClick={handleSaveTask} className="w-full">{editingTask ? 'Save Changes' : 'Create Task'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Columns</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              {projectStatuses.map(s => (
                <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg border border-border">
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: `hsl(${s.color})` }} />
                  <span className="flex-1 text-sm text-foreground">{s.name}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { deleteStatus(s.id); toast.success('Deleted'); }}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="New column name" value={newStatusName} onChange={e => setNewStatusName(e.target.value)} className="flex-1" />
              <Button onClick={handleAddStatus}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SubtaskInput = ({ taskId, onAdd }: { taskId: string; onAdd: (taskId: string, title: string) => void }) => {
  const [value, setValue] = useState('');
  const handle = () => { if (value.trim()) { onAdd(taskId, value.trim()); setValue(''); } };
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Add subtask..." value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handle()} className="h-8 text-sm" />
      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handle}><Plus className="h-3 w-3" /></Button>
    </div>
  );
};

export default ProjectBoard;
