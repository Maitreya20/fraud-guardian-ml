
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Check, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import TransactionForm from '@/components/TransactionForm';
import { pageVariants } from '@/utils/transitions';

interface AnalysisResult {
  amount: number;
  merchantName: string;
  merchantCategory: string;
  hour: number;
  isWeekend: boolean;
  fraudProbability: number;
}

const Analyzer = () => {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = (data: AnalysisResult) => {
    setResult(data);
  };

  const getRiskLevel = (probability: number) => {
    if (probability >= 0.7) return { label: 'High Risk', color: 'fraud' };
    if (probability >= 0.3) return { label: 'Medium Risk', color: 'amber-500' };
    return { label: 'Low Risk', color: 'legitimate-dark' };
  };

  const getRiskFactors = (data: AnalysisResult) => {
    const factors = [];
    
    if (data.amount > 1000) {
      factors.push({
        factor: 'Large Transaction Amount',
        description: 'Transactions over $1,000 have a higher risk of fraud.',
        impact: 'high'
      });
    } else if (data.amount > 500) {
      factors.push({
        factor: 'Moderate Transaction Amount',
        description: 'Transactions over $500 have a slightly elevated risk.',
        impact: 'medium'
      });
    }
    
    if (data.hour >= 0 && data.hour <= 5) {
      factors.push({
        factor: 'Unusual Transaction Time',
        description: 'Transactions between midnight and 5 AM have higher fraud rates.',
        impact: 'high'
      });
    }
    
    if (['electronics', 'jewelry', 'gift_card'].includes(data.merchantCategory)) {
      factors.push({
        factor: 'High-risk Merchant Category',
        description: `${data.merchantCategory.replace('_', ' ')} purchases have higher fraud rates.`,
        impact: 'medium'
      });
    }
    
    if (data.isWeekend) {
      factors.push({
        factor: 'Weekend Transaction',
        description: 'Weekend transactions have slightly different fraud patterns.',
        impact: 'low'
      });
    }
    
    return factors.length > 0 ? factors : [{
      factor: 'No Significant Risk Factors',
      description: 'This transaction has no obvious risk indicators.',
      impact: 'low'
    }];
  };

  return (
    <>
      <AnimatedBackground variant="default" />
      <Navigation />
      
      <motion.div
        className="max-w-6xl mx-auto px-4 py-8"
        initial="initial"
        animate="in"
        variants={pageVariants}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Transaction Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter transaction details to analyze fraud risk. Our machine learning model will evaluate 
            the transaction and provide a risk assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium flex items-center">
                <Search className="mr-2 h-5 w-5 text-primary" />
                Transaction Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionForm onAnalyze={handleAnalyze} />
            </CardContent>
          </Card>
          
          <Card className={cn(
            "backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass transition-opacity duration-500",
            !result && "opacity-50"
          )}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-medium flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <Info className="h-12 w-12 text-muted-foreground mb-4 opacity-40" />
                  <h3 className="text-lg font-medium mb-2">No Transaction Analyzed</h3>
                  <p className="text-muted-foreground max-w-md">
                    Enter transaction details in the form to analyze fraud risk and see results here.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center py-6">
                    {result.fraudProbability >= 0.7 ? (
                      <div className="w-24 h-24 rounded-full bg-fraud/10 border-4 border-fraud flex items-center justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-fraud" />
                      </div>
                    ) : result.fraudProbability >= 0.3 ? (
                      <div className="w-24 h-24 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center mb-4">
                        <AlertCircle className="h-12 w-12 text-amber-500" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-legitimate/10 border-4 border-legitimate flex items-center justify-center mb-4">
                        <Check className="h-12 w-12 text-legitimate" />
                      </div>
                    )}
                    
                    <div className="text-center">
                      <Badge 
                        className={cn(
                          "text-sm py-1 px-3 mb-2",
                          result.fraudProbability >= 0.7 
                            ? "bg-fraud/10 text-fraud border-fraud/30" 
                            : result.fraudProbability >= 0.3 
                            ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                            : "bg-legitimate/10 text-legitimate-dark border-legitimate/30"
                        )}
                      >
                        {getRiskLevel(result.fraudProbability).label}
                      </Badge>
                      <h2 className="text-2xl font-bold mb-1">
                        {(result.fraudProbability * 100).toFixed(1)}% Fraud Probability
                      </h2>
                      <p className="text-muted-foreground">
                        Transaction at {result.merchantName || "Unknown Merchant"}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Risk Factors</h3>
                    <div className="space-y-3">
                      {getRiskFactors(result).map((factor, index) => (
                        <div 
                          key={index} 
                          className={cn(
                            "p-3 rounded-md border",
                            factor.impact === 'high' 
                              ? "bg-fraud/5 border-fraud/20" 
                              : factor.impact === 'medium' 
                              ? "bg-amber-500/5 border-amber-500/20"
                              : "bg-muted/30 border-muted/50"
                          )}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{factor.factor}</h4>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                factor.impact === 'high' 
                                  ? "bg-fraud/10 text-fraud border-fraud/30" 
                                  : factor.impact === 'medium' 
                                  ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                  : "bg-muted/20 text-muted-foreground border-muted/40"
                              )}
                            >
                              {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {factor.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground italic">
                      This analysis is for demonstration purposes only and uses simulated machine learning predictions.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  );
};

export default Analyzer;
