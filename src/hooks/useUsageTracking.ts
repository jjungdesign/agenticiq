import { useState, useEffect } from 'react';
import UsageService, { UsageMetrics, PricingTier, BillingInfo, UsageAlert } from '../services/UsageService';

export const useUsageTracking = () => {
  const [usageMetrics, setUsageMetrics] = useState<UsageMetrics | null>(null);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [alerts, setAlerts] = useState<UsageAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const usageService = UsageService.getInstance();

  useEffect(() => {
    loadData();
    
    // Set up periodic updates
    const interval = setInterval(() => {
      loadData();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setUsageMetrics(usageService.getUsageMetrics());
    setPricingTiers(usageService.getPricingTiers());
    setBillingInfo(usageService.getBillingInfo());
    setAlerts(usageService.checkUsageAlerts());
    setIsLoading(false);
  };

  const incrementUsage = (metric: keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>, increment: number = 1) => {
    usageService.incrementUsage(metric, increment);
    loadData();
  };

  const updateUsage = (metric: keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>, value: number) => {
    usageService.updateUsage(metric, value);
    loadData();
  };

  const upgradeTier = (tierId: string) => {
    const success = usageService.upgradeTier(tierId);
    if (success) {
      loadData();
    }
    return success;
  };

  const updateBillingCycle = (cycle: 'monthly' | 'yearly') => {
    usageService.updateBillingCycle(cycle);
    loadData();
  };

  const updateUsageAlerts = (alerts: Partial<BillingInfo['usageAlerts']>) => {
    usageService.updateUsageAlerts(alerts);
    loadData();
  };

  const getUsagePercentage = (metric: keyof PricingTier['usageLimits']) => {
    return usageService.getUsagePercentage(metric);
  };

  const formatUsage = (metric: keyof PricingTier['usageLimits']) => {
    return usageService.formatUsage(metric);
  };

  const calculateOverageCharges = () => {
    return usageService.calculateOverageCharges();
  };

  const getCurrentTier = () => {
    return usageService.getCurrentTier();
  };

  const resetUsagePeriod = () => {
    usageService.resetUsagePeriod();
    loadData();
  };

  const simulateUsageUpdate = () => {
    usageService.simulateUsageUpdate();
    loadData();
  };

  return {
    // Data
    usageMetrics,
    pricingTiers,
    billingInfo,
    alerts,
    isLoading,
    
    // Actions
    incrementUsage,
    updateUsage,
    upgradeTier,
    updateBillingCycle,
    updateUsageAlerts,
    resetUsagePeriod,
    simulateUsageUpdate,
    
    // Utilities
    getUsagePercentage,
    formatUsage,
    calculateOverageCharges,
    getCurrentTier,
    
    // Service instance (for advanced usage)
    usageService
  };
}; 