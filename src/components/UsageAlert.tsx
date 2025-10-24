import React from 'react';
import { AlertTriangle, X, Zap, Users, BarChart3, Crown } from 'lucide-react';
import { UsageAlert as UsageAlertType } from '../services/UsageService';
import './UsageAlert.css';

interface UsageAlertProps {
  alert: UsageAlertType;
  onDismiss?: () => void;
  onUpgrade?: () => void;
}

const UsageAlert: React.FC<UsageAlertProps> = ({ alert, onDismiss, onUpgrade }) => {
  const getIcon = () => {
    switch (alert.metric) {
      case 'messages':
        return <Zap size={16} />;
      case 'teamMembers':
        return <Users size={16} />;
      case 'knowledgeItems':
        return <BarChart3 size={16} />;
      case 'customBrands':
        return <Crown size={16} />;
      default:
        return <AlertTriangle size={16} />;
    }
  };

  const getAlertClass = () => {
    switch (alert.type) {
      case 'warning':
        return 'usage-alert warning';
      case 'critical':
        return 'usage-alert critical';
      case 'limit-reached':
        return 'usage-alert limit-reached';
      default:
        return 'usage-alert';
    }
  };

  const getProgressColor = () => {
    if (alert.percentage >= 100) return '#ef4444';
    if (alert.percentage >= 80) return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <div className={getAlertClass()}>
      <div className="alert-icon">
        {getIcon()}
      </div>
      
      <div className="alert-content">
        <div className="alert-header">
          <h4>{alert.message}</h4>
          {onDismiss && (
            <button className="dismiss-button" onClick={onDismiss}>
              <X size={16} />
            </button>
          )}
        </div>
        
        <div className="alert-details">
          <div className="usage-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${Math.min(alert.percentage, 100)}%`,
                  backgroundColor: getProgressColor()
                }}
              />
            </div>
            <span className="progress-text">
              {alert.currentUsage.toLocaleString()} / {alert.limit.toLocaleString()} ({Math.round(alert.percentage)}%)
            </span>
          </div>
          
          {alert.type === 'limit-reached' && (
            <div className="limit-reached-actions">
              <p className="limit-message">
                You've reached your {alert.metric} limit. Consider upgrading your plan to continue using this feature.
              </p>
              {onUpgrade && (
                <button className="upgrade-button" onClick={onUpgrade}>
                  Upgrade Plan
                </button>
              )}
            </div>
          )}
          
          {alert.type === 'warning' && (
            <p className="warning-message">
              You're approaching your {alert.metric} limit. Consider monitoring your usage or upgrading your plan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageAlert; 