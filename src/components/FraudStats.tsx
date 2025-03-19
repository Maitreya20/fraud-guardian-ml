
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Alert, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Shield, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  fraudDistribution, 
  modelPerformance, 
  fraudOverTime 
} from '@/utils/mockData';

interface FraudStatsProps {
  className?: string;
}

const FraudStats: React.FC<FraudStatsProps> = ({ className }) => {
  const totalTransactions = fraudDistribution.genuine + fraudDistribution.fraud;
  const fraudPercentage = (fraudDistribution.fraud / totalTransactions) * 100;
  
  const pieData = [
    { name: 'Genuine', value: fraudDistribution.genuine },
    { name: 'Fraud', value: fraudDistribution.fraud }
  ];
  
  const COLORS = ['#16a34a', '#ef4444'];

  const staggerDelay = 0.1;

  const formatMetricValue = (value: number) => {
    return value.toFixed(3);
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-3"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Fraud Detection Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total Transactions</span>
                <span className="text-2xl font-semibold">
                  {totalTransactions.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Fraudulent</span>
                <span className="text-2xl font-semibold text-destructive">
                  {fraudDistribution.fraud.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Legitimate</span>
                <span className="text-2xl font-semibold text-legitimate-dark">
                  {fraudDistribution.genuine.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Fraud Percentage</span>
                <span className="text-2xl font-semibold">
                  {fraudPercentage.toFixed(3)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay }}
        className="lg:col-span-2 row-span-2"
      >
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <AreaChart className="mr-2 h-5 w-5 text-primary" />
              Fraud Incidents Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={fraudOverTime}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.5rem', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorFraud)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay * 2 }}
      >
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <PieChartIcon className="mr-2 h-5 w-5 text-primary" />
              Transaction Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [value.toLocaleString(), 'Transactions']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '0.5rem', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: staggerDelay * 3 }}
        className="lg:col-span-3"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-medium flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Model Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(modelPerformance).map(([key, value], index) => (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize text-muted-foreground">
                      {key === 'auc' ? 'AUC-ROC' : key}
                    </span>
                    <span className="text-sm font-medium">{formatMetricValue(value)}</span>
                  </div>
                  <Progress value={value * 100} className="h-2" 
                    indicatorClassName={
                      value > 0.9 ? "bg-legitimate-dark" : 
                      value > 0.8 ? "bg-blue-500" : 
                      "bg-amber-500"
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FraudStats;
