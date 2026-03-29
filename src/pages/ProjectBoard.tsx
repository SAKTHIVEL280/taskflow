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
  Plus, MoreHorizontal, Trash2, ArrowLeft, Columns3, List, Table2,
  Calendar, ChevronRight, Settings2
} from 'lucide-react';
import { toast } from 'sonner';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { Task, ProjectStatus } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <h2 className="text-base font-medium text-foreground mb-2">Project not found</h2>
      <Button variant="outline" size="sm" onClick={() => navigate('/projects')} className="h-8 text-[13px]">Back to projects</Button>
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
      <div
        className="border border-border/40 rounded-lg bg-card p-3 cursor-pointer group hover:border-border hover:shadow-[0_1px_6px_-2px_hsl(var(--foreground)/0.06)] transition-all duration-150"
        onClick={() => openEditTask(task)}
      >
        {taskLabelsData.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {taskLabelsData.map(l => (
              <span key={l.id} className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                style={{ background: `hsl(${l.color} / 0.12)`, color: `hsl(${l.color})` }}>
                {l.name}
              </span>
            ))}
          </div>
        )}
        <p className="text-[13px] font-medium text-foreground mb-1 leading-snug">{task.title}</p>
        {task.description && <p className="text-[11px] text-muted-foreground line-clamp-2 mb-2 leading-relaxed">{task.description}</p>}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: `hsl(${getPriorityColor(task.priority)} / 0.12)`, color: `hsl(${getPriorityColor(task.priority)})` }}>
              {task.priority}
            </span>
            {taskSubtasks.length > 0 && (
              <span className="text-[9px] text-muted-foreground tabular-nums">{completedSubs}/{taskSubtasks.length}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {task.dueDate && (
              <span className="text-[9px] text-muted-foreground flex items-center gap-0.5 tabular-nums">
                <Calendar className="h-2.5 w-2.5" /> {formatDate(task.dueDate)}
              </span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                <button className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-accent transition-all">
                  <MoreHorizontal className="h-3 w-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {projectStatuses.filter(s => s.id !== task.statusId).map(s => (
                  <DropdownMenuItem key={s.id} className="text-[12px]" onClick={(e) => { e.stopPropagation(); moveTask(task.id, s.id); toast.success(`Moved to ${s.name}`); }}>
                    <ChevronRight className="h-3 w-3 mr-1.5" /> Move to {s.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="text-destructive text-[12px]" onClick={e => { e.stopPropagation(); deleteTask(task.id); toast.success('Deleted'); }}>
                  <Trash2 className="h-3 w-3 mr-1.5" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')} className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: `hsl(${project.color} / 0.12)`, color: `hsl(${project.color})` }}>
          {project.icon || project.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-semibold tracking-tight text-foreground truncate">{project.name}</h1>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-accent/50 rounded-md p-0.5">
            {(['kanban', 'list', 'table'] as const).map(v => (
              <button key={v} onClick={() => updateProject(id!, { viewMode: v })}
                className={`p-1.5 rounded transition-all ${viewMode === v ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {v === 'kanban' ? <Columns3 className="h-3.5 w-3.5" /> : v === 'list' ? <List className="h-3.5 w-3.5" /> : <Table2 className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setStatusDialogOpen(true)} className="h-8 text-[12px] gap-1">
            <Settings2 className="h-3 w-3" /> Columns
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {projectStatuses.map(status => {
            const statusTasks = projectTasks.filter(t => t.statusId === status.id).sort((a, b) => a.position - b.position);
            return (
              <div key={status.id} className="flex-shrink-0 w-72">
                <div className="flex items-center justify-between mb-3 px-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${status.color})` }} />
                    <span className="text-[12px] font-semibold text-foreground tracking-tight">{status.name}</span>
                    <span className="text-[10px] text-muted-foreground/60 tabular-nums">{statusTasks.length}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-accent transition-all">
                        <MoreHorizontal className="h-3 w-3 text-muted-foreground/50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="text-destructive text-[12px]" onClick={() => { deleteStatus(status.id); toast.success('Column deleted'); }}>
                        <Trash2 className="h-3 w-3 mr-1.5" /> Delete column
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  {statusTasks.map(t => <TaskCard key={t.id} task={t} />)}
                  <button
                    onClick={() => openCreateTask(status.id)}
                    className="w-full py-2 rounded-lg border border-dashed border-border/60 text-[12px] text-muted-foreground/60 hover:text-muted-foreground hover:border-border transition-all"
                  >
                    + Add task
                  </button>
                </div>
              </div>
            );
          })}
          <div className="flex-shrink-0 w-72">
            <button
              onClick={() => setStatusDialogOpen(true)}
              className="w-full h-10 rounded-lg border border-dashed border-border/60 text-[12px] text-muted-foreground/60 hover:text-muted-foreground hover:border-border transition-all"
            >
              + Add column
            </button>
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
                <div className="flex items-center gap-2 mb-2 px-0.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: `hsl(${status.color})` }} />
                  <span className="text-[12px] font-semibold text-foreground">{status.name}</span>
                  <span className="text-[10px] text-muted-foreground/60 tabular-nums">{statusTasks.length}</span>
                </div>
                <div className="space-y-1">
                  {statusTasks.map(t => (
                    <div key={t.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent hover:border-border/50 hover:bg-card transition-all cursor-pointer"
                      onClick={() => openEditTask(t)}>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                        style={{ background: `hsl(${getPriorityColor(t.priority)} / 0.12)`, color: `hsl(${getPriorityColor(t.priority)})` }}>
                        {t.priority}
                      </span>
                      <span className="flex-1 text-[13px] text-foreground truncate">{t.title}</span>
                      {t.dueDate && <span className="text-[10px] text-muted-foreground tabular-nums">{formatDate(t.dueDate)}</span>}
                      <button onClick={e => { e.stopPropagation(); deleteTask(t.id); }} className="p-1 rounded hover:bg-accent opacity-0 hover:opacity-100 transition-all">
                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => openCreateTask(status.id)}
                    className="text-[12px] text-muted-foreground/60 hover:text-muted-foreground px-3 py-1.5 transition-colors">
                    + Add task
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-accent/30 border-b border-border/40">
                <th className="p-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
                <th className="p-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="p-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
                <th className="p-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Due</th>
                <th className="p-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.sort((a, b) => a.position - b.position).map(t => {
                const status = projectStatuses.find(s => s.id === t.statusId);
                return (
                  <tr key={t.id} className="border-b border-border/30 last:border-0 hover:bg-accent/20 cursor-pointer transition-colors" onClick={() => openEditTask(t)}>
                    <td className="p-3 text-[13px] text-foreground">{t.title}</td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{ background: `hsl(${status?.color || '220 14% 80%'} / 0.12)`, color: `hsl(${status?.color || '220 14% 80%'})` }}>
                        {status?.name}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                        style={{ background: `hsl(${getPriorityColor(t.priority)} / 0.12)`, color: `hsl(${getPriorityColor(t.priority)})` }}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="p-3 text-[11px] text-muted-foreground tabular-nums">{formatDate(t.dueDate) || '\u2014'}</td>
                    <td className="p-3">
                      <button onClick={e => { e.stopPropagation(); deleteTask(t.id); }} className="p-1 rounded hover:bg-accent transition-all">
                        <Trash2 className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {projectTasks.length === 0 && (
            <div className="py-12 text-center text-[13px] text-muted-foreground">No tasks yet</div>
          )}
        </div>
      )}

      {/* Task Dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">{editingTask ? 'Edit task' : 'New task'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Title</Label>
              <Input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="What needs to be done?" className="h-9 text-[13px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Description</Label>
              <Textarea value={taskDesc} onChange={e => setTaskDesc(e.target.value)} placeholder="Add context..." rows={2} className="text-[13px] resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Status</Label>
                <Select value={taskStatusId} onValueChange={setTaskStatusId}>
                  <SelectTrigger className="h-9 text-[13px]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {projectStatuses.map(s => <SelectItem key={s.id} value={s.id} className="text-[13px]">{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Priority</Label>
                <Select value={taskPriority} onValueChange={setTaskPriority}>
                  <SelectTrigger className="h-9 text-[13px]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {projectPriorities.map(p => <SelectItem key={p.id} value={p.name} className="text-[13px]">{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Due date</Label>
              <Input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} className="h-9 text-[13px]" />
            </div>

            {/* Subtasks */}
            {editingTask && (
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Subtasks</Label>
                <div className="space-y-1">
                  {subtasks.filter(s => s.taskId === editingTask.id).sort((a, b) => a.position - b.position).map(sub => (
                    <div key={sub.id} className="flex items-center gap-2">
                      <Checkbox checked={sub.completed} onCheckedChange={checked => updateSubtask(sub.id, { completed: !!checked })} />
                      <span className={cn('text-[13px] flex-1', sub.completed && 'line-through text-muted-foreground')}>{sub.title}</span>
                      <button onClick={() => deleteSubtask(sub.id)} className="p-1 rounded hover:bg-accent">
                        <Trash2 className="h-2.5 w-2.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                  <SubtaskInput taskId={editingTask.id} onAdd={addSubtask} />
                </div>
              </div>
            )}

            <Button onClick={handleSaveTask} className="w-full h-9 text-[13px]">{editingTask ? 'Save changes' : 'Create task'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Manage columns</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              {projectStatuses.map(s => (
                <div key={s.id} className="flex items-center gap-2.5 py-2 px-1">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: `hsl(${s.color})` }} />
                  <span className="flex-1 text-[13px] text-foreground">{s.name}</span>
                  <button onClick={() => { deleteStatus(s.id); toast.success('Deleted'); }} className="p-1 rounded hover:bg-accent">
                    <Trash2 className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Column name" value={newStatusName} onChange={e => setNewStatusName(e.target.value)} className="flex-1 h-9 text-[13px]" />
              <Button onClick={handleAddStatus} size="sm" className="h-9"><Plus className="h-3.5 w-3.5" /></Button>
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
      <Input placeholder="Add subtask..." value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handle()} className="h-8 text-[12px]" />
      <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={handle}><Plus className="h-3 w-3" /></Button>
    </div>
  );
};

export default ProjectBoard;
