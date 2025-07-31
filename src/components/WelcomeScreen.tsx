import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Database } from 'lucide-react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'loading' | 'complete' | 'brand-voice' | 'audiences' | 'knowledge'>('welcome');
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState(0);
  const [brandVoiceFeedback, setBrandVoiceFeedback] = useState<'not-accurate' | 'needs-tweak' | 'looks-good' | null>(null);
  const [audiencesFeedback, setAudiencesFeedback] = useState<'not-accurate' | 'needs-tweak' | 'looks-good' | null>(null);
  const [knowledgeFeedback, setKnowledgeFeedback] = useState<'not-accurate' | 'needs-tweak' | 'looks-good' | null>(null);

  const analysisSteps = [
    {
      icon: <Database className="analysis-icon" />,
      title: "Brand Voice",
      description: "Analyzing your company's tone and style"
    },
    {
      icon: <Brain className="analysis-icon" />,
      title: "Two Audiences",
      description: "Identifying your target demographics"
    },
    {
      icon: <Brain className="analysis-icon" />,
      title: "5 Knowledge Items",
      description: "Processing your business information"
    }
  ];

  const handleStartSetup = () => {
    setCurrentStep('loading');
    
    // Start step progression
    const stepInterval = setInterval(() => {
      setCurrentAnalysisStep(prev => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setCurrentStep('complete');
          }, 1000);
          return analysisSteps.length - 1;
        }
        return prev + 1;
      });
    }, 1500);

    return () => {
      clearInterval(stepInterval);
    };
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleReviewIQ = () => {
    setCurrentStep('brand-voice');
  };

  const handleDoLater = () => {
    onComplete();
  };

  const handleConfirmIQ = () => {
    onComplete();
  };

  const handleNextPage = () => {
    if (currentStep === 'brand-voice') {
      setCurrentStep('audiences');
    } else if (currentStep === 'audiences') {
      setCurrentStep('knowledge');
    }
  };

  const handlePreviousPage = () => {
    if (currentStep === 'audiences') {
      setCurrentStep('brand-voice');
    } else if (currentStep === 'knowledge') {
      setCurrentStep('audiences');
    }
  };

  const handleBrandVoiceFeedback = (feedback: 'not-accurate' | 'needs-tweak' | 'looks-good') => {
    setBrandVoiceFeedback(feedback);
  };

  const handleAudiencesFeedback = (feedback: 'not-accurate' | 'needs-tweak' | 'looks-good') => {
    setAudiencesFeedback(feedback);
  };

  const handleKnowledgeFeedback = (feedback: 'not-accurate' | 'needs-tweak' | 'looks-good') => {
    setKnowledgeFeedback(feedback);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <motion.div 
          className="message jasper-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="message-avatar">
            <div className="avatar-circle">
              <span className="avatar-text">J</span>
            </div>
          </div>
          <div className="message-content">
            <div className="message-bubble">
              <p>
                Welcome to Jasper, Sarah! I'm excited to work with you.
              </p>
              <p>
                I'll use your company profile to set up a personalized workspace — including your brand voice, audience, and knowledge base.
              </p>
              <p>
                It'll just take a few minutes. Once that's done, you'll be all set to start creating and inviting your team.
              </p>
              <p>
                Let me know when you're ready, and I'll get started.
              </p>
            </div>
            {currentStep === 'welcome' && (
              <div className="inline-ctas">
                <button className="inline-button primary" onClick={handleStartSetup}>
                  I'm ready
                </button>
                <button className="inline-button secondary" onClick={handleSkip}>
                  Skip for now
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {currentStep === 'loading' && (
          <motion.div 
            className="message jasper-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="message-avatar">
              <div className="avatar-circle">
                <span className="avatar-text">J</span>
              </div>
            </div>
            <div className="message-content">
              <div className="message-bubble loading-bubble">
                <p className="loading-title">Setting up your workspace...</p>
                
                <div className="analysis-steps">
                  {analysisSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`analysis-step ${index === currentAnalysisStep ? 'active' : ''} ${index < currentAnalysisStep ? 'completed' : ''}`}
                    >
                      <div className="step-icon-wrapper">
                        {step.icon}
                        {index < currentAnalysisStep && (
                          <div className="checkmark">✓</div>
                        )}
                      </div>
                      <div className="step-content">
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'complete' && (
          <motion.div 
            className="message jasper-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="message-avatar">
              <div className="avatar-circle">
                <span className="avatar-text">J</span>
              </div>
            </div>
            <div className="message-content">
              <div className="message-bubble">
                <p>✅ Setup Complete!</p>
                <p>Your Jasper workspace has been configured with intelligent IQs based on your company information.</p>
                <p>Would you like to review your IQs now, or would you prefer to do it later?</p>
              </div>
              <div className="inline-ctas">
                <button className="inline-button primary" onClick={handleReviewIQ}>
                  Review IQ
                </button>
                <button className="inline-button secondary" onClick={handleDoLater}>
                  I will do it later
                </button>
              </div>
            </div>
          </motion.div>
        )}

                       {currentStep === 'brand-voice' && (
                 <div className="iq-review-container">
                   <div className="iq-review-left">
                     <div className="iq-description">
                       <h2>Brand Voice</h2>
                       <p>Your IQs are configured to understand and maintain your company's unique communication style and tone.</p>

                       <div className="iq-features">
                         <div className="iq-feature">
                           <h3>🎯 Tone Consistency</h3>
                           <p>Maintains your professional yet approachable voice across all content.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>📝 Style Guidelines</h3>
                           <p>Follows your established writing patterns and preferences.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>🎨 Brand Personality</h3>
                           <p>Reflects your company's values and character in every interaction.</p>
                         </div>
                       </div>

                       {brandVoiceFeedback === null ? (
                         <div className="iq-feedback">
                           <h3>How accurate is this?</h3>
                           <div className="feedback-buttons">
                             <button 
                               className="feedback-button not-accurate" 
                               onClick={() => handleBrandVoiceFeedback('not-accurate')}
                             >
                               Not accurate at all
                             </button>
                             <button 
                               className="feedback-button needs-tweak" 
                               onClick={() => handleBrandVoiceFeedback('needs-tweak')}
                             >
                               Need some tweak
                             </button>
                             <button 
                               className="feedback-button looks-good" 
                               onClick={() => handleBrandVoiceFeedback('looks-good')}
                             >
                               Looks Good!
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div className="iq-feedback-confirmation">
                           <div className="feedback-message">
                             <p>✅ Thanks for the feedback! I've noted your preferences and will follow up to make sure your brand voice is perfectly aligned.</p>
                           </div>
                           <div className="iq-cta">
                             <button className="primary-button" onClick={handleNextPage}>
                               Next: Audiences
                             </button>
                             <button className="secondary-button" onClick={handleDoLater}>
                               Skip for now
                             </button>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>

                   <div className="iq-review-right">
                     <div className="iq-preview">
                       <div className="iq-preview-header">
                         <h3>Brand Voice Preview</h3>
                         <p>How your IQs will maintain your tone</p>
                       </div>

                       <div className="iq-preview-content">
                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">🎯</div>
                           <div className="iq-feature-details">
                             <h4>Professional yet Approachable</h4>
                             <p>Balances expertise with accessibility, making complex topics easy to understand</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">📝</div>
                           <div className="iq-feature-details">
                             <h4>Clear & Concise</h4>
                             <p>Uses straightforward language while maintaining technical accuracy</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">🎨</div>
                           <div className="iq-feature-details">
                             <h4>Consistent Style</h4>
                             <p>Maintains your established patterns across all content types</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {currentStep === 'audiences' && (
                 <div className="iq-review-container">
                   <div className="iq-review-left">
                     <div className="iq-description">
                       <h2>Two Audiences</h2>
                       <p>Your IQs are tailored to communicate effectively with your specific target demographics.</p>

                       <div className="iq-features">
                         <div className="iq-feature">
                           <h3>👥 Enterprise Clients</h3>
                           <p>Focused on ROI, scalability, and enterprise-level solutions.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>🏢 Small Business Owners</h3>
                           <p>Emphasizes practical benefits, ease of use, and cost-effectiveness.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>🎯 Adaptive Messaging</h3>
                           <p>Automatically adjusts tone and focus based on audience context.</p>
                         </div>
                       </div>

                       {audiencesFeedback === null ? (
                         <div className="iq-feedback">
                           <h3>How accurate is this?</h3>
                           <div className="feedback-buttons">
                             <button 
                               className="feedback-button not-accurate" 
                               onClick={() => handleAudiencesFeedback('not-accurate')}
                             >
                               Not accurate at all
                             </button>
                             <button 
                               className="feedback-button needs-tweak" 
                               onClick={() => handleAudiencesFeedback('needs-tweak')}
                             >
                               Need some tweak
                             </button>
                             <button 
                               className="feedback-button looks-good" 
                               onClick={() => handleAudiencesFeedback('looks-good')}
                             >
                               Looks Good!
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div className="iq-feedback-confirmation">
                           <div className="feedback-message">
                             <p>✅ Thanks for the feedback! I've noted your audience preferences and will follow up to ensure perfect targeting.</p>
                           </div>
                           <div className="iq-cta">
                             <button className="secondary-button" onClick={handlePreviousPage}>
                               Previous: Brand Voice
                             </button>
                             <button className="primary-button" onClick={handleNextPage}>
                               Next: Knowledge Items
                             </button>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>

                   <div className="iq-review-right">
                     <div className="iq-preview">
                       <div className="iq-preview-header">
                         <h3>Audience Targeting</h3>
                         <p>How your IQs adapt to different audiences</p>
                       </div>

                       <div className="iq-preview-content">
                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">👥</div>
                           <div className="iq-feature-details">
                             <h4>Enterprise Focus</h4>
                             <p>Emphasizes enterprise benefits, integration capabilities, and ROI metrics</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">🏢</div>
                           <div className="iq-feature-details">
                             <h4>SMB Approach</h4>
                             <p>Highlights practical benefits, quick setup, and cost-effective solutions</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">🎯</div>
                           <div className="iq-feature-details">
                             <h4>Smart Adaptation</h4>
                             <p>Automatically detects context and adjusts messaging accordingly</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               )}

               {currentStep === 'knowledge' && (
                 <div className="iq-review-container">
                   <div className="iq-review-left">
                     <div className="iq-description">
                       <h2>5 Knowledge Items</h2>
                       <p>Your IQs are powered by key business information that ensures accurate and relevant responses.</p>

                       <div className="iq-features">
                         <div className="iq-feature">
                           <h3>📋 Company Processes</h3>
                           <p>Understanding of your internal workflows and procedures.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>📦 Product Information</h3>
                           <p>Detailed knowledge of your offerings and capabilities.</p>
                         </div>

                         <div className="iq-feature">
                           <h3>📊 Customer Data</h3>
                           <p>Insights into your customer base and their needs.</p>
                         </div>
                       </div>

                       {knowledgeFeedback === null ? (
                         <div className="iq-feedback">
                           <h3>How accurate is this?</h3>
                           <div className="feedback-buttons">
                             <button 
                               className="feedback-button not-accurate" 
                               onClick={() => handleKnowledgeFeedback('not-accurate')}
                             >
                               Not accurate at all
                             </button>
                             <button 
                               className="feedback-button needs-tweak" 
                               onClick={() => handleKnowledgeFeedback('needs-tweak')}
                             >
                               Need some tweak
                             </button>
                             <button 
                               className="feedback-button looks-good" 
                               onClick={() => handleKnowledgeFeedback('looks-good')}
                             >
                               Looks Good!
                             </button>
                           </div>
                         </div>
                       ) : (
                         <div className="iq-feedback-confirmation">
                           <div className="feedback-message">
                             <p>✅ Thanks for the feedback! I've noted your knowledge base preferences and will follow up to ensure comprehensive coverage.</p>
                           </div>
                           <div className="iq-cta">
                             <button className="secondary-button" onClick={handlePreviousPage}>
                               Previous: Audiences
                             </button>
                             <button className="primary-button" onClick={handleConfirmIQ}>
                               Confirm & Continue
                             </button>
                           </div>
                         </div>
                       )}
                     </div>
                   </div>

                   <div className="iq-review-right">
                     <div className="iq-preview">
                       <div className="iq-preview-header">
                         <h3>Knowledge Base</h3>
                         <p>What powers your intelligent responses</p>
                       </div>

                       <div className="iq-preview-content">
                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">📋</div>
                           <div className="iq-feature-details">
                             <h4>Process Documentation</h4>
                             <p>Internal workflows, procedures, and operational guidelines</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">📦</div>
                           <div className="iq-feature-details">
                             <h4>Product Details</h4>
                             <p>Features, specifications, pricing, and use cases</p>
                           </div>
                         </div>

                         <div className="iq-feature-card">
                           <div className="iq-feature-icon">📊</div>
                           <div className="iq-feature-details">
                             <h4>Customer Insights</h4>
                             <p>Demographics, pain points, preferences, and feedback</p>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
      </div>


    </div>
  );
};

export default WelcomeScreen; 