import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';
import '../App.css';

// Tạo cart slice với Redux Toolkit
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    // Thêm sản phẩm mới vào giỏ hàng
    addItem: (state, action) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        state.items[existingItemIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm mới với số lượng là 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Cập nhật số lượng của sản phẩm
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    }
  }
});

// Export các actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = state => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = state => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

/**
 * Component giỏ hàng sử dụng Redux
 */
function ShoppingCartRedux() {
  // Lấy danh sách sản phẩm từ Redux store sử dụng selectors
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  
  // Lấy hàm dispatch
  const dispatch = useDispatch();
  
  // State cho form thêm sản phẩm mới
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  
  /**
   * Thêm sản phẩm mới vào giỏ hàng
   * @param {Event} e - Event object
   */
  const handleAddItem = (e) => {
    e.preventDefault();
    
    if (productName.trim() && productPrice.trim() && !isNaN(parseFloat(productPrice))) {
      const newItem = {
        id: Date.now(),
        name: productName.trim(),
        price: parseFloat(productPrice),
      };
      
      dispatch(addItem(newItem));
      
      // Reset form
      setProductName('');
      setProductPrice('');
    }
  };
  
  /**
   * Xóa sản phẩm khỏi giỏ hàng
   * @param {number} itemId - ID của sản phẩm cần xóa
   */
  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };
  
  /**
   * Cập nhật số lượng sản phẩm
   * @param {number} itemId - ID của sản phẩm cần cập nhật
   * @param {number} newQuantity - Số lượng mới
   */
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ Hàng (Redux)</h2>
      
      <form onSubmit={handleAddItem} className="mb-6">
        <div className="mb-3">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-1">Tên sản phẩm:</label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-1">Giá (VND):</label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập giá sản phẩm"
            min="0"
            step="1000"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Thêm vào giỏ hàng
        </button>
      </form>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-4 text-gray-500">Giỏ hàng trống</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Sản phẩm</th>
                  <th className="px-4 py-2 text-right">Giá (VND)</th>
                  <th className="px-4 py-2 text-center">Số lượng</th>
                  <th className="px-4 py-2 text-right">Thành tiền</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2 text-right">{item.price.toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 rounded-l"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">{(item.price * item.quantity).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan="2" className="px-4 py-2 font-bold">Tổng</td>
                  <td className="px-4 py-2 text-center font-bold">{totalQuantity}</td>
                  <td className="px-4 py-2 text-right font-bold">{totalPrice.toLocaleString()} VND</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCartRedux;