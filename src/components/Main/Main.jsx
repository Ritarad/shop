import React, { useContext, useState } from 'react';
import { handleSort } from '../../utils/sortUtils';
// components
import Card from '../Card/Card';
import SortButtons from '../SortButtons/SortButtons';

import './main.scss';
import { AppContext } from '../../context/AppContext';

function Main() {
  const [searchValue, setSerchValue] = useState('');
  const { data, setData, handleAddToCard } = useContext(AppContext);
  console.log(data);

  const handleSortData = (direction) => {
    const sortedData = handleSort(data, direction);
    setData(sortedData);
  };

  return (
    <main className="container">
      <div className="container-actions">
        <SortButtons handleSortData={handleSortData} />
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => {
            setSerchValue(e.target.value);
          }}
        />
      </div>
      {data
        .filter((item) => item.title.toLowerCase().includes(searchValue))
        .map((item) => (
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
