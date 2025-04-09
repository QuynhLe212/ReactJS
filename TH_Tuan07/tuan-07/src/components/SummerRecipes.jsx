function SummerRecipes() {
    const recipes = [
      { title: "Italian-style tomato", time: "20 minutes" },
      { title: "Spaghetti with vegetables", time: "30 minutes" },
      { title: "Lotus delight salad", time: "15 minutes" },
      { title: "Snack-on", time: "10 minutes" },
    ];
  
    return (
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-pink-500 text-center">This Summer Recipes</h2>
        <p className="text-center text-gray-600 mt-2">We have your Indian Sweets covered</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-gray-200"></div> {/* Placeholder cho hình ảnh */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p className="text-gray-600">{recipe.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default SummerRecipes;