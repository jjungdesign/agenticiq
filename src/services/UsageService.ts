export interface UsageMetrics {
  messagesUsed: number;
  teamMembers: number;
  knowledgeItems: number;
  customBrands: number;
  currentPeriod: {
    start: string;
    end: string;
  };
  lastUpdated: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  usageLimits: {
    messages: number;
    teamMembers: number;
    knowledgeItems: number;
    customBrands: number;
  };
  popular?: boolean;
}

export interface BillingInfo {
  currentTier: string;
  nextBillingDate: string;
  currentBalance: number;
  paymentMethod: {
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    brand: string;
  };
  usageAlerts: {
    eightyPercent: boolean;
    hundredPercent: boolean;
    autoUpgrade: boolean;
  };
}

export interface UsageAlert {
  type: 'warning' | 'critical' | 'limit-reached';
  message: string;
  metric: string;
  currentUsage: number;
  limit: number;
  percentage: number;
}

class UsageService {
  private static instance: UsageService;
  private usageData: UsageMetrics;
  private pricingTiers: PricingTier[];
  private billingInfo: BillingInfo;

  private constructor() {
    this.usageData = this.loadUsageData();
    this.pricingTiers = this.initializePricingTiers();
    this.billingInfo = this.loadBillingInfo();
  }

  public static getInstance(): UsageService {
    if (!UsageService.instance) {
      UsageService.instance = new UsageService();
    }
    return UsageService.instance;
  }

  private loadUsageData(): UsageMetrics {
    const stored = localStorage.getItem('jasper-usage-data');
    if (stored) {
      return JSON.parse(stored);
    }

    // Default usage data
    return {
      messagesUsed: 1250,
      teamMembers: 2,
      knowledgeItems: 3,
      customBrands: 1,
      currentPeriod: {
        start: new Date().toISOString().split('T')[0],
        end: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
      },
      lastUpdated: new Date().toISOString()
    };
  }

  private loadBillingInfo(): BillingInfo {
    const stored = localStorage.getItem('jasper-billing-info');
    if (stored) {
      return JSON.parse(stored);
    }

    // Default billing info
    return {
      currentTier: 'starter',
      nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
      currentBalance: 29,
      paymentMethod: {
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        brand: 'visa'
      },
      usageAlerts: {
        eightyPercent: true,
        hundredPercent: true,
        autoUpgrade: false
      }
    };
  }

  private initializePricingTiers(): PricingTier[] {
    return [
      {
        id: 'starter',
        name: 'Starter',
        price: 29,
        billingCycle: 'monthly',
        features: [
          'Up to 2,000 messages per month',
          'Up to 3 team members',
          '5 knowledge items',
          '1 custom brand voice',
          'Basic analytics',
          'Email support'
        ],
        usageLimits: {
          messages: 2000,
          teamMembers: 3,
          knowledgeItems: 5,
          customBrands: 1
        }
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 99,
        billingCycle: 'monthly',
        features: [
          'Up to 10,000 messages per month',
          'Up to 10 team members',
          '25 knowledge items',
          '3 custom brand voices',
          'Advanced analytics',
          'Priority support',
          'API access',
          'Custom integrations'
        ],
        usageLimits: {
          messages: 10000,
          teamMembers: 10,
          knowledgeItems: 25,
          customBrands: 3
        },
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 299,
        billingCycle: 'monthly',
        features: [
          'Unlimited messages',
          'Unlimited team members',
          'Unlimited knowledge items',
          'Unlimited custom brands',
          'Advanced analytics & reporting',
          'Dedicated support',
          'Full API access',
          'Custom integrations',
          'SSO & advanced security',
          'Custom training'
        ],
        usageLimits: {
          messages: -1, // Unlimited
          teamMembers: -1,
          knowledgeItems: -1,
          customBrands: -1
        }
      }
    ];
  }

  public getUsageMetrics(): UsageMetrics {
    return { ...this.usageData };
  }

  public getPricingTiers(): PricingTier[] {
    return [...this.pricingTiers];
  }

  public getBillingInfo(): BillingInfo {
    return { ...this.billingInfo };
  }

  public getCurrentTier(): PricingTier | undefined {
    return this.pricingTiers.find(tier => tier.id === this.billingInfo.currentTier);
  }

  public updateUsage(metric: keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>, value: number): void {
    this.usageData[metric] = value;
    this.usageData.lastUpdated = new Date().toISOString();
    this.saveUsageData();
  }

  public incrementUsage(metric: keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>, increment: number = 1): void {
    this.usageData[metric] += increment;
    this.usageData.lastUpdated = new Date().toISOString();
    this.saveUsageData();
  }

  public upgradeTier(tierId: string): boolean {
    const targetTier = this.pricingTiers.find(tier => tier.id === tierId);
    if (!targetTier) {
      return false;
    }

    this.billingInfo.currentTier = tierId;
    this.billingInfo.currentBalance = targetTier.price;
    this.saveBillingInfo();
    return true;
  }

