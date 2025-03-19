
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart2, 
  Download, 
  RefreshCw, 
  Search, 
  AlertTriangle,
  ArrowUpRight,
  Clock,
  TrendingUp
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import FraudStats from '@/components/FraudStats';
import FeatureImportance from '@/components/FeatureImportance';
import TransactionCard from '@/components/TransactionCard';
import { sampleTransactions } from '@/utils/mockData';
import { pageVariants, staggerContainer, staggerItem } from '@/utils/transitions';

const Dashboard = () => {
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <AnimatedBackground variant="subtle" />
      <Navigation />
      
      <motion.div
        className="max-w-7xl mx-auto px-4 py-8"
        initial="initial"
        animate="in"
        variants={pageVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Fraud Detection Dashboard</h1>
            <p className="text-muted-foreground">
              Overview and analytics • Last updated: {formatDate()}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw size={16} /> Refresh
            </Button>
            <Button variant="outline" className="gap-2">
              <Download size={16} /> Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium">Quick Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col p-4 rounded-lg bg-accent">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Detection Rate</span>
                    <Badge variant="outline" className="bg-legitimate/10 text-legitimate-dark border-legitimate/30">
                      Good
                    </Badge>
                  </div>
                  <div className="mt-2 text-2xl font-semibold">99.4%</div>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <TrendingUp size={14} className="text-legitimate mr-1" />
                    <span>+0.8% from previous month</span>
                  </div>
                </div>
                
                <div className="flex flex-col p-4 rounded-lg bg-accent">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Recent Alerts</span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                      Normal
                    </Badge>
                  </div>
                  <div className="mt-2 text-2xl font-semibold">12</div>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>In the last 24 hours</span>
                  </div>
                </div>
                
                <div className="flex flex-col p-4 rounded-lg bg-accent">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">Total Saved</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      Excellent
                    </Badge>
                  </div>
                  <div className="mt-2 text-2xl font-semibold">$892,451</div>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <TrendingUp size={14} className="text-legitimate mr-1" />
                    <span>+12% from previous month</span>
                  </div>
                </div>
                
                <div className="flex flex-col p-4 rounded-lg bg-accent">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-muted-foreground">High Risk</span>
                    <Badge variant="outline" className="bg-fraud/10 text-fraud border-fraud/30">
                      <AlertTriangle size={12} className="mr-1" /> Warning
                    </Badge>
                  </div>
                  <div className="mt-2 text-2xl font-semibold">3</div>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <Clock size={14} className="mr-1" />
                    <span>Active investigations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-8">
              <FraudStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FeatureImportance className="lg:col-span-2" />
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-medium flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-fraud" />
                      High Risk Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleTransactions
                        .filter(tx => tx.isFraud)
                        .slice(0, 3)
                        .map((tx, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-md bg-fraud/5 border border-fraud/20">
                            <div className="mt-0.5">
                              <AlertTriangle className="h-5 w-5 text-fraud" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">{tx.merchantName}</h4>
                                <span className="font-semibold">${tx.amount.toFixed(2)}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(tx.timestamp).toLocaleString()}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <Badge variant="outline" className="bg-fraud/10 text-fraud border-fraud/20 text-xs">
                                  High Risk
                                </Badge>
                                <a 
                                  href="#" 
                                  className="text-xs font-medium text-primary flex items-center hover:underline"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  Details <ArrowUpRight size={10} className="ml-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      <Button variant="outline" className="w-full text-sm gap-1.5">
                        <Search size={14} /> View All Alerts
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="in"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sampleTransactions.map((transaction, index) => (
                <motion.div key={transaction.id} variants={staggerItem}>
                  <TransactionCard transaction={transaction} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
};

export default Dashboard;
