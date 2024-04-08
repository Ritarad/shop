import React from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuth from './hooks/useAuth';
// components
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import MyCart from './components/MyCart/MyCart';
import Favorites from './components/Favorites/Favorites';
import Admin from './components/Admin/Admin';

import './App.scss';

function App() {
  const { token } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my-cart" element={<MyCart />} />
        <Route path="/favorites" element={<Favorites />} />
        {token && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </>
  );
}

export default App;
