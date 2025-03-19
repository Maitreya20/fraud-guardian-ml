
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Lightbulb,
  BookOpen,
  Database,
  Code,
  Brain,
  PieChart,
  Info,
  Terminal
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import { pageVariants, staggerContainer, staggerItem } from '@/utils/transitions';

const About = () => {
  const projectInfo = [
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Objective",
      description: "Build a machine learning model that can distinguish fraudulent credit card transactions from legitimate ones with high accuracy."
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Dataset",
      description: "The dataset contains transaction details such as amount, user ID, merchant information, timestamps, and other features that must be carefully preprocessed."
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Key Insights",
      description: "Identifying key transactional attributes that distinguish fraudulent behavior, such as transaction amount, time, location, and merchant category."
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Expected Outcome",
      description: "A fraud detection system that minimizes false positives while maximizing fraud detection accuracy, along with explanations of misclassifications."
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      items: [
        { name: "React", description: "JavaScript library for building user interfaces" },
        { name: "TypeScript", description: "Typed superset of JavaScript" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework" },
        { name: "Framer Motion", description: "Animation library for React" },
        { name: "Recharts", description: "Composable charting library" }
      ]
    },
    {
      category: "Machine Learning",
      items: [
        { name: "Python", description: "Programming language for data science" },
        { name: "Scikit-learn", description: "Machine learning library" },
        { name: "XGBoost", description: "Gradient boosting framework" },
        { name: "Pandas", description: "Data manipulation library" },
        { name: "Feature Engineering", description: "Transforming raw data into features" }
      ]
    },
    {
      category: "Development",
      items: [
        { name: "Git", description: "Version control system" },
        { name: "Jupyter Notebooks", description: "Interactive computing" },
        { name: "Vite", description: "Frontend build tool" },
        { name: "npm", description: "Package manager" }
      ]
    }
  ];

  const datasetInfo = {
    name: "Credit Card Fraud Detection Dataset",
    source: "Kaggle",
    link: "https://www.kaggle.com/datasets/kartik2112/fraud-detection",
    description: "A dataset for credit card fraud detection that includes features such as transaction amount, time, location, and merchant information.",
    features: [
      "Transaction amount",
      "User demographics",
      "Merchant information",
      "Transaction timestamps",
      "Location data",
      "Device information",
      "Transaction category"
    ],
    challenges: [
      "Highly imbalanced dataset (few fraud cases compared to legitimate transactions)",
      "Feature engineering to extract meaningful patterns",
      "Balancing precision and recall",
      "Handling false positives"
    ]
  };

  return (
    <>
      <AnimatedBackground variant="subtle" />
      <Navigation />
      
      <motion.div
        className="max-w-4xl mx-auto px-4 py-8"
        initial="initial"
        animate="in"
        variants={pageVariants}
      >
        <div className="mb-12 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About the Project
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Credit Card Fraud Detection using Machine Learning
          </motion.p>
        </div>
        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="in"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
        >
          {projectInfo.map((item, index) => (
            <motion.div key={index} variants={staggerItem}>
              <Card className="h-full backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass-sm hover:shadow-glass transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {item.icon}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <Tabs defaultValue="dataset" className="mb-12">
          <TabsList className="mb-6 w-full md:w-auto md:grid md:grid-cols-3">
            <TabsTrigger value="dataset" className="flex items-center gap-1.5">
              <Database className="h-4 w-4" /> Dataset
            </TabsTrigger>
            <TabsTrigger value="tech" className="flex items-center gap-1.5">
              <Code className="h-4 w-4" /> Technology
            </TabsTrigger>
            <TabsTrigger value="ml" className="flex items-center gap-1.5">
              <Brain className="h-4 w-4" /> ML Process
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dataset">
            <Card className="backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{datasetInfo.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span className="font-medium">Source: {datasetInfo.source}</span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <a 
                        href={datasetInfo.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Dataset
                      </a>
                    </div>
                    <p className="text-muted-foreground">
                      {datasetInfo.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Database className="h-4 w-4 mr-2 text-primary" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {datasetInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                      Challenges
                    </h4>
                    <ul className="space-y-2">
                      {datasetInfo.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></div>
                          <span className="text-muted-foreground">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tech">
            <Card className="backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Technology Stack</h3>
                
                <div className="space-y-8">
                  {techStack.map((stack, stackIndex) => (
                    <div key={stackIndex}>
                      <h4 className="font-semibold mb-4 pb-2 border-b">{stack.category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {stack.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <div>
                              <h5 className="font-medium">{item.name}</h5>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ml">
            <Card className="backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-6">Machine Learning Approach</h3>
                
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col p-5 rounded-lg bg-accent">
                      <div className="flex items-center text-primary mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="font-medium">1</span>
                        </div>
                        <h4 className="font-medium">Data Preprocessing</h4>
                      </div>
                      <ul className="space-y-2 ml-10 text-sm">
                        <li className="list-disc text-muted-foreground">Handling missing values</li>
                        <li className="list-disc text-muted-foreground">Feature scaling</li>
                        <li className="list-disc text-muted-foreground">Categorical encoding</li>
                        <li className="list-disc text-muted-foreground">Timestamp processing</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col p-5 rounded-lg bg-accent">
                      <div className="flex items-center text-primary mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="font-medium">2</span>
                        </div>
                        <h4 className="font-medium">Feature Engineering</h4>
                      </div>
                      <ul className="space-y-2 ml-10 text-sm">
                        <li className="list-disc text-muted-foreground">Time-based features</li>
                        <li className="list-disc text-muted-foreground">Aggregation features</li>
                        <li className="list-disc text-muted-foreground">Distance calculations</li>
                        <li className="list-disc text-muted-foreground">Behavioral patterns</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col p-5 rounded-lg bg-accent">
                      <div className="flex items-center text-primary mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="font-medium">3</span>
                        </div>
                        <h4 className="font-medium">Model Selection</h4>
                      </div>
                      <ul className="space-y-2 ml-10 text-sm">
                        <li className="list-disc text-muted-foreground">XGBoost</li>
                        <li className="list-disc text-muted-foreground">Random Forest</li>
                        <li className="list-disc text-muted-foreground">Logistic Regression</li>
                        <li className="list-disc text-muted-foreground">Neural Networks</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col p-5 rounded-lg bg-accent">
                      <div className="flex items-center text-primary mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="font-medium">4</span>
                        </div>
                        <h4 className="font-medium">Evaluation Metrics</h4>
                      </div>
                      <ul className="space-y-2 ml-10 text-sm">
                        <li className="list-disc text-muted-foreground">Precision & Recall</li>
                        <li className="list-disc text-muted-foreground">F1 Score</li>
                        <li className="list-disc text-muted-foreground">AUC-ROC</li>
                        <li className="list-disc text-muted-foreground">Confusion Matrix</li>
                        <li className="list-disc text-muted-foreground">Cost-sensitive evaluation</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col p-5 rounded-lg bg-accent">
                      <div className="flex items-center text-primary mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="font-medium">5</span>
                        </div>
                        <h4 className="font-medium">Deployment</h4>
                      </div>
                      <ul className="space-y-2 ml-10 text-sm">
                        <li className="list-disc text-muted-foreground">API development</li>
                        <li className="list-disc text-muted-foreground">Real-time scoring</li>
                        <li className="list-disc text-muted-foreground">Interpretability tools</li>
                        <li className="list-disc text-muted-foreground">Model monitoring</li>
                        <li className="list-disc text-muted-foreground">Retraining pipeline</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-12 backdrop-blur-sm bg-white/40 border border-white/20 shadow-glass">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Disclaimer</h3>
                <p className="text-muted-foreground">
                  This is a demonstration project for educational purposes. The fraud detection system 
                  shown uses simulated machine learning predictions based on the dataset structure, but is not 
                  actually running real-time ML inference. In a production environment, this would be 
                  connected to a trained model API endpoint.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FraudGuard ML. Built with 
            <Terminal className="h-3.5 w-3.5 inline-block mx-1" />
            and modern web technologies.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default About;
