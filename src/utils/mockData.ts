
// Sample data based on the Kaggle Credit Card Fraud Detection dataset structure
export interface Transaction {
  id: string;
  amount: number;
  timestamp: string;
  cardLast4: string;
  merchantName: string;
  merchantCategory: string;
  distance: number; // Distance from home
  isWeekend: boolean;
  hour: number;
  isFraud: boolean;
  fraudProbability?: number;
}

export const sampleTransactions: Transaction[] = [
  {
    id: "tx-1",
    amount: 142.95,
    timestamp: "2023-04-12T14:32:21",
    cardLast4: "7895",
    merchantName: "Amazon.com",
    merchantCategory: "online_retail",
    distance: 0,
    isWeekend: false,
    hour: 14,
    isFraud: false,
    fraudProbability: 0.02
  },
  {
    id: "tx-2",
    amount: 89.30,
    timestamp: "2023-04-13T09:15:43",
    cardLast4: "7895",
    merchantName: "Grocery Store",
    merchantCategory: "grocery",
    distance: 1.2,
    isWeekend: false,
    hour: 9,
    isFraud: false,
    fraudProbability: 0.01
  },
  {
    id: "tx-3",
    amount: 1250.00,
    timestamp: "2023-04-14T03:27:51",
    cardLast4: "7895",
    merchantName: "ElectronicsXpress",
    merchantCategory: "electronics",
    distance: 845.7,
    isWeekend: false,
    hour: 3,
    isFraud: true,
    fraudProbability: 0.94
  },
  {
    id: "tx-4",
    amount: 49.99,
    timestamp: "2023-04-15T18:05:12",
    cardLast4: "7895",
    merchantName: "Netflix",
    merchantCategory: "subscription",
    distance: 0,
    isWeekend: true,
    hour: 18,
    isFraud: false,
    fraudProbability: 0.01
  },
  {
    id: "tx-5",
    amount: 3.50,
    timestamp: "2023-04-16T07:45:29",
    cardLast4: "7895",
    merchantName: "Coffee Shop",
    merchantCategory: "food",
    distance: 0.8,
    isWeekend: true,
    hour: 7,
    isFraud: false,
    fraudProbability: 0.00
  },
  {
    id: "tx-6",
    amount: 2499.99,
    timestamp: "2023-04-17T22:13:08",
    cardLast4: "7895",
    merchantName: "Tech Gadgets",
    merchantCategory: "electronics",
    distance: 432.1,
    isWeekend: false,
    hour: 22,
    isFraud: true,
    fraudProbability: 0.89
  },
  {
    id: "tx-7",
    amount: 75.20,
    timestamp: "2023-04-18T12:21:54",
    cardLast4: "7895",
    merchantName: "Gas Station",
    merchantCategory: "fuel",
    distance: 5.3,
    isWeekend: false,
    hour: 12,
    isFraud: false,
    fraudProbability: 0.04
  },
  {
    id: "tx-8",
    amount: 1345.89,
    timestamp: "2023-04-19T01:02:17",
    cardLast4: "7895",
    merchantName: "DigitalStore",
    merchantCategory: "electronics",
    distance: 789.2,
    isWeekend: false,
    hour: 1,
    isFraud: true,
    fraudProbability: 0.96
  }
];

export const featureImportance = [
  { feature: "Transaction Amount", importance: 0.27 },
  { feature: "Time of Day", importance: 0.22 },
  { feature: "Distance from Home", importance: 0.18 },
  { feature: "Merchant Category", importance: 0.15 },
  { feature: "Day of Week", importance: 0.10 },
  { feature: "Previous Activity", importance: 0.08 }
];

export const fraudDistribution = {
  genuine: 284315,
  fraud: 492
};

export const modelPerformance = {
  accuracy: 0.994,
  precision: 0.918,
  recall: 0.873,
  f1: 0.895,
  auc: 0.992
};

export const fraudOverTime = [
  { month: "Jan", count: 42 },
  { month: "Feb", count: 38 },
  { month: "Mar", count: 51 },
  { month: "Apr", count: 47 },
  { month: "May", count: 53 },
  { month: "Jun", count: 39 },
  { month: "Jul", count: 44 },
  { month: "Aug", count: 56 },
  { month: "Sep", count: 59 },
  { month: "Oct", count: 48 },
  { month: "Nov", count: 43 },
  { month: "Dec", count: 52 }
];
