import Header from './components/Header';
import Hero from './components/Hero';
import SummerRecipes from './components/SummerRecipes';
import VideoRecipes from './components/VideoRecipes';
import EditorsPick from './components/EditorsPick';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Hero />
      <SummerRecipes />
      <VideoRecipes />
      <EditorsPick />
      <Footer />
    </div>
  );
}

export default App;