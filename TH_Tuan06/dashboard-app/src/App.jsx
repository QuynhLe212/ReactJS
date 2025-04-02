// src/App.jsx
import React from 'react';
import Sidebar from './pages/Sidebar';
import Header from './pages/Header'
import Overview from './pages/Overview';
import DetailedReport from './pages/DetailedReport';

const App = () => {
  return (
    <div className="flex">
      {/* Thanh bên */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1">
        <Header />
        <Overview />
        <DetailedReport />
      </div>
    </div>
  );
};

export default App;