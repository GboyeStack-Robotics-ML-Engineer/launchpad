import React from 'react';
import CalendarCard from './CalendarCard';

const Home = ({ onStartInterrogation }) => {
  return (
    <div style={{ padding: '16px' }}>
      <CalendarCard />
      
      <div className="card" style={{ marginTop: '16px', border: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Dashboard</h2>
        <p style={{ color: 'gray', fontSize: '16px', marginBottom: '24px' }}>
          Tell me what you're trying to build or do.
        </p>
        <button className="primary-button" onClick={onStartInterrogation}>
          Start Assumption Interrogation
        </button>
      </div>
    </div>
  );
};

export default Home;
