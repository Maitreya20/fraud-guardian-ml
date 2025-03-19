
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Brain, MessageSquare, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelExplainerProps {
  className?: string;
}

const ModelExplainer: React.FC<ModelExplainerProps> = ({ className }) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          How Our Fraud Detection Works
        </CardTitle>
        <CardDescription>
          Understanding the machine learning behind fraud detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <p>
              Our fraud detection system uses advanced machine learning to analyze transaction patterns
              and identify potentially fraudulent activities in real-time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-accent">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Data Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Transactions are preprocessed to extract meaningful patterns
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-accent">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">ML Model</h3>
                <p className="text-sm text-muted-foreground">
                  Trained on millions of transactions to detect anomalies
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-accent">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Each transaction receives a fraud probability score
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <p className="mb-4">
              Our model analyzes these key transaction attributes to determine fraud risk:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Transaction Amount</h4>
                  <p className="text-sm text-muted-foreground">
                    Unusually large transactions may indicate fraud
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Location & Distance</h4>
                  <p className="text-sm text-muted-foreground">
                    Transactions far from usual locations raise suspicion
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Time Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Unusual transaction times (e.g., 3 AM) may indicate fraud
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">Merchant Category</h4>
                  <p className="text-sm text-muted-foreground">
                    Some merchant categories have higher fraud rates
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-xs font-medium text-primary">5</span>
                </div>
                <div>
                  <h4 className="font-medium text-sm">User Behavior Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Deviations from normal spending patterns
                  </p>
                </div>
              </li>
            </ul>
          </TabsContent>
          
          <TabsContent value="algorithm">
            <div className="space-y-4">
              <p>
                Our fraud detection system uses a combination of machine learning algorithms:
              </p>
              
              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-medium mb-2">Gradient Boosting</h4>
                  <p className="text-sm text-muted-foreground">
                    We use XGBoost to create a powerful ensemble model that combines 
                    multiple decision trees for high accuracy fraud prediction.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-medium mb-2">Anomaly Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Isolates unusual transactions that deviate from normal patterns
                    using statistical methods and neural networks.
                  </p>
                </div>
                
                <div className="p-4 rounded-lg border bg-card">
                  <h4 className="font-medium mb-2">Feature Engineering</h4>
                  <p className="text-sm text-muted-foreground">
                    We transform raw transaction data into meaningful features that 
                    help the model identify subtle patterns of fraud.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModelExplainer;
