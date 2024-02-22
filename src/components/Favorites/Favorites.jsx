import React, { useContext } from 'react';
import { handleSort } from '../../utils/sortUtils';
import { AppContext } from '../../context/AppContext';
// components
import Card from '../Card/Card';
import SortButtons from '../SortButtons/SortButtons';

function Favorites() {
  const { favoritesData, setFavoritesData } = useContext(AppContext);

  const handleSortData = (direction) => {
    const sortedData = handleSort(favoritesData, direction);
    setFavoritesData(sortedData);
  };

  return (
    <main className="container">
      <SortButtons handleSortData={handleSortData} />

      {favoritesData.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          description={item.description}
          handleCardButton={() => {}}
        />
      ))}
    </main>
  );
}

export default Favorites;
