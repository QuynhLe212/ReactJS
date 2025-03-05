import Filters from './Filters';
import NoResults from './NoResults';
import './MainContent.css';

function MainContent() {
  return (
    <main>
      <Filters />
      <NoResults />
    </main>
  );
}

export default MainContent;