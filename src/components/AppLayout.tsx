import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, FolderKanban, Settings, LogOut, Star, ChevronLeft, Menu, X,
  Command, Search
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

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const favoriteProjects = projects.filter(p => p.isFavorite).sort((a, b) => a.position - b.position);
  const otherProjects = projects.filter(p => !p.isFavorite).sort((a, b) => a.position - b.position);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/projects', icon: FolderKanban, label: 'Projects' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => { logout(); navigate('/'); toast.success('Signed out'); };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-border/60">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Command className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">TaskFlow</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Command className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
          </div>
        )}
        <Button
          variant="ghost" size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className={cn('h-3.5 w-3.5 transition-transform', collapsed && 'rotate-180')} />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-medium transition-all duration-150',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="h-[15px] w-[15px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Favorites */}
        {!collapsed && favoriteProjects.length > 0 && (
          <>
            <div className="pt-5 pb-1.5 px-2.5">
              <p className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.1em]">Pinned</p>
            </div>
            {favoriteProjects.map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] transition-all duration-150',
                  isActive(`/projects/${p.id}`)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
                  style={{ background: `hsl(${p.color} / 0.15)`, color: `hsl(${p.color})` }}>
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate">{p.name}</span>
                <Star className="h-2.5 w-2.5 fill-current text-primary/40 ml-auto flex-shrink-0" />
              </Link>
            ))}
          </>
        )}

        {/* Other projects */}
        {!collapsed && otherProjects.length > 0 && (
          <>
            <div className="pt-5 pb-1.5 px-2.5">
              <p className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.1em]">Projects</p>
            </div>
            {otherProjects.slice(0, 8).map(p => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] transition-all duration-150',
                  isActive(`/projects/${p.id}`)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <div className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center text-[9px] font-bold"
                  style={{ background: `hsl(${p.color} / 0.15)`, color: `hsl(${p.color})` }}>
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate">{p.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User */}
      <div className="p-2 border-t border-border/60">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-semibold text-primary flex-shrink-0">
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate">{user?.displayName}</p>
              <p className="text-[10px] text-muted-foreground/70 truncate">{user?.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-7 w-7 text-muted-foreground hover:text-destructive">
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-transform duration-200 w-60 md:hidden',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden md:flex flex-col bg-card/50 border-r border-border/60 transition-all duration-200 flex-shrink-0',
        collapsed ? 'w-14' : 'w-56'
      )}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 h-14 px-4 border-b border-border/60">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Command className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">TaskFlow</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
