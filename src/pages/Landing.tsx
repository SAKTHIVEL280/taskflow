import LandingNav from '@/components/landing/LandingNav';
import HeroSection from '@/components/landing/HeroSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import ProcessSection from '@/components/landing/ProcessSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <LandingNav />
      <HeroSection />
      <ShowcaseSection />
      <ProcessSection />
      <FeaturesSection />
      <CTASection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
