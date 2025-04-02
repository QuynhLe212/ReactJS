// src/App.jsx
import React from 'react';
import Sidebar from './pages/Sidebar';
import Header from './pages/Header';
import Overview from './pages/Overview';
import DetailedReport from './pages/DetailedReport';

const App = () => {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      {/* Sidebar */}
      <div className="col-span-1">
        <Sidebar />
      </div>

      {/* Nội dung chính */}
      <div className="col-span-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Overview />
          <DetailedReport />
        </div>
      </div>
    </div>
  );
};

export default App;