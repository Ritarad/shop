import React, { useState, createContext, useEffect } from 'react';
import { cfg } from '../cfg/cfg';
export const AppContext = createContext();

function AppContextProvider(props) {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem('cartData')) || []
  );
  const [favoritesData, setFavoritesData] = useState(
    JSON.parse(localStorage.getItem('favoritesData')) || []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${cfg.API.HOST}/product`);
        console.log('response', response);
        const products = await response.json();
        console.log(('products', products));
        const filteredData = products.filter(
          (item) => !cartData.some((cartItem) => cartItem.title === item.title)
        );

        setData(filteredData);
      } catch (error) {}
    };

    fetchData();
  }, []);
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem('favoritesData', JSON.stringify(favoritesData));
  }, [favoritesData]);

  const handleAddToCard = (item) => {
    setCartData([...cartData, item]);

    const filteredData = data.filter(
      (dataItem) => dataItem.title !== item.title
    );
    console.log('filteredData', filteredData);
    console.log('item', item);
    setData(filteredData);
  };

  const handleRemoveFromCard = (item) => {
    setData([item, ...data]);

    const filteredCardData = cartData.filter(
      (dataItem) => dataItem.title !== item.title
    );

    setCartData(filteredCardData);
  };

  const handleAddToFavorites = (item) => {
    setFavoritesData([...favoritesData, item]);
  };

  const handleRemoveFromFavorites = (item) => {
    const filteredFavoritesData = favoritesData.filter(
      (dataItem) => dataItem.title !== item.title
    );

    setFavoritesData(filteredFavoritesData);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        cartData,
        setCartData,
        favoritesData,
        setFavoritesData,
        handleAddToCard,
        handleRemoveFromCard,
        handleAddToFavorites,
        handleRemoveFromFavorites,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
