import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// components
import Button from '../Button/Button';
import './card.scss';

function Card({ title, description, handleCardButton, card }) {
  const { favoritesData, handleAddToFavorites, handleRemoveFromFavorites } =
    useContext(AppContext);
  const isFavorite = favoritesData.some((item) => item.title === title);
  const handleAddToCard = () => {
    handleCardButton({ title, description });
  };
  return (
    <div className="card">
      <FontAwesomeIcon
        icon={faHeart}
        className={`favorite-icon ${isFavorite ? `favorite-icon--active` : ''}`}
        onClick={() => {
          isFavorite
            ? handleRemoveFromFavorites({ title, description })
            : handleAddToFavorites({ title, description });
        }}
      />

      <h3>{title}</h3>
      <p>{description}</p>
      <Button type="teal" onClick={handleAddToCard}>
        {card ? 'remove' : 'add to card'}
      </Button>
    </div>
  );
}

export default Card;
