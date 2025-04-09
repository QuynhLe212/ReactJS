function Hero() {
    return (
      <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x500')" }}>
        {/* Card Recipe of the Day */}
        <div className="absolute top-10 left-10 bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">RECIPE OF THE DAY</span>
          <h2 className="text-2xl font-bold mt-2">Salad Caprese</h2>
          <p className="text-gray-600 mt-2">
            Classic Italian Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and balsamic vinegar create a refreshing dish for lunch or appetizer.
          </p>
          <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
            View now
          </button>
        </div>
      </section>
    );
  }
  
  export default Hero;