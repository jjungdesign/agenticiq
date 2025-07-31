import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, FileText, Users, Settings } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const analysisSteps = [
    {
      icon: <Database className="analysis-icon" />,
      title: "Analyzing company data",
      description: "Processing your business information and structure"
    },
    {
      icon: <FileText className="analysis-icon" />,
      title: "Reviewing brand guidelines",
      description: "Extracting tone, style, and content preferences"
    },
    {
      icon: <Users className="analysis-icon" />,
      title: "Understanding your audience",
      description: "Identifying target demographics and communication patterns"
    },
    {
      icon: <Settings className="analysis-icon" />,
      title: "Configuring IQs",
      description: "Creating personalized intelligent queries for your workspace"
    },
    {
      icon: <Brain className="analysis-icon" />,
      title: "Finalizing setup",
      description: "Optimizing your workspace for maximum efficiency"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          return analysisSteps.length - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-container">
        <div className="jasper-avatar">
          <div className="avatar-circle">
            <span className="avatar-text">j</span>
          </div>
        </div>

        <div className="loading-content">
          <h1 className="loading-title">Analyzing your company information...</h1>
          
          <div className="progress-bar-container">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>

          <div className="analysis-steps">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`analysis-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= currentStep ? 1 : 0.3,
                  x: index <= currentStep ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="step-icon-wrapper">
                  {step.icon}
                  {index < currentStep && (
                    <motion.div
                      className="checkmark"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="loading-message">
            <p>This will take just a moment. Jasper is learning about your business to create the perfect workspace.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 