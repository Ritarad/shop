import React from 'react';
// components
import Button from '../Button/Button';

import './sortButtons.scss';

function SortButtons({ handleSortData }) {
  return (
    <div className="sort-btn">
      <Button
        type="teal"
        onClick={() => {
          handleSortData('az');
        }}
      >
        Sort A-Z
      </Button>
      <Button type="teal" onClick={handleSortData}>
        Sort Z-A
      </Button>
    </div>
  );
}

export default SortButtons;
