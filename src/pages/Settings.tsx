import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Sun, Moon, Monitor, RotateCcw } from 'lucide-react';

const ACCENT_COLORS = [
  { name: 'Blue', value: '220 70% 50%' },
  { name: 'Violet', value: '262 83% 58%' },
  { name: 'Rose', value: '340 75% 55%' },
  { name: 'Orange', value: '25 95% 53%' },
  { name: 'Green', value: '142 76% 36%' },
  { name: 'Teal', value: '170 60% 40%' },
  { name: 'Amber', value: '38 92% 50%' },
  { name: 'Red', value: '0 84% 60%' },
  { name: 'Cyan', value: '200 80% 50%' },
  { name: 'Pink', value: '330 80% 60%' },
];

const FONTS = ['Inter', 'Poppins', 'Space Grotesk', 'DM Sans', 'JetBrains Mono', 'Outfit'];

const Settings = () => {
  const { user, updateProfile, updatePassword } = useAuth();
  const { settings, updateSettings, updateWidgetConfig, resetSettings } = useTheme();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = () => {
    if (!displayName.trim()) { toast.error('Name required'); return; }
    updateProfile({ displayName });
    toast.success('Profile updated');
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    await updatePassword(newPassword);
    setNewPassword('');
    toast.success('Password updated');
  };

  const Section = ({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) => (
    <div className="border border-border/50 rounded-xl bg-card">
      <div className="px-5 py-4 border-b border-border/40">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {desc && <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <div className="p-5 space-y-5">{children}</div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Configure your workspace</p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-5">
        <TabsList className="bg-accent/50 p-0.5 h-auto">
          <TabsTrigger value="appearance" className="text-[13px] h-8 data-[state=active]:shadow-sm">Appearance</TabsTrigger>
          <TabsTrigger value="dashboard" className="text-[13px] h-8 data-[state=active]:shadow-sm">Dashboard</TabsTrigger>
          <TabsTrigger value="account" className="text-[13px] h-8 data-[state=active]:shadow-sm">Account</TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-4">
          <Section title="Theme mode" desc="Control how TaskFlow looks in your environment">
            <div className="grid grid-cols-3 gap-2">
              {[
                { mode: 'light' as const, icon: Sun, label: 'Light' },
                { mode: 'dark' as const, icon: Moon, label: 'Dark' },
                { mode: 'system' as const, icon: Monitor, label: 'System' },
              ].map(({ mode, icon: Icon, label }) => (
                <button key={mode} onClick={() => updateSettings({ theme: mode })}
                  className={cn(
                    'flex items-center justify-center gap-2 h-9 rounded-lg text-[13px] font-medium transition-all border',
                    settings.theme === mode
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                  )}>
                  <Icon className="h-3.5 w-3.5" /> {label}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Accent color" desc="Applied across buttons, links, and active states">
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_COLORS.map(c => (
                <button key={c.value} onClick={() => updateSettings({ accentColor: c.value })}
                  className={cn(
                    'w-8 h-8 rounded-full transition-all relative',
                    settings.accentColor === c.value ? 'ring-2 ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'
                  )}
                  style={{
                    background: `hsl(${c.value})`,
                    ...(settings.accentColor === c.value ? { boxShadow: `0 0 0 2px hsl(${c.value})` } : {})
                  }}
                  title={c.name}
                />
              ))}
            </div>
          </Section>

          <Section title="Typography">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Font family</Label>
                <Select value={settings.font} onValueChange={v => updateSettings({ font: v })}>
                  <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONTS.map(f => (
                      <SelectItem key={f} value={f} className="text-[13px]" style={{ fontFamily: f }}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Font size</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'medium', 'large'] as const).map(s => (
                    <button key={s} onClick={() => updateSettings({ fontSize: s })}
                      className={cn(
                        'h-8 rounded-md text-[12px] font-medium transition-all border capitalize',
                        settings.fontSize === s
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      )}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Layout">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Border radius</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sharp', 'rounded', 'pill'] as const).map(r => (
                    <button key={r} onClick={() => updateSettings({ borderRadius: r })}
                      className={cn(
                        'h-8 rounded-md text-[12px] font-medium transition-all border capitalize',
                        settings.borderRadius === r
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      )}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Density</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'comfortable', 'spacious'] as const).map(d => (
                    <button key={d} onClick={() => updateSettings({ density: d })}
                      className={cn(
                        'h-8 rounded-md text-[12px] font-medium transition-all border capitalize',
                        settings.density === d
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      )}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Date display</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['relative', 'absolute'] as const).map(d => (
                    <button key={d} onClick={() => updateSettings({ dateDisplay: d })}
                      className={cn(
                        'h-8 rounded-md text-[12px] font-medium transition-all border',
                        settings.dateDisplay === d
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      )}>
                      {d === 'relative' ? 'Relative' : 'Absolute'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <button onClick={resetSettings} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors px-1">
            <RotateCcw className="h-3 w-3" /> Reset to defaults
          </button>
        </TabsContent>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="space-y-4">
          <Section title="Widgets" desc="Toggle which sections appear on your dashboard">
            <div className="space-y-3">
              {[
                { key: 'statsVisible' as const, label: 'Statistics', desc: 'Project and task counts' },
                { key: 'recentProjectsVisible' as const, label: 'Recent projects', desc: 'Recently updated projects' },
                { key: 'upcomingTasksVisible' as const, label: 'Upcoming tasks', desc: 'Tasks with due dates' },
                { key: 'activityFeedVisible' as const, label: 'Activity feed', desc: 'Recent activity log' },
              ].map(w => (
                <div key={w.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{w.label}</p>
                    <p className="text-[11px] text-muted-foreground">{w.desc}</p>
                  </div>
                  <Switch checked={settings.widgetConfig[w.key]} onCheckedChange={v => updateWidgetConfig({ [w.key]: v })} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Default view" desc="What opens when you sign in">
            <Select value={settings.defaultView} onValueChange={v => updateSettings({ defaultView: v as any })}>
              <SelectTrigger className="h-9 text-[13px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard" className="text-[13px]">Dashboard</SelectItem>
                <SelectItem value="projects" className="text-[13px]">Projects</SelectItem>
              </SelectContent>
            </Select>
          </Section>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-4">
          <Section title="Profile">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Display name</Label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} className="h-9 text-[13px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">Email</Label>
                <Input value={user?.email || ''} disabled className="h-9 text-[13px] opacity-50" />
              </div>
              <Button onClick={handleUpdateProfile} size="sm" className="h-8 text-[13px]">Save profile</Button>
            </div>
          </Section>

          <Section title="Password">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-[11px] text-muted-foreground">New password</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimum 6 characters" className="h-9 text-[13px]" />
              </div>
              <Button onClick={handleUpdatePassword} size="sm" className="h-8 text-[13px]">Update password</Button>
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
