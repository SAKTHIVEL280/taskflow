import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSettings } from '@/types';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  accentColor: '220 70% 50%',
  font: 'Inter',
  fontSize: 'medium',
  borderRadius: 'rounded',
  density: 'comfortable',
  defaultView: 'dashboard',
  dateDisplay: 'relative',
  widgetConfig: {
    statsVisible: true,
    recentProjectsVisible: true,
    upcomingTasksVisible: true,
    activityFeedVisible: true,
    widgetOrder: ['stats', 'recentProjects', 'upcomingTasks', 'activityFeed'],
  },
};

const FONT_MAP: Record<string, string> = {
  'Inter': "'Inter', system-ui, sans-serif",
  'Poppins': "'Poppins', system-ui, sans-serif",
  'Space Grotesk': "'Space Grotesk', system-ui, sans-serif",
  'DM Sans': "'DM Sans', system-ui, sans-serif",
  'JetBrains Mono': "'JetBrains Mono', monospace",
  'Outfit': "'Outfit', system-ui, sans-serif",
};

const FONT_SIZE_MAP: Record<string, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const RADIUS_MAP: Record<string, string> = {
  sharp: '0.25rem',
  rounded: '0.625rem',
  pill: '1.25rem',
};

const DENSITY_MAP: Record<string, { padding: string; gap: string }> = {
  compact: { padding: '0.5rem', gap: '0.5rem' },
  comfortable: { padding: '1rem', gap: '1rem' },
  spacious: { padding: '1.5rem', gap: '1.5rem' },
};

interface ThemeContextType {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  updateWidgetConfig: (updates: Partial<UserSettings['widgetConfig']>) => void;
  resetSettings: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    const stored = localStorage.getItem('taskflow_settings');
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  });

  const applyTheme = useCallback((s: UserSettings) => {
    const root = document.documentElement;

    // Theme mode
    if (s.theme === 'dark') {
      root.classList.add('dark');
    } else if (s.theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // Accent color
    root.style.setProperty('--primary', s.accentColor);
    root.style.setProperty('--ring', s.accentColor);

    // Font
    const fontFamily = FONT_MAP[s.font] || FONT_MAP['Inter'];
    root.style.setProperty('--font-body', fontFamily);
    root.style.setProperty('--font-heading', fontFamily);
    document.body.style.fontFamily = fontFamily;

    // Font size
    root.style.fontSize = FONT_SIZE_MAP[s.fontSize] || '16px';

    // Radius
    root.style.setProperty('--radius', RADIUS_MAP[s.borderRadius] || '0.625rem');
  }, []);

  useEffect(() => {
    applyTheme(settings);
  }, [settings, applyTheme]);

  useEffect(() => {
    if (settings.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme(settings);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [settings, applyTheme]);

  const updateSettings = useCallback((updates: Partial<UserSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('taskflow_settings', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateWidgetConfig = useCallback((updates: Partial<UserSettings['widgetConfig']>) => {
    setSettings(prev => {
      const next = { ...prev, widgetConfig: { ...prev.widgetConfig, ...updates } };
      localStorage.setItem('taskflow_settings', JSON.stringify(next));
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    localStorage.removeItem('taskflow_settings');
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <ThemeContext.Provider value={{ settings, updateSettings, updateWidgetConfig, resetSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};
