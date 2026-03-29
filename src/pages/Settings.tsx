import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

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
  const { user, updateProfile, updatePassword, logout } = useAuth();
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

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your workspace and profile</p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
              <CardDescription>Choose how TaskFlow looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme mode */}
              <div className="space-y-2">
                <Label>Mode</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'dark', 'system'] as const).map(mode => (
                    <Button key={mode} variant={settings.theme === mode ? 'default' : 'outline'} size="sm"
                      onClick={() => updateSettings({ theme: mode })} className="capitalize">
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Accent color */}
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_COLORS.map(c => (
                    <button key={c.value} onClick={() => updateSettings({ accentColor: c.value })}
                      className={`w-8 h-8 rounded-full transition-all ${settings.accentColor === c.value ? 'ring-2 ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'}`}
                      style={{ background: `hsl(${c.value})`, ...(settings.accentColor === c.value ? { boxShadow: `0 0 0 2px hsl(${c.value})` } : {}) }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              {/* Font */}
              <div className="space-y-2">
                <Label>Font</Label>
                <Select value={settings.font} onValueChange={v => updateSettings({ font: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FONTS.map(f => (
                      <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Font size */}
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['small', 'medium', 'large'] as const).map(s => (
                    <Button key={s} variant={settings.fontSize === s ? 'default' : 'outline'} size="sm"
                      onClick={() => updateSettings({ fontSize: s })} className="capitalize">
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Border radius */}
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sharp', 'rounded', 'pill'] as const).map(r => (
                    <Button key={r} variant={settings.borderRadius === r ? 'default' : 'outline'} size="sm"
                      onClick={() => updateSettings({ borderRadius: r })} className="capitalize">
                      {r}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Density */}
              <div className="space-y-2">
                <Label>Density</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['compact', 'comfortable', 'spacious'] as const).map(d => (
                    <Button key={d} variant={settings.density === d ? 'default' : 'outline'} size="sm"
                      onClick={() => updateSettings({ density: d })} className="capitalize">
                      {d}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Date display */}
              <div className="space-y-2">
                <Label>Date Display</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['relative', 'absolute'] as const).map(d => (
                    <Button key={d} variant={settings.dateDisplay === d ? 'default' : 'outline'} size="sm"
                      onClick={() => updateSettings({ dateDisplay: d })} className="capitalize">
                      {d === 'relative' ? 'Relative (in 2 days)' : 'Absolute (Mar 31)'}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />
              <Button variant="outline" onClick={resetSettings}>Reset to Defaults</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dashboard Widgets</CardTitle>
              <CardDescription>Choose which widgets to show on your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'statsVisible' as const, label: 'Statistics Cards', desc: 'Show project and task counts' },
                { key: 'recentProjectsVisible' as const, label: 'Recent Projects', desc: 'Show recently updated projects' },
                { key: 'upcomingTasksVisible' as const, label: 'Upcoming Tasks', desc: 'Show tasks with due dates' },
                { key: 'activityFeedVisible' as const, label: 'Activity Feed', desc: 'Show recent activity' },
              ].map(w => (
                <div key={w.key} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{w.label}</p>
                    <p className="text-xs text-muted-foreground">{w.desc}</p>
                  </div>
                  <Switch checked={settings.widgetConfig[w.key]} onCheckedChange={v => updateWidgetConfig({ [w.key]: v })} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Default View</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={settings.defaultView} onValueChange={v => updateSettings({ defaultView: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ''} disabled className="opacity-60" />
              </div>
              <Button onClick={handleUpdateProfile}>Save Profile</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="At least 6 characters" />
              </div>
              <Button onClick={handleUpdatePassword}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
