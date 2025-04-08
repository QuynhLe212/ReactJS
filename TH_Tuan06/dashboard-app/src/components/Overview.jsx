// src/components/Overview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Overview = () => {
  const [overviewData, setOverviewData] = useState({
    turnover: { value: 0, change: 0 },
    profit: { value: 0, change: 0 },
    newCustomer: { value: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset lỗi trước khi fetch
        const response = await axios.get('http://localhost:3001/overview', { timeout: 10000 });
        console.log('Dữ liệu Overview:', response.data);
        if (response.data) {
          setOverviewData(response.data);
        } else {
          setError('Dữ liệu trả về rỗng. Vui lòng kiểm tra API.');
        }
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu Overview: ' + (error.message || 'Không xác định'));
        setLoading(false);
        console.error('Lỗi khi lấy dữ liệu Overview:', error.message, error.response?.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">TỔNG QUAN</h2>
      {loading ? (
        <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-gray-600 font-medium">DOANH THU</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">${overviewData.turnover.value}</p>
            <p className="text-sm text-green-600 mt-2">
              +{overviewData.turnover.change}% so với tháng trước
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-gray-600 font-medium">LỢI NHUẬN</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">${overviewData.profit.value}</p>
            <p className="text-sm text-green-600 mt-2">
              +{overviewData.profit.change}% so với tháng trước
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <h3 className="text-gray-600 font-medium">KHÁCH HÀNG MỚI</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{overviewData.newCustomer.value}</p>
            <p className="text-sm text-green-600 mt-2">
              +{overviewData.newCustomer.change}% so với tháng trước
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;