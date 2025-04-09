function VideoRecipes() {
    const videos = [
      { title: "Salad with cabbage and shrimp", time: "20 minutes" },
      { title: "Salad of cove beans, shrimp and potatoes", time: "25 minutes" },
      { title: "Sunny-side up fried egg", time: "10 minutes" },
      { title: "Lotus delight salad", time: "15 minutes" },
    ];
  
    return (
      <section className="py-12 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-pink-500 text-center">Recipes with Videos</h2>
        <p className="text-center text-gray-600 mt-2">Cooking Up Culinary Creations with Step-by-Step Videos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 bg-gray-200"></div> {/* Placeholder cho hình ảnh */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-gray-600">{video.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default VideoRecipes;