// src/components/DetailedReport.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const DetailedReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/detailedReport');
        setData(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu Detailed Report:', error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      name: '',
      selector: row => row.id,
      cell: () => <input type="checkbox" />,
      width: '50px',
    },
    {
      name: 'TÊN KHÁCH HÀNG',
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: 'CÔNG TY',
      selector: row => row.company,
      sortable: true,
    },
    {
      name: 'GIÁ TRỊ ĐƠN HÀNG',
      selector: row => row.value,
      sortable: true,
      cell: row => `$${row.value}`,
    },
    {
      name: 'NGÀY ĐẶT HÀNG',
      selector: row => row.date,
      sortable: true,
    },
    {
      name: 'TRẠNG THÁI',
      selector: row => row.status,
      cell: row => (
        <span
          className={`px-2 py-1 rounded ${
            row.status === 'New'
              ? 'bg-blue-100 text-blue-600'
              : row.status === 'In-progress'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {row.status === 'New' ? 'Mới' : row.status === 'In-progress' ? 'Đang xử lý' : 'Hoàn thành'}
        </span>
      ),
    },
    {
      name: '',
      cell: () => <span>✏️</span>,
      width: '50px',
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">BÁO CÁO CHI TIẾT</h2>
        <div className="flex space-x-2">
          <button className="bg-pink-500 text-white px-4 py-2 rounded">IMPORT</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">EXPORT</button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15]}
        highlightOnHover
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#f1f5f9',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
};

export default DetailedReport;

