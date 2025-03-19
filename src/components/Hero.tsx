
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, ShieldCheck, BarChart2, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <section 
      className={cn(
        "min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center px-4 relative",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full text-sm font-medium bg-primary/10 text-primary">
          <ShieldCheck size={16} className="mr-2" />
          Intelligent Fraud Detection
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="block">Protect transactions with</span>
          <span className="text-primary">machine learning.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Our advanced fraud detection system uses machine learning to identify and prevent fraudulent credit card 
          transactions in real-time, keeping your finances secure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-base px-6 h-12"
            onClick={() => navigate('/dashboard')}
          >
            <BarChart2 size={18} className="mr-2" /> 
            View Dashboard
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-base px-6 h-12"
            onClick={() => navigate('/analyzer')}
          >
            <Search size={18} className="mr-2" /> 
            Try Transaction Analyzer
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <a 
          href="#features"
          className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to features"
        >
          <span className="mb-2">Explore Features</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
