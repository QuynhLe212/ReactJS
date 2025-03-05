import './Filters.css';

function Filters() {
  return (
    <aside className="filters">
      <h3>FILTERS</h3>
      <div className="filter-grid">
        <div className="filter-group type">
          <h4>Type <span className="caret">▲</span></h4>
          <label>
            <input type="checkbox" /> Pan-fried
          </label>
          <label>
            <input type="checkbox" /> Stir-fried
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Grilled
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Roasted
          </label>
          <label>
            <input type="checkbox" /> Sautéed
          </label>
          <label>
            <input type="checkbox" /> Baked
          </label>
          <label>
            <input type="checkbox" /> Steamed
          </label>
          <label>
            <input type="checkbox" /> Stewed
          </label>
        </div>
        <div className="filter-group time">
          <h4>Time <span className="caret">▲</span></h4>
          <input type="range" min="30" max="50" defaultValue="40" />
          <div className="time-labels">
            <span>30 minutes</span>
            <span>50 minutes</span>
          </div>
        </div>
        <div className="filter-group rating">
          <h4>Rating <span className="caret">▲</span></h4>
          <label className="rating-label">
            <input type="checkbox" />
            <span className="star-rating">⭐⭐⭐⭐⭐</span>
          </label>
          <label className="rating-label">
            <input type="checkbox" defaultChecked />
            <span className="star-rating">⭐⭐⭐⭐</span>
          </label>
          <label className="rating-label">
            <input type="checkbox" defaultChecked />
            <span className="star-rating">⭐⭐⭐</span>
          </label>
        </div>
      </div>
      <button className="apply">Apply</button>
    </aside>
  );
}

export default Filters;