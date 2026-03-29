export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string; // HSL string like "220 70% 50%"
  font: string;
  fontSize: 'small' | 'medium' | 'large';
  borderRadius: 'sharp' | 'rounded' | 'pill';
  density: 'compact' | 'comfortable' | 'spacious';
  defaultView: 'dashboard' | 'projects';
  dateDisplay: 'relative' | 'absolute';
  widgetConfig: WidgetConfig;
}

export interface WidgetConfig {
  statsVisible: boolean;
  recentProjectsVisible: boolean;
  upcomingTasksVisible: boolean;
  activityFeedVisible: boolean;
  widgetOrder: string[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  position: number;
  isFavorite: boolean;
  viewMode: 'kanban' | 'list' | 'table';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStatus {
  id: string;
  projectId: string;
  name: string;
  color: string;
  position: number;
}

export interface Task {
  id: string;
  projectId: string;
  statusId: string;
  title: string;
  description: string;
  priority: string;
  dueDate: string | null;
  position: number;
  customFieldValues: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  position: number;
}

export interface TaskLabel {
  id: string;
  projectId: string;
  name: string;
  color: string;
}

export interface TaskLabelAssignment {
  taskId: string;
  labelId: string;
}

export interface CustomField {
  id: string;
  projectId: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  options?: string[];
}

export interface PriorityLevel {
  id: string;
  projectId: string;
  name: string;
  color: string;
  position: number;
}
