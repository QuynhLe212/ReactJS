
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Teams from './components/Teams';
import Analytics from './components/Analytics';
import Messages from './components/Messages';
import Integrations from './components/Integrations';

const App = () => {
  return (
    <Router>
      <div className="grid grid-cols-[250px_1fr] h-screen">
        {/* Sidebar */}
        <div className="col-span-1">
          <Sidebar />
        </div>

        {/* Nội dung chính */}
        <div className="col-span-1 flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/integrations" element={<Integrations />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;