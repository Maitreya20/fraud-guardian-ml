
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Search, 
  Shield, 
  Zap, 
  Fingerprint, 
  Clock,
  ArrowRight,
  Info
} from 'lucide-react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import TransactionCard from '@/components/TransactionCard';
import ModelExplainer from '@/components/ModelExplainer';
import { sampleTransactions } from '@/utils/mockData';
import { staggerContainer, staggerItem } from '@/utils/transitions';

const Index = () => {
  const navigate = useNavigate();

  const featuresData = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Real-time Detection",
      description: "Identify fraudulent transactions as they happen with millisecond response times."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "High Accuracy",
      description: "Our model achieves 99.4% accuracy with low false positive rates."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-primary" />,
      title: "Pattern Recognition",
      description: "Automatically learn and adapt to new fraud patterns over time."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Instant Alerts",
      description: "Get immediate notifications for suspicious activity."
    }
  ];

  // Select a subset of transactions for the homepage
  const featureTransactions = sampleTransactions.slice(2, 5);

  return (
    <>
      <AnimatedBackground variant="gradient" />
      <Navigation />
      
      <Hero />
      
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Zap size={16} className="mr-2" />
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Fraud Detection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our system combines machine learning and data analysis to protect your transactions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={staggerContainer}
            initial="initial"
            whileInView="in"
            viewport={{ once: true }}
          >
            {featuresData.map((feature, index) => (
              <motion.div 
                key={index}
                variants={staggerItem}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20 shadow-glass"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <BarChart2 size={16} className="mr-2" />
                Interactive Dashboard
              </div>
              <h2 className="text-3xl font-bold mb-4">Monitor Your Transactions</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our comprehensive dashboard gives you insight into transaction patterns and highlights
                potential fraud. Track metrics in real-time and receive detailed analytics.
              </p>
              <Button onClick={() => navigate('/dashboard')} className="gap-2">
                View Dashboard <ArrowRight size={16} />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid gap-4 max-w-lg mx-auto"
            >
              <div className="transform rotate-2 scale-[0.96] opacity-75">
                <TransactionCard transaction={featureTransactions[0]} />
              </div>
              <div className="transform -rotate-1 scale-[0.98] opacity-90">
                <TransactionCard transaction={featureTransactions[1]} />
              </div>
              <div className="transform rotate-1">
                <TransactionCard transaction={featureTransactions[2]} />
              </div>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <ModelExplainer />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full text-sm font-medium bg-primary/10 text-primary">
                <Search size={16} className="mr-2" />
                Transaction Analyzer
              </div>
              <h2 className="text-3xl font-bold mb-4">Analyze Any Transaction</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our transaction analyzer lets you input transaction details and instantly 
                see a fraud risk assessment with clear explanations of risk factors.
              </p>
              <Button onClick={() => navigate('/analyzer')} className="gap-2">
                Try Analyzer <ArrowRight size={16} />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <footer className="bg-accent py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-semibold">
                FG
              </div>
              <span className="text-xl font-medium tracking-tight">FraudGuard</span>
            </div>
            
            <nav className="flex flex-wrap gap-8 justify-center">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/analyzer');
                }}
              >
                Analyzer
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
              >
                About
              </a>
            </nav>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} FraudGuard ML. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
