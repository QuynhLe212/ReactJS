// src/components/Header.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'BẢNG ĐIỀU KHIỂN';
      case '/projects':
        return 'DỰ ÁN';
      case '/teams':
        return 'ĐỘI NHÓM';
      case '/analytics':
        return 'PHÂN TÍCH';
      case '/messages':
        return 'TIN NHẮN';
      case '/integrations':
        return 'TÍCH HỢP';
      default:
        return 'BẢNG ĐIỀU KHIỂN';
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="border rounded-lg p-2 text-gray-600"
        />
        <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Header;