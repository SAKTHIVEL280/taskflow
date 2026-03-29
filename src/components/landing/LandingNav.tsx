import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LandingNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 border-b border-border/50">
        <Link to="/" className="text-base font-semibold tracking-tight">
          Task<span className="text-primary">Flow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            How it works
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground text-[13px]">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" asChild className="text-[13px]">
            <Link to="/signup">
              Get started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
