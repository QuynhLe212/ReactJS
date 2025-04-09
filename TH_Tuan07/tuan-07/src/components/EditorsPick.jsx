function EditorsPick() {
    const picks = [
      { title: "Stuffed sticky rice ball", author: "Jennifer King", description: "Stuffed sticky rice: A delightful Asian treat bursting with chewy goodness and a flavorful filling." },
      { title: "Strawberry smoothie", author: "Matthew Martinez", description: "Savor the sweet, refreshing taste of a strawberry smoothie, creamy and packed with fruity goodness." },
      { title: "Latte art", author: "Sarah Hill", description: "Latte art: the skillful craft of creating captivating designs on the surface of a latte." },
      { title: "Butter fried noodles", author: "Julia Lopez", description: "Butter fried noodles: savory noodles cooked in butter for a delicious meal." },
    ];
  
    return (
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-pink-500 text-center">Editor’s Pick</h2>
        <p className="text-center text-gray-600 mt-2">Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {picks.map((pick, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-gray-200"></div> {/* Placeholder cho hình ảnh */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{pick.title}</h3>
                <p className="text-gray-600">{pick.author}</p>
                <p className="text-gray-500 text-sm mt-2">{pick.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default EditorsPick;