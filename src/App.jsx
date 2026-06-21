import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import WorkspacePage from './pages/WorkspacePage';
import CalendarPage from './pages/CalendarPage';
import IntakePage from './pages/IntakePage';
import BuilderPage from './pages/BuilderPage';
import Sidebar from './components/layout/Sidebar';
import './App.css';

const SHELL_ROUTES = ['/workspace', '/calendar'];

const AppLayout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isShell = SHELL_ROUTES.includes(location.pathname);

  if (!isShell) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intake" element={<IntakePage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed(c => !c)} />
      <main className="app-main">
        <Routes>
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
