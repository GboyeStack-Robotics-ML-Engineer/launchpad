import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import Calendar from './components/Calendar';
import AIAssistant from './components/AIAssistant';

function App() {
  const [selectedTab, setSelectedTab] = useState('AI Assistant');

  const renderContent = () => {
    switch (selectedTab) {
      case 'Home':
        return <Home onStartInterrogation={() => setSelectedTab('AI Assistant')} />;
      case 'Calendar':
        return <Calendar />;
      case 'AI Assistant':
        return <AIAssistant onClose={() => setSelectedTab('Home')} />;
      default:
        return (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'gray' }}>
            {selectedTab} Screen Content
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {selectedTab !== 'AI Assistant' && <Header />}
      
      <div className={selectedTab === 'AI Assistant' ? '' : 'content-area'}>
        {renderContent()}
      </div>

      {selectedTab !== 'AI Assistant' && (
        <BottomNav selectedTab={selectedTab} onTabSelected={setSelectedTab} />
      )}
    </div>
  );
}

export default App;
