
import pptxgen from 'pptxgenjs';
import { fraudDistribution, modelPerformance, fraudOverTime } from './mockData';

/**
 * Generates and downloads a PowerPoint presentation about the FraudGuard project
 */
export const exportProjectPresentation = () => {
  // Create a new presentation
  const pres = new pptxgen();

  // Set presentation properties
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'FraudGuard Project Overview';
  pres.subject = 'Fraud Detection System';
  pres.author = 'FraudGuard Team';

  // Add title slide
  const titleSlide = pres.addSlide();
  titleSlide.background = { color: '0b1437' };
  
  titleSlide.addText('FraudGuard', {
    x: 1,
    y: 1.8,
    w: '100%',
    h: 1.5,
    fontSize: 54,
    color: 'ffffff',
    fontFace: 'Arial',
    align: 'center',
    bold: true,
  });
  
  titleSlide.addText('Intelligent Fraud Detection System', {
    x: 1,
    y: 3.3,
    w: '100%',
    h: 0.8,
    fontSize: 24,
    color: '3b82f6',
    fontFace: 'Arial',
    align: 'center',
  });

  // Introduction slide
  const introSlide = pres.addSlide();
  introSlide.addText('Project Overview', {
    x: 0.5,
    y: 0.5,
    w: '100%',
    h: 0.8,
    fontSize: 32,
    color: '0b1437',
    fontFace: 'Arial',
    bold: true,
  });
  
  introSlide.addText([
    { text: 'FraudGuard is an advanced fraud detection system that uses machine learning to identify and prevent fraudulent transactions in real-time. Key features include:', fontSize: 16, bullet: false },
    { text: 'Real-time transaction monitoring and analysis', fontSize: 16, bullet: true },
    { text: 'Machine learning-based fraud detection algorithms', fontSize: 16, bullet: true },
    { text: 'Interactive dashboard with comprehensive analytics', fontSize: 16, bullet: true },
    { text: 'Transaction risk assessment tool', fontSize: 16, bullet: true },
    { text: 'Secure user authentication system', fontSize: 16, bullet: true },
  ], {
    x: 0.5,
    y: 1.5,
    w: '90%',
    h: 3,
    fontFace: 'Arial',
    color: '333333',
  });

  // Technology stack slide
  const techSlide = pres.addSlide();
  techSlide.addText('Technology Stack', {
    x: 0.5,
    y: 0.5,
    w: '100%',
    h: 0.8,
    fontSize: 32,
    color: '0b1437',
    fontFace: 'Arial',
    bold: true,
  });
  
  techSlide.addText([
    { text: 'Frontend', fontSize: 20, bold: true, bullet: false },
    { text: 'React with TypeScript for type safety', fontSize: 16, bullet: true },
    { text: 'Tailwind CSS & shadcn/ui for responsive interface', fontSize: 16, bullet: true },
    { text: 'Recharts for interactive data visualization', fontSize: 16, bullet: true },
    { text: 'Framer Motion for smooth animations', fontSize: 16, bullet: true },
    { text: '\nBackend', fontSize: 20, bold: true, bullet: false },
    { text: 'Supabase for authentication and database', fontSize: 16, bullet: true },
    { text: 'Machine learning model for fraud prediction', fontSize: 16, bullet: true },
  ], {
    x: 0.5,
    y: 1.5,
    w: '90%',
    h: 4,
    fontFace: 'Arial',
    color: '333333',
  });

  // Statistics slide
  const statsSlide = pres.addSlide();
  statsSlide.addText('Fraud Detection Statistics', {
    x: 0.5,
    y: 0.5,
    w: '100%',
    h: 0.8,
    fontSize: 32,
    color: '0b1437',
    fontFace: 'Arial',
    bold: true,
  });
  
  // Add chart with sample data
  const totalTransactions = fraudDistribution.genuine + fraudDistribution.fraud;
  const fraudPercentage = (fraudDistribution.fraud / totalTransactions * 100).toFixed(3);
  
  statsSlide.addChart(
    pres.ChartType.PIE, 
    [
      {
        name: 'Genuine Transactions',
        labels: ['Genuine', 'Fraud'],
        values: [fraudDistribution.genuine, fraudDistribution.fraud],
      }
    ],
    {
      x: 1,
      y: 1.5,
      w: 4,
      h: 3,
      chartColors: ['16a34a', 'ef4444'],
      showLegend: true,
      legendPos: 'b',
    }
  );
  
  statsSlide.addText([
    { text: 'Transaction Statistics', fontSize: 18, bold: true, bullet: false },
    { text: `Total Transactions: ${totalTransactions.toLocaleString()}`, fontSize: 16, bullet: true },
    { text: `Fraudulent Transactions: ${fraudDistribution.fraud.toLocaleString()}`, fontSize: 16, bullet: true },
    { text: `Fraud Percentage: ${fraudPercentage}%`, fontSize: 16, bullet: true },
  ], {
    x: 5.5,
    y: 1.8,
    w: 4,
    h: 3,
    fontFace: 'Arial',
    color: '333333',
  });

  // Model performance slide
  const modelSlide = pres.addSlide();
  modelSlide.addText('Model Performance', {
    x: 0.5,
    y: 0.5,
    w: '100%',
    h: 0.8,
    fontSize: 32,
    color: '0b1437',
    fontFace: 'Arial',
    bold: true,
  });
  
  // Add chart for model performance
  const performanceData = Object.entries(modelPerformance).map(([key, value]) => ({
    name: key === 'auc' ? 'AUC-ROC' : key.charAt(0).toUpperCase() + key.slice(1),
    value: parseFloat(value.toFixed(3)) * 100
  }));
  
  modelSlide.addChart(
    pres.ChartType.BAR,
    [
      {
        name: 'Metrics',
        labels: performanceData.map(item => item.name),
        values: performanceData.map(item => item.value),
      }
    ],
    {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 3.5,
      chartColors: ['3b82f6'],
      showValue: true,
      valAxisMaxVal: 100,
      dataLabelFormatCode: '0.0"%"',
    }
  );

  // Conclusion slide
  const conclusionSlide = pres.addSlide();
  conclusionSlide.background = { color: '0b1437' };
  
  conclusionSlide.addText('Thank You', {
    x: 1,
    y: 2.5,
    w: '100%',
    h: 1.5,
    fontSize: 44,
    color: 'ffffff',
    fontFace: 'Arial',
    align: 'center',
    bold: true,
  });
  
  conclusionSlide.addText('FraudGuard - Protecting Transactions with Machine Learning', {
    x: 1,
    y: 4,
    w: '100%',
    h: 0.8,
    fontSize: 20,
    color: '3b82f6',
    fontFace: 'Arial',
    align: 'center',
  });

  // Save the presentation
  pres.writeFile({ fileName: 'FraudGuard_Project_Overview.pptx' });
};
