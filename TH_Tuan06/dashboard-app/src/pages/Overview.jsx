// src/components/Overview.jsx
import React from 'react';

const Overview = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* Thẻ Doanh thu */}
      <div className="bg-pink-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">DOANH THU</h2>
          <div className="text-pink-500">📊</div>
        </div>
        <div className="text-3xl font-bold">$92,405</div>
        <div className="text-green-500 text-sm">▲ 5.39% thay đổi theo kỳ</div>
      </div>

      {/* Thẻ Lợi nhuận */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">LỢI NHUẬN</h2>
          <div className="text-blue-500">💰</div>
        </div>
        <div className="text-3xl font-bold">$32,218</div>
        <div className="text-green-500 text-sm">▲ 5.39% thay đổi theo kỳ</div>
      </div>

      {/* Thẻ Khách hàng mới */}
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-600">KHÁCH HÀNG MỚI</h2>
          <div className="text-blue-500">👥</div>
        </div>
        <div className="text-3xl font-bold">298</div>
        <div className="text-green-500 text-sm">▲ 6.84% thay đổi theo kỳ</div>
      </div>
    </div>
  );
};

export default Overview;