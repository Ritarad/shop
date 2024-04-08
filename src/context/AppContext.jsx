import React, { useState, createContext, useEffect } from 'react';
import { cfg } from '../cfg/cfg';

export const AppContext = createContext();

function AppContextProvider(props) {
  const [showLogin, setShowLogin] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem('cartData')) || []
  );
  const [favoritesData, setFavoritesData] = useState(
    JSON.parse(localStorage.getItem('favoritesData')) || []
  );

  const fetchData = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(`${cfg.API.HOST}/product`);

      const products = await response.json();

      const filteredData = products.filter(
        (item) => !cartData.some((cartItem) => cartItem.title === item.title)
      );
      setData(filteredData);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem('favoritesData', JSON.stringify(favoritesData));
  }, [favoritesData]);

  const handleAddToCard = (item) => {
    setCartData((prev) => [...prev, item]);

    const filteredData = data.filter(
      (dataItem) => dataItem.title !== item.title
    );

    setData(filteredData);
  };

  const handleRemoveFromCard = (item) => {
    setData((prev) => [item, ...prev]);

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
        showLogin,
        setShowLogin,
        fetchData,
        setCartData,
        favoritesData,
        loadingProducts,
        handleAddToCard,
        setFavoritesData,
        handleAddToFavorites,
        handleRemoveFromCard,
        handleRemoveFromFavorites,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
