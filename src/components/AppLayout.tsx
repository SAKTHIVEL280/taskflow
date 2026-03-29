import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, FolderKanban, Settings, LogOut, Plus, Star, ChevronLeft, ChevronRight, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { projects } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const favoriteProjects = projects.filter(p => p.isFavorite).sort((a, b) => a.position - b.position);
  const otherProjects = projects.filter(p => !p.isFavorite).sort((a, b) => a.position - b.position);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => { logout(); navigate('/'); toast.success('Logged out'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-border">
        {!collapsed && (
          <Link to="/dashboard" className="text-lg font-bold tracking-tight text-foreground">
            Task<span className="text-primary">Flow</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="hidden md:flex h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              location.pathname === item.to
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}

        {!collapsed && favoriteProjects.length > 0 && (
          <>
            <div className="pt-4 pb-1 px-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Favorites</p>
            </div>
            {favoriteProjects.map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  location.pathname === `/projects/${p.id}` ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: `hsl(${p.color})` }} />
                <span className="truncate">{p.name}</span>
                <Star className="h-3 w-3 fill-primary text-primary ml-auto flex-shrink-0" />
              </Link>
            ))}
          </>
        )}

        {!collapsed && otherProjects.length > 0 && (
          <>
            <div className="pt-4 pb-1 px-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Projects</p>
            </div>
            {otherProjects.slice(0, 8).map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  location.pathname === `/projects/${p.id}` ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: `hsl(${p.color})` }} />
                <span className="truncate">{p.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-border">
        {!collapsed && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium text-foreground truncate">{user?.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        )}
        <Button variant="ghost" size={collapsed ? 'icon' : 'default'} onClick={handleLogout} className={cn('w-full text-muted-foreground hover:text-foreground', !collapsed && 'justify-start')}>
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Log out</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar mobile */}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-transform duration-300 w-64 md:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>

      {/* Sidebar desktop */}
      <aside className={cn(
        'hidden md:flex flex-col bg-card border-r border-border transition-all duration-300 flex-shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-lg font-bold text-foreground">Task<span className="text-primary">Flow</span></span>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
