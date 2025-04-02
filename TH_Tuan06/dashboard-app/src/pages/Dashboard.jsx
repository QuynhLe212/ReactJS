// src/components/Dashboard.jsx
import React from 'react';
import Overview from './Overview';
import DetailedReport from './DetailedReport';

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <Overview />
      <DetailedReport />
    </div>
  );
};

export default Dashboard;