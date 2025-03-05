import './NoResults.css';

function NoResults() {
  return (
    <section className="no-results">
      <h2>Sorry, no results were found for “cakescascsa”</h2>
      <img src="Image 105.png" alt="No results icon" /> {/* Thay bằng đường dẫn ảnh của bạn */}
      <p>We have all your Independence Day sweets covered.</p>
      <div className="tags">
        <button className="tag sweet">Sweet Cake</button>
        <button className="tag black">Black Cake</button>
        <button className="tag verde">Pozole Verde</button>
        <button className="tag healthy">Healthy food</button>
      </div>
    </section>
  );
}

export default NoResults;