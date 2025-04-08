// src/components/DetailedReport.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';

const DetailedReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    value: '',
    date: '',
    status: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/detailedReport', { timeout: 10000 });
        console.log('Dữ liệu Detailed Report:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi lấy dữ liệu Detailed Report. Vui lòng kiểm tra API.');
        setLoading(false);
        console.error('Lỗi khi lấy dữ liệu Detailed Report:', error.message, error.response?.data);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = async (row) => {
    try {
      const response = await axios.get(`http://localhost:3001/detailedReport/${row.id}`, { timeout: 10000 });
      const rowData = response.data;
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
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu chi tiết:', error.message, error.response?.data);
      alert('Không thể lấy dữ liệu chi tiết. Vui lòng thử lại.');
    }
  };

  const handleAddClick = () => {
    setFormData({
      name: '',
      company: '',
      value: '',
      date: '',
      status: 'New',
    });
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
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

  const handleEditSave = async () => {
    try {
      if (!formData.name || !formData.company || !formData.value || !formData.date || !formData.status) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      const [year, month, day] = formData.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const updatedRow = {
        ...selectedRow,
        name: formData.name,
        company: formData.company,
        value: parseInt(formData.value),
        date: formattedDate,
        status: formData.status,
      };

      await axios.put(`http://localhost:3001/detailedReport/${selectedRow.id}`, updatedRow);

      const updatedData = data.map((item) =>
        item.id === selectedRow.id ? updatedRow : item
      );
      setData(updatedData);

      handleModalClose();
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error.message, error.response?.data);
      alert('Không thể cập nhật dữ liệu. Vui lòng thử lại.');
    }
  };

  const handleAddSave = async () => {
    try {
      if (!formData.name || !formData.company || !formData.value || !formData.date || !formData.status) {
        alert('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      const [year, month, day] = formData.date.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const newRow = {
        name: formData.name,
        company: formData.company,
        value: parseInt(formData.value),
        date: formattedDate,
        status: formData.status,
      };

      const response = await axios.post('http://localhost:3001/detailedReport', newRow);
      setData([...data, response.data]);

      handleModalClose();
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu:', error.message, error.response?.data);
      alert('Không thể thêm dữ liệu. Vui lòng thử lại.');
    }
  };

  const columns = [
    {
      name: '',
      selector: (row) => row.id,
      cell: () => <input type="checkbox" className="w-5 h-5 text-blue-600" />,
      width: '50px',
    },
    {
      name: 'TÊN KHÁCH HÀNG',
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium">{row.name.charAt(0)}</span>
          </div>
          <span className="text-gray-800 font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      name: 'CÔNG TY',
      selector: (row) => row.company,
      sortable: true,
      cell: (row) => <span className="text-gray-700">{row.company}</span>,
    },
    {
      name: 'GIÁ TRỊ ĐƠN HÀNG',
      selector: (row) => row.value,
      sortable: true,
      cell: (row) => <span className="text-gray-800 font-medium">${row.value}</span>,
    },
    {
      name: 'NGÀY ĐẶT HÀNG',
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => <span className="text-gray-700">{row.date}</span>,
    },
    {
      name: 'TRẠNG THÁI',
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === 'New'
              ? 'bg-blue-100 text-blue-700'
              : row.status === 'In-progress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {row.status === 'New' ? 'Mới' : row.status === 'In-progress' ? 'Đang xử lý' : 'Hoàn thành'}
        </span>
      ),
    },
    {
      name: '',
      cell: (row) => (
        <button onClick={() => handleEditClick(row)} className="text-blue-600 hover:text-blue-800 transition-colors">
          <FaEdit size={18} />
        </button>
      ),
      width: '50px',
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">BÁO CÁO CHI TIẾT</h2>
        <div className="flex space-x-3">
          <button
            onClick={handleAddClick}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
          >
            THÊM NGƯỜI DÙNG
          </button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-sm">
            IMPORT
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
            EXPORT
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
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
                  backgroundColor: '#f8fafc',
                  color: '#1f2937',
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '16px',
                  borderBottom: '1px solid #e5e7eb',
                },
              },
              cells: {
                style: {
                  padding: '16px',
                  fontSize: '14px',
                  color: '#374151',
                  borderBottom: '1px solid #f1f5f9',
                },
              },
            }}
          />
        </div>
      )}

      {/* Modal chỉnh sửa */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 scale-95 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Chỉnh sửa thông tin</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị đơn hàng</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đặt hàng</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="New">Mới</option>
                  <option value="In-progress">Đang xử lý</option>
                  <option value="Completed">Hoàn thành</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm người dùng */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 scale-95 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Thêm người dùng mới</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Công ty</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị đơn hàng</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đặt hàng</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="New">Mới</option>
                  <option value="In-progress">Đang xử lý</option>
                  <option value="Completed">Hoàn thành</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
              <button
                onClick={handleModalClose}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleAddSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
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