import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        // Transform the product data to mimic recipes
        const recipeData = response.data.map(product => ({
          id: product.id,
          title: product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title,
          image: product.image,
          prepTime: Math.floor(Math.random() * 60) + 10, // Random prep time between 10-70 minutes
        }));
        setRecipes(recipeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading recipes...</div>;
  }

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">🍴 Cheffy</span>
          <input type="text" placeholder="What would you like to cook?" className="search-bar" />
        </div>
        <div className="navbar-right">
          <a href="#" className="nav-link">What to cook</a>
          <a href="#" className="nav-link">Recipes</a>
          <a href="#" className="nav-link">Ingredients</a>
          <a href="#" className="nav-link">Occasions</a>
          <a href="#" className="nav-link">About Us</a>
          <button className="recipe-box-btn">Your Recipe Box</button>
        </div>
      </nav>

      <div className="recipe-box">
        <h1 className="recipe-box-title">Emma Gonzalez's Recipe Box</h1>
        <div className="recipe-box-info">
          <img
            src="womenFace.jpg" // Replace with Emma's actual image or use a placeholder
            alt="Emma Gonzalez"
            className="profile-img"
          />
          <p className="bio">
            Emma Gonzalez is a deputy editor at Cheffy, bringing her expertise as a former cooking editor at The Los Angeles Times. She is also an accomplished author, contributing to numerous cookbooks and food publications. Originally from East Los Angeles, Emma now resides in New York City, where she explores a wide range of culinary delights.
          </p>
          <button className="subscriber-btn">6.5k Subscribers</button>
          <button className="share-btn">Share</button>
        </div>

        <div className="tabs">
          <button className="tab active">Saved Recipes</button>
          <button className="tab">Folders</button>
          <button className="tab">Recipes by Genevieve</button>
        </div>

        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-img" />
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="prep-time">{recipe.prepTime} minutes</p>
              <button className="recipe-icon">📖</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination-btn">&lt;</button>
          <button className="pagination-btn">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <button className="pagination-btn">...</button>
          <button className="pagination-btn">10</button>
          <button className="pagination-btn">11</button>
          <button className="pagination-btn">&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default App;