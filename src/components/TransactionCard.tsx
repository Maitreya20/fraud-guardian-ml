
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Calendar, Clock, CreditCard, ArrowUpRight, Check } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Transaction } from '@/utils/mockData';

interface TransactionCardProps {
  transaction: Transaction;
  className?: string;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, className }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        transaction.isFraud ? "border-fraud/40" : "",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-base">{transaction.merchantName}</h3>
            <p className="text-sm text-muted-foreground">
              {transaction.merchantCategory.replace('_', ' ').charAt(0).toUpperCase() + 
              transaction.merchantCategory.replace('_', ' ').slice(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">
              {formatCurrency(transaction.amount)}
            </p>
            <div className="flex items-center justify-end mt-1">
              <CreditCard size={14} className="text-muted-foreground mr-1.5" />
              <span className="text-xs text-muted-foreground">
                •••• {transaction.cardLast4}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Calendar size={16} className="text-muted-foreground mr-1.5" />
            <span>{formatDate(transaction.timestamp)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="text-muted-foreground mr-1.5" />
            <span>{formatTime(transaction.timestamp)}</span>
          </div>
        </div>

        {transaction.fraudProbability !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <div className="text-sm font-medium">Fraud Probability</div>
              <div className="text-sm font-semibold">
                {(transaction.fraudProbability * 100).toFixed(1)}%
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress 
                  value={transaction.fraudProbability * 100} 
                  className="h-2 cursor-help"
                  indicatorClassName={
                    transaction.fraudProbability > 0.7 ? "bg-fraud" : 
                    transaction.fraudProbability > 0.3 ? "bg-amber-500" : 
                    "bg-legitimate"
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                {transaction.fraudProbability > 0.7 
                  ? "High risk of fraud" 
                  : transaction.fraudProbability > 0.3 
                  ? "Medium risk of fraud" 
                  : "Low risk of fraud"}
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <Badge 
            variant={transaction.isFraud ? "destructive" : "outline"}
            className={cn(
              "rounded-md flex items-center",
              transaction.isFraud 
                ? "bg-fraud/10 text-fraud border-fraud/30" 
                : "bg-legitimate/10 text-legitimate-dark border-legitimate/30"
            )}
          >
            {transaction.isFraud 
              ? <AlertTriangle size={12} className="mr-1" /> 
              : <Check size={12} className="mr-1" />}
            {transaction.isFraud ? "Fraudulent" : "Legitimate"}
          </Badge>
          
          <a 
            href="#" 
            className="text-xs font-medium text-primary flex items-center hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            View Details
            <ArrowUpRight size={12} className="ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
