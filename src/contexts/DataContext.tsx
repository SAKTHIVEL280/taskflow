import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Project, ProjectStatus, Task, Subtask, TaskLabel, TaskLabelAssignment, CustomField, PriorityLevel } from '@/types';
import { useAuth } from './AuthContext';

interface DataContextType {
  projects: Project[];
  statuses: ProjectStatus[];
  tasks: Task[];
  subtasks: Subtask[];
  labels: TaskLabel[];
  labelAssignments: TaskLabelAssignment[];
  customFields: CustomField[];
  priorities: PriorityLevel[];
  // Projects
  addProject: (p: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'position'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  // Statuses
  addStatus: (s: Omit<ProjectStatus, 'id' | 'position'>) => ProjectStatus;
  updateStatus: (id: string, updates: Partial<ProjectStatus>) => void;
  deleteStatus: (id: string) => void;
  reorderStatuses: (projectId: string, ordered: string[]) => void;
  // Tasks
  addTask: (t: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'position' | 'customFieldValues'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatusId: string) => void;
  // Subtasks
  addSubtask: (taskId: string, title: string) => Subtask;
  updateSubtask: (id: string, updates: Partial<Subtask>) => void;
  deleteSubtask: (id: string) => void;
  // Labels
  addLabel: (l: Omit<TaskLabel, 'id'>) => TaskLabel;
  updateLabel: (id: string, updates: Partial<TaskLabel>) => void;
  deleteLabel: (id: string) => void;
  assignLabel: (taskId: string, labelId: string) => void;
  unassignLabel: (taskId: string, labelId: string) => void;
  getTaskLabels: (taskId: string) => TaskLabel[];
  // Custom Fields
  addCustomField: (f: Omit<CustomField, 'id'>) => CustomField;
  updateCustomField: (id: string, updates: Partial<CustomField>) => void;
  deleteCustomField: (id: string) => void;
  // Priorities
  addPriority: (p: Omit<PriorityLevel, 'id' | 'position'>) => PriorityLevel;
  updatePriority: (id: string, updates: Partial<PriorityLevel>) => void;
  deletePriority: (id: string) => void;
  getProjectPriorities: (projectId: string) => PriorityLevel[];
}

const DataContext = createContext<DataContextType | null>(null);
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

const load = <T,>(key: string): T[] => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};
const save = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.id || '';

  const [projects, setProjects] = useState<Project[]>([]);
  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [labels, setLabels] = useState<TaskLabel[]>([]);
  const [labelAssignments, setLabelAssignments] = useState<TaskLabelAssignment[]>([]);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [priorities, setPriorities] = useState<PriorityLevel[]>([]);

  useEffect(() => {
    if (!uid) { setProjects([]); setStatuses([]); setTasks([]); setSubtasks([]); setLabels([]); setLabelAssignments([]); setCustomFields([]); setPriorities([]); return; }
    setProjects(load<Project>(`tf_projects_${uid}`));
    setStatuses(load<ProjectStatus>(`tf_statuses_${uid}`));
    setTasks(load<Task>(`tf_tasks_${uid}`));
    setSubtasks(load<Subtask>(`tf_subtasks_${uid}`));
    setLabels(load<TaskLabel>(`tf_labels_${uid}`));
    setLabelAssignments(load<TaskLabelAssignment>(`tf_labelassign_${uid}`));
    setCustomFields(load<CustomField>(`tf_customfields_${uid}`));
    setPriorities(load<PriorityLevel>(`tf_priorities_${uid}`));
  }, [uid]);

  const persist = useCallback((key: string, data: any) => { if (uid) save(`${key}_${uid}`, data); }, [uid]);

  // Projects
  const addProject = useCallback((p: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'position'>) => {
    const proj: Project = { ...p, id: crypto.randomUUID(), userId: uid, position: projects.length, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const next = [...projects, proj];
    setProjects(next); persist('tf_projects', next);
    // Default statuses
    const defaultStatuses: ProjectStatus[] = [
      { id: crypto.randomUUID(), projectId: proj.id, name: 'To Do', color: '220 14% 80%', position: 0 },
      { id: crypto.randomUUID(), projectId: proj.id, name: 'In Progress', color: '38 92% 50%', position: 1 },
      { id: crypto.randomUUID(), projectId: proj.id, name: 'Done', color: '142 76% 36%', position: 2 },
    ];
    const nextS = [...statuses, ...defaultStatuses];
    setStatuses(nextS); persist('tf_statuses', nextS);
    // Default priorities
    const defaultPriorities: PriorityLevel[] = [
      { id: crypto.randomUUID(), projectId: proj.id, name: 'Low', color: '142 76% 36%', position: 0 },
      { id: crypto.randomUUID(), projectId: proj.id, name: 'Medium', color: '38 92% 50%', position: 1 },
      { id: crypto.randomUUID(), projectId: proj.id, name: 'High', color: '0 84% 60%', position: 2 },
    ];
    const nextP = [...priorities, ...defaultPriorities];
    setPriorities(nextP); persist('tf_priorities', nextP);
    return proj;
  }, [projects, statuses, priorities, uid, persist]);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    const next = projects.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    setProjects(next); persist('tf_projects', next);
  }, [projects, persist]);

  const deleteProject = useCallback((id: string) => {
    const next = projects.filter(p => p.id !== id);
    setProjects(next); persist('tf_projects', next);
    const nextS = statuses.filter(s => s.projectId !== id);
    setStatuses(nextS); persist('tf_statuses', nextS);
    const nextT = tasks.filter(t => t.projectId !== id);
    setTasks(nextT); persist('tf_tasks', nextT);
    const nextL = labels.filter(l => l.projectId !== id);
    setLabels(nextL); persist('tf_labels', nextL);
    const nextCF = customFields.filter(f => f.projectId !== id);
    setCustomFields(nextCF); persist('tf_customfields', nextCF);
    const nextPr = priorities.filter(p => p.projectId !== id);
    setPriorities(nextPr); persist('tf_priorities', nextPr);
  }, [projects, statuses, tasks, labels, customFields, priorities, persist]);

  // Statuses
  const addStatus = useCallback((s: Omit<ProjectStatus, 'id' | 'position'>) => {
    const status: ProjectStatus = { ...s, id: crypto.randomUUID(), position: statuses.filter(x => x.projectId === s.projectId).length };
    const next = [...statuses, status]; setStatuses(next); persist('tf_statuses', next); return status;
  }, [statuses, persist]);

  const updateStatus = useCallback((id: string, updates: Partial<ProjectStatus>) => {
    const next = statuses.map(s => s.id === id ? { ...s, ...updates } : s);
    setStatuses(next); persist('tf_statuses', next);
  }, [statuses, persist]);

  const deleteStatus = useCallback((id: string) => {
    const next = statuses.filter(s => s.id !== id); setStatuses(next); persist('tf_statuses', next);
    const nextT = tasks.filter(t => t.statusId !== id); setTasks(nextT); persist('tf_tasks', nextT);
  }, [statuses, tasks, persist]);

  const reorderStatuses = useCallback((projectId: string, ordered: string[]) => {
    const next = statuses.map(s => {
      if (s.projectId !== projectId) return s;
      const idx = ordered.indexOf(s.id);
      return idx >= 0 ? { ...s, position: idx } : s;
    });
    setStatuses(next); persist('tf_statuses', next);
  }, [statuses, persist]);

  // Tasks
  const addTask = useCallback((t: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'position' | 'customFieldValues'>) => {
    const task: Task = { ...t, id: crypto.randomUUID(), position: tasks.filter(x => x.statusId === t.statusId).length, customFieldValues: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const next = [...tasks, task]; setTasks(next); persist('tf_tasks', next); return task;
  }, [tasks, persist]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    const next = tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t);
    setTasks(next); persist('tf_tasks', next);
  }, [tasks, persist]);

  const deleteTask = useCallback((id: string) => {
    const next = tasks.filter(t => t.id !== id); setTasks(next); persist('tf_tasks', next);
    const nextSub = subtasks.filter(s => s.taskId !== id); setSubtasks(nextSub); persist('tf_subtasks', nextSub);
  }, [tasks, subtasks, persist]);

  const moveTask = useCallback((taskId: string, newStatusId: string) => {
    const next = tasks.map(t => t.id === taskId ? { ...t, statusId: newStatusId, updatedAt: new Date().toISOString() } : t);
    setTasks(next); persist('tf_tasks', next);
  }, [tasks, persist]);

  // Subtasks
  const addSubtask = useCallback((taskId: string, title: string) => {
    const sub: Subtask = { id: crypto.randomUUID(), taskId, title, completed: false, position: subtasks.filter(s => s.taskId === taskId).length };
    const next = [...subtasks, sub]; setSubtasks(next); persist('tf_subtasks', next); return sub;
  }, [subtasks, persist]);

  const updateSubtask = useCallback((id: string, updates: Partial<Subtask>) => {
    const next = subtasks.map(s => s.id === id ? { ...s, ...updates } : s);
    setSubtasks(next); persist('tf_subtasks', next);
  }, [subtasks, persist]);

  const deleteSubtask = useCallback((id: string) => {
    const next = subtasks.filter(s => s.id !== id); setSubtasks(next); persist('tf_subtasks', next);
  }, [subtasks, persist]);

  // Labels
  const addLabel = useCallback((l: Omit<TaskLabel, 'id'>) => {
    const label: TaskLabel = { ...l, id: crypto.randomUUID() };
    const next = [...labels, label]; setLabels(next); persist('tf_labels', next); return label;
  }, [labels, persist]);

  const updateLabel = useCallback((id: string, updates: Partial<TaskLabel>) => {
    const next = labels.map(l => l.id === id ? { ...l, ...updates } : l);
    setLabels(next); persist('tf_labels', next);
  }, [labels, persist]);

  const deleteLabel = useCallback((id: string) => {
    const next = labels.filter(l => l.id !== id); setLabels(next); persist('tf_labels', next);
    const nextA = labelAssignments.filter(a => a.labelId !== id); setLabelAssignments(nextA); persist('tf_labelassign', nextA);
  }, [labels, labelAssignments, persist]);

  const assignLabel = useCallback((taskId: string, labelId: string) => {
    if (labelAssignments.find(a => a.taskId === taskId && a.labelId === labelId)) return;
    const next = [...labelAssignments, { taskId, labelId }]; setLabelAssignments(next); persist('tf_labelassign', next);
  }, [labelAssignments, persist]);

  const unassignLabel = useCallback((taskId: string, labelId: string) => {
    const next = labelAssignments.filter(a => !(a.taskId === taskId && a.labelId === labelId));
    setLabelAssignments(next); persist('tf_labelassign', next);
  }, [labelAssignments, persist]);

  const getTaskLabels = useCallback((taskId: string) => {
    const ids = labelAssignments.filter(a => a.taskId === taskId).map(a => a.labelId);
    return labels.filter(l => ids.includes(l.id));
  }, [labelAssignments, labels]);

  // Custom Fields
  const addCustomField = useCallback((f: Omit<CustomField, 'id'>) => {
    const field: CustomField = { ...f, id: crypto.randomUUID() };
    const next = [...customFields, field]; setCustomFields(next); persist('tf_customfields', next); return field;
  }, [customFields, persist]);

  const updateCustomField = useCallback((id: string, updates: Partial<CustomField>) => {
    const next = customFields.map(f => f.id === id ? { ...f, ...updates } : f);
    setCustomFields(next); persist('tf_customfields', next);
  }, [customFields, persist]);

  const deleteCustomField = useCallback((id: string) => {
    const next = customFields.filter(f => f.id !== id); setCustomFields(next); persist('tf_customfields', next);
  }, [customFields, persist]);

  // Priorities
  const addPriority = useCallback((p: Omit<PriorityLevel, 'id' | 'position'>) => {
    const priority: PriorityLevel = { ...p, id: crypto.randomUUID(), position: priorities.filter(x => x.projectId === p.projectId).length };
    const next = [...priorities, priority]; setPriorities(next); persist('tf_priorities', next); return priority;
  }, [priorities, persist]);

  const updatePriority = useCallback((id: string, updates: Partial<PriorityLevel>) => {
    const next = priorities.map(p => p.id === id ? { ...p, ...updates } : p);
    setPriorities(next); persist('tf_priorities', next);
  }, [priorities, persist]);

  const deletePriority = useCallback((id: string) => {
    const next = priorities.filter(p => p.id !== id); setPriorities(next); persist('tf_priorities', next);
  }, [priorities, persist]);

  const getProjectPriorities = useCallback((projectId: string) => {
    return priorities.filter(p => p.projectId === projectId).sort((a, b) => a.position - b.position);
  }, [priorities]);

  return (
    <DataContext.Provider value={{
      projects, statuses, tasks, subtasks, labels, labelAssignments, customFields, priorities,
      addProject, updateProject, deleteProject,
      addStatus, updateStatus, deleteStatus, reorderStatuses,
      addTask, updateTask, deleteTask, moveTask,
      addSubtask, updateSubtask, deleteSubtask,
      addLabel, updateLabel, deleteLabel, assignLabel, unassignLabel, getTaskLabels,
      addCustomField, updateCustomField, deleteCustomField,
      addPriority, updatePriority, deletePriority, getProjectPriorities,
    }}>
      {children}
    </DataContext.Provider>
  );
};
