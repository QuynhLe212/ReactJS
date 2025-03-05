import './Header.css';

function Header() {
  return (
    <header>
      <div className="name">
        <i className="fas fa-utensils"></i> {/* Sử dụng icon phù hợp từ Font Awesome */}
        Cheffy
      </div>
      <div className="search-container">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="cakescascsa" />
      </div>
      <nav>
        <a href="#">What to cook</a>
        <a href="#">Recipes</a>
        <a href="#">Ingredients</a>
        <a href="#">Occasions</a>
        <a href="#">About Us</a>
      </nav>
      <button className="recipe-box">Your Recipe Box</button>
    </header>
  );
}

export default Header;