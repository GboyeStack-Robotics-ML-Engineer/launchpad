import React from 'react';
import { Home, CalendarDays, Sparkles, ShieldCheck } from 'lucide-react';

const BottomNav = ({ selectedTab, onTabSelected }) => {
  const tabs = [
    { id: 'Home', icon: Home },
    { id: 'Calendar', icon: CalendarDays },
    { id: 'AI Assistant', icon: Sparkles },
    { id: 'Security', icon: ShieldCheck }
  ];

  return (
    <div className="bottom-nav">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = selectedTab === tab.id;
        return (
          <button 
            key={tab.id} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabSelected(tab.id)}
          >
            <div className="nav-icon-container">
              <Icon size={20} />
            </div>
            <span className="nav-label">{tab.id}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
