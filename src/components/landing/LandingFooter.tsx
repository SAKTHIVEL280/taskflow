import { Link } from 'react-router-dom';

const LandingFooter = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            Task<span className="text-primary">Flow</span>
          </Link>
          <span className="text-[11px] text-muted-foreground/40">2026</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors tracking-wide uppercase">
            Privacy
          </a>
          <a href="#" className="text-[11px] text-muted-foreground/60 hover:text-foreground transition-colors tracking-wide uppercase">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
