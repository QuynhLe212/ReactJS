// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from 'react-router-dom';
import teamCollaboration from "../assets/team-collaboration.jpg";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col justify-between">
      {/* Logo và tên ứng dụng */}
      <div className="p-4">
        <div className="text-2xl font-bold text-pink-500">LOGO</div>
      </div>

      {/* Các nút điều hướng */}
      <div className="flex flex-col space-y-4 p-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>📊</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>📁</span>
          <span>Dự án</span>
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>👥</span>
          <span>Đội nhóm</span>
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>📈</span>
          <span>Phân tích</span>
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>💬</span>
          <span>Tin nhắn</span>
        </NavLink>
        <NavLink
          to="/integrations"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded transition-all duration-300 ${
              isActive
                ? 'bg-blue-500 text-white scale-105 border-l-4 border-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`
          }
        >
          <span>🔗</span>
          <span>Tích hợp</span>
        </NavLink>
      </div>

      {/* Phần V2.0 với hình ảnh */}
      <div className="p-4">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <img
            src={teamCollaboration}
            alt="Team Collaboration"
            className="w-full h-32 object-contain mb-2"
          />
          <div className="text-gray-600 mb-2">V2.0 ĐÃ CÓ SẴN</div>
          <button className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
            Thử ngay
          </button>
        </div>
        <div className="text-gray-500 text-sm mt-2">Được tạo bởi Visily</div>
      </div>
    </div>
  );
};

export default Sidebar;