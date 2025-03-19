
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  amount: z.coerce.number().positive().min(0.01, { message: "Amount must be greater than 0" }),
  merchantName: z.string().min(2, { message: "Merchant name is required" }),
  merchantCategory: z.string().min(1, { message: "Please select a category" }),
  distance: z.coerce.number().min(0),
  hour: z.coerce.number().min(0).max(23),
  isWeekend: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface TransactionFormProps {
  className?: string;
  onAnalyze: (data: FormValues & { fraudProbability: number }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ className, onAnalyze }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      merchantName: "",
      merchantCategory: "",
      distance: 0,
      hour: 12,
      isWeekend: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Calculate a "fraud probability" based on some heuristics
    // This is a simple mockup for demonstration purposes
    let fraudScore = 0;
    
    // Higher amounts are more suspicious
    if (data.amount > 1000) fraudScore += 0.3;
    else if (data.amount > 500) fraudScore += 0.15;
    
    // Transactions at unusual hours are more suspicious
    if (data.hour >= 0 && data.hour <= 5) fraudScore += 0.25;
    
    // Transactions far from home are more suspicious
    if (data.distance > 500) fraudScore += 0.3;
    else if (data.distance > 100) fraudScore += 0.15;
    
    // High-risk categories
    if (['electronics', 'jewelry', 'gift_card'].includes(data.merchantCategory)) {
      fraudScore += 0.2;
    }
    
    // Add some randomness
    fraudScore += Math.random() * 0.1;
    
    // Cap between 0 and 1
    const fraudProbability = Math.min(Math.max(fraudScore, 0), 1);
    
    setIsProcessing(false);
    
    // Call the onAnalyze callback with form data and fraud probability
    onAnalyze({
      ...data,
      fraudProbability
    });
    
    toast.success("Transaction analyzed successfully");
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="space-y-6">
          <Alert className="bg-accent border border-accent-foreground/10">
            <Info className="h-4 w-4" />
            <AlertTitle>Analysis Mode</AlertTitle>
            <AlertDescription>
              Enter transaction details below to analyze the fraud risk.
              This is a demonstration using simulated ML predictions.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Amount ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="merchantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Amazon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="merchantCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="fuel">Fuel</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="gift_card">Gift Card</SelectItem>
                      <SelectItem value="online_retail">Online Retail</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="distance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distance from Home (miles)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      placeholder="Distance in miles" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Time of Day: {field.value}:00</FormLabel>
                  <span className="text-xs text-muted-foreground">
                    {field.value < 12 ? 'AM' : 'PM'}
                  </span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={23}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    className="py-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isWeekend"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Weekend Transaction</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Check if this transaction occurred on a weekend.
                  </p>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Analyzing..." : "Analyze Transaction"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
