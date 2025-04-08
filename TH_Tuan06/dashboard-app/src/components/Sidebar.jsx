// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from 'react-router-dom';
import teamCollaboration from "../assets/team-collaboration.jpg";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-50 shadow-lg flex flex-col justify-between">
      {/* Logo và tên ứng dụng */}
      <div className="p-6">
        <div className="text-3xl font-extrabold text-pink-600 tracking-wide">Dashboard</div>
      </div>

      {/* Các nút điều hướng */}
      <div className="flex flex-col space-y-2 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">📊</span>
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink
          to="/detailed-report"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">📋</span>
          <span className="font-medium">Báo cáo chi tiết</span>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">📁</span>
          <span className="font-medium">Dự án</span>
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">👥</span>
          <span className="font-medium">Đội nhóm</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">📈</span>
          <span className="font-medium">Phân tích</span>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">💬</span>
          <span className="font-medium">Tin nhắn</span>
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-pink-600 text-white scale-105 border-l-4 border-pink-800 shadow-md'
                : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
            }`
          }
        >
          <span className="text-lg">🔗</span>
          <span className="font-medium">Tích hợp</span>
        </NavLink>
      </div>

      {/* Phần V2.0 với hình ảnh */}
      <div className="p-6">
        <div className="bg-white p-4 rounded-xl shadow-md text-center transition-transform duration-300 hover:scale-105">
          <img
            src={teamCollaboration}
            alt="Team Collaboration"
            className="w-full h-32 object-contain mb-3"
          />
          <div className="text-gray-700 font-semibold mb-3">V2.0 ĐÃ CÓ SẴN</div>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-sm">
            Thử ngay
          </button>
        </div>
        <div className="text-gray-500 text-sm mt-3 text-center">Được tạo bởi Visily</div>
      </div>
    </div>
  );
};

export default Sidebar;