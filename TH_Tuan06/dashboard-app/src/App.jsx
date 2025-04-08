// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/Overview';
import DetailedReport from './components/DetailedReport';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/detailed-report" element={<DetailedReport />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;