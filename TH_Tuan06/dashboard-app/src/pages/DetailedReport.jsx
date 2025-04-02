// src/components/DetailedReport.jsx
import React from 'react';

const DetailedReport = () => {
  // Dữ liệu mẫu cho bảng
  const data = [
    { name: 'Elizabeth Lee', company: 'AvatarSystems', value: '$359', date: '10/07/2023', status: 'New' },
    { name: 'Carlos Garcia', company: 'SnoozeShift', value: '$747', date: '24/07/2023', status: 'New' },
    { name: 'Elizabeth Bailey', company: 'PrimeTime Telecom', value: '$564', date: '08/08/2023', status: 'In-progress' },
    { name: 'Ryan Brown', company: 'OmniTech Corporation', value: '$541', date: '31/08/2023', status: 'In-progress' },
    { name: 'Ryan Young', company: 'DataStream Inc.', value: '$769', date: '01/05/2023', status: 'Completed' },
    { name: 'Hailey Adams', company: 'FlowRush', value: '$922', date: '10/06/2023', status: 'Completed' },
  ];

  return (
    <div className="p-4">
      {/* Tiêu đề và nút Import/Export */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">BÁO CÁO CHI TIẾT</h2>
        <div className="flex space-x-2">
          <button className="bg-pink-500 text-white px-4 py-2 rounded">IMPORT</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">EXPORT</button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">
              <input type="checkbox" />
            </th>
            <th className="p-2 text-left">TÊN KHÁCH HÀNG</th>
            <th className="p-2 text-left">CÔNG TY</th>
            <th className="p-2 text-left">GIÁ TRỊ ĐƠN HÀNG</th>
            <th className="p-2 text-left">NGÀY ĐẶT HÀNG</th>
            <th className="p-2 text-left">TRẠNG THÁI</th>
            <th className="p-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <input type="checkbox" />
              </td>
              <td className="p-2 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span>{item.name}</span>
              </td>
              <td className="p-2">{item.company}</td>
              <td className="p-2">{item.value}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === 'New'
                      ? 'bg-blue-100 text-blue-600'
                      : item.status === 'In-progress'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {item.status === 'New' ? 'Mới' : item.status === 'In-progress' ? 'Đang xử lý' : 'Hoàn thành'}
                </span>
              </td>
              <td className="p-2">✏️</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">63 kết quả</div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-pink-500 text-white rounded">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <button className="px-3 py-1 border rounded">...</button>
          <button className="px-3 py-1 border rounded">10</button>
          <button className="px-3 py-1 border rounded">11</button>
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;