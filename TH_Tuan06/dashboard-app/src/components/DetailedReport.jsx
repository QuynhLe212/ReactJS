// src/components/DetailedReport.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

const DetailedReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: '',
    date: '',
    status: '',
  });

  // Lấy dữ liệu ban đầu cho bảng
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/detailedReport');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
        console.error('Lỗi khi lấy dữ liệu Detailed Report:', error);
      }
    };
    fetchData();
  }, []);

  // Xử lý khi nhấn nút chỉnh sửa: Gọi API GET để lấy dữ liệu chi tiết
  const handleEditClick = async (row) => {
    try {
      const response = await axios.get(`http://localhost:3001/detailedReport/${row.id}`);
      const rowData = response.data;

      // Chuyển định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD để dùng với input type="date"
      const [day, month, year] = rowData.date.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      setSelectedRow(rowData);
      setFormData({
        name: rowData.name,
        company: rowData.company,
        value: rowData.value,
        date: formattedDate,
        status: rowData.status,
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu chi tiết:', error);
      alert('Không thể lấy dữ liệu chi tiết. Vui lòng thử lại.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
    setFormData({
      name: '',
      company: '',
      value: '',
      date: '',
      status: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý khi nhấn "Lưu": Gọi API PUT để cập nhật dữ liệu
  const handleSave = async () => {
    try {
      // Chuyển định dạng ngày từ YYYY-MM-DD về DD/MM/YYYY để lưu vào API
      const [year, month, day] = formData.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const updatedRow = {
        ...selectedRow,
        name: formData.name,
        company: formData.company,
        value: parseInt(formData.value), // Đảm bảo giá trị là số
        date: formattedDate,
        status: formData.status,
      };

      // Gửi yêu cầu PUT để cập nhật dữ liệu trên server
      await axios.put(`http://localhost:3001/detailedReport/${selectedRow.id}`, updatedRow);

      // Cập nhật dữ liệu trong state để bảng hiển thị ngay lập tức
      const updatedData = data.map((item) =>
        item.id === selectedRow.id ? updatedRow : item
      );
      setData(updatedData);

      handleModalClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
      alert('Không thể cập nhật dữ liệu. Vui lòng thử lại.');
    }
  };

  const columns = [
    {
      name: '',
      selector: (row) => row.id,
      cell: () => <input type="checkbox" />,
      width: '50px',
    },
    {
      name: 'TÊN KHÁCH HÀNG',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      name: 'CÔNG TY',
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: 'GIÁ TRỊ ĐƠN HÀNG',
      selector: (row) => row.value,
      sortable: true,
      cell: (row) => `$${row.value}`,
    },
    {
      name: 'NGÀY ĐẶT HÀNG',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'TRẠNG THÁI',
      selector: (row) => row.status,
      cell: (row) => (
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
      cell: (row) => (
        <button onClick={() => handleEditClick(row)} className="text-gray-600 hover:text-gray-800">
          <FaEdit />
        </button>
      ),
      width: '50px',
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">BÁO CÁO CHI TIẾT</h2>
        <div className="flex space-x-2">
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
            IMPORT
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            EXPORT
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
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
      )}

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-95">
            <h3 className="text-lg font-bold mb-4">Chỉnh sửa thông tin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên khách hàng</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Công ty</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Giá trị đơn hàng</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày đặt hàng</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="New">Mới</option>
                  <option value="In-progress">Đang xử lý</option>
                  <option value="Completed">Hoàn thành</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedReport;