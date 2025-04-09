function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="mt-2 text-gray-400">
              Welcome to our website, a wonderful place to explore and learn how to cook like a pro.
            </p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg focus:outline-none"
              />
              <button className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600">
                Send
              </button>
            </div>
          </div>
  
          {/* Learn More */}
          <div>
            <h3 className="text-lg font-semibold">Learn More</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-500">Our Cooks</a></li>
              <li><a href="#" className="hover:text-pink-500">See Our Features</a></li>
              <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-500">Shop</a></li>
              <li><a href="#" className="hover:text-pink-500">Gift Subscription</a></li>
              <li><a href="#" className="hover:text-pink-500">Send Us Feedback</a></li>
            </ul>
          </div>
  
          {/* Recipes */}
          <div>
            <h3 className="text-lg font-semibold">Recipes</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-500">Pasta</a></li>
              <li><a href="#" className="hover:text-pink-500">Dinner</a></li>
              <li><a href="#" className="hover:text-pink-500">Healthy</a></li>
              <li><a href="#" className="hover:text-pink-500">Salad</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          <p>© 2023 Cheffy Company. Terms of Service | Privacy Policy</p>
          <p className="mt-2">Made with <span className="text-blue-500">Visly</span></p>
        </div>
      </footer>
    );
  }
  
  export default Footer;