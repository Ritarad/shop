import React, { useContext } from 'react';
import { handleSort } from '../../utils/sortUtils';
// components
import Card from '../Card/Card';
import SortButtons from '../SortButtons/SortButtons';

import './main.scss';
import { AppContext } from '../../context/AppContext';

function Main({ handleAddToCard }) {
  const { data, setData } = useContext(AppContext);

  const handleSortData = (direction) => {
    const sortedData = handleSort(data, direction);
    setData(sortedData);
  };

  return (
    <main className="container">
      <SortButtons handleSortData={handleSortData} />

      {data.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          description={item.description}
          handleCardButton={handleAddToCard}
        />
      ))}
    </main>
  );
}

export default Main;
