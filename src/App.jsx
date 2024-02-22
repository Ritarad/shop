import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { mockData } from './mockData';
// components
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import MyCard from './components/MyCard/MyCard';
import Favorites from './components/Favorites/Favorites';

import './App.scss';

function App() {
  const [cardData, setCardData] = useState([]);
  const [data, setData] = useState(mockData);

  const handleAddToCard = (item) => {
    setCardData([...cardData, item]);

    const filteredData = data.filter(
      (dataItem) => dataItem.title !== item.title
    );

    setData(filteredData);
  };

  const handleRemoveFromCard = (item) => {
    setData([item, ...data]);

    const filteredCardData = cardData.filter(
      (dataItem) => dataItem.title !== item.title
    );

    setCardData(filteredCardData);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main handleAddToCard={handleAddToCard} />} />
        <Route
          path="/my-card"
          element={
            <MyCard
              cardData={cardData}
              setCardData={setCardData}
              handleRemoveFromCard={handleRemoveFromCard}
            />
          }
        />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
