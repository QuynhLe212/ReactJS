// src/components/Sidebar.jsx
import React from "react";
import teamCollaboration from "../assets/team-collaboration.jpg"; // Đảm bảo hình ảnh đã được lưu đúng đường dẫn

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col justify-between">
      {/* Logo và tên ứng dụng */}
      <div className="p-4">
        <div className="text-2xl font-bold text-pink-500">LOGO</div>
      </div>

      {/* Các nút điều hướng */}
      <div className="flex flex-col space-y-4 p-4">
        <button className="flex items-center space-x-2 bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition-colors">
          <span>📊</span>
          <span>Dashboard</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 p-2 hover:text-gray-700 transition-colors">
          <span>📁</span>
          <span>Dự án</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 p-2 hover:text-gray-700 transition-colors">
          <span>👥</span>
          <span>Đội nhóm</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 p-2 hover:text-gray-700 transition-colors">
          <span>📈</span>
          <span>Phân tích</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 p-2 hover:text-gray-700 transition-colors">
          <span>💬</span>
          <span>Tin nhắn</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-500 p-2 hover:text-gray-700 transition-colors">
          <span>🔗</span>
          <span>Tích hợp</span>
        </button>
      </div>

      {/* Phần V2.0 với hình ảnh */}
      <div className="p-4">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          {/* Hình ảnh */}
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