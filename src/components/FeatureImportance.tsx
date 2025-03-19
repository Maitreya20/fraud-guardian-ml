
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { featureImportance } from '@/utils/mockData';

interface FeatureImportanceProps {
  className?: string;
}

const FeatureImportance: React.FC<FeatureImportanceProps> = ({ className }) => {
  // Sort features by importance (descending)
  const sortedFeatures = [...featureImportance].sort((a, b) => b.importance - a.importance);

  // Prepare data for horizontal bar chart
  const chartData = sortedFeatures.map(item => ({
    feature: item.feature,
    importance: item.importance
  }));

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          Feature Importance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 0.3]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 12 }} width={120} />
              <Tooltip 
                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
              />
              <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={index === 0 ? '#3b82f6' : 
                          index === 1 ? '#4b92f7' : 
                          index === 2 ? '#5ba2f8' : 
                          index === 3 ? '#6cb3f9' : 
                          index === 4 ? '#7cc3fa' : 
                          '#8cd4fb'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          This chart shows the relative importance of various features in detecting fraudulent transactions.
          Higher percentages indicate stronger predictive power for fraud detection.
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureImportance;
