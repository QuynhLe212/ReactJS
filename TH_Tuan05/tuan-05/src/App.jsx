import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const recipeData = response.data.map((product) => ({
          id: product.id,
          title:
            product.title.length > 20
              ? product.title.substring(0, 20) + "..."
              : product.title,
          image: product.image,
          prepTime: Math.floor(Math.random() * 60) + 10, // Random prep time between 10-70 minutes
        }));
        setRecipes(recipeData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading recipes...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white shadow-md p-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-pink-500">🍴 Cheffy</span>
          <input
            type="text"
            placeholder="What would you like to cook?"
            className="border rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600 hover:text-purple-500">
            What to cook
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-500">
            Recipes
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-500">
            Ingredients
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-500">
            Occasions
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-500">
            About Us
          </a>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
            Your Recipe Box
          </button>
        </div>
      </nav>

      {/* Recipe Box Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Emma Gonzalez's Recipe Box
          </h1>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Paulina_Vega_2016.png"
              alt="Emma Gonzalez"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-gray-600">
                Emma Gonzalez is a deputy editor at Cheffy, bringing her expertise
                as a former cooking editor at The Los Angeles Times. She is also
                an accomplished author, contributing to numerous cookbooks and
                food publications. Originally from East Los Angeles, Emma now
                resides in New York City, where she explores a wide range of
                culinary delights.
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                6.5k Subscribers
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                Share
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button className="text-pink-500 border-b-2 border-pink-500 pb-2 bg-transparent">
              Saved Recipes
            </button>
            <button className="text-gray-600 hover:text-pink-500 pb-2 bg-transparent">
              Folders
            </button>
            <button className="text-gray-600 hover:text-pink-500 pb-2 bg-transparent">
              Recipes by Genevieve
            </button>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{recipe.prepTime} minutes</p>
                  <button className="bg-black text-white px-2 py-1 rounded-full hover:bg-gray-800 mt-2">
                    📖
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              &lt;
            </button>
            <button className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full">
              1
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              2
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              3
            </button>
            <button className="px-3 py-1 text-gray-600">...</button>
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              10
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              11
            </button>
            <button className="px-3 py-1 text-gray-600 hover:text-pink-500">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;