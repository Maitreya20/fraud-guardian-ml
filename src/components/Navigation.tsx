
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  Info,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <NavLink to={to} className="outline-none">
        {({ isActive: linkActive }) => (
          <div 
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              "hover:bg-primary/5 focus:bg-primary/5 focus:outline-none",
              linkActive && "bg-primary/10 text-primary font-medium"
            )}
          >
            <div className={cn(
              "transition-colors duration-300",
              linkActive ? "text-primary" : "text-muted-foreground"
            )}>
              {icon}
            </div>
            <span className={cn(
              "transition-colors duration-300",
              linkActive ? "text-primary" : "text-muted-foreground"
            )}>
              {label}
            </span>
          </div>
        )}
      </NavLink>
    );
  };

  const navItems = [
    { to: '/', icon: <ShieldCheck size={18} />, label: 'Home' },
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/analyzer', icon: <Search size={18} />, label: 'Analyzer' },
    { to: '/about', icon: <Info size={18} />, label: 'About' },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 outline-none">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
              FG
            </div>
            <span className="text-xl font-medium tracking-tight">FraudGuard</span>
          </NavLink>

          {isMobile ? (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-foreground rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          ) : (
            <nav className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Mobile menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 z-40 bg-white/95 backdrop-blur-lg transition-all duration-300 pt-20",
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%] pointer-events-none"
          )}
        >
          <nav className="flex flex-col items-stretch gap-2 p-4">
            {navItems.map((item, index) => (
              <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
            ))}
          </nav>
        </div>
      )}

      {/* Spacer to prevent content from hiding behind the fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;
