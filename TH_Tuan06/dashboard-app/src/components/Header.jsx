// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">JD</span>
          </div>
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
        <button className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors shadow-sm">
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Header;