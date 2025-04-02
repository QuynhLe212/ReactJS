// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">BẢNG ĐIỀU KHIỂN</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border rounded-lg p-2 text-gray-600"
        />
        <div className="text-gray-600">🔔</div>
        <div className="text-gray-600">❓</div>
        <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;