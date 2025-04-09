function Header() {
    return (
      <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-pink-500">Cheffy</h1>
        </div>
  
        {/* Thanh tìm kiếm */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="What would you like to cook?"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
  
        {/* Menu điều hướng */}
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-pink-500">Recipes</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">Cooks</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">Occasions</a>
          <a href="#" class="text-gray-600 hover:text-pink-500">About</a>
        </nav>
  
        {/* Nút Login/Subscribe */}
        <div className="flex space-x-4">
          <button className="text-gray-600 hover:text-pink-500">Login</button>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
            Subscribe
          </button>
        </div>
      </header>
    );
  }
  
  export default Header;