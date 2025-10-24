import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Users, BarChart3, CreditCard } from 'lucide-react';
import UsageService, { UsageMetrics, PricingTier, BillingInfo } from '../services/UsageService';
import './PricingScreen.css';



const PricingScreen: React.FC = () => {
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  
  const usageService = UsageService.getInstance();

  useEffect(() => {
    // Load initial data
    setUsageMetrics(usageService.getUsageMetrics());
    setPricingTiers(usageService.getPricingTiers());
    setBillingInfo(usageService.getBillingInfo());
  }, [usageService]);

  const currentTierData = pricingTiers.find(tier => tier.id === billingInfo?.currentTier);

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((used / limit) * 100, 100);
  };

  const formatUsage = (used: number, limit: number) => {
    if (limit === -1) return `${used.toLocaleString()}+`;
    return `${used.toLocaleString()} / ${limit.toLocaleString()}`;
  };

  const handleUpgrade = (tierId: string) => {
    usageService.upgradeTier(tierId);
    setBillingInfo(usageService.getBillingInfo());
    console.log(`Upgrading to ${tierId} tier`);
  };

  const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
    setSelectedBillingCycle(cycle);
    usageService.updateBillingCycle(cycle);
    setPricingTiers(usageService.getPricingTiers());
  };

  if (!usageMetrics || !billingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pricing-screen">
      <div className="pricing-header">
        <h1>Usage & Pricing</h1>
        <p>Choose the plan that fits your needs. Pay only for what you use.</p>
        
        <div className="billing-toggle">
          <button
            className={`toggle-button ${selectedBillingCycle === 'monthly' ? 'active' : ''}`}
            onClick={() => handleBillingCycleChange('monthly')}
          >
            Monthly
          </button>
          <button
            className={`toggle-button ${selectedBillingCycle === 'yearly' ? 'active' : ''}`}
            onClick={() => handleBillingCycleChange('yearly')}
          >
            Yearly
            <span className="save-badge">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="pricing-content">
        <div className="current-usage-section">
          <h2>Current Usage</h2>
          <div className="usage-cards">
            <div className="usage-card">
              <div className="usage-icon">
                <Zap size={20} />
              </div>
              <div className="usage-info">
                <h3>Messages</h3>
                <p className="usage-count">{formatUsage(usageMetrics.messagesUsed, currentTierData?.usageLimits.messages || 0)}</p>
                <div className="usage-bar">
                  <div 
                    className="usage-progress" 
                    style={{ width: `${getUsagePercentage(usageMetrics.messagesUsed, currentTierData?.usageLimits.messages || 0)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="usage-card">
              <div className="usage-icon">
                <Users size={20} />
              </div>
              <div className="usage-info">
                <h3>Team Members</h3>
                <p className="usage-count">{formatUsage(usageMetrics.teamMembers, currentTierData?.usageLimits.teamMembers || 0)}</p>
                <div className="usage-bar">
                  <div 
                    className="usage-progress" 
                    style={{ width: `${getUsagePercentage(usageMetrics.teamMembers, currentTierData?.usageLimits.teamMembers || 0)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="usage-card">
              <div className="usage-icon">
                <BarChart3 size={20} />
              </div>
              <div className="usage-info">
                <h3>Knowledge Items</h3>
                <p className="usage-count">{formatUsage(usageMetrics.knowledgeItems, currentTierData?.usageLimits.knowledgeItems || 0)}</p>
                <div className="usage-bar">
                  <div 
                    className="usage-progress" 
                    style={{ width: `${getUsagePercentage(usageMetrics.knowledgeItems, currentTierData?.usageLimits.knowledgeItems || 0)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="usage-card">
              <div className="usage-icon">
                <Crown size={20} />
              </div>
              <div className="usage-info">
                <h3>Custom Brands</h3>
                <p className="usage-count">{formatUsage(usageMetrics.customBrands, currentTierData?.usageLimits.customBrands || 0)}</p>
                <div className="usage-bar">
                  <div 
                    className="usage-progress" 
                    style={{ width: `${getUsagePercentage(usageMetrics.customBrands, currentTierData?.usageLimits.customBrands || 0)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="billing-period">
            <p>Billing period: {new Date(usageMetrics.currentPeriod.start).toLocaleDateString()} - {new Date(usageMetrics.currentPeriod.end).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="pricing-tiers">
          <h2>Available Plans</h2>
          <div className="tier-cards">
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.id}
                className={`tier-card ${tier.popular ? 'popular' : ''} ${billingInfo.currentTier === tier.id ? 'current' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tier.popular && <div className="popular-badge">Most Popular</div>}
                                 {billingInfo.currentTier === tier.id && <div className="current-badge">Current Plan</div>}
                
                <div className="tier-header">
                  <h3>{tier.name}</h3>
                  <div className="tier-price">
                    <span className="price-amount">${tier.price}</span>
                    <span className="price-period">/{selectedBillingCycle === 'monthly' ? 'mo' : 'year'}</span>
                  </div>
                </div>

                <div className="tier-features">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={16} className="check-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="tier-actions">
                                    {billingInfo.currentTier === tier.id ? (
                    <button className="current-plan-button" disabled>
                      Current Plan
                    </button>
                  ) : (
                    <button 
                      className={`upgrade-button ${tier.popular ? 'popular' : ''}`}
                      onClick={() => handleUpgrade(tier.id)}
                    >
                      {currentTierData && (pricingTiers.find(t => t.id === billingInfo.currentTier)?.price || 0) > tier.price ? 'Downgrade' : 'Upgrade'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="usage-alerts">
          <h2>Usage Alerts</h2>
          <div className="alert-settings">
            <div className="alert-item">
              <label>
                <input type="checkbox" defaultChecked />
                Email me when I reach 80% of my usage limit
              </label>
            </div>
            <div className="alert-item">
              <label>
                <input type="checkbox" defaultChecked />
                Email me when I reach 100% of my usage limit
              </label>
            </div>
            <div className="alert-item">
              <label>
                <input type="checkbox" />
                Auto-upgrade when I exceed my current plan
              </label>
            </div>
          </div>
        </div>

        <div className="billing-info">
          <h2>Billing Information</h2>
          <div className="billing-details">
            <div className="billing-card">
              <CreditCard size={20} />
              <div className="card-info">
                <h3>Payment Method</h3>
                <p>•••• •••• •••• 4242</p>
                <p>Expires 12/25</p>
              </div>
              <button className="update-button">Update</button>
            </div>
            
            <div className="billing-summary">
              <h3>Next Billing Date</h3>
              <p>{new Date(usageMetrics.currentPeriod.end).toLocaleDateString()}</p>
              <h3>Current Balance</h3>
              <p>${currentTierData?.price || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingScreen; 