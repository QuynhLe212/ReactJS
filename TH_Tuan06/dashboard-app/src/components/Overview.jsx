// src/components/Overview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
  const [overviewData, setOverviewData] = useState({
    turnover: { value: 0, change: 0 },
    profit: { value: 0, change: 0 },
    newCustomer: { value: 0, change: 0 },
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/overview');
        setOverviewData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu Overview:', error);
      }
    };
    fetchOverviewData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Thẻ Doanh thu */}
      <div className="bg-pink-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">DOANH THU</h2>
          <div className="text-pink-500">📊</div>
        </div>
        <div className="text-3xl font-bold">${overviewData.turnover.value.toLocaleString()}</div>
        <div className="text-green-500 text-sm">▲ {overviewData.turnover.change}% thay đổi theo kỳ</div>
      </div>

      {/* Thẻ Lợi nhuận */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">LỢI NHUẬN</h2>
          <div className="text-blue-500">💰</div>
        </div>
        <div className="text-3xl font-bold">${overviewData.profit.value.toLocaleString()}</div>
        <div className="text-green-500 text-sm">▲ {overviewData.profit.change}% thay đổi theo kỳ</div>
      </div>

      {/* Thẻ Khách hàng mới */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">KHÁCH HÀNG MỚI</h2>
          <div className="text-blue-500">👥</div>
        </div>
        <div className="text-3xl font-bold">{overviewData.newCustomer.value}</div>
        <div className="text-green-500 text-sm">▲ {overviewData.newCustomer.change}% thay đổi theo kỳ</div>
      </div>
    </div>
  );
};

export default Overview;