  public updateBillingCycle(cycle: 'monthly' | 'yearly'): void {
    this.pricingTiers = this.pricingTiers.map(tier => ({
      ...tier,
      billingCycle: cycle,
      price: cycle === 'yearly' ? Math.round(tier.price * 10) : Math.round(tier.price / 10)
    }));
  }

  public updateUsageAlerts(alerts: Partial<BillingInfo['usageAlerts']>): void {
    this.billingInfo.usageAlerts = { ...this.billingInfo.usageAlerts, ...alerts };
    this.saveBillingInfo();
  }

  public checkUsageAlerts(): UsageAlert[] {
    const currentTier = this.getCurrentTier();
    if (!currentTier) return [];

    const alerts: UsageAlert[] = [];
    const metrics = [
      { key: 'messages', value: this.usageData.messagesUsed, limit: currentTier.usageLimits.messages },
      { key: 'teamMembers', value: this.usageData.teamMembers, limit: currentTier.usageLimits.teamMembers },
      { key: 'knowledgeItems', value: this.usageData.knowledgeItems, limit: currentTier.usageLimits.knowledgeItems },
      { key: 'customBrands', value: this.usageData.customBrands, limit: currentTier.usageLimits.customBrands }
    ];

    metrics.forEach(({ key, value, limit }) => {
      if (limit === -1) return; // Unlimited

      const percentage = (value / limit) * 100;
      
      if (percentage >= 100) {
        alerts.push({
          type: 'limit-reached',
          message: `You've reached your ${key} limit`,
          metric: key,
          currentUsage: value,
          limit,
          percentage
        });
      } else if (percentage >= 80 && this.billingInfo.usageAlerts.eightyPercent) {
        alerts.push({
          type: 'warning',
          message: `You're approaching your ${key} limit`,
          metric: key,
          currentUsage: value,
          limit,
          percentage
        });
      }
    });

    return alerts;
  }

  public getUsagePercentage(metric: keyof PricingTier['usageLimits']): number {
    const currentTier = this.getCurrentTier();
    if (!currentTier) return 0;

    const limit = currentTier.usageLimits[metric];
    if (limit === -1) return 0; // Unlimited

    const used = this.usageData[metric as keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>] as number;
    return Math.min((used / limit) * 100, 100);
  }

  public formatUsage(metric: keyof PricingTier['usageLimits']): string {
    const currentTier = this.getCurrentTier();
    if (!currentTier) return '0 / 0';

    const limit = currentTier.usageLimits[metric];
    const used = this.usageData[metric as keyof Omit<UsageMetrics, 'currentPeriod' | 'lastUpdated'>] as number;

    if (limit === -1) return `${used.toLocaleString()}+`;
    return `${used.toLocaleString()} / ${limit.toLocaleString()}`;
  }

  public calculateOverageCharges(): number {
    const currentTier = this.getCurrentTier();
    if (!currentTier) return 0;

    let totalOverage = 0;
    
    // Calculate overage for messages (most common overage)
    if (currentTier.usageLimits.messages !== -1 && this.usageData.messagesUsed > currentTier.usageLimits.messages) {
      const overage = this.usageData.messagesUsed - currentTier.usageLimits.messages;
      totalOverage += overage * 0.01; // $0.01 per message overage
    }

    return totalOverage;
  }

  public resetUsagePeriod(): void {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

    this.usageData = {
      messagesUsed: 0,
      teamMembers: this.usageData.teamMembers, // Keep team members
      knowledgeItems: this.usageData.knowledgeItems, // Keep knowledge items
      customBrands: this.usageData.customBrands, // Keep custom brands
      currentPeriod: {
        start: now.toISOString().split('T')[0],
        end: endOfMonth.toISOString().split('T')[0]
      },
      lastUpdated: now.toISOString()
    };

    this.saveUsageData();
  }

  private saveUsageData(): void {
    localStorage.setItem('jasper-usage-data', JSON.stringify(this.usageData));
  }

  private saveBillingInfo(): void {
    localStorage.setItem('jasper-billing-info', JSON.stringify(this.billingInfo));
  }

  // Simulate real-time usage updates
  public simulateUsageUpdate(): void {
    // Simulate message usage
    const messageIncrement = Math.floor(Math.random() * 10) + 1;
    this.incrementUsage('messagesUsed', messageIncrement);

    // Simulate team member changes (less frequent)
    if (Math.random() < 0.1) {
      const teamChange = Math.random() < 0.5 ? 1 : -1;
      const newTeamCount = Math.max(1, this.usageData.teamMembers + teamChange);
      this.updateUsage('teamMembers', newTeamCount);
    }
  }
}

export default UsageService; 