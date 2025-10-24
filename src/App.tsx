import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import PricingScreen from './components/PricingScreen';
import './App.css';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'chat' | 'loading' | 'complete' | 'pricing'>('chat');
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check if this is the first time login
    const hasLoggedInBefore = localStorage.getItem('jasper-first-login');
    if (hasLoggedInBefore) {
      setIsFirstTime(false);
    }
  }, []);

  const handleChatComplete = () => {
    setCurrentStep('loading');
    // Simulate the analysis process
    setTimeout(() => {
      setCurrentStep('complete');
      localStorage.setItem('jasper-first-login', 'true');
    }, 5000); // 5 seconds for demo
  };

  const handleSkipSetup = () => {
    setCurrentStep('complete');
    localStorage.setItem('jasper-first-login', 'true');
  };

  if (!isFirstTime) {
    return (
      <div className="app">
        <div className="dashboard">
          <h1>Welcome back to Jasper!</h1>
          <p>Your workspace is ready to go.</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button 
              className="primary-button" 
              onClick={() => {
                localStorage.removeItem('jasper-first-login');
                window.location.reload();
              }}
            >
              Reset Setup (Demo)
            </button>
            <button 
              className="primary-button" 
              onClick={() => setCurrentStep('pricing')}
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentStep === 'chat' && (
          <WelcomeScreen 
            key="chat"
            onComplete={handleChatComplete}
            onSkip={handleSkipSetup}
          />
        )}

        {currentStep === 'complete' && (
          <motion.div
            key="complete"
            className="complete-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="complete-content">
              <div className="success-icon">✅</div>
              <h1>Setup Complete!</h1>
              <p>Your Jasper workspace has been configured with intelligent IQs based on your company information.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="primary-button" onClick={() => window.location.reload()}>
                  Continue to Dashboard
                </button>
                <button className="primary-button" onClick={() => setCurrentStep('pricing')}>
                  View Pricing
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <PricingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App; 